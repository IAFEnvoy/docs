---
title: "Data-driven player information"
sidebar_position: 3
---

Information rows are defined by data packs and generate flat `InformationEntry` values from the `PlayerView` supplied by the caller. `InformationRow` is a row definition and `InformationGroup` is a group definition that references rows; results reference these two definitions directly through Holders instead of copying a second set of Row/Group metadata. Parameterized getters are responsible for confirming entity facts; expressions handle value retrieval, computation and organizing display—they do not look for entities, read player files, or run gameplay resolution.

## Registries and directories

| Registry | Java entry point | Contents |
| --- | --- | --- |
| `saturn:entity_value_getter` | `SaturnRegistries.ENTITY_VALUE_GETTER` | Code registry whose values are `MapCodec<? extends EntityValueGetter<?>>`, used to decode query parameters |
| `saturn:information_expression_type` | `SaturnRegistries.INFORMATION_EXPRESSION_TYPE` | Code registry whose values are `MapCodec<? extends InformationExpression>` |
| `saturn:information_group` | `SaturnResourceKeys.INFORMATION_GROUP` | Native data pack registry whose values are `InformationGroup` |
| `saturn:information_row` | `SaturnResourceKeys.INFORMATION_ROW` | Native data pack registry whose values are `InformationRow` |

Definition file paths:

```text
data/<namespace>/saturn/information_group/<path>.json
data/<namespace>/saturn/information_row/<path>.json
data/<namespace>/tags/saturn/information_row/<path>.json
```

The file's namespace and path determine the entry ID; the file no longer contains an `id`. Group and row definitions are synced through native registries; player facts, information documents and their permissions and networking are still handled by the host. These two kinds of definitions follow the world-load lifecycle of native dynamic registries, so changes require reloading the world or restarting the server; no separate `/reload` hot reload service is implemented.

The 3 built-in Groups and 16 information rows all live in `src/main/resources/data/saturn/saturn/` and can be referenced and overridden directly. All information rows and groups are loaded by these two data pack registries; code only registers intrinsic types such as getters and expressions.

## Groups, row references and tags

**Membership is declared by the Group; Row definitions contain no groups.** A Group's `rows` is an array, and each element is the following in Java:

```java
Either<Holder<InformationRow>, TagKey<InformationRow>>
```

The codec reuses `RegistryCodecs.holderOrTag(SaturnResourceKeys.INFORMATION_ROW).listOf()`. For example, `data/example/saturn/information_group/overview.json`:

```json
{
  "title": { "translate": "info.example.group.overview" },
  "order": 10,
  "rows": ["saturn:health", "#example:overview"]
}
```

`title` is a Component and also accepts a translation key string (such as `"info.example.group.overview"`); `order` defaults to `0`, and `rows` is a required array that may be empty. A plain ID decodes to a registry Holder and a `#` prefix decodes to a TagKey; inline Row definitions are not supported in a Group. Referencing a Row that does not exist fails during native loading/registry validation; a tag that does not exist is treated as an empty set. Tag references are kept at load time and expanded against the current row registry during collection, so tag contents are not permanently copied into the Group.

The corresponding tag `data/example/tags/saturn/information_row/overview.json`:

```json
{
  "replace": false,
  "values": ["saturn:health", "saturn:experience"]
}
```

The three built-in groups basic/status/equipment reference `#saturn:basic`, `#saturn:status` and `#saturn:equipment` respectively. Content mods can append their own data rows through tags with the same names without overriding an entire Group; they can also define new tags and new Groups. Tags follow the native rules for appending, replace, nested tags and optional entries.

- A Row is defined only once; multiple Groups can reference the same Row or overlapping tags, and the collector computes the group list of the generated results in reverse.
- A single-group query expands its `rows`; selecting multiple groups takes the union. Direct references, tags and overlapping groups are all deduplicated by Row ID, so each row is evaluated only once per collection. An empty group selection set still means no rows are taken.
- `collectAll` collects every Row that is enabled and satisfies its display condition, including rows that no Group references; ungrouped rows have an empty `groups` in the result.
- Groups are sorted by `order` and ID. collectAll and multi-group unions are ordered first by the earliest-sorted group among the groups a result belongs to, then by row `order` and ID; ungrouped rows come last, sorted by row `order` and ID.
- Single-group queries and `document.rows(group)` are sorted by row `order` and ID. The expansion order of a Group's rows/tags only determines the selection scope; display order is still determined by Row order.
- The default grouped page shows each Row in every group that references it, and ungrouped rows appear under "Other information"; opening by group shows only the selected group. A flat card that iterates `document.rows()` avoids duplicate display.

`PlayerInformation.groups(view[, context])` takes `Holder<InformationGroup>` from the current registry for filtering, and reads its value directly for the title and order; group selection should use Holders from the same registry context. Data packs override the entire definition of a Group with the same ID according to native priority; rows removed from a group can still be collected by collectAll.

## Row definitions

Example health row:

```json
{
  "order": 10,
  "importance": 100,
  "label": { "translate": "info.saturn.field.health" },
  "value": {
    "type": "saturn:coalesce",
    "values": [
      {
        "type": "saturn:meter",
        "value": { "type": "saturn:getter", "getter": { "type": "saturn:health" } },
        "min": 0,
        "max": { "type": "saturn:getter", "getter": { "type": "saturn:max_health" } }
      },
      {
        "type": "saturn:number",
        "value": { "type": "saturn:getter", "getter": { "type": "saturn:health" } }
      }
    ]
  }
}
```

| Field | Default | Description |
| --- | --- | --- |
| `label` | required | Static Component title |
| `value` | required | Expression that produces the content |
| `order` | `0` | Row order |
| `importance` | `0` | Any int; larger means more important, independent of order |
| `enabled` | `true` | Whether the row is enabled; `false` does not generate the row |
| `label_expression` | none | Dynamic title, overrides `label` on success |
| `tooltip` | none | Static Component tooltip |
| `tooltip_expression` | none | Dynamic tooltip, overrides `tooltip` on success |
| `tone` | `normal` | `normal`, `positive`, `warning` |
| `visible` | none | Boolean expression; the row is hidden when false, missing or of the wrong type |
| `missing` | `show` | `show` displays the missing reason; `hide` hides the row when the final content is Missing |

When a dynamic title/tooltip is unavailable, the static fallback is kept; its field dependencies are still retained. `missing: hide` only inspects the whole content—a missing cell in a list or table does not make the entire row disappear. A disabled definition must still satisfy the full structure, for example including `label` and `value`. A Row does not declare which Group it belongs to; an unknown `groups` key in the prototype format is ignored by normal Codec rules, so move membership to the Group's rows or to row tags.

Data pack overrides with the same ID select the entire definition by native pack priority and do not merge JSON properties. All Rows come from the current registry; there is no Java provider fallback. Groups only select rows and do not change a row's importance or expressions.

## How expressions work

`InformationExpression` is an operation node with a `MapCodec`. Value nodes return intermediate data; display nodes produce an existing `InformationValue`. The same getter result can be used for numbers, progress bars, translation arguments and tables, without registering a dedicated display Type for each value-retrieval logic.

Numbers, strings and booleans can be used directly as constants: `0`, `"example"`, `false`. Structured constants use the `constant` wrapper. Every operation object writes its `type` explicitly; an unknown Type fails to decode and does not fall back to a registry default.

```json
{
  "type": "saturn:getter",
  "getter": { "type": "saturn:experience" },
  "path": ["level"]
}
```

`getter` objects decode their parameters through `EntityValueGetter.CODEC` and the native `saturn:entity_value_getter`, then run `view.read(getter)` → encode with `getter.valueCodec()` → walk the optional path → decode the consuming node as the expected type. This only reads the supplied view and does not call live capture. Schema, missing state and payload checks still apply. Unknown types fail while the definition is decoded, and missing or invalid parameters also return Codec errors; unknown raw queries in a snapshot can still round-trip. See [Getter registration](../development/player-views.md#registering-typed-extensions) for extensions.

For example, to read the effective value of a specific attribute, write:

```json
{
  "type": "saturn:number",
  "value": {
    "type": "saturn:getter",
    "getter": {
      "type": "saturn:attribute",
      "attribute": "minecraft:max_health",
      "value": "effective"
    }
  }
}
```

Attributes are matched by ID and do not depend on list order. Also built in are `resource` (resource ID, current/minimum/maximum), `effect` (effect ID, amplifier/duration) and `score` (objective name). The full parameter definition participates in snapshots and in the evaluation cache identity, so different attributes and different modes do not mix data. When there is no exact result, the built-in queries can project from the snapshot's attributes/resources/effects/scores; explicit missing, invalid payloads or unknown schemas are not overridden by projection. Valid attribute values and resource bounds that were not recorded historically stay missing.

`PlayerViews.parse` captures the getters required by the enabled rows in the current world (including all condition branches, titles and tooltips) and merges default and explicit queries with dependencies. Manually constructed views and existing archives do not read live entities because of new row definitions; missing data still returns the corresponding Missing.

`path` defaults to empty and is only used for member access on composite results. Objects are keyed by name; arrays use non-negative decimal index strings (for example `["0", "id"]`); a key containing a dot or colon stays a single element. Use a parameterized getter to access a single member by attribute/resource ID. A missing member or an out-of-range index is `NOT_CAPTURED`, a structural or type mismatch is `INVALID`; when the query itself is missing, the original reason is preserved.

Zero, false and empty collections are all known values. Numeric conversion rejects non-numeric values, NaN and Infinity. The result Codec does not provide a general inspectable structural description; path existence and result type are determined at evaluation time. A single collection caches encoded results by full getter parameters, shared across rows, and is not stored as a global player cache.

### Built-in Types

The implementation lives in `com.iafenvoy.saturn.data.information.expression.builtin`, with one class per Type, for example `GetterExpression`, `MeterExpression` and `TableExpression`. Each holds its own MapCodec and all of them are registered by `registry.content.SaturnInformationExpressions`; table column DTOs are defined together with `TableExpression`, and shared helper methods are collected in `ExpressionSupport` inside the package.

All IDs in the table below carry the `saturn:` prefix; parameters marked "expression" accept any nested operation or raw constant.

| Type | JSON parameters | Result |
| --- | --- | --- |
| `constant` | `value`: any data | Intermediate data; array/object constants must use this wrapper |
| `getter` | `getter`: query object with type/parameters, `path`: string array, default `[]` | Query result Codec data |
| `local` | `name`: default `item`, `path`: default `[]` | Current element or key of a list/table |
| `number` | `value`: expression | Number |
| `boolean` | `value`: expression | Flag |
| `text` | `value`: expression, `component`: default false | Text; by default accepts scalar text or a Component, true forces the Component Codec |
| `items` | `value`: expression | Items; decoded with the `Map<String, PlayerViewItem>` Codec |
| `meter` | `value`, `max`: expression, `min`: expression, default `0` | Meter; requires max ≥ min |
| `translate` | `key`: string expression, `arguments`: expression array default `[]`, `fallback`: optional string expression | Lazily translated Component; preserves Component arguments and style |
| `registry_name` | `registry`: registry ID, `value`: entry ID expression | Text; resolves the name from the registry of the current evaluation context and keeps client translations |
| `format` | `format`: format string, `arguments`: expression array | Intermediate string; `String.format(Locale.ROOT, ...)`, numeric arguments are double, use `%f`/`%.1f` etc. |
| `arithmetic` | `operation`: `add/subtract/multiply/divide/min/max`, `left`, `right`: expression | Intermediate number; non-finite results such as division by zero are INVALID |
| `compare` | `operation`: `eq/ne/lt/le/gt/ge`, `left`, `right`: expression | Boolean; eq/ne compare scalars or text, the rest compare numbers |
| `logic` | `operation`: `and/or/not`, `values`: expression array | Boolean; and/or short-circuit, not requires exactly one operand |
| `is_known` | `value`: expression | Whether known; a known false/0/empty collection returns true |
| `if` | `condition`, `then`, `else`: expression | Evaluates only the selected branch; propagates missing when the condition is missing |
| `coalesce` | `values`: expression array | First known result; when all are missing, keeps the first item's missing reason, an empty array is NOT_CAPTURED |
| `list` | `source`, `element`: expression, `as`: local name default `item` | Values |
| `table` | `source`: expression, `columns`: column array, `as`: default `item`, `row_id`: optional string expression | Table |

If the final value returns an intermediate scalar directly, it is automatically projected to Text, Number or Flag. Objects and arrays must be consumed explicitly through `text`, `items`, `list` or `table`, to avoid blindly turning the whole structure into a string.

`translate` keeps the translation key and displays it on the client according to the language; `format` produces a fixed string, and Component arguments are converted to text in the current environment, so it is not a substitute for delayed translation. Integer values of numeric translation arguments are passed as integers, so effect levels do not show as `1.0`.

`registry_name` uses the object's own `getDescriptionId()` for attributes, status effects, items, blocks and entity types, so it works with mod-defined translation keys; other registries use the naming rules of `DefinitionText`. When the entry or registry is unavailable, there is no registry context, or the client lacks a translation, it falls back to the raw entry ID. When the input ID is invalid or missing, Missing is preserved. It only resolves display names and does not modify IDs, attribute base values or historical effective values in the snapshot.

The built-in attribute table uses the following expression, so `minecraft:max_health` is displayed as the client-localized name (for example "Max Health" in English):

```json
{
  "type": "saturn:registry_name",
  "registry": "minecraft:attribute",
  "value": { "type": "saturn:local", "path": ["id"] }
}
```

### List and table scopes

`source` can be an array or an object. Arrays keep order; objects are sorted by key. `local` reads `item` by default; `item_key` represents the current index/object key, with a string value. After specifying `as: "effect"`, the corresponding variables are `effect` and `effect_key`. Nested scopes can use different names to retain outer elements.

Resource table example:

```json
{
  "type": "saturn:table",
  "source": { "type": "saturn:getter", "getter": { "type": "saturn:resources" } },
  "row_id": { "type": "saturn:local", "path": ["id"] },
  "columns": [
    {
      "id": "name",
      "label": { "translate": "info.saturn.field.name" },
      "value": { "type": "saturn:text", "value": { "type": "saturn:local", "path": ["id"] } }
    },
    {
      "id": "value",
      "label": { "translate": "info.saturn.field.value" },
      "value": { "type": "saturn:number", "value": { "type": "saturn:local", "path": ["value"] } }
    }
  ]
}
```

Column `id`s must be unique, a column `label` is a static Component, and a column `value` is an expression. When `row_id` is omitted, the array index/object key is used; duplicate row IDs are INVALID. A cell can be any InformationValue such as a number, text or progress bar; a missing cell stays Missing. The built-in resource definition further uses coalesce to show a progress bar when bounds exist and a number when bounds are missing.

`InformationEvaluation` limits each row to 64 levels of evaluation depth and 100,000 node evaluations; one collection expansion handles at most 10,000 elements. Exceeding a limit is INVALID. Runtime exceptions in a Type are logged and isolated by the row collector, and other rows continue to generate.

## Source fields and authorization

A node merges the queries of all child expressions through `getters()`; the default `sourceFields()` derives sources from getter type IDs and dependencies. A row merges all dependencies of value, visible, the dynamic title and the tooltip, including branches the condition did not select. Local variable dependencies are covered by the outer list/table source and its child expressions. The historical name `sourceFields` is kept, and its granularity is the getter type ID; for example, a parameterized attribute declares both `saturn:attribute` and `saturn:attributes` and does not provide per-attribute parameter authorization.

`document.filter(allowedGetterType)` removes entire rows that depend on unauthorized types; snapshot.filter filters fields/queries at the same time. The host should filter actual data and documents before transmission and impose finer-grained projection limits itself when needed. JSON display conditions are not permission control. Custom Types must declare their full dependencies through getters to avoid missing capture or sources.

## Registering a custom Type

Implement `InformationExpression` and register your own `MapCodec`. The example only clamps the value passed in and does not bind to a specific player field:

```java
public record Clamp(InformationExpression value, double min, double max) implements InformationExpression {
    public static final MapCodec<Clamp> CODEC = RecordCodecBuilder.<Clamp>mapCodec(i -> i.group(
            InformationExpression.CODEC.fieldOf("value").forGetter(Clamp::value),
            MiscCodecs.FINITE.fieldOf("min").forGetter(Clamp::min),
            MiscCodecs.FINITE.fieldOf("max").forGetter(Clamp::max)
    ).apply(i, Clamp::new)).validate(v -> v.min <= v.max
            ? DataResult.success(v) : DataResult.error(() -> "max must be >= min"));

    @Override public MapCodec<Clamp> codec() { return CODEC; }
    @Override public Set<EntityValueGetter<?>> getters() { return value.getters(); }
    @Override public ExpressionValue evaluate(InformationEvaluation context) {
        double number = context.evaluate(value).number();
        return context.data(context.ops().createDouble(Math.clamp(number, min, max)));
    }
}

public static final DeferredRegister<MapCodec<? extends InformationExpression>> EXPRESSIONS =
        DeferredRegister.create(SaturnRegistries.INFORMATION_EXPRESSION_TYPE, "example");

static {
    EXPRESSIONS.register("clamp", () -> Clamp.CODEC);
}

// In this mod's constructor:
// EXPRESSIONS.register(modEventBus);
```

Common imports are `com.iafenvoy.saturn.data.information.expression.*`, `data.information.getter.EntityValueGetter`, `SaturnRegistries`, `MiscCodecs`, DFU's Codec/MapCodec/DataResult/RecordCodecBuilder and NeoForge's DeferredRegister. A node calls `context.evaluate(...)` on child nodes and uses its type conversion methods; missing values propagate as intermediate Missing. If you implement your own loops, follow the same read-only, bounded evaluation contract.

The overall `InformationExpression.CODEC` uses `Codec.lazyInitialized` to create the dispatcher lazily, resolving the mutual static initialization between node MapCodecs and the top-level entry point. It does not use an unconsumed `Codec.recursive` self parameter.

## Call context and compatible migration

```java
// Obtain the original context from an entity or from a snapshot decoded with RegistryOps:
var view = PlayerViews.parse(player);
var all = PlayerInformation.collectAll(view);
var basicGroup = PlayerInformation.groups(view).stream()
        .filter(group -> group.unwrapKey().orElseThrow().identifier().equals(Identifier.parse("saturn:basic"))).findFirst().orElseThrow();
var basic = PlayerInformation.collect(view, basicGroup);
var groups = PlayerInformation.groups(view);

// A manually created view without a registry context, where the host explicitly supplies the current world registries:
var context = new InformationContext("zh_cn", registries);
var allWithDefinitions = PlayerInformation.collectAll(view, context);
var selected = PlayerInformation.collect(view, context, Set.copyOf(PlayerInformation.groups(view, context)));
```

A provider passed explicitly to `InformationContext` takes priority; otherwise the RegistryOps carried with the view in `PlayerView.serializationOps()` is read. The default interface implementation returns JsonOps, and `PlayerViewSnapshot` keeps its own codec context. A view without registries returns empty row and group lists; it does not fill in definitions from some global world, nor does it secretly read the current client player. When using across worlds or when current definitions are desired, pass the current provider explicitly.

`groups(view[, context])` enumerates the current Group registry, including empty groups; `document.groups()` contains only the groups that actually generated rows. Membership always comes from the current registry definitions, and there is no separate group metadata object. A manual view can also explicitly receive a provider that only contains the Row registry, in which case collectAll yields ungrouped rows.

The old `PlayerInformation.register*`, `PlayerInformationRegistry`, `PlayerInformationRowProvider` and parameterless code-group enumeration have been removed. Migrate old provider logic to the intrinsic type registries of getters/expressions and reference them from Row/Group JSON; there is no longer a path that merges code rows/groups with data definitions. The built-in `BASIC` / `STATUS` / `EQUIPMENT` metadata constants have also been removed; look them up by ID in the current Group registry.

Evaluation results are unified as `InformationEntry(row, groups, label, value, tooltip)`: row is a `Holder<InformationRow>`, groups is a `Set<Holder<InformationGroup>>`. Read `entry.value()`, `entry.label()` and `entry.tooltip()` directly; `entry.id()/order()/importance()/tone()/sourceFields()` obtain definition information from the Row Holder. The old duplicate group model, the Result/Content nesting and the corresponding conversion methods have been removed.

Definition and reference Codecs follow the same conventions as other modules: `InformationRow.DIRECT_CODEC` / `InformationGroup.DIRECT_CODEC` are used for data pack objects, and `CODEC` for registry Holders. The result Codec encodes the row ID, the groups ID array and label/value/tooltip, and does not copy the definition's title, ordering, importance or dependency sources. Documents must be encoded/decoded with RegistryOps that includes the corresponding definitions; long-term archives store a `PlayerViewSnapshot` and re-collect against current definitions when displaying. Row/Group data pack formats remain unchanged; the old display result format has been removed, so both ends of the network should use matching versions.

Old `saturn:field` expressions must be migrated to `saturn:getter`, for example replacing `"field":"saturn:health"` with `"getter":{"type":"saturn:health"}`; path can stay. The old player_view_field code registry and Field API have been removed. Fixed options use enum Codecs (getter value, arithmetic/comparison/logic operation, missing, display value type, etc.), and an illegal enum value decodes as a DataResult error.

Snapshots keep version 1 and the basic fields; new parameterized results are stored in optional queries. Old basic envelopes remain readable, and unknown getter definitions/payloads are preserved losslessly; older versions ignore queries and cannot use or retain parameterized results. See [Snapshots and host integration](../development/player-views.md#codecs-and-host-integration) for details.

## Command inspection output

```mcfunction
/information query @s
/information query @s saturn:basic
/information gui @s
/information gui @s saturn:basic
```

Both branches require administrator permission (`Permissions.COMMANDS_ADMIN`, level 3), target accepts a player name, UUID or single-entity selector, and group supports completion. Omitting group collects everything, and specifying a group filters by group; both modes return the logical row count. `query` uses the PlayerViews → PlayerInformation → InformationText path and only outputs the title and each row's text to the executor; `gui` requires a player executor and sends the same already-evaluated document and group selection only to the executor, opening the default information screen without auto-refresh. An unknown group reports an error, and an empty group shows no information yet. Non-player entities are supported, and player-only data follows the missing policy. The corresponding `/saturn information query/gui ...` is always kept; the top-level alias is controlled by the `commands.information` config, which is enabled by default, and is skipped on name conflicts.

## Verification

```powershell
.\gradlew.bat compileJava verifyPlayerViews runGameTestServer build --console=plain
```

`verifyPlayerViews` verifies the standalone core contracts; `gametest.InformationTests` / `EntityValueGetterTests` / `InformationCommandTests` in the main source set verify the getter/expression/row/Group registries, the 16 JSON files, parameterized and default queries, live and archived parsing, NBT/JSON round-trip, Components/items, missing projections, paths, conditions, overrides, Holder/Tag, expansion deduplication, dependency filtering and the Holder-reference Codec of flat results. Commands run through the real dispatcher and check text output, groups, completion, errors, permissions and non-player queries. GameTests are registered only when testing is enabled in NeoForge and do not use a test-mod; client visual effects still require manual acceptance.

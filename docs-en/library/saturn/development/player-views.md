---
title: "Player Views API"
sidebar_position: 2
---

Saturn generates read-only player views and information rows from **data supplied by the caller**. It does not manage player saves, read files, persist archives, or send player data on its own. Online entities, NBT, statistics/advancement text, and existing snapshots are all supplied by the host; persistence, permissions, and transport are the host's responsibility.

## Basic usage

```java
import com.iafenvoy.saturn.data.information.PlayerViews;
import com.iafenvoy.saturn.data.information.PlayerInformation;
import com.iafenvoy.saturn.data.information.getter.EntityValueGetters;
import net.minecraft.resources.Identifier;

var view = PlayerViews.parse(player);
var health = view.read(EntityValueGetters.HEALTH);
var all = PlayerInformation.collectAll(view);
var basicGroup = PlayerInformation.groups(view).stream()
        .filter(group -> group.unwrapKey().orElseThrow().identifier().equals(Identifier.parse("saturn:basic"))).findFirst().orElseThrow();
var basic = PlayerInformation.collect(view, basicGroup);
```

`all.rows()` is the complete ordered list of rows across groups, while `basic.rows()` contains only the specified group. `all.rows(group)` can also filter an existing document, and `all.groups()` retrieves the groups in the document. A Group's rows reference independent Rows through Holder/Tag, so the same row can be selected by multiple groups; a collect-all or a union of multiple groups produces only one copy of the row. Collect-all includes rows that no group references, and those rows have empty groups. `row.groups()` returns all groups; the single-group accessor `row.group()` has been removed.

Groups use the registry's `Holder<InformationGroup>` directly; the title is read through `group.value().title()`, and the ID is read through `group.unwrapKey().orElseThrow().identifier()`. **Collect-all and per-group collection are both kept**. Passing an explicit empty group set means no rows are collected, not all of them.

For example, to select every currently defined group, ungrouped rows are still only included through the collect-all entry point:

```java
var selected = PlayerInformation.collect(view, InformationContext.DEFAULT,
        Set.copyOf(PlayerInformation.groups(view)));
```

The package structure is as follows, and the service entry points live directly in `data.information`:

| Package | Main contents |
| --- | --- |
| `com.iafenvoy.saturn.api.playerview` | `PlayerView`, writers, and host query contracts |
| `com.iafenvoy.saturn.data.information` | `PlayerViews`, `PlayerViewSnapshot`, `PlayerInformation`, `InformationText`, plus the `InformationRow` / `InformationGroup` definitions |
| `com.iafenvoy.saturn.data.information.getter` | `EntityValueGetter`, the built-in constants `EntityValueGetters`, and parameter identity `EntityValueKey` |
| `com.iafenvoy.saturn.data.information.getter.builtin` | 26 built-in getter types, each implementing live capture, optional save reading, and snapshot projection |
| `com.iafenvoy.saturn.registry.content` | Built-in entry registration such as `SaturnEntityValueGetters` and `SaturnInformationExpressions` |
| `com.iafenvoy.saturn.data.information.expression` | Expression interfaces, evaluation context, and intermediate values |
| `com.iafenvoy.saturn.data.information.expression.builtin` | Built-in expressions, with one separate implementation class per Type |
| `com.iafenvoy.saturn.data.information.model` | Data models such as `InformationEntry`, `InformationDocument`, snapshot metadata, and query results |
| `com.iafenvoy.saturn.screen.information` | Client default information screen and the `PlayerInformationScreens` entry point |

## Data pack definitions and display rows

The 16 built-in rows have been migrated to `saturn:information_row`, and group definitions live in `saturn:information_group`. `InformationRow` and `InformationGroup` each have exactly one registry definition type. `InformationEntry` is a flattened evaluation result that stores the Row Holder, the set of Group Holders, and the evaluated label/value/tooltip; the title, order, importance, tone, and dependency sources are still read from the original definitions. Membership is declared by the Group's `rows`, whose elements are `Either<Holder<InformationRow>, TagKey<InformationRow>>`; Row definitions contain no groups. Expression Types are registered in `saturn:information_expression_type`, and read data through parameterized getters and combine display values. For complete JSON parameters, examples, Type registration, and compatibility migration, see [Data-driven information rows](../guides/information.md).

Query results are used directly, with no need to fetch content first:

```java
for (var entry : all.rows()) {
    var label = entry.label();
    var value = entry.value();
    var tooltip = entry.tooltip();
    var definition = entry.row().value();
    var lines = InformationText.lines(entry);
}
```

`InformationDocument` only provides an ordered list plus filtering by group/importance/source. `InformationRow.CODEC` and `InformationGroup.CODEC` encode and decode registry Holders; their respective `DIRECT_CODEC`s encode and decode data pack definition objects, consistent with modules such as Resource/Ability. `InformationEntry.CODEC` writes the row ID, the groups ID array, and the flattened label/value/tooltip; encoding and decoding require RegistryOps that contains the corresponding definitions. Display documents depend on the current registry, so long-term archives should store player snapshots and re-evaluate when display is needed.

Snapshots parsed from a Player or decoded through RegistryOps retain their registry context and can use the original collect entry points directly. Hand-built views without context should pass `new InformationContext("zh_cn", registries)` explicitly; otherwise row and group queries return empty results. Group and row definitions are not cached in global world state.

The old `PlayerInformation.register*`, `PlayerInformationRegistry`, `PlayerInformationRowProvider`, the no-argument code group enum `groups()`, and the single-group result accessor `group()` have been removed. `PlayerInformation` only queries the current registry and produces documents; all Rows/Groups are defined through data pack registries. Java extensions only need to register a getter parameter MapCodec or an expression type, and custom value reading and computation are then referenced from JSON.

For example, define `data/example/saturn/information_row/level.json`:

```json
{
  "importance": 100,
  "label": { "translate": "info.example.level" },
  "value": {
    "type": "saturn:getter",
    "getter": { "type": "saturn:experience" },
    "path": ["level"]
  }
}
```

Then reference it from `data/example/saturn/information_group/cultivation.json`:

```json
{
  "title": { "translate": "info.example.cultivation" },
  "order": 100,
  "rows": ["example:level"]
}
```

The example translation keys are supplied by the extension. A row's `order` and `importance` are held by the Row definition, while the Group declares membership. Larger `importance` means more important, negative values are allowed, the default is `0`, and it is managed separately from layout order.

For example, to keep rows with importance of at least 50 in a compact information card, while the full page still uses the original document:

```java
var full = PlayerInformation.collectAll(view);
var compact = full.withMinimumImportance(50);
int importance = full.rows().getFirst().importance();
```

`withMinimumImportance` includes rows equal to the threshold, preserves the existing display order and source fields, and does not modify the original document; it can also be used after collecting by group. `entry.importance()` reads the Row definition directly, and the default is `0`. Extensions choose their own importance levels; there is no enforced level table.

Built-in rows use the following importance levels, and all row IDs belong to the `saturn` namespace:

| importance | Information row | Purpose |
| --- | --- | --- |
| 100 | `name`, `health` | Minimal identity and health overview |
| 80 | `experience` | Experience level |
| 70 | `abilities` | Ability overview |
| 60 | `dimension`, `effects`, `equipment` | General status and equipment overview |
| 50 | `food` | Food level |
| 40 | `game_mode`, `absorption`, `inventory` | Game mode, extended status, and inventory details |
| 30 | `resources` | Resource details |
| 20 | `air`, `attributes`, `ender_chest`, `carried_item` | Full details |

For example, a threshold of `80` shows name, health, and experience level; `60` additionally includes abilities, dimension, effects, and equipment; `50` additionally includes food; and `20` includes all built-in rows. Lowering the threshold adds content; extension rows that do not set importance explicitly remain at `0`, so use a threshold of `0` or the collect-all entry point to include them. Importance does not change a row's existing group or display order.

- Getter / expression types are registered into the intrinsic code registry during mod initialization, while Rows / Groups are loaded from the current world's data pack registry. Definitions with the same ID override according to native data pack priority.
- `enabled: false` in a Row definition disables that row; `visible` and `missing` decide conditional display and the missing-data policy; there is no Java provider fallback.
- Groups are sorted by order, then ID; rows within a group are sorted by order, then ID; for rows in multiple groups in a collect-all, the group that sorts first determines the cross-group order. Queries, results, and the screen share the current registry's Group Holders and no longer convert to another set of group metadata.
- Lists, tables, and item collections are the content of one logical row and may be expanded into multiple lines by the screen. Dynamic data does not modify the global registry.
- A runtime exception thrown while evaluating a single row is logged and that row is skipped; other rows in the same group continue to be generated.

The built-in group IDs are `saturn:basic`, `saturn:status`, and `saturn:equipment`; get the current registry's Holders with `PlayerInformation.groups(view[, context])`. Third parties can add data rows to the corresponding row tags, or define their own groups. When selecting groups, use Holders from the same registry context.

## Getters and missing values

`PlayerView.read(getter)` returns `ViewValue<T>`:

- A value from `value()` means the value is known; zero and empty collections are both valid values.
- `missingReason()` states that the value is unrecorded, unrequested, unsupported, hidden, invalid, or not applicable.
- `origin()` of a known value distinguishes captured values, saved values, and values rebuilt from current rules.

Snapshots are encoded through the getter's `valueCodec()` on `put` and decoded independently on `read`, so they never hold live players, mutable attachments, or caller collections. Even if a returned value is mutable, it does not affect the snapshot. The NBT and components of `PlayerViewItem`, as well as the display model's components, are likewise returned as copies.

The standard fields cover identity, health/absorption/air, food, experience, position, game mode, selected hotbar slot, equipment, inventory, ender chest, carried item, effects, attributes, Saturn resources and abilities, individual scores, and team.

`INVENTORY` covers only normal inventory slots; equipment is separate in `EQUIPMENT`, and empty slots are omitted from the collection. Equipment in saved data follows MC 26 `equipment`, and the main hand is supplemented from `Inventory` and `SelectedItemSlot`. Effect durations and resource bounds are the data as of input time and are not resolved further as time passes after viewing.

Saturn does not create attachments or initialize resources for read screens. When saved attributes can only confirm the base value, the effective value stays missing; historical max health is not guessed from current rules. Saved items keep their original data and ID, so an ID can still be displayed even if the original item's mod has been removed; `PlayerViewItem.stack(registries)` is only called when an item is actually constructed for rendering, and returns empty on failure.

## Parameterized queries

The 22 built-in no-argument getters keep the existing facts such as identity, status, inventory, and attribute lists; 4 additional parameterized types select list members by stable ID without relying on array order:

| Type | Required parameter | Optional parameter | Result |
| --- | --- | --- | --- |
| `saturn:attribute` | `attribute`: attribute ID | `value`: `base` / `effective`, default `effective` | double |
| `saturn:resource` | `resource`: resource ID | `value`: `current` / `minimum` / `maximum`, default `current` | double |
| `saturn:effect` | `effect`: effect ID | `value`: `amplifier` / `duration`, default `amplifier` | int |
| `saturn:score` | `objective`: objective name | none | int |

```java
import com.iafenvoy.saturn.data.information.getter.builtin.AttributeGetter;

var query = new AttributeGetter(Identifier.parse("minecraft:max_health"), AttributeGetter.Value.BASE);
var base = view.read(query);
// Explicitly request that a query be archived; meta is supplied by the host:
var captured = PlayerViews.parse(player, meta, List.of(query));
```

When the exact query result is missing, the built-in getters above can project from a saved broad list through `fallback(view)`; they never look for a live entity. When an exact result already exists (including an explicit missing, an invalid payload, or an unknown schema), projection is not allowed to override it. A missing member in a known list is `NOT_APPLICABLE`; historical attribute effective values or resource bounds that were not recorded are `NOT_CAPTURED`, and values are not guessed from current rules.

## Registering typed extensions

The registry is `saturn:entity_value_getter`, the entry points are `SaturnRegistries.ENTITY_VALUE_GETTER` / `SaturnResourceKeys.ENTITY_VALUE_GETTER`, and the entry type is `MapCodec<? extends EntityValueGetter<?>>`. Parameters and results are encoded separately, for example a query that reads health scaled by a multiplier:

```java
public record ScaledHealthGetter(double scale) implements EntityValueGetter<Double> {
    public static final MapCodec<ScaledHealthGetter> CODEC = MiscCodecs.FINITE.fieldOf("scale")
            .xmap(ScaledHealthGetter::new, ScaledHealthGetter::scale);

    @Override public MapCodec<ScaledHealthGetter> codec() { return CODEC; }
    @Override public Codec<Double> valueCodec() { return MiscCodecs.FINITE; }

    @Override public ViewValue<Double> capture(Entity entity) {
        if (!(entity instanceof LivingEntity living)) return ViewValue.missing(MissingReason.UNSUPPORTED);
        return ViewValue.known(living.getHealth() * scale, ValueOrigin.CAPTURED);
    }

    @Override public ViewValue<Double> readSaved(SavedPlayerViewContext context) {
        var health = context.player().getFloat("Health");
        if (health.isEmpty()) return ViewValue.missing(MissingReason.NOT_CAPTURED);
        return ViewValue.known(health.orElseThrow() * scale, ValueOrigin.SAVED);
    }
}

public static final DeferredRegister<MapCodec<? extends EntityValueGetter<?>>> GETTERS =
        DeferredRegister.create(SaturnRegistries.ENTITY_VALUE_GETTER, "example");
static {
    GETTERS.register("scaled_health", () -> ScaledHealthGetter.CODEC);
}
// In the mod constructor: GETTERS.register(modEventBus);
```

The corresponding configuration is `{"type":"example:scaled_health","scale":2}`. `codec()` must return the registered parameter Codec, and `type()` looks the ID up from the registry. `valueCodec()` only encodes and decodes the query result, `schemaVersion()` defaults to `1` and must be a positive integer. `capture` defaults to `UNSUPPORTED`, `readSaved` / `fallback` default to `NOT_CAPTURED`; `dependencies()` defaults to an empty list and can declare the broad queries needed for snapshot projection. Callbacks return only their own `ViewValue<T>` and do not receive a cross-query writer.

`PlayerViews.parse` merges three kinds of queries: default queries whose parameter Codec can decode from an empty object, queries the caller explicitly requests, and queries referenced by all enabled information rows in the current world; it also adds dependencies and deduplicates by the full parameter JSON. Required-parameter types do not automatically enumerate every parameter; a row or the caller must request them, and parameters not referenced by any information row should be passed explicitly when queried directly. `EntityValueGetters` provides the built-in constants, `defaults`, `requireRegistered`, and source computation `sources`, and holds no field map.

If a single-query callback throws an exception, returns null, or its result Codec fails to encode, only that query is marked `INVALID`. When saved data returns `NOT_CAPTURED`, no envelope is created, and the host can check with `builder.contains(getter)` and fill in the information; other explicit missing results are saved.

Registration follows the NeoForge lifecycle, and types cannot be added or removed after freezing. Unknown getter types error in the definition Codec; the snapshot's raw queries are still retained. Getters do not participate in Saturn's legacy namespace alias copying. New parsing behavior requires Java registration of a parameter Codec and an implementation; data packs can only choose types and parameters.

Server entities must be parsed on the server main thread, and for client entities the caller is responsible for the thread. Getter callbacks must not award points, create attachments, initialize resources, or advance gameplay; save callbacks only read the supplied data, and fallback only accesses the supplied view.

## Parsing saved data supplied by the caller

```java
var context = new SavedPlayerViewContext(meta, registries, playerNbt,
        Optional.of(statsJson), Optional.of(advancementsJson));
var view = PlayerViews.parse(context);
var supplemented = PlayerViews.parse(context, Optional.of(recordedView));
```

`meta` is supplied by the caller and includes the account, source, record ID, snapshot ID, actual capture time (nullable), and the assembly time. Past lives should use a different record ID; a UUID alone must not distinguish caches.

A supplied recordedView takes priority; save reading only fills exact queries that were not saved at all, and it must reference the same record as the context. A missing query and a corrupt payload mean `NOT_CAPTURED` and `INVALID` respectively; one corrupt query does not block the other queries. Parameterized requests can be passed to `parse(context, Optional.of(recordedView), requested)`.

Vanilla player saves do not contain a complete GameProfile; when names, skin properties, separately saved carried items, or scoreboards are needed, the caller can first put known fields into the builder and then let the parser fill in the gaps. Statistics and advancements can be passed through the context's separate JSON text. Entity parsing does not access vanilla's private statistics/advancement storage, nor does it call methods that save or create advancements; both are marked `UNSUPPORTED` on that path.

The input NBT should already have had any necessary vanilla/mod version migration performed by the caller; built-in readers parse according to MC 26's current structure and do not locate files or call DataFixer themselves. If only a summary is supplied, only the facts that the summary can confirm are displayed.

## Codecs and host integration

`PlayerViewSnapshot.CODEC` provides NBT/JSON encoding and decoding, and callers that need a registry context use `registries.createSerializationContext(ops)`. The Codec performs no disk I/O.

Each envelope independently carries its schema, known/missing state, origin, and payload. The top-level version stays `1`: no-argument `{type}` queries still live in the legacy `fields`, and built-in IDs/schemas/payloads remain compatible; parameterized results live in the optional `queries` array, and each item contains the full `getter` definition and a `data` envelope. Different parameters do not overwrite each other. Unknown field envelopes, parameterized query definitions, and their payloads are all retained, so values round-trip even without the mod that defined them; an unsupported schema or an invalid payload affects only that query. Fixed unknown top-level keys are ignored per normal Codec rules and are not guaranteed to be retained. `getterIds()` enumerates type IDs from both storages.

`snapshot.filter(allowedGetterType)` filters both fields and queries, including unknown extensions; the information document's `filter` filters whole rows by `sourceFields`. This legacy naming now means getter types and dependency IDs, for example attribute declares both `saturn:attribute` and `saturn:attributes`. Filtering is at type granularity, not authorization for a particular attribute parameter; hosts with finer needs should project and restrict on their own. Hosts authorize based on the actual connection and must not trust the client's self-reported identity.

`PlayerViewRequest`, `PlayerViewResult`, and `PlayerViewAccess` are optional host query contracts. Saturn has no global network installer and does not query accounts/archives itself. Request IDs let the host discard stale responses; the caller explicitly lists the fields it needs, and an empty list does not implicitly grant all data.

## Default screen and integration boundaries

Client-side calls only:

```java
minecraft.setScreen(PlayerInformationScreens.create(parent, view));
minecraft.setScreen(PlayerInformationScreens.create(parent, view, group));
```

The default screen displays the generic text rows, lists, item slot text, and tables of the supplied snapshot, with scrolling and tooltips. `InformationText` provides the same text projection, and AUI/cards can also render typed `InformationValue` directly.

The screen's `selectedGroups` uses a Set, and an empty set means all groups and ungrouped rows are shown; `PlayerInformationScreens.create(..., context, groups)` follows the same convention. When the collector `PlayerInformation.collect(..., groups)` is called directly, an empty set still means no rows are collected.

The default screen displays by Group, ungrouped rows go into "Other information", and rows in multiple groups appear in each group that references them; a screen created for a group shows only that group. The screen does not auto-refresh, request data, or offer write operations. The 3D character appearance preview, loading controls, and network refresh will be completed by later client adapters; the current screen does not borrow the present-life entity by historical UUID. Business migration for MXT, System, and Reincarnation is also not part of this Saturn foundation module.

## Chat and UI query commands

```mcfunction
/information query @s
/information query PlayerName saturn:basic
/information query @e[type=minecraft:cow,limit=1] saturn:status
/information gui @s
/information gui PlayerName saturn:basic
```

Both `/information query <target> [<group>]` and `/information gui <target> [<group>]` require the administrator permission `Permissions.COMMANDS_ADMIN` (level 3); regular players and sources that only have gamemaster permission cannot use them. Both modes also support `/saturn information query/gui ...`. The top-level alias is enabled by default and controlled by `commands.information` in `config/saturn-common.toml`; the top-level alias is skipped when it collides with another mod.

`target` is a player name, UUID, or single-entity selector; omitting `group` collects all rows, providing a group filters by ID, and group suggestions complete IDs from the current world's Group registry. Non-player entities only yield the data they support, and the rest is displayed according to the existing missing-data policy. Both modes resolve entities on the spot, share the `PlayerInformation` collection path, and return the number of logical rows. An unknown group produces an explicit error, and an empty group shows "No information". Prompts and built-in rows both use translation keys, and clients display them in their own language.

`query` uses `InformationText` to output titles, text rows, and tables, and replies only to the executor; it is usable from the console. `gui` requires a player executor and sends only the evaluated document and group selection to the executor through `network.payload.InformationGuiS2CPayload` (`saturn:information_gui`), then opens `PlayerInformationScreen`. The payload uses the registry-aware stream encoding of `InformationDocument.CODEC`, preserving Component styles, tooltips, and groups; when querying by group, the screen also shows only that group. This entry point does not send the raw entity snapshot, store archives, or auto-refresh; when the transfer size limit is exceeded, it prompts the user to view by group. Both client and server need to support this payload. Network registration is done uniformly in the `RegisterPayloadHandlersEvent` subscription of `network.NetworkManager`; dedicated servers only register the payload type and Codec, and clients route through `MainThreadPayloadHandler` to `ClientNetworkHandler` to open the screen. Payloads only define data and codecs; they do not register themselves or handle screens.

## Legacy API and data migration

`PlayerViewField` / `PlayerViewFields` and the separate Contributor / SavedReader have been removed. Migrate each field to an `EntityValueGetter`, register a parameter MapCodec, and change the old result Codec to `valueCodec()`; for the no-argument case use `MapCodec.unit(INSTANCE)`. Change `capture(Player)` to `capture(Entity)` and check the required entity type. Old `view.*` imports move to the `data.information.*` entries in the table above; display results are unified as `InformationEntry`.

The old `InfomationGroup`, `InformationRowResult`, and `InformationRowContent` have been deleted. Groups use `Holder<InformationGroup>` instead; calls such as `row.content().value()` become `entry.value()`, and the other display fields are read directly in the same way. Results no longer store id/order/importance/tone/fields separately, and the old result envelope is no longer supported; use matching versions on both sides and the same registry set. Data pack Row/Group JSON and player snapshot formats stay as they are.

Change the JSON `{"type":"saturn:field","field":"saturn:health"}` to `{"type":"saturn:getter","getter":{"type":"saturn:health"}}`; the optional path is retained. Old basic snapshots can still be read as long as the ID/schema/result Codec match; parameterized results are a new extension, and older Codec versions ignore queries and cannot use or retain them. Both network sides and host-published dependencies should be upgraded to matching API/data formats.

## Verification

```powershell
.\gradlew.bat compileJava verifyPlayerViews runGameTestServer build --console=plain
```

`verifyPlayerViews` lives in the separate `src/verification/java` source set and does not enter the release JAR; it does not start the game, construct a Player, create a world, or read or write player saves. Standalone fixtures populate the real getter registry and cover group/collect-all, order, fault isolation, snapshot copying, NBT/JSON round-trip, unknown extensions, schema, isolation of exceptions/null/invalid payloads, host supplementation, explicit missing precedence, parameter identity, snapshot projection, evaluation caching, and importance/source filtering.

The standalone checks use data and numeric display models that need no game bootstrap. The main source set's `gametest.InformationTests` / `EntityValueGetterTests` / `InformationCommandTests` further verify native registration and freezing, parameterized extensions, live capture, save reading, not creating attachments, snapshots detaching from mutable items, and data pack, expression, Holder/Tag, and document Codecs. The command tests actually execute collect-all, group, completion, error, permission, alias, and non-player queries in chat and GUI, checking every line of text, the recipient, and the GUI payload round-trip. Tests and dedicated getters are only registered when GameTest is enabled; no test-mod is used, and client visual effects still require manual acceptance.

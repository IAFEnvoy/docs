---
title: "Datapack Overview"
description: "How MiXianTu loads data pack JSON: file locations, IDs, pack priority, the mxt:disabled tag, holder references, validation, reloading and client sync."
sidebar_position: 1
---

# Datapack Overview

This page is the general overview of MiXianTu data pack definitions. Every entry of a datapack registry is one JSON file. The Java-side built-in registries only provide `type` dispatch and codecs: a data pack can fill in fields that already exist, but it cannot create new Java behaviour from JSON.

Whether a registry already forms a complete runtime loop depends on the implementation state of its module. This page records the loading contract of the current code, and consumers that are not implemented are not described as implemented.

## File Location

Datapack registry files all go in:

```text
data/<namespace>/mxt/<registry>/<path>.json
```

For example:

```text
data/example/mxt/ability/firebolt.json
```

The definition ID of that file is `example:firebolt`. The filename may contain directories, and those directories become part of the ID path.

Data pack tags use the vanilla tag path:

```text
data/<namespace>/tags/mxt/<registry>/<tag path>.json
```

## IDs and Translation Keys

The display name of a data-driven definition is generated automatically from its identifier: `Identifier.toLanguageKey` builds `<category>.<namespace>.<path>` for the registry category, with `/` in the path turned into `.`.

For example, `example:qi` produces `resource.example.qi`.

JSON no longer contains a `translation_key` field. Provide the matching translation in `assets/<namespace>/lang/en_us.json` (and `zh_cn.json` if you ship it).

```json
{
  "resource.example.qi": "Qi"
}
```

## Loading and Overriding

- The datapack registries are loaded by the native NeoForge data pack registry system. They are validated after a server reload, and a read-only snapshot is provided to the client through the vanilla synchronisation mechanism.
- File conflicts follow Minecraft data pack priority: a higher priority data pack overrides the same path from a lower priority data pack.
- When a vanilla tag uses `replace: false`, values are appended in data pack merge order. Apart from quality ordering tags, gameplay does not depend on tag value order.
- Data packs are read-only. There is no generic `schema_version`, `enabled` or `tags` field in a definition.
- Data pack objects are treated as immutable after loading; do not modify the collections returned by a codec at runtime.
- When a **required** single holder reference does not exist, the whole data pack reload fails. Optional holders and tolerant list references are handled by their own codecs.

:::warning

The codec is the only loading contract. Defaults, field ranges and examples on this site follow the current source. Writing a field that is not listed has no effect, and writing an unknown `type` makes the reload fail.

:::

## Disabling a Definition

Every datapack registry supports a fixed disabled tag:

```text
data/mxt/tags/mxt/<registry>/disabled.json
```

```json
{
  "replace": false,
  "values": [
    "example:old_definition",
    "othermod:disabled_definition"
  ]
}
```

The tag ID is `mxt:disabled`. Entries listed in it are not actively used by the matching service, but they are still kept in the registry, so other definitions can safely hold a reference to them.

:::note

The mod has not been released yet, so no compatibility with old JSON or old saves is promised.

:::

## Holders, Tags and Matchers

Cross-registry fields are resolved into holders as early as possible during data pack loading, instead of querying the registry again at runtime.

- A single reference to a built-in registry uses the `Holder` codec, for example `"example:resource"`.
- An optional reference uses `optionalFieldOf`.
- Lists and maps use the tolerant holder/collection codecs.
- A single tag reference is written with `#`, for example `#example:fire_abilities`.
- Fields that accept both items and tags accept a mixed array.

```json
{
  "resource": "example:spirit_power",
  "ability_requirements": [
    "example:fireball",
    "#example:basic_fire_abilities"
  ]
}
```

Each element of the array stays a holder or a tag key; duplicate values do not change the semantics automatically. `AutoIgnoreListCodec` lets invalid optional entries of a list be ignored, and the field table of a registry marks whether it uses that codec.

The `items` field of `item_binding`, `weapon_binding`, `pill_binding`, `technique_binding`, `spirit_herb`, `item_aura` and `currency` uses an `ItemMatcher`:

```json
"items": "minecraft:apple"
```

```json
"items": "#minecraft:logs"
```

```json
"items": ["minecraft:apple", "#minecraft:logs", "othermod:token"]
```

A matcher only references items that are already registered; it never creates an item. Besides the item ID and tag shorthands you can write a typed matcher entry: `mxt:item`, `mxt:tag`, `mxt:wildcard` and `mxt:regex`, the last two taking a `pattern`.

When several definitions match at the same time, they are selected by `priority` from low to high. For these data classes the priority is currently fixed at `0`.

:::tip

The only tag system is the vanilla one. Data packs define tags with files under `data/<namespace>/tags/...`, not with a `tags` key inside a definition.

:::

See [Shared Data Types](./types/shared_data_types.md) for the full reference of these shapes.

## Numbers and Formulas

Every field that has to change with level, realm or event context accepts a number provider. Evaluation happens on the server; the client only uses the synchronised result.

```json
{
  "damage": 8.0,
  "speed": "2 + level * 0.1",
  "amount": {"type": "mxt:constant", "value": 10}
}
```

Expressions use exp4j. Variables come from the formula context, and `params` can override or add variables. A `NaN` or infinity during loading makes the data pack fail; at runtime it logs a single-line warning and is treated as `0`.

See [Number Provider Types](./types/number_provider_types.md) for every built-in provider and the common formula variables.

## Actions and Conditions

Behaviours are uniformly called `action` and are split by target into entity, item, block, bi-entity and so on. When several steps are needed, use the meta actions such as `sequence`, `choice` and `if_else`. A `condition` restricts abilities, bound items, cultivation, realms and recipes.

```json
"entity_action": [
  {"type": "mxt:heal", "amount": 2},
  {"type": "mxt:apply_curse", "curse": "example:burning", "stacks": 1}
]
```

Action and condition arrays are a shorthand. All built-in types are grouped and registered by classes such as `MxtEntityActions`, `MxtBiEntityActions`, `MxtBlockActions`, `MxtItemActions` and `MxtEntityConditions`; reloading a data pack never adds entries to those built-in registries.

See [Types Reference](./types/index.md) for the built-in action and condition types, and [Ability](./json/ability.md) for the data shape that uses them.

## Registry Index

| Category | Registries |
| --- | --- |
| Resources and cultivation | `resource`, `element`, `realm_stage`, `spirit_root`, `physique`, `cultivation_technique`, `cultivate_action` |
| Abilities and rules | `ability`, `curse`, `formation`, `tribulation`, `badge` |
| Aura and world | `aura_zone`, `block_aura`, `item_aura`, `realm_instance` |
| Items and quality | `item_binding`, `weapon_binding`, `pill_binding`, `technique_binding`, `item_archetype`, `item_quality` |
| Economy and content | `currency`, `spirit_herb`, `forging_method`, `forging_blueprint`, `creature_profile`, `contract_type`, `sect`, `title` |

[Registry List](./json/index.md) lists every registry with its directory and purpose, and links to the field reference of each one.

Advancements and loot tables use vanilla JSON instead of a registry; the criteria, loot functions and loot conditions the mod provides are listed in [Loot and Advancement Criteria](./loot-and-criteria.md).

## Validating a Datapack

The mod registers a small server-side diagnostic command tree:

| Command | Purpose |
| --- | --- |
| `/mxt registries list` | Lists the datapack registries and their entry counts. |
| `/mxt registries validate` | Reports the current data pack registry validation status: the number of registries, the total number of entries and the native datapack registry loading state. |

Run `/mxt registries validate` after changing a data pack to confirm that the reload produced a usable registry state.

## Reloading and Syncing

- Use `/reload` to reload the data pack. JSON parsing, holder resolution and codec validation all happen on the server.
- The current snapshot is replaced only after `/reload` succeeds; when it fails, the old snapshot keeps being used.
- The datapack registries are sent to the client by the vanilla synchronisation mechanism. The client HUD, fog effects and textures are only responsible for display: they never decide the result of resource deduction, breakthroughs, forging or currency exchange.
- `/mxt aura query` queries the final aura at the current position, and `/mxt aura vein` queries spirit stone vein information.
- The test mod data lives in `src/test-mod/resources/data/mxt_test/mxt`; starting the test server verifies the whole data pack loop.

A first definition is easier to write by copying a complete file: continue with [Datapack Examples](./examples.md), and see [Commands](../player-guide/commands.md) for the full command list.

## Error Reporting

- A missing required holder reference, an unknown `type`, a malformed formula or any other codec error fails the whole reload rather than skipping the broken file.
- A failed reload leaves the previous snapshot in place, so the game keeps running with the last good data.
- An expression that names an unregistered variable is evaluated with `0` for that variable.
- A `NaN` or infinity produced at runtime logs a single-line warning and is handled as `0` instead of aborting the operation.
- The loading contract is defined by the codecs, so the mod does not report fields it does not know: silently ignored unknown fields are not errors.

:::info

For a definition that is not finished yet, prefer adding it to the `mxt:disabled` tag instead of deleting the file, so other definitions that hold its holder reference keep resolving.

:::

## Related Pages

- [Datapack Examples](./examples.md)
- [Loot and Advancement Criteria](./loot-and-criteria.md)
- [Registry List](./json/index.md)
- [Types Reference](./types/index.md)
- [KubeJS](../kubejs/index.md)
- [Java API](../java/index.md)

---
title: "Entity Condition Types"
description: "Every built-in entity condition type registered by the mod, with the JSON fields that each type accepts."
sidebar_position: 7
---

# Entity Condition Types

An **entity condition** checks the state of a single entity and returns `true` or `false`. The entity being tested is supplied by whatever data table declares the condition, so the condition itself only describes what to check.

Entity conditions are a Java (built-in) registry, so their `type` ids are fixed and a data pack cannot add new ones. `type` selects the built-in type and its value is one of the ids tabulated on this page, written with the `mxt` namespace. A data pack never adds or removes entries in this registry. Only Java code or the KubeJS bridge can introduce custom condition types — see the [KubeJS API](../../../kubejs/api-reference.md).

In the table below, a field name followed by `?` is optional; every other listed field must be present. The `Fields` column lists the JSON keys taken directly from the type's codec.

## Common Structure

A condition is a JSON object whose `type` field names the built-in type. All remaining keys are the fields declared by that type.

```json
{
  "type": "mxt:health",
  "comparison": "<",
  "compare_to": 10
}
```

Because conditions are used as values inside other data tables, the same structure usually appears nested under a field such as `condition`:

```json
"condition": {
  "type": "mxt:has_spirit_root",
  "spirit_root": "example:azure_root"
}
```

Anywhere an entity condition is expected, an array of conditions is also accepted. The array is shorthand for `mxt:and` and passes only when every entry passes:

```json
"condition": [
  { "type": "mxt:sneaking" },
  { "type": "mxt:on_block" }
]
```

:::info Comparison Fields
Several types compare a value against a number. When a type lists `comparison` and `compare_to` as separate keys, they sit directly on the condition object, as in the example above. A few types instead name a single `comparison` key whose value is one nested comparison object holding `comparison` and `compare_to`; those types say so in their description. The comparison operators are `==`, `!=`, `<`, `<=`, `>` and `>=`, and the value may be a [number provider](../number_provider_types.md) where formulas are useful.
:::

:::tip Datapack Visual Editor
The [Datapack Visual Editor](https://datapack.mcdev.tech/) shows the field list of every type interactively, which is handy for checking a field name without reading the table here.
:::

## Condition Types

| Type | Fields | Description |
|------|--------|-------------|
| `mxt:always_true` | — | Always passes. |
| `mxt:js` | `id`, `params?` | Calls an entity condition handler that was registered through the KubeJS bridge. |
| `mxt:never` | — | Always fails. |
| `mxt:and` | `conditions` | Passes only when every nested entity condition passes. |
| `mxt:not` | `condition` | Negates a nested entity condition. |
| `mxt:or` | `conditions` | Passes when at least one nested entity condition passes. |
| `mxt:chance` | `chance` | Passes randomly with the given probability between `0` and `1`. |
| `mxt:constant` | `value` | Always returns the given boolean value. |
| `mxt:sneaking` | — | Checks whether the entity is sneaking. |
| `mxt:has_ability` | `ability` | Checks whether the entity currently holds the given [ability](../../json/ability.md). |
| `mxt:has_curse` | `curse` | Checks whether the entity currently holds the given [curse](../../json/curse.md). |
| `mxt:has_spirit_root` | `spirit_root` | Checks whether the entity currently holds the given [spirit root](../../json/spirit_root.md). |
| `mxt:has_physique` | `physique` | Checks whether the entity currently holds the given [physique](../../json/physique.md). |
| `mxt:realm` | `realm`, `comparison?` | Compares the entity's [realm](../../json/realm_stage.md) stage against `realm`, using `exact` (the default), `at_least` or `at_most`. |
| `mxt:has_realm` | `resource` | Passes for entities that have entered a realm chain for the given [resource](../../json/resource.md). |
| `mxt:aura_range` | `aura` | Tests the server-resolved aura concentration at the entity's position against per-resource requirements. `aura` maps a resource ID to an object with a required `max` and an optional `min` (default `0`). |
| `mxt:resource_compare` | `resource`, `min` | Checks that the entity's value for a resource is at least `min`. |
| `mxt:entity_tag` | `tag` | Matches the entity against an entity type tag. |
| `mxt:formation_member` | — | Passes when the entity owns an active [formation](../../json/formation.md) in the current level. |
| `mxt:air` | `comparison`, `compare_to` | Compares the entity's remaining air. |
| `mxt:dimension` | `dimension`, `inverted?` | Checks the entity's dimension, or the opposite when `inverted` is `true`. |
| `mxt:entity_type` | `entity_type` | Checks the entity's type. |
| `mxt:fall_distance` | `comparison`, `compare_to` | Compares the entity's fall distance. |
| `mxt:glowing` | — | Checks whether the entity is glowing. |
| `mxt:health` | `comparison`, `compare_to` | Compares the entity's current health. |
| `mxt:exposed_to_sky` | — | Checks whether the entity's position can see the sky. |
| `mxt:food_level` | `comparison`, `compare_to` | Compares a player's food level. |
| `mxt:mob_effect` | `effect` | Checks whether the entity has the given status effect. |
| `mxt:on_block` | `condition` | Tests a [block condition](block_condition_types.md) against the block the entity stands on. |
| `mxt:time_of_day` | `comparison`, `compare_to` | Compares the overworld clock time, in ticks within a 24000 tick day. |
| `mxt:using_item` | — | Checks whether the entity is currently using an item. |
| `mxt:brightness` | `comparison`, `compare_to` | Compares the brightness at the entity's eyes as a value between `0` and `1`. |
| `mxt:exposed_to_sun` | — | Checks whether the entity is exposed to sunlight. |
| `mxt:experience_level` | `comparison`, `compare_to` | Compares a player's experience level. |
| `mxt:experience_points` | `comparison`, `compare_to` | Compares a player's total experience points. |
| `mxt:relative_health` | `comparison`, `compare_to` | Compares the entity's health divided by its maximum health. |
| `mxt:saturation_level` | `comparison`, `compare_to` | Compares a player's saturation level. |
| `mxt:team` | `team?` | Checks whether the entity is on a scoreboard team, or on the named team when `team` is present. |
| `mxt:attribute` | `attribute`, `comparison`, `compare_to` | Compares one of the entity's attribute values. |
| `mxt:block_collision` | `offset_x?`, `offset_y?`, `offset_z?` | Checks for a block collision at an offset from the entity. |
| `mxt:can_have_effect` | `effect` | Checks whether the entity can be affected by the given status effect. |
| `mxt:gamemode` | `gamemode` | Checks a player's game mode. |
| `mxt:passenger` | `bientity_condition?`, `comparison`, `compare_to` | Compares the number of the entity's direct passengers that satisfy a [bi-entity condition](bientity_condition_types.md), with `comparison` as a nested comparison object. |
| `mxt:attack_cooldown` | `comparison`, `compare_to` | Compares a player's current attack cooldown progress. |
| `mxt:equipped_item` | `equipment_slot`, `item_condition?` | Checks the item in one equipment slot against an [item condition](item_condition_types.md). |
| `mxt:in_block` | `block_condition` | Checks whether a matching block intersects the entity's hitbox. |
| `mxt:in_block_anywhere` | `block_condition`, `comparison` | Compares the number of matching blocks inside the entity's bounding box, with `comparison` as a nested comparison object. |
| `mxt:scoreboard` | `name?`, `objective`, `comparison`, `compare_to` | Compares a scoreboard score, defaulting the score holder to the entity's scoreboard name. |
| `mxt:riding` | `bientity_condition?` | Checks the entity's vehicle against a [bi-entity condition](bientity_condition_types.md). |
| `mxt:riding_recursive` | `bientity_condition?`, `comparison`, `compare_to` | Compares the number of vehicles in the whole riding chain that satisfy a bi-entity condition, with `comparison` as a nested comparison object. |
| `mxt:passenger_recursive` | `bientity_condition?`, `comparison`, `compare_to` | Compares the number of nested passengers that satisfy a bi-entity condition, with `comparison` as a nested comparison object. |
| `mxt:riding_root` | `bientity_condition?` | Tests a bi-entity condition against the vehicle at the root of the entity's riding chain. |

:::note Type References
`ability`, `curse`, `spirit_root`, `physique`, `realm`, `resource` and `formation` accept the ids of the matching data pack registries, so they can point at content added by any data pack, not only at entries shipped with the mod.
:::

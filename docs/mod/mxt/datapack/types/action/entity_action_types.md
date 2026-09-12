---
title: "Entity Action Types"
description: "Every built-in entity action type registered by the mod, with the JSON fields that each type accepts."
sidebar_position: 3
---

# Entity Action Types

An **entity action** performs an operation on a single entity. The entity that an action runs on is supplied by whatever data table declares the action; the action itself only describes what to do with it.

Entity actions are a Java (built-in) registry, so their `type` ids are fixed and a data pack cannot add new ones. `type` selects the built-in type and its value is one of the ids tabulated on this page, written with the `mxt` namespace. A data pack never adds or removes entries in this registry. Only Java code or the KubeJS bridge can introduce custom action types — see the [KubeJS API](../../../kubejs/api-reference.md).

In the tables below, a field name followed by `?` is optional; every other listed field must be present. The `Fields` column lists the JSON keys taken directly from the type's codec.

## Common Structure

An action is a JSON object whose `type` field names the built-in type. All remaining keys are the fields declared by that type.

```json
{
  "type": "mxt:heal",
  "amount": 4
}
```

Because actions are used as values inside other data tables, the same structure usually appears nested under a field such as `entity_action`:

```json
"entity_action": {
  "type": "mxt:apply_effect",
  "effect": "minecraft:speed",
  "duration_ticks": 200
}
```

Anywhere an entity action is expected, an array of actions is also accepted. The array is shorthand for `mxt:sequence` and runs its entries in order:

```json
"entity_action": [
  { "type": "mxt:extinguish" },
  { "type": "mxt:heal", "amount": 2 }
]
```

:::info Field Types Are Shared
Many fields accept a [number provider](../number_provider_types.md) instead of a fixed number, and several types reference the shared [data types](../shared_data_types.md) of the mod. Where a field takes a nested action or condition, that value uses the id tables of the matching family.
:::

:::tip Datapack Visual Editor
The [Datapack Visual Editor](https://datapack.mcdev.tech/) shows the field list of every type interactively, which is handy for checking a field name without reading the tables here.
:::

## Meta Types

Meta actions control whether, how often and in what order other entity actions run. They are the actions that take other actions as fields.

| Type | Fields | Description |
|------|--------|-------------|
| `mxt:no_op` | — | Does nothing; this is the default action for optional action fields. |
| `mxt:js` | `id`, `params?` | Calls an entity action handler that was registered through the KubeJS bridge. |
| `mxt:sequence` | `actions` | Runs a list of entity actions in order. |
| `mxt:chance` | `action`, `chance`, `fail_action?` | Runs `action` with probability `chance`, otherwise runs `fail_action`. |
| `mxt:if_else` | `condition`, `if_action`, `else_action?` | Runs `if_action` when the entity condition passes, otherwise `else_action`. |
| `mxt:choice` | `actions` | Picks one entry from a weighted list and runs it. |

## Action Types

| Type | Fields | Description |
|------|--------|-------------|
| `mxt:dismount` | — | Makes the entity stop riding its vehicle. |
| `mxt:extinguish` | — | Clears the fire on the entity. |
| `mxt:heal` | `amount` | Heals the entity. |
| `mxt:damage` | `amount` | Applies generic damage to the entity. |
| `mxt:add_resource` | `resource`, `amount` | Adds a signed amount to a server-owned entity [resource](../../json/resource.md). |
| `mxt:grant_ability` | `ability`, `source` | Grants an [ability](../../json/ability.md) using an explicit persistent source identity. |
| `mxt:grant_spirit_root` | `spirit_root` | Grants one [spirit root](../../json/spirit_root.md) to the entity. |
| `mxt:grant_physique` | `physique` | Grants one [physique](../../json/physique.md) after its holder condition, stacking and exclusivity checks pass. |
| `mxt:remove_ability` | `ability`, `source` | Removes only the ability grant that belongs to `source`, preserving grants from other sources. |
| `mxt:remove_spirit_root` | `spirit_root` | Removes a held spirit root together with its granted abilities. |
| `mxt:remove_physique` | `physique` | Removes a held physique together with its granted abilities and attribute sources. |
| `mxt:apply_curse` | `curse`, `stacks?`, `duration_ticks?` | Applies a data pack [curse](../../json/curse.md) through the authoritative curse transaction. |
| `mxt:apply_curses` | `curses` | Applies several independently configured curses through the standard transaction. |
| `mxt:remove_curse` | `curse` | Removes one curse through the same event-aware transaction used by expiry. |
| `mxt:remove_curses_by_tag` | `tags` | Removes every held curse that shares one of the given tags. |
| `mxt:apply_effect` | `effect`, `duration_ticks`, `amplifier?` | Applies a vanilla status effect to a living entity. |
| `mxt:teleport` | `x`, `y`, `z` | Moves the entity within its current level. |
| `mxt:knockback` | `x`, `y`, `z` | Adds a bounded velocity vector; collision and fall handling stay vanilla-owned. |
| `mxt:modify_component` | `ability`, `component`, `value` | Updates a declared ability component state without allowing arbitrary component writes. |
| `mxt:spawn_entity` | `entity_type`, `x`, `y`, `z` | Spawns a registered entity at an offset from the acting entity's position. |
| `mxt:spawn_projectile` | `entity_type`, `velocity_x`, `velocity_y`, `velocity_z` | Creates a projectile entity, assigns the acting entity as owner and gives it a formula-driven velocity. |
| `mxt:add_experience` | `points?`, `levels?` | Adds experience points or levels to a player. |
| `mxt:add_velocity` | `x?`, `y?`, `z?`, `space?`, `set?` | Adds velocity to the entity, or sets it when `set` is `true`. |
| `mxt:exhaust` | `amount` | Adds exhaustion to a player. |
| `mxt:feed` | `food`, `saturation` | Restores food points and saturation. |
| `mxt:gain_air` | `value` | Restores air to the entity. |
| `mxt:give_item` | `stack`, `item_action?`, `preferred_slot?` | Gives an item stack to a player, running the optional item action on a copy first and preferring the requested slot when it is empty. |
| `mxt:play_sound` | `sound`, `category?`, `volume?`, `pitch?` | Plays a sound event. |
| `mxt:remove_effect` | `effect` | Removes one status effect. |
| `mxt:set_fall_distance` | `distance` | Sets the entity's fall distance. |
| `mxt:set_no_gravity` | `no_gravity?` | Sets whether the entity is affected by gravity. |
| `mxt:set_on_fire` | `ticks` | Sets the entity on fire for the given number of ticks. |
| `mxt:swing_hand` | `hand` | Makes the entity swing a hand. |
| `mxt:emit_game_event` | `event` | Emits a vanilla game event at the entity's location. |
| `mxt:passenger_action` | `action?`, `bientity_action?`, `bientity_condition?`, `recursive?` | Executes nested actions for matching direct or recursive passengers. |
| `mxt:block_action` | `action` | Runs a [block action](block_action_types.md) at the acting entity's block position. |
| `mxt:self_bientity_action` | `action` | Applies a [bi-entity action](bientity_action_types.md) with the actor and target both set to the current entity. |
| `mxt:equipped_item_action` | `slot`, `action` | Runs an [item action](item_action_types.md) against one equipped stack. |
| `mxt:riding_action` | `action?`, `bientity_action?`, `bientity_condition?`, `recursive?` | Executes nested actions for a matching vehicle, optionally through the full riding chain. |
| `mxt:explode` | `power`, `interaction?`, `indestructible?`, `create_fire?` | Creates an explosion at the entity's location. |
| `mxt:spawn_particles` | `particle`, `bientity_condition?`, `count`, `speed?`, `force?`, `spread?`, `offset_x?`, `offset_y?`, `offset_z?` | Spawns particles around the entity, optionally only for viewers that match a bi-entity condition. |
| `mxt:spawn_effect_cloud` | `radius?`, `radius_on_use?`, `wait_time?`, `effects?` | Creates a vanilla area effect cloud at the acting entity's position. |

:::note Nested Values
`mxt:if_else` takes an [entity condition](../condition/entity_condition_types.md); `mxt:passenger_action` and `mxt:riding_action` take both an entity action and a [bi-entity condition](../condition/bientity_condition_types.md); `mxt:explode` filters protected blocks with a [block condition](../condition/block_condition_types.md).
:::

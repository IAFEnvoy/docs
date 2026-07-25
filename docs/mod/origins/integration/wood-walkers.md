# Wood Walkers

:::caution Unstable
This integration is newly implemented and currently unstable.
:::

Enabled when [Wood Walkers](https://www.curseforge.com/minecraft/mc-mods/woodwalkers)
is installed.

## `origins_integration:switch_shape`

[Entity Action Type](../types/action/entity_action_types)

Switches a player to the supplied living-entity shape.
Omitting `shape` clears the active shape.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `shape` | Entity Type Identifier | optional | Living entity type used as the next shape |

## `origins_integration:shape_action`

[Entity Action Type](../types/action/entity_action_types)

Runs another entity action on the player's active shape. For
non-player entities, it runs on the entity itself.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | Entity Action | **required** | Action to run on the shape |

## `origins_integration:use_shape_ability`

[Entity Action Type](../types/action/entity_action_types)

Activates the player's current shape ability.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `force` | Boolean | `false` | Ignore Wood Walkers' normal ability-use check |
| `apply_cooldown` | Boolean | `true` | Apply the ability cooldown after use |

## `origins_integration:change_shape_ability_cooldown`

[Entity Action Type](../types/action/entity_action_types)

Sets a player's remaining shape-ability cooldown.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `cooldown` | Integer | **required** | Cooldown in ticks; negative values become `0` |

## `origins_integration:can_use_shape_ability`

[Entity Condition Type](../types/condition/entity_condition_types)

Checks whether a player may currently use their shape ability.

## `origins_integration:has_shape_ability`

[Entity Condition Type](../types/condition/entity_condition_types)

Checks whether the active shape has an ability.

## `origins_integration:shape_ability_cooldown`

[Entity Condition Type](../types/condition/entity_condition_types)

Compares a player's remaining shape-ability cooldown.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | Comparison | **required** | Comparison to apply to the cooldown |

## `origins_integration:shape_condition`

[Entity Condition Type](../types/condition/entity_condition_types)

Tests a bi-entity condition against the player as actor
and their current shape as target.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | Bi-entity Condition | **required** | Condition to test against the player and shape |

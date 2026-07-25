# The Twilight Forest

:::caution Unstable
This integration is newly implemented and currently unstable.
:::

Enabled when The Twilight Forest is installed.

## `origins_integration:modify_fortification_shields`

[Entity Action Type](../types/action/entity_action_types)

Changes Twilight Forest fortification shields.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | Integer | **required** | Shield count to add or set |
| `permanent` | Boolean | `false` | Use permanent rather than timed shields |
| `operation` | `add` or `set` | `add` | Add to existing shields or replace the shield count |

## `origins_integration:spawn_ice_queen_shield`

[Entity Action Type](../types/action/entity_action_types)

Creates an invisible, non-hostile Snow Queen controller at
the player. Its Ice Queen shield parts follow the player and the controller is
removed when the player logs out or when `duration` ends.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | Integer | `0` | Lifetime in ticks; `0` keeps it until logout or replacement |

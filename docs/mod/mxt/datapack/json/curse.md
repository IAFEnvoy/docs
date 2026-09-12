---
title: "Curse (curse)"
description: "Defines a referenceable curse that can be applied, stacked, ticked and removed."
---

# Curse (curse)

A `curse` defines a referenceable curse: how long it lasts, how it stacks, and which behaviour runs when it is applied, ticks and is removed.

## File Location

Curse files go in `data/<namespace>/mxt/curse/` within your datapack.

The filename corresponds to its ID. For example, `data/example/mxt/curse/burning.json` has the ID `example:burning`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | `CurseType` | **required** | `mxt:timed`, `mxt:permanent`, `mxt:triggered` or `mxt:empty`. |
| `duration_ticks` | `NumberProvider` | `0` | Duration of a timed curse; the unit is ticks. |
| `tick_interval` | `NumberProvider` | `20` | Interval of the periodic behaviour. |
| `max_stacks` | Integer | `1` | Maximum number of stacks, range `1..256`. |
| `stacking_mode` | Enum | `ignore` | `ignore`, `refresh_duration`, `add_stacks_refresh_duration`, `add_stacks_keep_duration` or `replace`. |
| `application_condition` | `EntityCondition` | `mxt:always_true` | Whether the curse may be applied. |
| `on_apply` | `EntityAction` | `mxt:no_op` | Behaviour on the first application. |
| `on_tick` | `EntityAction` | `mxt:no_op` | Periodic behaviour. |
| `on_remove` | `EntityAction` | `mxt:no_op` | Behaviour on removal. |
| `cleanse_tags` | `Identifier[]` | `[]` | Tags that may be cleansed. |
| `allow_force_remove` | Boolean | `false` | Whether force removal is allowed. |

## Example

```json
{
  "type": "mxt:timed",
  "duration_ticks": 600,
  "tick_interval": 20,
  "max_stacks": 3,
  "stacking_mode": "add_stacks_refresh_duration",
  "application_condition": {"type": "mxt:always_true"},
  "on_apply": {"type": "mxt:no_op"},
  "on_tick": {"type": "mxt:damage", "amount": 1},
  "on_remove": {"type": "mxt:no_op"},
  "cleanse_tags": ["example:burning"],
  "allow_force_remove": false
}
```

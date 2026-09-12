---
title: "Tribulation (tribulation)"
description: "Define a tribulation that is triggered by a condition, advances through phases and runs success or failure behaviour."
---

# Tribulation (tribulation)

A Tribulation defines a heavenly trial: the condition that triggers it, the phases it advances through, the difficulty multiplier, and the behaviour that runs on success or on failure.

## File Location

Tribulation JSON files go in `data/<namespace>/mxt/tribulation/` within your data pack.

The filename corresponds to its ID. For example, `data/example/mxt/tribulation/three_thunders.json` has the ID `example:three_thunders`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `trigger_condition` | Entity Condition | `mxt:always_true` | The trigger condition. |
| `phases` | `List<Phase>` | **required** | At least one tribulation phase. |
| `difficulty_scale` | `NumberProvider` | `1` | The difficulty multiplier. |
| `success_action` | Entity Action | `mxt:no_op` | The success behaviour. |
| `fail_action` | Entity Action | `mxt:no_op` | The failure behaviour. |

### `Phase`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `duration` | `NumberProvider` | **required** | The duration of the phase. |
| `start_action` | Entity Action | `mxt:no_op` | The behaviour executed when the phase starts. |
| `end_action` | Entity Action | `mxt:no_op` | The behaviour executed when the phase ends. |

All lifecycle extensions use the matching Action field uniformly; there is no domain behaviour registry.

## Example

```json
{
  "phases": [
    {
      "duration": 100,
      "start_action": { "type": "mxt:apply_effect", "effect": "minecraft:resistance", "duration_ticks": 100 },
      "end_action": { "type": "mxt:add_resource", "resource": "example:spirit_power", "amount": 2 }
    },
    {
      "duration": 100,
      "start_action": { "type": "mxt:apply_effect", "effect": "minecraft:glowing", "duration_ticks": 100 },
      "end_action": { "type": "mxt:add_resource", "resource": "example:spirit_power", "amount": 2 }
    },
    {
      "duration": 100,
      "start_action": { "type": "mxt:apply_effect", "effect": "minecraft:strength", "duration_ticks": 100 },
      "end_action": { "type": "mxt:add_resource", "resource": "example:spirit_power", "amount": 2 }
    }
  ],
  "difficulty_scale": "1 + level * 0.05",
  "success_action": { "type": "mxt:add_resource", "resource": "example:true_essence", "amount": 10 },
  "fail_action": { "type": "mxt:apply_effect", "effect": "minecraft:weakness", "duration_ticks": 200 }
}
```

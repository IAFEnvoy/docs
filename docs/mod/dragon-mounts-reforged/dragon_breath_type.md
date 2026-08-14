---
title: Dragon Breath Type JSON
sidebar_position: 3
---

# Dragon Breath Type JSON

A dragon breath type defines the breath's color gradient, base damage, fire duration, particle density, and additional status effects.

## File Location

Place files in `data/<namespace>/dragon_breath_type/`. For example:

```text
data/example/dragon_breath_type/frost.json
```

This file has the registry ID `example:frost`, which can be referenced from the root `breath_type` field of a purebred dragon.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `colors` | Hex color string array | `[]` | Breath gradient colors without `#`. |
| `damage` | Float | `2.0` | Base damage for each hit. |
| `fire_time` | Integer | `0` | Time in ticks for which a target is set on fire. `0` applies no additional fire. |
| `particle_density` | Integer | `3` | Breath particle density. |
| `effects` | Effect array | `[]` | Status effects that may be applied on hit. |

### Effect Object

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `effect` | Status effect ID | **required** | For example, `minecraft:slowness`. |
| `duration` | Integer | **required** | Effect duration in ticks. |
| `amplifier` | Integer | `0` | Effect level, starting at `0`. |
| `chance` | Float | `1.0` | Application probability; normally between `0.0` and `1.0`. |

## Example

```json
{
  "colors": ["b8efff", "4e91d9", "d8f3ff"],
  "damage": 3.5,
  "particle_density": 4,
  "effects": [
    {
      "effect": "minecraft:slowness",
      "duration": 100,
      "amplifier": 1,
      "chance": 0.75
    }
  ]
}
```

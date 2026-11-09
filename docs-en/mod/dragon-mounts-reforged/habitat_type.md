---
title: Habitat Type JSON
sidebar_position: 5
---

# Habitat Type JSON

The `dragon_mounts:habitat_type` registry does not load standalone data-pack files. Habitat objects are placed in a purebred dragon's `habitats` array and dispatched by their required `type` field. Each entry calculates a score at the dragon's current position.

## Basic Format

```json
{
  "type": "dragon_mounts:biome",
  "biome": "#minecraft:is_snowy",
  "points": 4
}
```

## Built-in Types

| `type` | Fields | Defaults | Evaluation |
| --- | --- | --- | --- |
| `picky` | `required_habitats` (habitat array, required) | none | Every nested condition must return a nonzero score; their scores are then added. |
| `biome` | `biome` (biome ID or biome tag, required), `points` (integer) | `points: 3` | Scores when the current position belongs to the entry or tag. |
| `in_fluid` | `fluid` (fluid ID or fluid tag, required), `point_multiplier` (float) | `0.5` | Counts matching fluids in a 3x3x3 area, then multiplies the count. |
| `world_height` | `height` (integer, required), `below` (boolean), `points` (integer) | `false`, `3` | With `below: false`, scores above the height. With `true`, scores below the height when the sky is not visible. |
| `light` | `light` (integer, required), `below` (boolean), `points` (integer) | `false`, `3` | Compares block light at the current position. |
| `nearby_blocks` | `block` (block ID or block tag, required), `point_multiplier` (float) | `0.5` | Counts matching blocks in a 3x3x3 area, then multiplies the count. |
| `dragon_breath` | none | none | Scores `10` when a vanilla dragon-breath area-effect cloud occupies the current position. |
| `time` | `is_day` (boolean), `points` (integer) | `true`, `1` | Scores when the requested day/night state matches. |

The `biome`, `fluid`, and `block` fields accept a single registry ID, such as `"minecraft:water"`, a tag ID prefixed by `#`, such as `"#minecraft:is_ocean"`, or an array that mixes both forms:

```json
"block": [
  "minecraft:ice",
  "#minecraft:logs"
]
```

## Example

```json
{
  "habitats": [
    {
      "type": "dragon_mounts:in_fluid",
      "fluid": ["minecraft:water", "#example:dragon_fluids"],
      "point_multiplier": 1.0
    },
    {
      "type": "dragon_mounts:picky",
      "required_habitats": [
        {
          "type": "dragon_mounts:biome",
          "biome": "#minecraft:is_ocean",
          "points": 5
        },
        {
          "type": "dragon_mounts:time",
          "is_day": false,
          "points": 2
        }
      ]
    }
  ]
}
```

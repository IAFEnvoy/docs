---
title: Your First Data Pack
description: Build a minimal allocation plan with one resource, one option group and one completion rule.
sidebar_position: 0
---

This tutorial creates `example:first_start`: a player starts with 4 points and must buy four training units to reach zero and finish. Each unit costs 1 point. First install [Starting Point Buy and Saturn](../install.md).

## File layout

```text
first-start/
├── pack.mcmeta
└── data/example/
    ├── saturn/resource/points.json
    └── spb/
        ├── plan/first_start.json
        ├── group/training.json
        └── option/train.json
```

A Plan organises resources, presets, groups, completion rules and rewards. A Group controls choice mode and group counts; an Option defines each unit's resource changes and effects. File paths determine registry IDs; none of these three definitions has a handwritten `key`.

## 1. Pack metadata

Minecraft 26.1.2 uses data pack format `101.1`. Put this file at the root of the pack:

```json title="pack.mcmeta"
{
  "pack": {
    "description": "Starting Point Buy tutorial",
    "min_format": [101, 1],
    "max_format": [101, 1]
  }
}
```

## 2. Define the points resource

```json title="data/example/saturn/resource/points.json"
{
  "default_value": 4,
  "min": -100,
  "max": 100,
  "icon": {"id": "minecraft:gold_nugget"}
}
```

`example:points` is a Saturn resource. A negative physical lower bound lets the screen represent overspending; the Plan's rules decide whether completion is allowed. See [Saturn resource definitions](../../../library/saturn/data/resource.md) for all resource fields.

## 3. Define the training option and group

```json title="data/example/spb/option/train.json"
{
  "name": {"text": "Training"},
  "description": {"text": "Costs 1 point per unit, up to 4 units."},
  "icon": {"id": "minecraft:iron_sword"},
  "hard_max": 4,
  "resource_changes": {"example:points": -1}
}
```

```json title="data/example/spb/group/training.json"
{
  "title": {"text": "Training"},
  "mode": "multiple",
  "count_mode": "total",
  "options": ["example:train"]
}
```

All options have non-negative integer quantities; `0` means unselected. `hard_max: 4` permits repeated purchases, and `count_mode: total` counts units instead of distinct kinds.

## 4. Define the plan

```json title="data/example/spb/plan/first_start.json"
{
  "title": {"text": "Choose your start"},
  "resources": [
    {"resource": "example:points", "name": {"text": "Points remaining"}}
  ],
  "presets": [
    {"name": {"text": "Training start"}, "selections": {"example:train": 4}}
  ],
  "groups": ["example:training"],
  "completion_rules": [
    {
      "key": "spend_all",
      "condition": {
        "type": "spb:compare",
        "left": "resource_example_points",
        "operator": "==",
        "right": 0
      },
      "message": {"text": "Spend all your points."}
    }
  ],
  "ui": {"allow_close_before_complete": true}
}
```

`resource_example_points` comes from the full ID `example:points`; no alias field is needed. The completion rule's `key` remains required as a diagnostic identifier. This tutorial allows early closing; removing that UI setting restores mandatory confirmation before closing.

## 5. Test in the game

Put `first-start/` in the world's `datapacks/`, reopen the world and run `/spb open example:first_start`. Select four training units or apply the preset: the balance should be `0` and confirmation should be available. Confirmation writes `0` to the real Saturn resource.

To test again, use the administrator command `/spb unlock <player> example:first_start`; it restores the resource baseline of the current committed session. On a multiplayer server, install data packs on the server.

## Additional directories and references

| Path | Content |
| --- | --- |
| `data/<namespace>/spb/plan/<path>.json` | Plans |
| `data/<namespace>/spb/group/<path>.json` | Option groups |
| `data/<namespace>/spb/option/<path>.json` | Options |
| `data/<namespace>/tags/spb/group/<path>.json` | Group tags |
| `data/<namespace>/tags/spb/option/<path>.json` | Option tags |
| `data/<namespace>/saturn/resource/<path>.json` | Saturn resources |
| `data/<namespace>/saturn/ability/<path>.json` | Saturn abilities |

Plan `groups` and Group `options` accept mixed ID and `#tag` lists, such as `["example:training", "#example:extra_groups"]`. Direct references keep their order; tag members are sorted by ID and references are deduplicated by ID. An Option can belong to only one Group within a Plan, but different Plans can reuse it.

References must exist. Missing resources, abilities, groups, options or referenced tags reject world loading; invalid groups and options are checked even when no Plan uses them. Reopen the world after changes rather than relying on `/reload`.

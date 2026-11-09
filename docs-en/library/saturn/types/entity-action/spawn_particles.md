---
title: "Spawn particles"
sidebar_position: 10
---

`saturn:spawn_particles`

Spawns particles near the entity using offset and spread parameters.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:spawn_particles` |
| `particle` | Enum string | yes | — | Vanilla particle parameter. |
| `bientity_condition` | [Bi-entity condition](../bientity-condition/index.md) | no | `{"type":"saturn:always"}` | Condition that filters the two sides of the context. |
| `count` | Integer | yes | — | Count or count matching pattern. Codec range: `0, 2147483647`. |
| `speed` | Number | no | `0.0` | Particle speed. |
| `force` | Boolean | no | `false` | Whether to force the particles to be sent. |
| `spread` | Array of three numbers | no | `[0.5,0.5,0.5]` | Spread range on the three axes. |
| `offset_x` | Number | no | `0.0` | Offset along the X axis. |
| `offset_y` | Number | no | `0.5` | Offset along the Y axis. |
| `offset_z` | Number | no | `0.0` | Offset along the Z axis. |

## JSON example

```json
{
  "type": "saturn:spawn_particles",
  "particle": {
    "type": "minecraft:cloud"
  },
  "count": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.SpawnParticlesAction`. This page is based on the Codec in the current 26.1.2 source.

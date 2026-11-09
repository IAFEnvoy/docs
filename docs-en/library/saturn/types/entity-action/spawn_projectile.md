---
title: "Spawn projectile"
sidebar_position: 10
---

`saturn:spawn_projectile`

Spawns an entity and gives it the given initial velocity.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:spawn_projectile` |
| `entity_type` | Resource ID | yes | — | Entity type ID. |
| `velocity_x` | [Number provider](../number/index.md) | yes | — | X component of the initial velocity. |
| `velocity_y` | [Number provider](../number/index.md) | yes | — | Y component of the initial velocity. |
| `velocity_z` | [Number provider](../number/index.md) | yes | — | Z component of the initial velocity. |

## JSON example

```json
{
  "type": "saturn:spawn_projectile",
  "entity_type": "minecraft:arrow",
  "velocity_x": 1,
  "velocity_y": 1,
  "velocity_z": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.SpawnProjectileAction`. This page is based on the Codec in the current 26.1.2 source.

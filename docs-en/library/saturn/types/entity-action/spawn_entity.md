---
title: "Spawn entity"
sidebar_position: 10
---

`saturn:spawn_entity`

Spawns an entity at the position provided by the context or at the given coordinates.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:spawn_entity` |
| `entity_type` | Resource ID | yes | — | Entity type ID. |
| `x` | [Number provider](../number/index.md) | yes | — | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | [Number provider](../number/index.md) | yes | — | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | [Number provider](../number/index.md) | yes | — | Z coordinate, offset or vector component, depending on this page's behavior. |

## JSON example

```json
{
  "type": "saturn:spawn_entity",
  "entity_type": "minecraft:arrow",
  "x": 1,
  "y": 1,
  "z": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.SpawnEntityAction`. This page is based on the Codec in the current 26.1.2 source.

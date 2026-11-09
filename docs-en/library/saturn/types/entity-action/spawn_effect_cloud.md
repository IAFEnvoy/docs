---
title: "Spawn effect cloud"
sidebar_position: 10
---

`saturn:spawn_effect_cloud`

Spawns an area effect cloud with status effects near the entity.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:spawn_effect_cloud` |
| `radius` | Number | no | `3.0` | Radius in blocks; in a resource bar it is in pixels. |
| `radius_on_use` | Number | no | `-0.5` | Radius change after each application of the effect cloud. |
| `wait_time` | Integer | no | `10` | Number of ticks to wait before the effect cloud starts applying. |
| `effects` | Array of enum strings | no | `[]` | List of status effects or a vanilla effect predicate. |

## JSON example

```json
{
  "type": "saturn:spawn_effect_cloud"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.SpawnEffectCloudAction`. This page is based on the Codec in the current 26.1.2 source.

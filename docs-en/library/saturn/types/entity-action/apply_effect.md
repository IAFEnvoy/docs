---
title: "Apply effect"
sidebar_position: 10
---

`saturn:apply_effect`

Applies a mob effect with the given duration and amplifier to the entity.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:apply_effect` |
| `effect` | Resource ID | yes | — | Mob effect ID. |
| `duration_ticks` | [Number provider](../number/index.md) | yes | — | Effect duration, in game ticks. |
| `amplifier` | [Number provider](../number/index.md) | no | `0.0` | Effect amplifier index; 0 means level I. |

## JSON example

```json
{
  "type": "saturn:apply_effect",
  "effect": "minecraft:speed",
  "duration_ticks": 200,
  "amplifier": 0
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.ApplyEffectAction`. This page is based on the Codec in the current 26.1.2 source.

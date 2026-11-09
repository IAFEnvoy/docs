---
title: "Remove effect"
sidebar_position: 10
---

`saturn:remove_effect`

Removes the given status effect from the entity.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:remove_effect` |
| `effect` | Resource ID | yes | — | Status effect ID. |

## JSON example

```json
{
  "type": "saturn:remove_effect",
  "effect": "minecraft:speed"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.RemoveEffectAction`. This page is based on the Codec in the current 26.1.2 source.

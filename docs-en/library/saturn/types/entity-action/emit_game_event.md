---
title: "Emit game event"
sidebar_position: 10
---

`saturn:emit_game_event`

Emits a vanilla game event that sculk sensors and similar blocks can receive.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:emit_game_event` |
| `event` | Resource ID | yes | — | Vanilla GameEvent ID. |

## JSON example

```json
{
  "type": "saturn:emit_game_event",
  "event": "minecraft:step"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.EmitGameEventAction`. This page is based on the Codec in the current 26.1.2 source.

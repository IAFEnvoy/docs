---
title: "Set on fire"
sidebar_position: 10
---

`saturn:set_on_fire`

Sets the entity on fire for the given number of ticks.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:set_on_fire` |
| `ticks` | Integer | yes | — | Number of game ticks; 20 ticks is usually one second. |

## JSON example

```json
{
  "type": "saturn:set_on_fire",
  "ticks": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.SetOnFireAction`. This page is based on the Codec in the current 26.1.2 source.

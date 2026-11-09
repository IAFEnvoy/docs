---
title: "Swing hand"
sidebar_position: 10
---

`saturn:swing_hand`

Triggers the swing animation of the given hand.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:swing_hand` |
| `hand` | Enum string | yes | — | Hand to use. Available values: `main_hand`, `off_hand`. |

## JSON example

```json
{
  "type": "saturn:swing_hand",
  "hand": "main_hand"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.SwingHandAction`. This page is based on the Codec in the current 26.1.2 source.

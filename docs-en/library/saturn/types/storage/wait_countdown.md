---
title: "Conditional wait countdown"
sidebar_position: 10
---

`saturn:wait_countdown`

Stores the remaining tick count of a conditional wait node.

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:wait_countdown` |
| `remaining` | Integer | yes | — | Range of the remaining amount, or a runtime remaining value. |

## JSON example

```json
{
  "type": "saturn:wait_countdown",
  "remaining": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.storage.runtime.WaitCountdown`. This page is based on the Codec in the current 26.1.2 source.

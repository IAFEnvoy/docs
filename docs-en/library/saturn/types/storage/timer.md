---
title: "Timer storage"
sidebar_position: 10
---

`saturn:timer`

Stores the duration and the tick at which the timer ends.

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:timer` |
| `duration` | [Number provider](../number/index.md) | yes | — | Duration, usually measured in game ticks. |
| `ends_at` | Number | no | omitted | Game tick at which the timer ends. |

## JSON example

```json
{
  "type": "saturn:timer",
  "duration": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.storage.builtin.TimerDataStorage`. This page is based on the Codec in the current 26.1.2 source.

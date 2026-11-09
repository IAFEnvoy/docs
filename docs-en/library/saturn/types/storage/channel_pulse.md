---
title: "Channel pulse"
sidebar_position: 10
---

`saturn:channel_pulse`

Stores the time of the next channelled execution.

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:channel_pulse` |
| `next_tick` | Number | yes | — | Game tick of the next execution. |

## JSON example

```json
{
  "type": "saturn:channel_pulse",
  "next_tick": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.storage.runtime.ChannelPulse`. This page is based on the Codec in the current 26.1.2 source.

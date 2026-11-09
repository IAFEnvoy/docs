---
title: "Cooldown state"
sidebar_position: 10
---

`saturn:cooldown`

Stores the cooldown start time and duration.

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:cooldown` |
| `started_at` | Integer | no | `0` | Game tick at which the cooldown started. |
| `duration` | Number | no | omitted | Duration, usually measured in game ticks. |

## JSON example

```json
{
  "type": "saturn:cooldown"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.storage.builtin.CooldownDataStorage`. This page is based on the Codec in the current 26.1.2 source.

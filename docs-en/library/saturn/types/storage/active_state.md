---
title: "Active state"
sidebar_position: 10
---

`saturn:active_state`

Stores a runtime activation flag.

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:active_state` |
| `active` | Boolean | yes | — | Runtime activation flag. |

## JSON example

```json
{
  "type": "saturn:active_state",
  "active": true
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.storage.runtime.ActiveState`. This page is based on the Codec in the current 26.1.2 source.

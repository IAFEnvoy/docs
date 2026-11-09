---
title: "Target lock storage"
sidebar_position: 10
---

`saturn:target_lock`

Stores the locked target and the usable distance.

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:target_lock` |
| `range` | [Number provider](../number/index.md) | yes | — | Check range, in blocks. |
| `target` | String | no | omitted | Action target, target ID or target selection; see the type description on this page. |

## JSON example

```json
{
  "type": "saturn:target_lock",
  "range": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.storage.builtin.TargetLockDataStorage`. This page is based on the Codec in the current 26.1.2 source.

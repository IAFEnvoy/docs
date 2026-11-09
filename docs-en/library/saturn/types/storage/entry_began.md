---
title: "Entry started state"
sidebar_position: 10
---

`saturn:entry_began`

Stores whether a timeline node has already begun.

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:entry_began` |

## JSON example

```json
{
  "type": "saturn:entry_began"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.storage.runtime.EntryBegan`. This page is based on the Codec in the current 26.1.2 source.

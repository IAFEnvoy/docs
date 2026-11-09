---
title: "Empty implementation"
sidebar_position: 10
---

`saturn:empty`

Provides an implementation that performs no additional behaviour.

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:empty` |

## JSON example

```json
{
  "type": "saturn:empty"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.storage.builtin.EmptyDataStorage`. This page is based on the Codec in the current 26.1.2 source.

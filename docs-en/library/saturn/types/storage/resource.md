---
title: "Resource state"
sidebar_position: 10
---

`saturn:resource`

Stores a resource reference and the corresponding amount; an object without values only declares the storage type.

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:resource` |
| `resource` | Resource ID | no | omitted | Registered Saturn resource ID. |
| `amount` | Number | no | omitted | Amount or value; a number provider may be a number, a formula string or an object with a type. |

## JSON example

```json
{
  "type": "saturn:resource"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.storage.builtin.ResourceDataStorage`. This page is based on the Codec in the current 26.1.2 source.

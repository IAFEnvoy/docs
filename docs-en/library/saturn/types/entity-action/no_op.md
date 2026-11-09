---
title: "No-op"
sidebar_position: 10
---

`saturn:no_op`

Does nothing; usable as a placeholder action value.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:no_op` |

## JSON example

```json
{
  "type": "saturn:no_op"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.NoOpAction`. This page is based on the Codec in the current 26.1.2 source.

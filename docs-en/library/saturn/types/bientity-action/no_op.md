---
title: "No-op"
sidebar_position: 10
---

`saturn:no_op`

Does nothing; usable as a placeholder action value.

The context contains an actor (the initiator) and a target. The same ID may have different fields in the entity action and bi-entity action registries; the two kinds are not interchangeable.

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

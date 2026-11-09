---
title: "No-op"
sidebar_position: 10
---

`saturn:no_op`

Does nothing; usable as a placeholder action value.

Operates on the item stack and its holder from the context. It is not an item definition file; embed it in a field that requires an ItemAction.

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

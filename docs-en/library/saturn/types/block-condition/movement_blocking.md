---
title: "Movement blocking"
sidebar_position: 10
---

`saturn:movement_blocking`

Checks whether the block blocks movement.

Checks the block or environment at the context position. Embedded in BlockCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:movement_blocking` |

## JSON example

```json
{
  "type": "saturn:movement_blocking"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.block.MovementBlockingCondition`. This page is based on the Codec in the current 26.1.2 source.

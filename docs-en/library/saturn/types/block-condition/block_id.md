---
title: "Block type"
sidebar_position: 10
---

`saturn:block_id`

Checks whether the block at the current position is the given type.

Checks the block or environment at the context position. Embedded in BlockCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_id` |
| `block` | Resource ID | yes | — | Block ID or block argument. |

## JSON example

```json
{
  "type": "saturn:block_id",
  "block": "minecraft:stone"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.block.BlockIdCondition`. This page is based on the Codec in the current 26.1.2 source.

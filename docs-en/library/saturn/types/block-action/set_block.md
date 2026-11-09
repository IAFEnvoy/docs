---
title: "Set block"
sidebar_position: 10
---

`saturn:set_block`

Sets the current position to the given block.

Acts on the world and block position given by the context. It is not a standalone data pack file; embed it in a field that requires a BlockAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:set_block` |
| `block` | Resource ID | yes | — | Block ID or block argument. |

## JSON example

```json
{
  "type": "saturn:set_block",
  "block": "minecraft:stone"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.block.SetBlockAction`. This page is based on the Codec in the current 26.1.2 source.

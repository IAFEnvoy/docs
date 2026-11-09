---
title: "Break block"
sidebar_position: 10
---

`saturn:break_block`

Breaks the block at the context position and optionally controls whether items drop.

Acts on the world and block position given by the context. It is not a standalone data pack file; embed it in a field that requires a BlockAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:break_block` |
| `drop` | Boolean | no | `true` | Whether block drops are generated. |

## JSON example

```json
{
  "type": "saturn:break_block"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.block.BreakBlockAction`. This page is based on the Codec in the current 26.1.2 source.

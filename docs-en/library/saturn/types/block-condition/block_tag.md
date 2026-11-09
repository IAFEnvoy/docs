---
title: "Block tag"
sidebar_position: 10
---

`saturn:block_tag`

Checks whether the block belongs to the given tag.

Checks the block or environment at the context position. Embedded in BlockCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_tag` |
| `tag` | Tag ID (with #) | yes | — | Registry tag, or the NBT data declared on this page. |

## JSON example

```json
{
  "type": "saturn:block_tag",
  "tag": "#minecraft:logs"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.block.BlockTagCondition`. This page is based on the Codec in the current 26.1.2 source.

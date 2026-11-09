---
title: "Offset position"
sidebar_position: 10
---

`saturn:offset`

Moves the block context by the given offset before checking or running the child.

Acts on the world and block position given by the context. It is not a standalone data pack file; embed it in a field that requires a BlockAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:offset` |
| `action` | [Block action](index.md) | yes | — | Child action to run; its kind must match what the current field requires. |
| `x` | Integer | no | `0` | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | Integer | no | `0` | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | Integer | no | `0` | Z coordinate, offset or vector component, depending on this page's behavior. |

## JSON example

```json
{
  "type": "saturn:offset",
  "action": {
    "type": "saturn:no_op"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.block.meta.OffsetAction`. This page is based on the Codec in the current 26.1.2 source.

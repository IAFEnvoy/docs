---
title: "Offset position"
sidebar_position: 10
---

`saturn:offset`

Moves the block context by the given offset before checking or executing the sub-value.

Checks the block or environment at the context position. Embedded in BlockCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:offset` |
| `condition` | [Block condition](index.md) | yes | — | The condition to check. |
| `x` | Integer | no | `0` | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | Integer | no | `0` | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | Integer | no | `0` | Z coordinate, offset or vector component, depending on this page's behavior. |

## JSON example

```json
{
  "type": "saturn:offset",
  "condition": {
    "type": "saturn:always"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.block.meta.OffsetCondition`. This page is based on the Codec in the current 26.1.2 source.

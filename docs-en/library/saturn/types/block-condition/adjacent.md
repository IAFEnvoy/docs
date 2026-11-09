---
title: "Adjacent blocks"
sidebar_position: 10
---

`saturn:adjacent`

Counts how many adjacent positions satisfy a block condition.

Checks the block or environment at the context position. Embedded in BlockCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:adjacent` |
| `adjacent_condition` | [Block condition](index.md) | yes | — | Filter condition applied to adjacent blocks. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

## JSON example

```json
{
  "type": "saturn:adjacent",
  "adjacent_condition": {
    "type": "saturn:always"
  },
  "comparison": ">=",
  "compare_to": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.block.AdjacentCondition`. This page is based on the Codec in the current 26.1.2 source.

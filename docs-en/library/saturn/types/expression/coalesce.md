---
title: "Missing fallback"
sidebar_position: 10
---

`saturn:coalesce`

Takes the first available expression result in order.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:coalesce` |
| `values` | Array of [expressions](index.md) | yes | — | List of sub-values or sub-expressions. |

## JSON example

```json
{
  "type": "saturn:coalesce",
  "values": [
    {
      "type": "saturn:getter",
      "getter": {
        "type": "saturn:health"
      }
    },
    0
  ]
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.CoalesceExpression`. This page is based on the Codec in the current 26.1.2 source.

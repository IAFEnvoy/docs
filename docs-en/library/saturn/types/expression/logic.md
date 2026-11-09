---
title: "Logic operation"
sidebar_position: 10
---

`saturn:logic`

Performs logical operations on boolean expressions.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:logic` |
| `operation` | Enum string | yes | — | Operation name; see the enum notes below for available values. Available values: `and`, `or`, `not`. |
| `values` | Array of [expressions](index.md) | yes | — | List of sub-values or sub-expressions. |

## JSON example

```json
{
  "type": "saturn:logic",
  "operation": "and",
  "values": [
    true,
    false
  ]
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.LogicExpression`. This page is based on the Codec in the current 26.1.2 source.

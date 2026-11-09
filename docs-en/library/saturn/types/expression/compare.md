---
title: "Comparison expression"
sidebar_position: 10
---

`saturn:compare`

Compares two expressions and returns a boolean result.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:compare` |
| `operation` | Enum string | yes | — | Operation name; see the enum notes below for available values. Available values: `eq`, `ne`, `lt`, `le`, `gt`, `ge`. |
| `left` | [Expression](index.md) | yes | — | Left operand expression. |
| `right` | [Expression](index.md) | yes | — | Right operand expression. |

## JSON example

```json
{
  "type": "saturn:compare",
  "operation": "ge",
  "left": 10,
  "right": 5
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.CompareExpression`. This page is based on the Codec in the current 26.1.2 source.

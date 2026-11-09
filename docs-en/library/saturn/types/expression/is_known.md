---
title: "Is known"
sidebar_position: 10
---

`saturn:is_known`

Checks whether an expression has a known value.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:is_known` |
| `value` | [Expression](index.md) | yes | — | Value or expression used by this type. |

## JSON example

```json
{
  "type": "saturn:is_known",
  "value": {
    "type": "saturn:getter",
    "getter": {
      "type": "saturn:health"
    }
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.IsKnownExpression`. This page is based on the Codec in the current 26.1.2 source.

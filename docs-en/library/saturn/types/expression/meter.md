---
title: "Meter display"
sidebar_position: 10
---

`saturn:meter`

Generates a meter display from the current value, minimum and maximum.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:meter` |
| `value` | [Expression](index.md) | yes | — | Value or expression used by this type. |
| `min` | [Expression](index.md) | no | `0` | Lower bound. |
| `max` | [Expression](index.md) | yes | — | Upper bound. |

## JSON example

```json
{
  "type": "saturn:meter",
  "value": 10,
  "max": 20,
  "min": 0
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.MeterExpression`. This page is based on the Codec in the current 26.1.2 source.

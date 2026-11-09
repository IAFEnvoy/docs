---
title: "Expression branch"
sidebar_position: 10
---

`saturn:if`

Selects the then or else expression according to the condition.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:if` |
| `condition` | [Expression](index.md) | yes | — | Condition to check. |
| `then` | [Expression](index.md) | yes | — | Expression used when the condition holds. |
| `else` | [Expression](index.md) | yes | — | Expression used when the condition does not hold. |

## JSON example

```json
{
  "type": "saturn:if",
  "condition": true,
  "then": "Online",
  "else": "Offline"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.ConditionalExpression`. This page is based on the Codec in the current 26.1.2 source.

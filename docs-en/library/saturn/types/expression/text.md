---
title: "Text display"
sidebar_position: 10
---

`saturn:text`

Displays text, a translation component or existing formatted text.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:text` |
| `value` | [Expression](index.md) | yes | — | Value or expression used by this type. |
| `component` | Boolean | no | `false` | Data component ID, or a switch for whether to read the value as a text component. |

## JSON example

```json
{
  "type": "saturn:text",
  "value": "Host status"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.TextExpression`. This page is based on the Codec in the current 26.1.2 source.

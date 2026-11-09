---
title: "Formatted text"
sidebar_position: 10
---

`saturn:format`

Generates text from a format string and arguments.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:format` |
| `format` | String | yes | — | Format string. |
| `arguments` | Array of [expressions](index.md) | yes | — | Translation or formatting argument list. |

## JSON example

```json
{
  "type": "saturn:format",
  "format": "%.1f / %.1f",
  "arguments": [
    10,
    20
  ]
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.FormatExpression`. This page is based on the Codec in the current 26.1.2 source.

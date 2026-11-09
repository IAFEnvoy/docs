---
title: "Translated text"
sidebar_position: 10
---

`saturn:translate`

Generates a text component that keeps the translation key and arguments.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:translate` |
| `key` | [Expression](index.md) | yes | — | Translation key expression. |
| `arguments` | Array of [expressions](index.md) | no | `[]` | Translation or formatting argument list. |
| `fallback` | [Expression](index.md) | no | omitted | Fallback value used when there is no matching or known value. |

## JSON example

```json
{
  "type": "saturn:translate",
  "key": "info.example.level",
  "arguments": [
    3
  ]
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.TranslateExpression`. This page is based on the Codec in the current 26.1.2 source.

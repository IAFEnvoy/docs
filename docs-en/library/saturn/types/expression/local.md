---
title: "Local variable"
sidebar_position: 10
---

`saturn:local`

Reads the local binding of the current list or table element.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:local` |
| `name` | String | no | `"item"` | Local variable name, scoreboard holder name or config name. |
| `path` | String array | no | `[]` | Member path into composite results; dots are not split. |

## JSON example

```json
{
  "type": "saturn:local"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.LocalExpression`. This page is based on the Codec in the current 26.1.2 source.

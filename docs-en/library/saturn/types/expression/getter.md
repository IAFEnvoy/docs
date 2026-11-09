---
title: "Read entity value"
sidebar_position: 10
---

`saturn:getter`

Reads the result of a parameterized getter from the `PlayerView` passed in.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:getter` |
| `getter` | [Entity getter](../getter/index.md) | yes | — | Entity getter with a `type` and parameters. |
| `path` | String array | no | `[]` | Member path into composite results; dots are not split. |

## JSON example

```json
{
  "type": "saturn:getter",
  "getter": {
    "type": "saturn:health"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.GetterExpression`. This page is based on the Codec in the current 26.1.2 source.

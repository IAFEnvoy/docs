---
title: "List display"
sidebar_position: 10
---

`saturn:list`

Iterates the input collection and generates a display value for each element.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:list` |
| `source` | [Expression](index.md) | yes | — | Input collection, resource path or context parameter; see this page's purpose. |
| `as` | String | no | `"item"` | Loop variable name. |
| `element` | [Expression](index.md) | yes | — | Expression evaluated for each list element. |

## JSON example

```json
{
  "type": "saturn:list",
  "source": {
    "type": "saturn:constant",
    "value": [
      1,
      2
    ]
  },
  "element": {
    "type": "saturn:number",
    "value": {
      "type": "saturn:local"
    }
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.ListExpression`. This page is based on the Codec in the current 26.1.2 source.

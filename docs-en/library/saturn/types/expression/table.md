---
title: "Table display"
sidebar_position: 10
---

`saturn:table`

Iterates the input collection and generates a table from the column definitions.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:table` |
| `source` | [Expression](index.md) | yes | — | Input collection, resource path or context parameter; see this page's purpose. |
| `as` | String | no | `"item"` | Loop variable name. |
| `row_id` | [Expression](index.md) | no | omitted | Optional expression that generates each row's identifier. |
| `columns` | Array of objects | yes | — | Table column definitions, or the grid column count. |

## `columns` entries

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | String | yes | — | Column identifier; must be unique within the same table. |
| `label` | Text component | yes | — | Column title. |
| `value` | Information expression | yes | — | Evaluated for the current row; use `local` to read the `as` binding. |

## JSON example

```json
{
  "type": "saturn:table",
  "source": {
    "type": "saturn:constant",
    "value": [
      {
        "name": "A",
        "count": 1
      }
    ]
  },
  "columns": [
    {
      "id": "name",
      "label": {
        "text": "Name"
      },
      "value": {
        "type": "saturn:text",
        "value": {
          "type": "saturn:local",
          "path": [
            "name"
          ]
        }
      }
    }
  ]
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.TableExpression`. This page is based on the Codec in the current 26.1.2 source.

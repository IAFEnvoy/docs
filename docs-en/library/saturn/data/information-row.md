---
title: "Player Information Rows"
sidebar_position: 7
---

File: `data/<namespace>/saturn/information_row/<path>.json`. An information row is a read-only display recipe, not a player snapshot or an executable command.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | Standard text component | yes | — | Default row title. |
| `value` | [Information expression](../types/expression.md) | yes | — | Main value. |
| `order` | Integer | no | `0` | Sorts ascending, then by ID. |
| `importance` | Integer | no | `0` | Used by the interface to filter by minimum importance. |
| `enabled` | Boolean | no | `true` | Whether this row is enabled. |
| `label_expression` | Information expression | no | omitted | Dynamic title. |
| `tooltip` | Standard text component | no | omitted | Default tooltip. |
| `tooltip_expression` | Information expression | no | omitted | Dynamic tooltip. |
| `tone` | String | no | `"normal"` | `normal`, `positive`, `warning`. |
| `visible` | Information expression | no | omitted | Visibility expression. |
| `missing` | String | no | `"show"` | When the value is missing, show displays it and hide hides it. |

## Example

```json title="data/example/saturn/information_row/health.json"
{
  "label": {
    "translate": "info.example.health"
  },
  "order": 10,
  "importance": 80,
  "value": {
    "type": "saturn:meter",
    "value": {
      "type": "saturn:getter",
      "getter": {
        "type": "saturn:health"
      }
    },
    "min": 0,
    "max": {
      "type": "saturn:getter",
      "getter": {
        "type": "saturn:max_health"
      }
    }
  }
}
```

The value can be text, a number, a boolean, a list, a table, an item list, a meter or a composite result. Getters read a PlayerView or a collected snapshot rather than performing arbitrary live world access; a missing value differs from a known 0, false or empty collection. To display the row, also put it in an [information group](./information-group.md).

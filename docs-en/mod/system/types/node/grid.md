---
title: "Paged grid"
sidebar_position: 10
---

`system:grid`

Builds only the cells of the current page, and computes the page capacity from the column count and the maximum rows.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:grid` |
| `source` | String | no | `""` | Input collection, resource path or context parameter; see this page for how it is used. |
| `filter` | String | no | `""` | State key read by index, used to filter the collection. |
| `columns` | Integer | no | `6` | Table column definition or grid column count. |
| `compact_columns` | Integer | no | `3` | Maximum column count of the simple or compact layout. |
| `max_row` | Integer | no | `3` | Maximum number of rows per page. |
| `cell` | Integer | no | `104` | Height of a single grid cell, in pixels. |
| `children` | Card node array | yes | — | Child node array. |

## JSON example

```json
{
  "type": "system:grid",
  "children": [
    {
      "type": "system:text",
      "text": "{{entries.*.name}}"
    }
  ],
  "source": "{{entries}}",
  "columns": 3,
  "max_row": 3,
  "cell": 104
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.layout.GridNode`. This page is based on the Codec in the current 26.1.2 source.

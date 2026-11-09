---
title: "Collapsible container"
sidebar_position: 10
---

`system:details`

Expands or collapses child nodes with a clickable summary.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:details` |
| `summary` | String | yes | — | Summary text of the collapsed section. |
| `children` | Card node array | yes | — | Child node array. |
| `open` | Boolean | no | `false` | Whether it is expanded by default. |

## JSON example

```json
{
  "type": "system:details",
  "summary": "Source summary",
  "children": [
    {
      "type": "system:text",
      "text": "{{source_summary}}"
    }
  ]
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.container.DetailsNode`. This page is based on the Codec in the current 26.1.2 source.

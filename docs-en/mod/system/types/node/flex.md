---
title: "Flex layout"
sidebar_position: 10
---

`system:flex`

Organizes child nodes horizontally or vertically, and can iterate over a collection and paginate it.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:flex` |
| `direction` | String | no | `"row"` | Layout direction, row or column. |
| `wrap` | Boolean | no | `true` | Whether wrapping is allowed. |
| `source` | String | no | `""` | Input collection, resource path or context parameter; see this page for how it is used. |
| `filter` | String | no | `""` | State key read by index, used to filter the collection. |
| `page_size` | Integer | no | `0` | Page capacity; 0 does not paginate on its own. |
| `children` | Card node array | yes | — | Child node array. |
| `text_separator` | String | no | omitted | Separator used when extracting plain text; does not change the visual layout. |

## JSON example

```json
{
  "type": "system:flex",
  "children": [
    {
      "type": "system:text",
      "text": "Host"
    },
    {
      "type": "system:text",
      "text": "{{player_name}}"
    }
  ],
  "direction": "row"
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.layout.FlexNode`. This page is based on the Codec in the current 26.1.2 source.

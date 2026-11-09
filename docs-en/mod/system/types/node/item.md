---
title: "Item icon"
sidebar_position: 10
---

`system:item`

Renders the item snapshot in the context and shows the item tooltip on hover.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:item` |
| `item` | String | yes | — | Item ID, predicate, or an item parameter key in the context. |
| `size` | Integer | no | `32` | Icon edge length, in pixels. |
| `tooltip` | Card node array | no | `[]` | Nodes shown on mouse hover. |

## JSON example

```json
{
  "type": "system:item",
  "item": "{{reward_item}}",
  "size": 32
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.media.ItemNode`. This page is based on the Codec in the current 26.1.2 source.

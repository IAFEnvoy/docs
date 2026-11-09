---
title: "Container"
sidebar_position: 10
---

`system:container`

Holds item slot contents or lays out child elements.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:container` |
| `children` | Card node array | yes | — | Child node array. |
| `text_separator` | String | no | omitted | Separator used when extracting plain text; does not change the visual layout. |

## JSON example

```json
{
  "type": "system:container",
  "children": [
    {
      "type": "system:text",
      "text": "{{summary}}"
    }
  ]
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.container.ContainerNode`. This page is based on the Codec in the current 26.1.2 source.

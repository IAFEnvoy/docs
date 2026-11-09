---
title: "Text link"
sidebar_position: 10
---

`system:link`

Opens a link through the vanilla URL confirmation flow.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:link` |
| `text` | String | no | `""` | Display text; supports `{{key}}` placeholders. |
| `url` | String | yes | — | HTTP or HTTPS link, which may be produced from placeholders. |

## JSON example

```json
{
  "type": "system:link",
  "url": "https://docs.iafenvoy.com/",
  "text": "Open documentation"
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.interaction.LinkNode`. This page is based on the Codec in the current 26.1.2 source.

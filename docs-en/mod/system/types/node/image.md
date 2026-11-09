---
title: "Image"
sidebar_position: 10
---

`system:image`

Shows an image from the resource pack.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:image` |
| `source` | String | yes | — | Input collection, resource path or context parameter; see this page for how it is used. |
| `alt` | String | no | `""` | Alternative text used when the image cannot be displayed. |
| `width` | Integer | no | `32` | Width, in pixels. |
| `height` | Integer | no | `32` | Height, in pixels. |

## JSON example

```json
{
  "type": "system:image",
  "source": "example:textures/gui/logo.png",
  "width": 32,
  "height": 32
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.media.ImageNode`. This page is based on the Codec in the current 26.1.2 source.

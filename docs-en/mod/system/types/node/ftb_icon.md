---
title: "FTB icon"
sidebar_position: 10
---

`system:ftb_icon`

Shows the FTB quest or reward icon from the server snapshot.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:ftb_icon` |
| `icon` | String | yes | — | FTB icon parameter key or button icon name. |

## JSON example

```json
{
  "type": "system:ftb_icon",
  "icon": "{{quest_icon}}"
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.media.FtbIconNode`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Player model"
sidebar_position: 10
---

`system:player`

Renders the player model given by the context, with controllable facing, scale and mouse following.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:player` |
| `player` | String | no | `"{{player_id}}"` | Vanilla player predicate; in the player model node it is a player UUID parameter. |
| `follow_mouse` | Boolean | no | `false` | Whether the player model rotates to follow the mouse. |
| `yaw` | Number | no | `15.0` | Horizontal facing when not following the mouse, in degrees. |
| `pitch` | Number | no | `0.0` | Pitch when not following the mouse, in degrees. |
| `scale` | Number | no | `1.0` | Model scale factor; must be positive. |
| `offset_x` | Number | no | `0.0` | Offset along the X axis. |
| `offset_y` | Number | no | `0.0` | Offset along the Y axis. |

## JSON example

```json
{
  "type": "system:player",
  "player": "{{player_id}}",
  "follow_mouse": false,
  "yaw": 15,
  "scale": 1
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.media.PlayerNode`. This page is based on the Codec in the current 26.1.2 source.

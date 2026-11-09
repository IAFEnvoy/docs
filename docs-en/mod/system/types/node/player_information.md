---
title: "Saturn player information"
sidebar_position: 10
---

`system:player_information`

Renders the Saturn information document directly and filters it by minimum importance.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:player_information` |
| `importance` | Integer | no | `0` | Minimum importance; only information rows that reach the threshold are shown. |

## JSON example

```json
{
  "type": "system:player_information",
  "importance": 60
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.integration.PlayerInformationNode`. This page is based on the Codec in the current 26.1.2 source.

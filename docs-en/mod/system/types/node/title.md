---
title: "Title"
sidebar_position: 10
---

`system:title`

Shows heading text and lets the host extract it as the card title.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:title` |
| `level` | Integer | no | `1` | Heading level, 1 to 4. |
| `text` | String | no | `""` | Display text; supports `{{key}}` placeholders. |
| `translate` | String | no | `""` | Translation key; when non-empty, takes precedence over text. |
| `args` | String array | no | `[]` | List of translation argument strings; may contain placeholders. |
| `inline` | Boolean | no | `false` | Whether to use inline display. |

## JSON example

```json
{
  "type": "system:title",
  "text": "Quest details",
  "level": 2
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.text.TitleNode`. This page is based on the Codec in the current 26.1.2 source.

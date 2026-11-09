---
title: "Text display"
sidebar_position: 10
---

`system:text`

Shows text, a translation component or existing formatted text.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:text` |
| `text` | String | no | `""` | Display text; supports `{{key}}` placeholders. |
| `translate` | String | no | `""` | Translation key; when non-empty, takes precedence over text. |
| `args` | String array | no | `[]` | List of translation argument strings; may contain placeholders. |
| `inline` | Boolean | no | `false` | Whether to use inline display. |

## JSON example

```json
{
  "type": "system:text",
  "text": "{{summary}}"
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.text.TextNode`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Button"
sidebar_position: 10
---

`system:button`

Runs a client callback, opens a URL or sends a string to the server.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:button` |
| `value` | String | no | `""` | The value or expression used by this type. |
| `click` | String | no | `""` | Button behavior: link, return-val or local. |
| `text` | String | no | `""` | Display text; supports `{{parameter_name}}` placeholders. |
| `label` | String | no | `""` | Label used for text or the accessible name. |
| `icon` | String | no | `""` | FTB icon parameter key or button icon name. |
| `selected` | String | no | `""` | State key that controls the selected state of the button. |
| `disabled` | String | no | `""` | State key that controls the disabled state of the button. |
| `binding` | String | no | `""` | Optional host action binding. |
| `behavior` | String | no | `"replace"` | Display behavior after the business action completes: close, wait, replace, push. |
| `children` | Card node array | no | `[]` | Child node array. |

The example strings only demonstrate the transport form; the server must register the corresponding parsing logic. When reusing an existing button, prefer reading the actions snapshot; for behavior and permissions see [Common interaction conventions](../../cards/node-common.md#button-interaction).

## JSON example

```json
{
  "type": "system:button",
  "text": "View details",
  "click": "return-val",
  "value": "example:details reference-123"
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.interaction.ButtonNode`. This page is based on the Codec in the current 26.1.2 source.

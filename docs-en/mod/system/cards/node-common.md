---
title: "Common node fields and interaction"
sidebar_position: 2
---

Every card node consists of a common wrapper plus content that carries a `type`, and the two sets of fields are flattened into the same JSON object. See the [node catalogue](../types/node/index.md) for the individual types.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Node type ID | yes | — | A registered node Codec. |
| `id` | String | no | `""` | Node identifier. |
| `style` | String or string array | no | Node default style | CSS class names, not inline CSS declarations. |
| `when` | State key | no | `""` | Shows the node when the given state is enabled. |
| `unless` | State key | no | `""` | Hides the node when the given state is enabled. |
| `repeat` | Collection placeholder | no | `""` | Repeats the node for each element of the collection. |

## Context and placeholders

The whole card shares one immutable context: the state table, the parameter table and the callback table. Parameters use lowercase keys and `{{key}}` placeholders, and collection indices use `*`, as in `{{entries.*.title}}`. A failed type read or a missing parameter does not conjure the corresponding content out of nothing. States and parameters are provided by the CardBuilder or extension events; JSON does not execute arbitrary Java code.

```json
{
  "type": "system:text",
  "text": "{{entries.*.title}}",
  "repeat": "{{entries}}",
  "when": "show_entries"
}
```

## Text fields

text and title share the text structure; markdown parses Markdown on its own, and native coloured FTBQ text keeps using text.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `text` | String | no | `""` | May contain placeholders. |
| `translate` | Translation key | no | `""` | When non-empty, takes precedence over text. |
| `args` | String array | no | `[]` | Translation arguments, may contain placeholders. |
| `inline` | Boolean | no | `false` | Use inline text. |

## Button interaction

| click | value | Where it runs |
| --- | --- | --- |
| `link` | HTTP / HTTPS URL | The client goes through the vanilla URL confirmation flow |
| `return-val` | A string the server can recognise | Sends a packet, which the server parses and validates |
| `local` | A key of the context callbacks | Executed locally on the client |

`return-val` is not an arbitrary Minecraft command execution interface, and it does not automatically call a handler that does not exist. The server rechecks player state, permissions and targets; old cards cannot bypass business validation. Reuse the click_type, value, disabled and behavior of the actions in the snapshot instead of guessing the protocol in a resource pack.

For the supported `behavior` values and the notification replacement rules, see [button node](../types/node/button.md). Confirming, closing and going back at the bottom of a notification are controlled by the host, and the body JSON does not replace these controls; paging and group switching stay inside the card controls and are not re-queued as notifications.

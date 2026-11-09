---
title: "Send message"
sidebar_position: 10
---

`saturn:send_message`

Sends a text component to players that match the recipient condition, optionally to the chat bar or the action bar.

Acts on the world and block position given by the context. It is not a standalone data pack file; embed it in a field that requires a BlockAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:send_message` |
| `message` | Text component | yes | — | Text component sent to players; strings are treated as translation keys. |
| `channel` | Enum string | no | `"chat"` | Message channel; see the enum notes below for available values. Available values: `chat`, `action_bar`. |
| `target` | Enum string | no | `"self"` | Action target, target ID or target selection; see the type description on this page. Available values: `self`, `other`, `all`. |
| `recipients` | [Entity condition](../entity-condition/index.md) | no | `{"type":"saturn:always"}` | Entity condition checked for each candidate recipient player. |

channel accepts chat and action_bar. target=self selects the actor / item holder, other selects the bi-entity target, and all selects the players in the current server dimension. Block actions have no recipients of their own, so they usually use all. recipients is checked separately for every candidate player.

## JSON example

```json
{
  "type": "saturn:send_message",
  "message": {
    "text": "Operation complete"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.SendMessageAction`. This page is based on the Codec in the current 26.1.2 source.

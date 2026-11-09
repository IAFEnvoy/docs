---
title: "If else"
sidebar_position: 10
---

`saturn:if_else`

Runs if_action when the condition holds, otherwise runs else_action.

Operates on the item stack and its holder from the context. It is not an item definition file; embed it in a field that requires an ItemAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:if_else` |
| `condition` | [Item condition](../item-condition/index.md) | yes | — | The condition to check. |
| `if_action` | [Item action](index.md) | yes | — | Action to run when the condition holds. |
| `else_action` | [Item action](index.md) | no | `{"type":"saturn:no_op"}` | Action to run when the condition does not hold. |

## JSON example

```json
{
  "type": "saturn:if_else",
  "condition": {
    "type": "saturn:always"
  },
  "if_action": {
    "type": "saturn:no_op"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.item.meta.IfElseAction`. This page is based on the Codec in the current 26.1.2 source.

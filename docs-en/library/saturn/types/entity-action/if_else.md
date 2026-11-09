---
title: "If else"
sidebar_position: 10
---

`saturn:if_else`

Runs if_action when the condition holds, otherwise runs else_action.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:if_else` |
| `condition` | [Entity condition](../entity-condition/index.md) | yes | — | The condition to check. |
| `if_action` | [Entity action](index.md) | yes | — | Action to run when the condition holds. |
| `else_action` | [Entity action](index.md) | no | `{"type":"saturn:no_op"}` | Action to run when the condition does not hold. |

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

`com.iafenvoy.saturn.data.action.builtin.entity.meta.IfElseAction`. This page is based on the Codec in the current 26.1.2 source.

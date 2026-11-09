---
title: "Equipped item action"
sidebar_position: 10
---

`saturn:equipped_item_action`

Runs an item action on the item stack in the given equipment slot.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:equipped_item_action` |
| `slot` | Enum string | yes | — | Equipment slot. Available values: `mainhand`, `offhand`, `feet`, `legs`, `chest`, `head`, `body`, `saddle`. |
| `action` | [Item action](../item-action/index.md) | yes | — | The sub-action to run; its kind must match what this field expects. |

## JSON example

```json
{
  "type": "saturn:equipped_item_action",
  "slot": "mainhand",
  "action": {
    "type": "saturn:no_op"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.EquippedItemAction`. This page is based on the Codec in the current 26.1.2 source.

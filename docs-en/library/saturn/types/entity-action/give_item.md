---
title: "Give item"
sidebar_position: 10
---

`saturn:give_item`

Creates an item stack and hands it to the entity, optionally with a preferred equipment slot.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:give_item` |
| `stack` | Item stack template | yes | — | The vanilla ItemStackTemplate to create. |
| `item_action` | [Item action](../item-action/index.md) | no | `{"type":"saturn:no_op"}` | Item action to run on the item stack. |
| `preferred_slot` | Enum string | no | omitted | Preferred equipment slot; when the stack cannot be placed there, delivery continues according to the implementation. Available values: `mainhand`, `offhand`, `feet`, `legs`, `chest`, `head`, `body`, `saddle`. |

## JSON example

```json
{
  "type": "saturn:give_item",
  "stack": {
    "id": "minecraft:diamond",
    "count": 1
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.GiveItemAction`. This page is based on the Codec in the current 26.1.2 source.

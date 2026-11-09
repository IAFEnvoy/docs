---
title: "Item type"
sidebar_position: 10
---

`saturn:item_id`

Checks whether the item stack is the given item.

Checks a single ItemStack. An item ID string cannot be treated directly as an arbitrary ItemCondition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item_id` |
| `item` | Resource ID | yes | — | Item ID, predicate, or an item parameter key in the context. |

## JSON example

```json
{
  "type": "saturn:item_id",
  "item": "minecraft:diamond"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.item.ItemIdCondition`. This page is based on the Codec in the current 26.1.2 source.

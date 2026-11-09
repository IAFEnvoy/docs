---
title: "Item matching"
sidebar_position: 10
---

`saturn:item_matcher`

Checks the item stack against multiple item matcher entries.

Checks a single ItemStack. An item ID string cannot be treated directly as an arbitrary ItemCondition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item_matcher` |
| `items` | Array of [item matcher entries](../item-matcher/index.md) | yes | — | Item matcher entries, item predicates or an item list. |

## JSON example

```json
{
  "type": "saturn:item_matcher",
  "items": [
    "minecraft:diamond"
  ]
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.item.ItemMatcherCondition`. This page is based on the Codec in the current 26.1.2 source.

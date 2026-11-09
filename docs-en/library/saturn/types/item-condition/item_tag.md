---
title: "Item tag"
sidebar_position: 10
---

`saturn:item_tag`

Checks whether the item belongs to the given tag.

Checks a single ItemStack. An item ID string cannot be treated directly as an arbitrary ItemCondition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item_tag` |
| `tag` | Tag ID (with #) | yes | — | Registry tag, or the NBT data declared on this page. |

## JSON example

```json
{
  "type": "saturn:item_tag",
  "tag": "#minecraft:logs"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.item.ItemTagCondition`. This page is based on the Codec in the current 26.1.2 source.

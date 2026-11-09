---
title: "Base enchantment"
sidebar_position: 10
---

`saturn:base_enchantment`

Compares the level of the given base enchantment on the item.

Checks a single ItemStack. An item ID string cannot be treated directly as an arbitrary ItemCondition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:base_enchantment` |
| `enchantment` | Resource ID | yes | — | Enchantment ID or list of enchantments. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

## JSON example

```json
{
  "type": "saturn:base_enchantment",
  "enchantment": "minecraft:unbreaking",
  "comparison": ">=",
  "compare_to": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.item.BaseEnchantmentCondition`. This page is based on the Codec in the current 26.1.2 source.

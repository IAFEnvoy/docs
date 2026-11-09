---
title: "Remove enchantment"
sidebar_position: 10
---

`saturn:remove_enchantment`

Removes selected enchantments from the item, optionally resetting the repair cost.

Operates on the item stack and its holder from the context. It is not an item definition file; embed it in a field that requires an ItemAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:remove_enchantment` |
| `enchantment` | Array of resource IDs | no | `[]` | Enchantment ID or list of enchantments. |
| `reset_repair_cost` | Boolean | no | `false` | Whether to reset the repair cost when the enchantment is removed. |
| `level` | Integer | no | omitted | Heading level, 1 to 4. |

## JSON example

```json
{
  "type": "saturn:remove_enchantment"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.item.RemoveEnchantmentAction`. This page is based on the Codec in the current 26.1.2 source.

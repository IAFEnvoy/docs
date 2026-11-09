---
title: "Add enchantment"
sidebar_position: 10
---

`saturn:add_enchantment`

Adds or overrides enchantment levels on the item according to a map.

Operates on the item stack and its holder from the context. It is not an item definition file; embed it in a field that requires an ItemAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:add_enchantment` |
| `enchantments` | Map from resource ID to integer | yes | — | Map from enchantment ID to level. |
| `override` | Boolean | no | `false` | Whether to override existing values. |

## JSON example

```json
{
  "type": "saturn:add_enchantment",
  "enchantments": {
    "minecraft:unbreaking": 1
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.item.AddEnchantmentAction`. This page is based on the Codec in the current 26.1.2 source.

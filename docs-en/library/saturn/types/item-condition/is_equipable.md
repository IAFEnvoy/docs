---
title: "Equipable"
sidebar_position: 10
---

`saturn:is_equipable`

Checks whether the item can be equipped in the given slot.

Checks a single ItemStack. An item ID string cannot be treated directly as an arbitrary ItemCondition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:is_equipable` |
| `slot` | Enum string | no | omitted | Equipment slot. Available values: `mainhand`, `offhand`, `feet`, `legs`, `chest`, `head`, `body`, `saddle`. |

## JSON example

```json
{
  "type": "saturn:is_equipable"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.item.IsEquipableCondition`. This page is based on the Codec in the current 26.1.2 source.

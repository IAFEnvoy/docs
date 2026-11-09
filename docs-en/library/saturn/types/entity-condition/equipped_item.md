---
title: "Equipped item"
sidebar_position: 10
---

`saturn:equipped_item`

Checks whether the item in the given equipment slot satisfies an item condition.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:equipped_item` |
| `equipment_slot` | Enum string | yes | — | Equipment slot. Available values: `mainhand`, `offhand`, `feet`, `legs`, `chest`, `head`, `body`, `saddle`. |
| `item_condition` | [Item condition](../item-condition/index.md) | no | `{"type":"saturn:always"}` | Condition checked against the item stack. |

## JSON example

```json
{
  "type": "saturn:equipped_item",
  "equipment_slot": "mainhand"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.EquippedItemCondition`. This page is based on the Codec in the current 26.1.2 source.

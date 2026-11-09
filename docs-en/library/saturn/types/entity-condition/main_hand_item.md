---
title: "Main hand item"
sidebar_position: 10
---

`saturn:main_hand_item`

Checks whether the main hand item of an entity satisfies an item condition.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:main_hand_item` |
| `item_condition` | [Item condition](../item-condition/index.md) | no | `{"type":"saturn:always"}` | The condition to check for the item stack. |

## JSON example

```json
{
  "type": "saturn:main_hand_item"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.MainHandItemCondition`. This page is based on the Codec in the current 26.1.2 source.

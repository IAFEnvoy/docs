---
title: "Durability damage"
sidebar_position: 10
---

`saturn:damage_item`

Applies the given durability loss to the item stack.

Operates on the item stack and its holder from the context. It is not an item definition file; embed it in a field that requires an ItemAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:damage_item` |
| `amount` | [Number provider](../number/index.md) | yes | — | Amount or value; a number provider may be a number, a formula string or an object with a type. |

## JSON example

```json
{
  "type": "saturn:damage_item",
  "amount": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.item.DamageItemAction`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Item cost"
sidebar_position: 10
---

`saturn:item`

Selects payable inventory items by item matcher entry and consumes the amount.

A cost definition can be used by abilities, the System shop and the lottery. Preparing and trialing do not charge; the actual payment is submitted by the caller; see [Costs and Payment](../../guides/costs.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item` |
| `items` | Array of [item matcher entries](../item-matcher/index.md) | yes | — | Item matcher entries, item predicates or an item list. |
| `amount` | [Number provider](../number/index.md) | yes | — | Amount or value; a number provider may be a number, a formula string or an object with a type. |

## JSON example

```json
{
  "type": "saturn:item",
  "items": [
    "minecraft:emerald"
  ],
  "amount": 2
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.cost.builtin.ItemCost`. This page is based on the Codec in the current 26.1.2 source.

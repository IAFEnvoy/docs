---
title: "Upkeep"
sidebar_position: 10
---

`saturn:upkeep`

Checks the host item's upkeep cost at an interval and runs an item action when payment fails.

The ability type is written at the top level of the ability definition, alongside common fields such as costs and condition; do not nest another type object. For the common fields of an ability file, see [Ability definitions](../../data/ability.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:upkeep` |
| `interval` | [Number provider](../number/index.md) | no | `20` | Execution interval, in game ticks. |
| `on_fail` | [Item action](../item-action/index.md) | no | `{"type":"saturn:no_op"}` | Action run on the host item after upkeep fails. |
| `owner_only` | Boolean | no | `true` | Whether only the item owner may bear the upkeep. |

## JSON example

```json
{
  "type": "saturn:upkeep"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.ability.type.UpkeepAbilityType`. This page is based on the Codec in the current 26.1.2 source.

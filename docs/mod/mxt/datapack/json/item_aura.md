---
title: "Item Aura (item_aura)"
description: "Define an existing item as aura fuel that is consumed and released into the current realm's resource bar while cultivating."
---

# Item Aura (item_aura)

An Item Aura defines an existing item as aura fuel used during cultivation: while it is held, the item is consumed tick by tick and its aura is released into the resource bar bound to the current realm stage.

## File Location

Item Aura JSON files go in `data/<namespace>/mxt/item_aura/` within your data pack.

The filename corresponds to its ID. For example, `data/example/mxt/item_aura/spirit_stone.json` has the ID `example:spirit_stone`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `items` | `ItemMatcher` | **required** | The existing items that can act as aura fuel while held. A single item ID, an item tag, or a mixed array of both. |
| `type` | `Holder<resource>` | **required** | The resource type that is consumed and released; elements only take part in the type check through the `aura_type` of that value's [cultivation profile](./cultivation.md). |
| `aura` | `NumberProvider` | **required** | When a stack of items is processed for the first time, the aura total per item multiplied by the stack count is written into its `mxt:item_aura.remain`. |
| `consume_speed` | `NumberProvider` | **required** | Fuel value consumed per tick, stacked by the stack count; the total consumption time stays the same. |
| `release_speed` | `NumberProvider` | **required** | Fuel amount released per tick into the resource bar of the current realm stage, stacked by the stack count. |
| `result_stack` | `ItemStackTemplate` | none | An additional return item given when the current item is fully exhausted; when it is not configured, the original item is simply removed. |
| `exhausted_action` | Entity Action | `mxt:no_op` | The behaviour when the current fuel is exhausted. |

Every entry must fill in `type`, which is the resource whose bar receives the released aura (for example `example:qi`). Elements only take part in the type check, through the `aura_type` of that value's [cultivation profile](./cultivation.md). The aura transfer interface handles one resource at a time; recipes or behaviours that need several kinds of aura should call the interface separately for each of them.

- `aura` must evaluate to a positive number at actual runtime; spirit stone storage counts in whole units, and the fractional part does not count towards capacity. For items that implement `SpiritItemAccess`, `aura` acts as the charging maximum of each item instead.
- `consume_speed` must evaluate to a positive number at actual runtime.
- `release_speed` must evaluate to a positive number at actual runtime.
- For items that implement `SpiritItemAccess`, `result_stack` does not take part in processing: such items keep themselves and are simply drained.

## Example

```json
{
  "items": "mxt:spirit_stone",
  "type": "example:spirit_power",
  "aura": 100,
  "consume_speed": 1,
  "release_speed": 2,
  "exhausted_action": {
    "type": "mxt:apply_effect",
    "effect": "minecraft:fire_resistance",
    "duration_ticks": 40
  }
}
```

A definition whose speeds are formulas:

```json
{
  "items": ["mxt:spirit_stone", "#example:spirit_fuel"],
  "type": "example:spirit_power",
  "aura": 100,
  "consume_speed": "0.5 + level * 0.05",
  "release_speed": "1 + level * 0.1",
  "exhausted_action": {
    "type": "mxt:apply_effect",
    "effect": "minecraft:fire_resistance",
    "duration_ticks": 40
  }
}
```

## Runtime Behaviour

The aura fuel value is hidden server-side state. When processing starts, the system takes the whole matching stack out of the player's inventory and puts it into the entity `mxt:float_holding_item` attachment; the `mxt:item_aura` component is then written only onto that stack, and the component has just one field, `remain`. On every server tick the definition matched at that time is used to subtract `consume_speed × stack count` from `remain` and to charge `release_speed × stack count` into the resource bar bound to the current realm stage, and the resource bar is still clamped by its own maximum. The total consumption time therefore does not change with the stack count.

When the attachment is empty, valid items in the player's inventory that carry the `mxt:item_aura` component are resumed first, and the stack with the smallest `remain` is always chosen; only when there is no half-exhausted item is a whole new matching stack taken, in the order main hand, then off hand, then inventory, and the `aura` computed from the stack count is written into the component. When cultivation is interrupted, or the player logs out or dies, the stack in the attachment is returned unchanged; when `remain` runs out, a `SpiritItemAccess` item is returned as a whole stack in an empty charging state, while other items are removed and the optional `result_stack` is given for the original stack count, after which `exhausted_action` runs.

`float_holding_item` can be used by other mechanics to hold items temporarily. The aura fuel service only consumes items that both carry the `mxt:item_aura` component and still match a valid `item_aura` definition; attachment items that do not qualify are not moved, modified or deleted.

:::note

The client does not currently render a fuel bar, and does not deduct or consume items on its own.

:::

## Disabling an Entry

Like other datapack registries, an entry can be disabled through `data/mxt/tags/mxt/item_aura/disabled.json`.

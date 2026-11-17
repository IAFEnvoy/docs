---
title: Saturn Actions and Conditions
description: Set world-owned item values and compare item or inventory values in Saturn data definitions.
sidebar_position: 7
---

Use these types with Evaluate `1.0-beta.2` and Saturn `1.3.1+`. Embed them in fields accepting Saturn [item actions](../../library/saturn/types/action/item-action.md), [item conditions](../../library/saturn/types/condition/item-condition.md), or [entity conditions](../../library/saturn/types/condition/entity-condition.md). They are nested definitions, not new standalone Evaluate data files.

They run on the server. With a client-side holder or no holder, actions do nothing and conditions return `false`. Queries use the same component-aware values as the Java API and tooltips, including current world overrides.

## Item actions

| Type | Field | Required | Meaning |
| --- | --- | --- | --- |
| `evaluate:set_value` | `value`: [Number provider](../../library/saturn/types/number.md) | Yes | Store a finite, nonnegative value per item. |
| `evaluate:add_value` | `amount`: Number provider | Yes | Add a signed amount to the current public value, starting from `0` for an unknown or free item. Store the result as a world value. |
| `evaluate:reset_value` | None | — | Remove the exact stack variant's world value and restore datapack definitions and inference. |

An action targets the item and exact component patch from its context; stack count is ignored. **The stored value applies to every matching stack in this world**, not only the stack that triggered the action. It has the same precedence and persistence as `/evaluate set`, participates in recipe inference, and survives `/reload` and server restarts.

Changed values recalculate the graph and invalidate client value caches immediately. Setting the same value or resetting an absent override does nothing. An add amount of `0` does nothing. Negative or nonfinite resulting values are ignored. Setting `0` creates a free base value and hides the public value line; reset removes the override instead.

```json
{
  "type": "evaluate:set_value",
  "value": 12.5
}
```

```json
{
  "type": "evaluate:add_value",
  "amount": -2.5
}
```

```json
{
  "type": "evaluate:reset_value"
}
```

These actions are invoked by your Saturn definition. They do not execute a command or require the triggering player to have command permissions; command permission checks still apply to `/evaluate` itself.

## Item conditions

| Type | Fields | Result |
| --- | --- | --- |
| `evaluate:has_value` | None | Whether the stack has a positive public value. Unknown, free, and empty stacks return `false`. |
| `evaluate:has_world_value` | None | Whether this exact item/component key has a value stored in the world, including `0`. |
| `evaluate:value` | `comparison`, `compare_to`; optional `stack_value` | Compare its public value with a number. |

`evaluate:value` uses Saturn's `Comparison`: `comparison` is required and accepts `==`, `!=`, `<`, `<=`, `>`, or `>=`; `compare_to` is a required number. `stack_value` is a boolean, defaults to `false`, and multiplies the value by the stack count when enabled. Comparisons use the original `double`, not the tooltip's rounded number.

Unknown, free, or empty stacks fail every value comparison, including `!=`. An overflowing stack total also fails. Use `saturn:not` around `evaluate:has_value` to check for an absent public value.

```json
{
  "type": "evaluate:value",
  "stack_value": true,
  "comparison": ">=",
  "compare_to": 1000
}
```

Combine these types with Saturn's existing `and`, `or`, `not`, and `if_else`. For example, this item action sets a value only if there is no world override:

```json
{
  "type": "saturn:if_else",
  "condition": {
    "type": "saturn:not",
    "condition": { "type": "evaluate:has_world_value" }
  },
  "if_action": {
    "type": "evaluate:set_value",
    "value": 12.5
  }
}
```

## Inventory value condition

`evaluate:inventory_value` is an **entity condition**. It sums the public value of each matching item multiplied by its count, then compares the total.

| Field | Type | Required | Default | Meaning |
| --- | --- | --- | --- | --- |
| `item_condition` | Item condition | No | `saturn:always` | Filter stacks before adding their values. |
| `slot` | Integer, slot string, or mixed array | No | `[]` | Saturn's vanilla slot selection; empty selects its default inventory and equipment slots. |
| `comparison` | Comparison operator | Yes | — | Compare the accumulated total. |
| `compare_to` | Number | Yes | — | Target total value. |

Unknown and free items contribute `0`; an empty inventory has a total of `0`. The player's selected hotbar slot and main-hand alias are counted once. If the total overflows, the condition returns `false`. Slot behavior follows [Saturn's inventory condition](../../library/saturn/types/condition/entity-condition.md#saturninventory).

```json
{
  "type": "evaluate:inventory_value",
  "slot": ["hotbar.*", "inventory.*"],
  "item_condition": { "type": "evaluate:has_value" },
  "comparison": ">=",
  "compare_to": 10000
}
```

To run one of the item actions from an entity action field, wrap it with Saturn's `saturn:equipped_item_action` or another existing item-action carrier. See the [entity action reference](../../library/saturn/types/action/entity-action.md#saturnequipped_item_action).

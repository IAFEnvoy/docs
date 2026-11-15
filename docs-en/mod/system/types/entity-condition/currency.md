---
title: "Currency balance comparison"
sidebar_position: 20
---

`system:currency` registers in Saturn's entity condition registry. It compares a player's balance without charging. It shares its name with [currency cost](../cost/currency.md), but belongs to a different type registry.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:currency`. |
| `currency` | Currency registry reference | yes | — | ID of a [currency definition](../../data/currency.md). |
| `comparison` | String | yes | — | `<`, `<=`, `>`, `>=`, `==` or `!=`. |
| `compare_to` | Double | yes | — | Value to compare against the balance. |

The `comparison` and `compare_to` fields are flattened into the condition object and reuse Saturn's `Comparison`. The old `min` field is no longer used.

## Example

```json
{
  "type": "system:currency",
  "currency": "system:coin",
  "comparison": ">=",
  "compare_to": 20
}
```

This checks whether the system-coin balance is at least 20. Use `"comparison": "=="` and `"compare_to": 0` to test for a zero balance.

The condition is false for a non-server player, an unbound player, a disabled economy module or data that is not ready. Do not use it as the initial prerequisite for the economy module itself. It reads a published memory snapshot without waiting for file locks; queued actions become visible only after completion.

Comparisons use double precision, so adjacent integers above `2^53` may not be distinguishable. Balance storage and arithmetic still use exact long values.

## Java entry point

`com.iafenvoy.system.data.condition.CurrencyCondition`, registered through `SystemEntityConditions.CURRENCY`.

---
title: "Add or remove currency"
sidebar_position: 20
---

`system:add_currency` registers in Saturn's entity action registry and modifies a server player's wallet balance. The player must be bound, have the [economy module](../module/economy.md) enabled, and have a ready runtime.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:add_currency`. |
| `currency` | Currency registry reference | yes | — | ID of a [currency definition](../../data/currency.md). |
| `amount` | Long integer | yes | — | Positive adds currency, negative deducts it, and zero leaves the amount unchanged. |

## Example

```json
{
  "type": "system:add_currency",
  "currency": "system:coin",
  "amount": 100
}
```

This object is embedded in an EntityAction field, not loaded as a standalone data file. Insufficient funds or balance overflow reject the whole operation. Every invocation applies the action; it does not deduplicate triggering events. The owning feature must record whether a one-time reward has been claimed.

If storage is temporarily busy, the edit is queued on the persistence worker. Subsequent conditions can observe that edit only after the transaction completes; do not assume a queued action completes synchronously.

## Java entry point

`com.iafenvoy.system.data.action.AddCurrencyAction`, registered through `SystemEntityActions.ADD_CURRENCY`.

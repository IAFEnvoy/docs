---
title: "Currency cost"
sidebar_position: 10
---

`system:currency` registers in Saturn's `COST_TYPE` and charges the [economy module](../module/economy.md) wallet. It works with shop offers, lottery pools and repairs, using the existing quote, confirmation and payment reentrancy safeguards.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:currency`. |
| `currency` | Currency registry reference | yes | — | ID of a [currency definition](../../data/currency.md). |
| `amount` | [Saturn NumberProvider](../../../../library/saturn/types/number.md) | yes | — | Cost, evaluated once when pricing. |

## Example

```json
{
  "type": "system:currency",
  "currency": "system:coin",
  "amount": 10
}
```

Place this object in the target's `costs` array; no standalone cost data file is needed. The player must be bound and have the economy module enabled. A single cost must be a finite, nonnegative integer no greater than `9007199254740991`. Fractions are not rounded automatically. The wallet itself still stores nonnegative balances across the full long range.

Quotes bind the current player connection and storage generation. Reconnecting, revoking or resetting prevents old quotes from changing a new wallet. Insufficient funds reject the debit, and repeated payment of the same transaction reuses its receipt. Separate costs have no combined rollback; merge demands for the same currency.

## Java entry point

`com.iafenvoy.system.data.cost.CurrencyCost`, registered through `SystemCosts.CURRENCY`. Its payment transaction extends Saturn's `CostTransaction`.

---
title: "Costs and Payment"
sidebar_position: 2
---

`Cost` describes a payment requirement. Abilities, shops and the lottery reuse the same format; the caller uses `CostContext` to specify the paying entity, the formula context, the resource account and an optional container.

```json
[
  { "type": "saturn:item", "items": ["minecraft:emerald"], "amount": 3 },
  { "type": "saturn:resource", "resource": "example:mana", "amount": 10 }
]
```

`example:mana` must be defined first and provided to the paying entity by the host. [Item cost](../types/cost/item.md) looks for items by matching entry and rounds the amount up; it returns a failure when no container is available or the amount is invalid. For resource costs, see [Resource cost](../types/cost/resource.md).

## Three stages

1. `prepare(context)` prices the payment and returns a `Transaction` without charging.
2. `execute(true)` is a read-only trial; the payment only moves on to commit once every cost is satisfied.
3. `execute(false)` performs the actual charge and returns a recordable payment receipt.

`CostPayment.pay` orchestrates the steps above. It does not save the order for the caller or roll back external payments that have already happened; exceptions raised while real charges run across multiple channels need the business's own ledger and recovery flow. System has separate persistent order and reward delivery logic, so an unknown order must not be handled by calling pay again.

A custom cost implements `Cost`, registers with `SaturnResourceKeys.COST_TYPE` and returns its own `MapCodec`. On failure use `Result.failure(Failure)`; do not pretend the charge succeeded by returning a successful empty value.

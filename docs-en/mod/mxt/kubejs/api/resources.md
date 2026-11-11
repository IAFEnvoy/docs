---
title: 'MxtResources: Whole Cost Arrays'
description: 'Simulate a Cost array, then deduct in order; simulation refusals stop all deductions, while real failures warn and continue.'
---

# `MxtResources`: Whole Cost Arrays

<span id="mxtresources-whole-cost-arrays" />

`MxtResources` has a single method, but it is the one that pays **several entries together**: the whole `Cost` array is simulated in order before any real deduction. Real failures only log WARN, and later fees and business effects continue without rollback or cancellation. For a single `Cost`, use [MxtCosts](./costs.md).

## Methods {#methods}

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `consume(entity, costs)` | a living entity, `Cost[]` | `Result<Map<Identifier, Double>>` | Diagnoses duplicate targets, then simulates and deducts in array order without merging or reordering. Simulation refusals deduct nothing; real failures only warn and continue. |

`costs` is the **unified `Cost` array**: all five shapes can be written directly, and the older `{"id": ..., "amount": ...}` shorthand still works (it is read as `saturn:resource`). The payer has to be a **living entity** — it does not have to be a player, but `mxt:item` (which needs a player's inventory) and `mxt:js` (which needs a player) are simply unpayable for a non-player payer. An entry that cannot be decoded fails the call rather than being dropped silently.

```js
const result = MxtResources.consume(player, [
  { id: 'mxt:spirit_power', amount: 10 },
  { type: 'mxt:aura', aura: 'mxt:fire_aura', amount: 'level + 2' }
])

if (result.getFailure().isEmpty()) {
  console.info(`Deducted: ${result.getData().orElse({})}`)
} else {
  const failure = result.getFailure().get()
  console.warn(`Could not pay: ${failure.resource().orElse(failure.name())}`)
}
```

The return value is a `Result<Map<Identifier, Double>>`: `getData()` is the table of what was really deducted (non-empty only on success) and `getFailure()` is the reason for a refusal, whose `resource()` names the resource that ran short. Client calls, invalid formulas and simulation refusals leave `getFailure()` non-empty. Once simulation passes and real attempts finish, success is returned without promising full collection. `getData()` totals only known actual resource spending; it excludes items, pool aura and unknown amounts inside scripts.

## Related {#related}

- A single `Cost` and its five shapes: [MxtCosts](./costs.md) and [Shared Data Types](../../datapack/types/shared_data_types.md#cost).
- Which channel a cost is charged to (the payer, the aura pool underfoot, a block's own stock): [Shared Data Types](../../datapack/types/shared_data_types.md#cost).
- The values behind it: [MxtValues](./values.md) and [`resource`](../../../../library/saturn/data/resource.md).
- [KubeJS API Reference](../api-reference.md).

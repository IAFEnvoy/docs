---
title: 'MxtCultivation: Cultivation and Breakthroughs'
description: Add cultivation progress to a resource chain, or attempt a breakthrough along it.
---

# `MxtCultivation`: Cultivation and Breakthroughs

<span id="mxtcultivation-cultivation-and-breakthroughs" />

`MxtCultivation` does two things: it adds to the cultivation progress of a resource, and it attempts a breakthrough along that resource's realm chain. A breakthrough runs the same server flow cultivation and events use.

## Methods {#methods}

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `add(entity, resource, amount)` | `LivingEntity`, resource ID, finite non-negative number | `boolean` | Adds to the cultivation progress of that resource. On the client, with an unknown resource, a negative number or a non-finite number it returns `false`. |
| `tryBreakthrough(entity, resource)` | `LivingEntity`, resource ID | `CultivationService.BreakthroughResult` | Attempts a breakthrough along the realm chain of that resource. |

The accessors of the breakthrough record are `advanced()`, `failure()`, `failedResource()` and `costs()`. It fires the normal `cultivationBreak` flow, breakthrough actions, particles, tribulations and associated abilities.

```js
const result = MxtCultivation.tryBreakthrough(player, 'mxt:spirit_power')
if (!result.advanced()) console.warn(`breakthrough refused: ${result.failure()}`)
```

## Related {#related}

- Data pack side: [`realm_stage`](../../datapack/json/realm_stage.md), [`resource`](../../../../library/saturn/data/resource.md) and [`aura`](../../datapack/json/aura.md).
- Read or change the surroundings and values involved: [MxtAura](./aura.md) and [MxtValues](./values.md).
- Veto or rewrite a breakthrough's cost: `cultivationBreak` in [MxtEvents](./events.md).
- [KubeJS API Reference](../api-reference.md).

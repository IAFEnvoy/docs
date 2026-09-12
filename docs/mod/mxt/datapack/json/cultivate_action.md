---
title: "Cultivate Action (cultivate_action)"
description: "Defines a named cultivation activity with its environment requirements, costs and per-tick settlement."
---

# Cultivate Action (cultivate_action)

A `cultivate_action` defines a named cultivation activity: when cultivation may start and continue, how often absorption is settled, and which resources are consumed or gained.

## File Location

Cultivate action files go in `data/<namespace>/mxt/cultivate_action/` within your datapack.

The filename corresponds to its ID. For example, `data/example/mxt/cultivate_action/meditate.json` has the ID `example:meditate`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `default` | Boolean | `false` | Whether this is the default behaviour when no cultivation behaviour has been selected; when nothing is marked, the first behaviour in the registry is used. |
| `start_condition` | `EntityCondition` | `mxt:always_true` | Condition for starting cultivation. |
| `condition` | `EntityCondition` | `mxt:always_true` | Condition for continuing cultivation; cultivation only continues while the condition is true. |
| `tick_interval` | Integer | `20` | Absorption settlement interval, range `1..72000`. |
| `aura_kinds` | Identifier[] | `[]` | Aura kinds that must all be present. |
| `costs` | `List<ResourceCost>` | `[]` | Resources consumed by each cultivation tick. |
| `absorb_amount` | `NumberProvider` | `1` | Multiplier for the natural recovery of the current realm resource during cultivation; the resource bar is filled first and the overflow enters cultivation progress. |
| `aura_costs` | `Map<Holder<resource>, NumberProvider>` | `{}` | Environment resources consumed by each cultivation tick; each resource is allocated independently, and a shortage of one entry only reduces that entry's contribution. |
| `aura_gains` | `List<ResourceGain>` | `[]` | Additional resources gained. |
| `cooldown` | Integer | `0` | Cooldown in ticks after stopping. |
| `tick_action` | `EntityAction` | `mxt:no_op` | Behaviour executed on every cultivation tick. |

Its numeric fields are evaluated with the resource and cultivation variables of the resource being cultivated (`realm_rank`, `absorbed_aura`, …) in addition to the entity variables; see [Formula Variables](../types/formula_variables.md).

## Example

```json
{
  "default": true,
  "start_condition": {"type": "mxt:always_true"},
  "condition": {"type": "mxt:always_true"},
  "tick_interval": 20,
  "aura_kinds": ["example:fire_aura"],
  "costs": [{"id": "example:stamina", "amount": 1}],
  "absorb_amount": 1.5,
  "aura_costs": {"example:qi": 2},
  "aura_gains": [{"id": "example:qi", "amount": "1 + realm_rank * 0.1"}],
  "cooldown": 100,
  "tick_action": {"type": "mxt:no_op"}
}
```

:::info Realm Restrictions
Cultivation absorption by default only restores the resource that belongs to the current realm, and the realm stage a resource belongs to can additionally restrict cultivation through its `cultivate_condition`.
:::

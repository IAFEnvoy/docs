---
title: "Ability types"
sidebar_position: 0
---

The ability type is written at the top level of the ability definition, alongside common fields such as costs and condition; do not nest another type object. For the common fields of an ability file, see [Ability definitions](../../data/ability.md).

| Type | Purpose |
| --- | --- |
| [`saturn:active`](./active.md) | Used by the player on purpose; runs its actions after the cast, cost and cooldown flow. |
| [`saturn:triggered`](./triggered.md) | Subscribes to the given game signal and runs the ability's actions when the condition holds. |
| [`saturn:modifier`](./modifier.md) | Provides attribute modifiers to the entity while the ability is active. |
| [`saturn:aura`](./aura.md) | Looks up targets within range at an interval and runs its actions. |
| [`saturn:interval`](./interval.md) | Runs its action at the given tick interval while the ability is active. |
| [`saturn:channelled`](./channelled.md) | Keeps the ability in use, paying the upkeep cost every beat and running its actions. |
| [`saturn:targeted`](./targeted.md) | Selects a target and then casts the referenced ability on it. |
| [`saturn:empty`](./empty.md) | Provides an implementation that performs no extra behaviour. |
| [`saturn:upkeep`](./upkeep.md) | Checks the host item's upkeep cost at an interval and runs an item action when payment fails. |

---
title: "Type reference"
sidebar_position: 0
---

Find types by function and context family. Each action and condition family page includes fields, defaults, JSON examples and behavior notes for all its types, regardless of when they were added.

## Action types

| Category | Type count |
| --- | --- |
| [Entity actions](./action/entity-action.md) | 56 |
| [Bi-entity actions](./action/bientity-action.md) | 22 |
| [Block actions](./action/block-action.md) | 23 |
| [Item actions](./action/item-action.md) | 19 |

## Condition types

| Category | Type count |
| --- | --- |
| [Entity conditions](./condition/entity-condition.md) | 86 |
| [Bi-entity conditions](./condition/bientity-condition.md) | 28 |
| [Block conditions](./condition/block-condition.md) | 34 |
| [Item conditions](./condition/item-condition.md) | 29 |
| [Damage conditions](./condition/damage-condition.md) | 17 |

## Other types

| Category | Type count |
| --- | --- |
| [Ability types](./ability.md) | 9 |
| [Costs](./cost.md) | 3 |
| [Number providers](./number.md) | 9 |
| [Target selectors](./target.md) | 5 |
| [Resource values](./resource-value.md) | 5 |
| [Timeline nodes](./timeline.md) | 4 |
| [State storage](./storage.md) | 14 |
| [Resource bar renderers](./bar-renderer.md) | 6 |
| [Resource bar visibility conditions](./bar-visibility.md) | 8 |
| [Resource bar contexts](./bar-context.md) | 3 |
| [Item matchers](./item-matcher.md) | 5 |
| [Information expressions](./expression.md) | 19 |
| [Entity getters](./getter.md) | 26 |
| [Triggers](./trigger.md) | 41 |

Most of these entries are type objects embedded in fields; do not create data files directly under the type name. For the directory layout and structure of standalone files, see [Data definitions](../data/index.md).

For Origins data, see [equivalent types and adaptation differences](../development/origins-ports.md). Counts include the optional `js` type, which is registered only when KubeJS is installed.

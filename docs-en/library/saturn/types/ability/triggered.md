---
title: "Triggered ability"
sidebar_position: 10
---

`saturn:triggered`

Subscribes to the given game signal and runs the ability's actions when the condition holds.

The ability type is written at the top level of the ability definition, alongside common fields such as costs and condition; do not nest another type object. For the common fields of an ability file, see [Ability definitions](../../data/ability.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:triggered` |
| `triggers` | [Trigger](../trigger/index.md) array | no | `[]` | Triggers this ability subscribes to. |
| `chance` | [Number provider](../number/index.md) | no | `1.0` | Hit chance; 0 never hits, 1 always hits. |
| `damage_condition` | [Damage condition](../damage-condition/index.md) | no | `{"type":"saturn:always"}` | Condition that filters the damage context. |
| `entity_action` | [Entity action](../entity-action/index.md) | no | `{"type":"saturn:no_op"}` | Entity action run on the ability holder or the context entity. |
| `target_selector` | [Target selector](../target/index.md) | no | `{"type":"saturn:self"}` | Selector that obtains the ability's target. |
| `target_condition` | [Bi-entity condition](../bientity-condition/index.md) | no | `{"type":"saturn:always"}` | Bi-entity condition that filters the actor and candidate targets. |
| `bi_entity_action` | [Bi-entity action](../bientity-action/index.md) | no | `{"type":"saturn:no_op"}` | Bi-entity action run on the actor and target. |
| `cooldown` | [Number provider](../number/index.md) | no | `0.0` | Cooldown length, in game ticks. |

## JSON example

```json
{
  "type": "saturn:triggered"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.ability.type.TriggeredAbilityType`. This page is based on the Codec in the current 26.1.2 source.

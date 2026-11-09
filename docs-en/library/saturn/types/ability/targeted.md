---
title: "Targeted"
sidebar_position: 10
---

`saturn:targeted`

Selects a target and then casts the referenced ability on it.

The ability type is written at the top level of the ability definition, alongside common fields such as costs and condition; do not nest another type object. For the common fields of an ability file, see [Ability definitions](../../data/ability.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:targeted` |
| `target_selector` | [Target selector](../target/index.md) | yes | — | Selector that obtains the ability's target. |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, distinguished by the field type. |
| `cooldown` | [Number provider](../number/index.md) | no | `0.0` | Cooldown length, in game ticks. |

## JSON example

```json
{
  "type": "saturn:targeted",
  "target_selector": {
    "type": "saturn:self"
  },
  "ability": "example:heal"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.ability.type.TargetedAbilityType`. This page is based on the Codec in the current 26.1.2 source.

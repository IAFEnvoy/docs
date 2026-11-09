---
title: "Status effect"
sidebar_position: 10
---

`saturn:mob_effect`

Checks whether an entity has the given status effect.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:mob_effect` |
| `effect` | Resource ID | yes | — | Status effect ID. |

## JSON example

```json
{
  "type": "saturn:mob_effect",
  "effect": "minecraft:speed"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.MobEffectCondition`. This page is based on the Codec in the current 26.1.2 source.

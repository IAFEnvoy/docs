---
title: "Can have effect"
sidebar_position: 10
---

`saturn:can_have_effect`

Checks whether an entity can receive the given status effect.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:can_have_effect` |
| `effect` | Resource ID | yes | — | Status effect ID. |

## JSON example

```json
{
  "type": "saturn:can_have_effect",
  "effect": "minecraft:speed"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.CanHaveEffectCondition`. This page is based on the Codec in the current 26.1.2 source.

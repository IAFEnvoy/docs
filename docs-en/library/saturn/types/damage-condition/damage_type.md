---
title: "Damage type"
sidebar_position: 10
---

`saturn:damage_type`

Checks the type of the damage source.

Checks the damage source, damage amount and related entities. Embedded in DamageCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:damage_type` |
| `damage_type` | Resource ID | yes | — | A vanilla damage type ID. |

## JSON example

```json
{
  "type": "saturn:damage_type",
  "damage_type": "minecraft:generic"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.damage.DamageTypeCondition`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Projectile damage"
sidebar_position: 10
---

`saturn:projectile`

Checks whether the damage comes from a projectile matching the type or condition.

Checks the damage source, damage amount and related entities. Embedded in DamageCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:projectile` |
| `projectile` | Resource ID | no | omitted | Projectile entity type ID. |
| `projectile_condition` | [Entity condition](../entity-condition/index.md) | no | `{"type":"saturn:always"}` | Condition applied to the projectile entity. |

## JSON example

```json
{
  "type": "saturn:projectile"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.damage.ProjectileDamageCondition`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Direct damage"
sidebar_position: 10
---

`saturn:directness`

Checks whether the damage is direct damage.

Checks the damage source, damage amount and related entities. Embedded in DamageCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:directness` |
| `direct` | Boolean | no | `true` | true requires direct damage, false requires indirect damage. |

## JSON example

```json
{
  "type": "saturn:directness"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.damage.DirectDamageCondition`. This page is based on the Codec in the current 26.1.2 source.

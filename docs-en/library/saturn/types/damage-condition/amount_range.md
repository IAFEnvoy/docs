---
title: "Damage range"
sidebar_position: 10
---

`saturn:amount_range`

Checks whether the damage amount is between min and max, inclusive.

Checks the damage source, damage amount and related entities. Embedded in DamageCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:amount_range` |
| `min` | [Number provider](../number/index.md) | yes | — | Lower bound. |
| `max` | [Number provider](../number/index.md) | yes | — | Upper bound. |

## JSON example

```json
{
  "type": "saturn:amount_range",
  "min": 1,
  "max": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.damage.DamageAmountRangeCondition`. This page is based on the Codec in the current 26.1.2 source.

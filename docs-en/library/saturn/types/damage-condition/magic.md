---
title: "Magic damage"
sidebar_position: 10
---

`saturn:magic`

Checks whether the damage source is magic damage.

Checks the damage source, damage amount and related entities. Embedded in DamageCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:magic` |

## JSON example

```json
{
  "type": "saturn:magic"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.damage.MagicDamageCondition`. This page is based on the Codec in the current 26.1.2 source.

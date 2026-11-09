---
title: "Damage type tag"
sidebar_position: 10
---

`saturn:damage_type_tag`

Checks whether the damage type belongs to the given tag.

Checks the damage source, damage amount and related entities. Embedded in DamageCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:damage_type_tag` |
| `tag` | Tag ID (without #) | yes | — | A registry tag, or the NBT data declared by this page. |

## JSON example

```json
{
  "type": "saturn:damage_type_tag",
  "tag": "example:tag"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.damage.DamageTypeTagCondition`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Glowing"
sidebar_position: 10
---

`saturn:glowing`

Checks whether an entity is glowing.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:glowing` |

## JSON example

```json
{
  "type": "saturn:glowing"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.GlowingCondition`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Exposed to sun"
sidebar_position: 10
---

`saturn:exposed_to_sun`

Checks whether an entity is exposed to sunlight.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:exposed_to_sun` |

## JSON example

```json
{
  "type": "saturn:exposed_to_sun"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.ExposedToSunCondition`. This page is based on the Codec in the current 26.1.2 source.

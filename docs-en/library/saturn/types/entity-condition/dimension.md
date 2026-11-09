---
title: "Dimension"
sidebar_position: 10
---

`saturn:dimension`

Checks the dimension an entity is in.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:dimension` |
| `dimension` | Resource ID | yes | — | Dimension ID. |
| `inverted` | Boolean | no | `false` | Whether to invert the check or the display direction. |

## JSON example

```json
{
  "type": "saturn:dimension",
  "dimension": "minecraft:overworld"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.DimensionCondition`. This page is based on the Codec in the current 26.1.2 source.

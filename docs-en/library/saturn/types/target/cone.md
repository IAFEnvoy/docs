---
title: "Cone target"
sidebar_position: 10
---

`saturn:cone`

Selects targets within a view cone of the given length and angle.

Used in an ability's target_selector. After the selector has gathered candidates, the ability still checks target_condition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:cone` |
| `length` | [Number provider](../number/index.md) | yes | — | Length of the selection range, in blocks. |
| `angle` | [Number provider](../number/index.md) | yes | — | Angle of the cone selection. |
| `include_actor` | Boolean | no | `false` | Whether to include the actor themselves as a candidate target. |
| `limit` | Integer | no | `0` | Upper limit on the number of targets; 0 means no limit here. |
| `order` | Enum string | no | `"nearest"` | nearest, farthest or random. Available values: `nearest`, `farthest`, `random`. |

## JSON example

```json
{
  "type": "saturn:cone",
  "length": 1,
  "angle": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.ability.target.ConeTargetSelector`. This page is based on the Codec in the current 26.1.2 source.

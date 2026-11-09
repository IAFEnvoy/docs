---
title: "Area target"
sidebar_position: 10
---

`saturn:area`

Selects targets within a radius, with optional control over the count and the ordering.

Used in an ability's target_selector. After the selector has gathered candidates, the ability still checks target_condition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:area` |
| `radius` | [Number provider](../number/index.md) | yes | — | Radius in blocks; in a resource bar it is in pixels. |
| `include_actor` | Boolean | no | `false` | Whether to include the actor themselves as a candidate target. |
| `limit` | Integer | no | `0` | Upper limit on the number of targets; 0 means no limit here. |
| `order` | Enum string | no | `"nearest"` | nearest, farthest or random. Available values: `nearest`, `farthest`, `random`. |

## JSON example

```json
{
  "type": "saturn:area",
  "radius": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.ability.target.AreaTargetSelector`. This page is based on the Codec in the current 26.1.2 source.

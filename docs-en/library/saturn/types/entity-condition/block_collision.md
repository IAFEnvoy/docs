---
title: "Block collision"
sidebar_position: 10
---

`saturn:block_collision`

Checks whether the offset entity bounding box collides with blocks.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_collision` |
| `offset_x` | Number | no | `0.0` | Offset on the X axis. |
| `offset_y` | Number | no | `0.0` | Offset on the Y axis. |
| `offset_z` | Number | no | `0.0` | Offset on the Z axis. |

## JSON example

```json
{
  "type": "saturn:block_collision"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.BlockCollisionCondition`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Line of sight"
sidebar_position: 10
---

`saturn:can_see`

Checks the line of sight between the two sides with a block and fluid ray.

Checks the relationship between the actor and the target. Swapping the two sides changes the meaning of some conditions.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:can_see` |
| `shape_type` | Object | no | `"visual"` | Block shape mode used by the line-of-sight ray. Available values: `collider`, `outline`, `visual`, `falldamage_resetting`. |
| `fluid_handling` | Object | no | `"none"` | How the line-of-sight ray handles fluids. Available values: `none`, `source_only`, `any`, `water`. |

## JSON example

```json
{
  "type": "saturn:can_see"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.bientity.CanSeeCondition`. This page is based on the Codec in the current 26.1.2 source.

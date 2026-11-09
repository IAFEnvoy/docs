---
title: "Relative rotation"
sidebar_position: 10
---

`saturn:relative_rotation`

Compares the rotation difference between the actor and the target on the given axes.

Checks the relationship between the actor and the target. Swapping the two sides changes the meaning of some conditions.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:relative_rotation` |
| `axis` | Array of enum strings | no | `["x","y","z"]` | Rotation axes included in the calculation. Available values: `x`, `y`, `z`. |
| `actor_rotation` | Enum string | no | `"head"` | Whether the actor uses head or body rotation. Available values: `head`, `body`. |
| `target_rotation` | Enum string | no | `"body"` | Whether the target uses head or body rotation. Available values: `head`, `body`. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

## JSON example

```json
{
  "type": "saturn:relative_rotation",
  "comparison": ">=",
  "compare_to": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.bientity.RelativeRotationCondition`. This page is based on the Codec in the current 26.1.2 source.

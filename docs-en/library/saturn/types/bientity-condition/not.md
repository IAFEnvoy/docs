---
title: "Negate"
sidebar_position: 10
---

`saturn:not`

Inverts the match result of the sub-condition.

Checks the relationship between the actor and the target. Swapping the two sides changes the meaning of some conditions.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:not` |
| `condition` | [Bi-entity condition](index.md) | yes | — | The condition to check. |

## JSON example

```json
{
  "type": "saturn:not",
  "condition": {
    "type": "saturn:always"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.bientity.meta.NotCondition`. This page is based on the Codec in the current 26.1.2 source.

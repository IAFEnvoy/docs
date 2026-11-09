---
title: "Either"
sidebar_position: 10
---

`saturn:either`

Checks the same entity condition against the actor and the target; matches when at least one side holds.

Checks the relationship between the actor and the target. Swapping the two sides changes the meaning of some conditions.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:either` |
| `condition` | [Entity condition](../entity-condition/index.md) | yes | — | The condition to check. |

## JSON example

```json
{
  "type": "saturn:either",
  "condition": {
    "type": "saturn:always"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.bientity.meta.EitherCondition`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Recursive riding"
sidebar_position: 10
---

`saturn:riding_recursive`

Checks multi-level riding relationships.

Checks the relationship between the actor and the target. Swapping the two sides changes the meaning of some conditions.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:riding_recursive` |

## JSON example

```json
{
  "type": "saturn:riding_recursive"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.bientity.RidingRecursiveCondition`. This page is based on the Codec in the current 26.1.2 source.

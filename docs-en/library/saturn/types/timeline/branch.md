---
title: "Conditional node"
sidebar_position: 10
---

`saturn:branch`

Chooses the next path inside a timeline based on a condition.

A timeline node only describes the behavior of this step. Node IDs, successors and the whole timeline are assembled by the consumer; it is not a standalone dynamic registry.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:branch` |
| `condition` | [Entity condition](../entity-condition/index.md) | yes | — | The condition to check. |

## JSON example

```json
{
  "type": "saturn:branch",
  "condition": {
    "type": "saturn:always"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.timeline.builtin.BranchEntry`. This page is based on the Codec in the current 26.1.2 source.

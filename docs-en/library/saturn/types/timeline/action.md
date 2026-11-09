---
title: "Run action"
sidebar_position: 10
---

`saturn:action`

Runs an entity action inside a timeline.

A timeline node only describes the behavior of this step. Node IDs, successors and the whole timeline are assembled by the consumer; it is not a standalone dynamic registry.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:action` |
| `action` | [Entity action](../entity-action/index.md) | yes | — | The sub-action to run; its kind must match what this field expects. |

## JSON example

```json
{
  "type": "saturn:action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.timeline.builtin.ActionEntry`. This page is based on the Codec in the current 26.1.2 source.

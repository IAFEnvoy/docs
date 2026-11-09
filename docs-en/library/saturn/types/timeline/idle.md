---
title: "Wait duration"
sidebar_position: 10
---

`saturn:idle`

Waits for the given number of ticks inside a timeline.

A timeline node only describes the behavior of this step. Node IDs, successors and the whole timeline are assembled by the consumer; it is not a standalone dynamic registry.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:idle` |
| `duration` | [Number provider](../number/index.md) | yes | — | Duration, usually in game ticks. |

## JSON example

```json
{
  "type": "saturn:idle",
  "duration": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.timeline.builtin.IdleEntry`. This page is based on the Codec in the current 26.1.2 source.

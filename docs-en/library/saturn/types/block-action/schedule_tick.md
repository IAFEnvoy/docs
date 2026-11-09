---
title: "Schedule block tick"
sidebar_position: 10
---

`saturn:schedule_tick`

Schedules a delayed tick for the block at the context position.

Acts on the world and block position given by the context. It is not a standalone data pack file; embed it in a field that requires a BlockAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:schedule_tick` |
| `delay` | Integer | yes | — | Delay in ticks. |

## JSON example

```json
{
  "type": "saturn:schedule_tick",
  "delay": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.block.ScheduleTickAction`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Wait for condition"
sidebar_position: 10
---

`saturn:wait_for`

Waits until an entity condition holds, with an optional timeout and timeout result.

A timeline node only describes the behavior of this step. Node IDs, successors and the whole timeline are assembled by the consumer; it is not a standalone dynamic registry.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:wait_for` |
| `condition` | [Entity condition](../entity-condition/index.md) | yes | — | The condition to check. |
| `timeout` | [Number provider](../number/index.md) | no | omitted | Optional timeout in ticks; when omitted, no timeout is set. |
| `on_timeout` | Enum string | no | `"fail"` | Timeline result used when the timeout is reached. Available values: `fail`, `finish`. |

## JSON example

```json
{
  "type": "saturn:wait_for",
  "condition": {
    "type": "saturn:always"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.timeline.builtin.WaitForEntry`. This page is based on the Codec in the current 26.1.2 source.

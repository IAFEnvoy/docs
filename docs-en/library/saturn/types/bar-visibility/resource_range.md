---
title: "Resource range"
sidebar_position: 10
---

`saturn:resource_range`

Shown while the current resource is within the given range.

Used for ResourceBar.visibility; decides whether the bar is shown in the resource bar context.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:resource_range` |
| `min` | Number | yes | — | Lower bound. |
| `max` | Number | yes | — | Upper bound. |

## JSON example

```json
{
  "type": "saturn:resource_range",
  "min": 1,
  "max": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resourcebar.builtin.visibility.RangeVisibility`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Maximum"
sidebar_position: 10
---

`saturn:max`

Reads the maximum value of the resource.

Reads a value in the resource context; it does not add or deduct resources.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:max` |

## JSON example

```json
{
  "type": "saturn:max"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resource.builtin.MaximumResourceValueProvider`. This page is based on the Codec in the current 26.1.2 source.

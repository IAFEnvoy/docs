---
title: "Missing amount"
sidebar_position: 10
---

`saturn:missing`

Returns `max(0, resource maximum − current value)`; it is not a missing or error marker.

Reads a value in the resource context; it does not add or deduct resources.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:missing` |

## JSON example

```json
{
  "type": "saturn:missing"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resource.builtin.MissingResourceValueProvider`. This page is based on the Codec in the current 26.1.2 source.

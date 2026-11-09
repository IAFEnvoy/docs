---
title: "Current value"
sidebar_position: 10
---

`saturn:current`

Reads the current value of the resource.

Reads a value in the resource context; it does not add or deduct resources.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:current` |

## JSON example

```json
{
  "type": "saturn:current"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resource.builtin.CurrentResourceValueProvider`. This page is based on the Codec in the current 26.1.2 source.

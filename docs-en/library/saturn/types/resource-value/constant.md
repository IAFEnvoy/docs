---
title: "Resource constant"
sidebar_position: 10
---

`saturn:constant`

Ignores the current resource and returns the defined fixed value.

Reads a value in the resource context; it does not add or deduct resources.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:constant` |
| `value` | [Number provider](../number/index.md) | yes | — | Value or expression used by this type. |

## JSON example

```json
{
  "type": "saturn:constant",
  "value": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resource.builtin.ConstantResourceValueProvider`. This page is based on the Codec in the current 26.1.2 source.

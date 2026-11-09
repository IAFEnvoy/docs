---
title: "Constant"
sidebar_position: 10
---

`saturn:constant`

Returns the fixed value in the definition.

A NumberProvider can be written as a number, a formula string, or an object with a `type` from this section. Game-time fields default to ticks; 20 ticks is usually one second.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:constant` |
| `value` | Number | yes | — | The value or expression used by this type. |

## JSON example

```json
{
  "type": "saturn:constant",
  "value": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.util.formula.number.Constant`. This page is based on the Codec in the current 26.1.2 source.

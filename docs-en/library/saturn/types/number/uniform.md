---
title: "Uniform random"
sidebar_position: 10
---

`saturn:uniform`

Samples uniformly between the given minimum and maximum.

A NumberProvider can be written as a number, a formula string, or an object with a `type` from this section. Game-time fields default to ticks; 20 ticks is usually one second.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:uniform` |
| `min` | [Number provider](../number/index.md) | yes | — | Lower bound. |
| `max` | [Number provider](../number/index.md) | yes | — | Upper bound. |

## JSON example

```json
{
  "type": "saturn:uniform",
  "min": 1,
  "max": 5
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.util.formula.number.Uniform`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Context variable"
sidebar_position: 10
---

`saturn:context_variable`

Reads a context or registered formula variable; unknown variables can use a fallback value.

A NumberProvider can be written as a number, a formula string, or an object with a `type` from this section. Game-time fields default to ticks; 20 ticks is usually one second.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:context_variable` |
| `variable` | String | yes | — | Formula variable name that is registered or present in the context. |
| `fallback` | Number | no | `0.0` | Fallback value used when there is no matching or known value. |

## JSON example

```json
{
  "type": "saturn:context_variable",
  "variable": "health",
  "fallback": 0
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.util.formula.number.ContextVariable`. This page is based on the Codec in the current 26.1.2 source.

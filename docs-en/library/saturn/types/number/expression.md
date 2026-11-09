---
title: "Formula"
sidebar_position: 10
---

`saturn:expression`

Evaluates an exp4j expression; params can override expression parameters.

A NumberProvider can be written as a number, a formula string, or an object with a `type` from this section. Game-time fields default to ticks; 20 ticks is usually one second.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:expression` |
| `expression` | String | yes | — | exp4j formula string. |
| `params` | String | no | `{}` | Parameter object passed to the script or formula. |

## JSON example

```json
{
  "type": "saturn:expression",
  "expression": "base + 2",
  "params": {
    "base": 8
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.util.formula.number.Expression`. This page is based on the Codec in the current 26.1.2 source.

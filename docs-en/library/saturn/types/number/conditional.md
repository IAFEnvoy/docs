---
title: "Conditional number"
sidebar_position: 10
---

`saturn:conditional`

Checks entity conditions in order and uses the value of the first matching branch.

A NumberProvider can be written as a number, a formula string, or an object with a `type` from this section. Game-time fields default to ticks; 20 ticks is usually one second.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:conditional` |
| `branches` | Array of branch objects | no | `[]` | Ordered conditional branches; each entry contains condition and value. |
| `fallback` | Number or formula string | no | omitted | Fallback value used when there is no matching or known value. |

## branches entries

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `condition` | Entity condition | yes | — | Checked in order; the first matching branch takes effect. |
| `value` | Number provider | yes | — | Value of this branch. |

## JSON example

```json
{
  "type": "saturn:conditional",
  "branches": [
    {
      "condition": {
        "type": "saturn:sneaking"
      },
      "value": 2
    }
  ],
  "fallback": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.util.formula.number.Conditional`. This page is based on the Codec in the current 26.1.2 source.

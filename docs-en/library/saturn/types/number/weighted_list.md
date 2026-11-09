---
title: "Weighted random"
sidebar_position: 10
---

`saturn:weighted_list`

Picks a value from the distribution entries by weight.

A NumberProvider can be written as a number, a formula string, or an object with a `type` from this section. Game-time fields default to ticks; 20 ticks is usually one second.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:weighted_list` |
| `distribution` | Array of weighted entries (value, weight) | yes | — | Weighted entry array; each entry contains a value and a weight. |

Each entry contains a number provider `value` and an integer `weight`; the default weight is 1. The list must have at least one entry, negative weights are treated as 0, and when the total weight is not positive a diagnostic is logged and 0 is returned.

## JSON example

```json
{
  "type": "saturn:weighted_list",
  "distribution": [
    {
      "value": 1,
      "weight": 3
    },
    {
      "value": 5,
      "weight": 1
    }
  ]
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.util.formula.number.WeightedList`. This page is based on the Codec in the current 26.1.2 source.

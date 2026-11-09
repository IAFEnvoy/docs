---
title: "Binomial"
sidebar_position: 10
---

`saturn:binomial`

Generates a binomial random value from n trials and a per-trial probability p.

A NumberProvider can be written as a number, a formula string, or an object with a `type` from this section. Game-time fields default to ticks; 20 ticks is usually one second.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:binomial` |
| `n` | Number provider | yes | — | Number of trials in the binomial distribution. |
| `p` | Number provider | yes | — | Per-trial success probability of the binomial distribution. |

## JSON example

```json
{
  "type": "saturn:binomial",
  "n": 4,
  "p": 0.5
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.util.formula.number.Binomial`. This page is based on the Codec in the current 26.1.2 source.

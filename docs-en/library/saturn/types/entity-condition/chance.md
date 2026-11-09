---
title: "Chance"
sidebar_position: 10
---

`saturn:chance`

Decides whether the check succeeds based on a given chance.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:chance` |
| `chance` | Number | yes | — | Hit chance; 0 never matches, 1 always matches. Codec range: `0.0D, 1.0D`. |

## JSON example

```json
{
  "type": "saturn:chance",
  "chance": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.meta.ChanceCondition`. This page is based on the Codec in the current 26.1.2 source.

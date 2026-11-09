---
title: "Specific score"
sidebar_position: 10
---

`saturn:score`

Reads the score of the given objective.

The full set of EntityValueGetter parameters determines the query identity. It reads only the passed view or an already captured snapshot; a missing value is not the same as a known 0, false, or empty collection.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:score` |
| `objective` | String | yes | — | Scoreboard objective name. |

## JSON example

```json
{
  "type": "saturn:score",
  "objective": "kills"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.getter.builtin.ScoreGetter`. This page is based on the Codec in the current 26.1.2 source.

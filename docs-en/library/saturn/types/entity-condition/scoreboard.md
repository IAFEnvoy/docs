---
title: "Scoreboard score"
sidebar_position: 10
---

`saturn:scoreboard`

Compares scores under the given scoreboard objective.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:scoreboard` |
| `name` | String | no | omitted | Local variable name, scoreboard holder name or configuration name. |
| `objective` | String | yes | — | Scoreboard objective name. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

## JSON example

```json
{
  "type": "saturn:scoreboard",
  "objective": "kills",
  "comparison": ">=",
  "compare_to": 5,
  "name": "Steve"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.ScoreboardCondition`. This page is based on the Codec in the current 26.1.2 source.

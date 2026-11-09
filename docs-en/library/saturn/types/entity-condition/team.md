---
title: "Team"
sidebar_position: 10
---

`saturn:team`

Reads or checks the scoreboard team of an entity.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:team` |
| `team` | String | no | omitted | Scoreboard team name. |

## JSON example

```json
{
  "type": "saturn:team"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.TeamCondition`. This page is based on the Codec in the current 26.1.2 source.

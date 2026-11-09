---
title: "Team"
sidebar_position: 10
---

`saturn:team`

Reads or checks the scoreboard team of the entity.

Checks the relationship between the actor and the target. Swapping the two sides changes the meaning of some conditions.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:team` |
| `same_team` | Boolean | no | `true` | true requires the same team, false requires different teams. |

## JSON example

```json
{
  "type": "saturn:team"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.bientity.TeamBiEntityCondition`. This page is based on the Codec in the current 26.1.2 source.

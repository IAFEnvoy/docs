---
title: "Alliance relation"
sidebar_position: 10
---

`saturn:relation`

Checks whether the actor and the target are allied to each other.

Checks the relationship between the actor and the target. Swapping the two sides changes the meaning of some conditions.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:relation` |
| `allied` | Boolean | no | `true` | Expected alliance state. |

## JSON example

```json
{
  "type": "saturn:relation"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.bientity.RelationBiEntityCondition`. This page is based on the Codec in the current 26.1.2 source.

---
title: "All true"
sidebar_position: 10
---

`saturn:and`

Matches only when every sub-condition holds.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:and` |
| `conditions` | Array of conditions of the same kind | yes | — | List of sub-conditions of the same kind. |

## JSON example

```json
{
  "type": "saturn:and",
  "conditions": []
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.meta.AndEntityCondition`. This page is based on the Codec in the current 26.1.2 source.

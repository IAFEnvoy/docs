---
title: "Weighted choice"
sidebar_position: 10
---

`saturn:choice`

Picks one action at random by weight and runs it.

The context contains an actor (the initiator) and a target. The same ID may have different fields in the entity action and bi-entity action registries; the two kinds are not interchangeable.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:choice` |
| `actions` | Array of weighted entries (value, weight) | yes | — | Array of sub-actions; sequential kinds run in order, weighted kinds pick by value and weight. |

Each entry contains value and weight; see [Weighted entries](../../data/common.md#weighted-entries). Negative weights are treated as 0; when the total weight is 0, an entry is picked uniformly from the non-empty action list. An empty action list does nothing.

## JSON example

```json
{
  "type": "saturn:choice",
  "actions": [
    {
      "value": {
        "type": "saturn:no_op"
      },
      "weight": 1
    }
  ]
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.bientity.meta.ChoiceAction`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Mount"
sidebar_position: 10
---

`saturn:riding`

Checks whether the mount of an entity satisfies a bi-entity condition.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:riding` |
| `bientity_condition` | [Bi-entity condition](../bientity-condition/index.md) | no | `{"type":"saturn:always"}` | The condition that filters both sides of the context. |

## JSON example

```json
{
  "type": "saturn:riding"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.RidingCondition`. This page is based on the Codec in the current 26.1.2 source.

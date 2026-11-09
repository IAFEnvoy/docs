---
title: "Resource minimum"
sidebar_position: 10
---

`saturn:resource_compare`

Checks whether the current value of the given resource reaches at least min.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:resource_compare` |
| `resource` | Resource ID | yes | — | Registered Saturn resource ID. |
| `min` | [Number provider](../number/index.md) | yes | — | Lower bound. |

## JSON example

```json
{
  "type": "saturn:resource_compare",
  "resource": "example:mana",
  "min": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.ResourceCompareEntityCondition`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Entity type"
sidebar_position: 10
---

`saturn:entity_type`

Checks whether the entity is of the given type.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:entity_type` |
| `entity_type` | Resource ID | yes | — | Entity type ID. |

## JSON example

```json
{
  "type": "saturn:entity_type",
  "entity_type": "minecraft:arrow"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.EntityTypeCondition`. This page is based on the Codec in the current 26.1.2 source.

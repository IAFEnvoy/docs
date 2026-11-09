---
title: "Entity type tag"
sidebar_position: 10
---

`saturn:entity_tag`

Checks whether the entity type belongs to the given tag.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:entity_tag` |
| `tag` | Tag ID (with #) | yes | — | Registry tag, or the NBT data declared on this page. |

## JSON example

```json
{
  "type": "saturn:entity_tag",
  "tag": "#example:tag"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.EntityTypeTagCondition`. This page is based on the Codec in the current 26.1.2 source.

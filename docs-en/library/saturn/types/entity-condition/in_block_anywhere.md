---
title: "Touching blocks"
sidebar_position: 10
---

`saturn:in_block_anywhere`

Counts the blocks inside the entity bounding box that satisfy a condition.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:in_block_anywhere` |
| `block_condition` | [Block condition](../block-condition/index.md) | yes | — | Condition checked against the target block. |
| `comparison` | Comparison object | yes | — | Comparison operator; see the common data types for the comparison object fields. |

## JSON example

```json
{
  "type": "saturn:in_block_anywhere",
  "block_condition": {
    "type": "saturn:always"
  },
  "comparison": {
    "comparison": ">=",
    "compare_to": 1
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.InBlockAnywhereCondition`. This page is based on the Codec in the current 26.1.2 source.

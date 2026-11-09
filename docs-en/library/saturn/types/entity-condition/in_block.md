---
title: "Inside block"
sidebar_position: 10
---

`saturn:in_block`

Checks whether the block an entity is inside satisfies a condition.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:in_block` |
| `block_condition` | [Block condition](../block-condition/index.md) | yes | — | The condition to check for the target block. |

## JSON example

```json
{
  "type": "saturn:in_block",
  "block_condition": {
    "type": "saturn:always"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.InBlockCondition`. This page is based on the Codec in the current 26.1.2 source.

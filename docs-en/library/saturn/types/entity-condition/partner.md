---
title: "Nearby entities"
sidebar_position: 10
---

`saturn:partner`

Checks nearby entities within a range using a bi-entity condition.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:partner` |
| `range` | Number | no | `5.0` | Check range in blocks. Codec range: `0.5D, 32.0D`. |
| `count` | Count range object (min, max) | no | `{"min":1}` | Range for the number of nearby living entities: min defaults to 1, max may be omitted; requires 0 ≤ min ≤ max. |
| `bientity_condition` | [Bi-entity condition](../bientity-condition/index.md) | no | `{"type":"saturn:always"}` | The condition that filters both sides of the context. |

## JSON example

```json
{
  "type": "saturn:partner"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.PartnerEntityCondition`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Specific attribute"
sidebar_position: 10
---

`saturn:attribute`

Reads the base or effective value of the given attribute from the captured attributes.

The full set of EntityValueGetter parameters determines the query identity. It reads only the passed view or an already captured snapshot; a missing value is not the same as a known 0, false, or empty collection.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:attribute` |
| `attribute` | Resource ID | yes | — | Attribute ID. |
| `value` | Enum string | no | `"effective"` | Projection field to read; this is not an information expression. Available values: `base`, `effective`. |

## JSON example

```json
{
  "type": "saturn:attribute",
  "attribute": "minecraft:max_health",
  "value": "effective"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.getter.builtin.AttributeGetter`. This page is based on the Codec in the current 26.1.2 source.

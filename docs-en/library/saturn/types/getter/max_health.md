---
title: "Max health"
sidebar_position: 10
---

`saturn:max_health`

Reads the entity's max health.

The full set of EntityValueGetter parameters determines the query identity. It reads only the passed view or an already captured snapshot; a missing value is not the same as a known 0, false, or empty collection.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:max_health` |

## JSON example

```json
{
  "type": "saturn:max_health"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.getter.builtin.MaxHealthGetter`. This page is based on the Codec in the current 26.1.2 source.

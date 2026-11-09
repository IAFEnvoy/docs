---
title: "Always true"
sidebar_position: 10
---

`saturn:always`

The condition is always true.

Checks the damage source, damage amount and related entities. Embedded in DamageCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:always` |

## JSON example

```json
{
  "type": "saturn:always"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.AlwaysCondition`. This page is based on the Codec in the current 26.1.2 source.

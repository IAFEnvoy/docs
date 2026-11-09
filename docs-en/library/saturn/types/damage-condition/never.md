---
title: "Never"
sidebar_position: 10
---

`saturn:never`

The condition is always false.

Checks the damage source, damage amount and related entities. Embedded in DamageCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:never` |

## JSON example

```json
{
  "type": "saturn:never"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.NeverCondition`. This page is based on the Codec in the current 26.1.2 source.

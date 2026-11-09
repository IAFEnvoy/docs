---
title: "Self target"
sidebar_position: 10
---

`saturn:self`

Targets the user themselves.

Used in an ability's target_selector. After the selector has gathered candidates, the ability still checks target_condition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:self` |

## JSON example

```json
{
  "type": "saturn:self"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.ability.target.SelfTargetSelector`. This page is based on the Codec in the current 26.1.2 source.

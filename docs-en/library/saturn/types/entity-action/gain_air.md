---
title: "Add air"
sidebar_position: 10
---

`saturn:gain_air`

Modifies the entity's remaining air.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:gain_air` |
| `value` | Integer | yes | — | The value or expression used by this type. |

## JSON example

```json
{
  "type": "saturn:gain_air",
  "value": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.GainAirAction`. This page is based on the Codec in the current 26.1.2 source.

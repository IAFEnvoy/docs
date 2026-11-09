---
title: "Set no gravity"
sidebar_position: 10
---

`saturn:set_no_gravity`

Controls whether the entity ignores gravity.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:set_no_gravity` |
| `no_gravity` | Boolean | no | `true` | Whether no-gravity is enabled. |

## JSON example

```json
{
  "type": "saturn:set_no_gravity"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.SetNoGravityAction`. This page is based on the Codec in the current 26.1.2 source.

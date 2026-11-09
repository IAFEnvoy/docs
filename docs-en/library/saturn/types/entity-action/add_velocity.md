---
title: "Modify velocity"
sidebar_position: 10
---

`saturn:add_velocity`

Adds velocity, or replaces it with the given vector.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:add_velocity` |
| `x` | Number | no | `0.0` | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | Number | no | `0.0` | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | Number | no | `0.0` | Z coordinate, offset or vector component, depending on this page's behavior. |
| `space` | Enum string | no | `"world"` | Vector coordinate space. Available values: `world`, `local`, `local_horizontal`, `local_horizontal_normalized`, `velocity`, `velocity_normalized`, `velocity_horizontal`, `velocity_horizontal_normalized`. |
| `set` | Boolean | no | `false` | true replaces the velocity with the given vector; false adds to it. |

## JSON example

```json
{
  "type": "saturn:add_velocity"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.AddVelocityAction`. This page is based on the Codec in the current 26.1.2 source.

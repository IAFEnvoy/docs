---
title: "Modify velocity"
sidebar_position: 10
---

`saturn:add_velocity`

Adds velocity, or replaces it with the given vector.

The context contains an actor (the initiator) and a target. The same ID may have different fields in the entity action and bi-entity action registries; the two kinds are not interchangeable.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:add_velocity` |
| `x` | Number | no | `0.0` | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | Number | no | `0.0` | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | Number | no | `0.0` | Z coordinate, offset or vector component, depending on this page's behavior. |
| `reference` | Enum string | no | `"position"` | Reference direction used by bi-entity velocity. Available values: `position`, `rotation`. |
| `client` | Boolean | no | `true` | Whether to apply on the client. |
| `server` | Boolean | no | `true` | Whether to apply on the server. |
| `set` | Boolean | no | `false` | true replaces the velocity with the given vector; false adds to it. |

## JSON example

```json
{
  "type": "saturn:add_velocity"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.bientity.AddVelocityAction`. This page is based on the Codec in the current 26.1.2 source.

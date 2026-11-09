---
title: "Teleport"
sidebar_position: 10
---

`saturn:teleport`

Changes the position of the entity.

The context contains an actor (the initiator) and a target. The same ID may have different fields in the entity action and bi-entity action registries; the two kinds are not interchangeable.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:teleport` |
| `teleport_actor` | Boolean | no | `false` | The teleport_actor parameter of this type. |
| `teleport_target` | Boolean | no | `true` | The teleport_target parameter of this type. |
| `rotate` | Boolean | no | `false` | The rotate parameter of this type. |

## JSON example

```json
{
  "type": "saturn:teleport"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.bientity.TeleportAction`. This page is based on the Codec in the current 26.1.2 source.

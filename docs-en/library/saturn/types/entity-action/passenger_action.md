---
title: "Passenger action"
sidebar_position: 10
---

`saturn:passenger_action`

Runs an action on the passengers of the entity, and can walk multiple levels of passengers recursively.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:passenger_action` |
| `action` | [Entity action](index.md) | no | `{"type":"saturn:no_op"}` | The sub-action to run; its kind must match what this field expects. |
| `bientity_action` | [Bi-entity action](../bientity-action/index.md) | no | `{"type":"saturn:no_op"}` | Action run between the two sides of the context. |
| `bientity_condition` | [Bi-entity condition](../bientity-condition/index.md) | no | `{"type":"saturn:always"}` | Condition that filters the two sides of the context. |
| `recursive` | Boolean | no | `false` | Whether to walk the riding or passenger chain recursively. |

## JSON example

```json
{
  "type": "saturn:passenger_action"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.PassengerAction`. This page is based on the Codec in the current 26.1.2 source.

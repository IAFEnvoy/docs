---
title: "Self bi-entity action"
sidebar_position: 10
---

`saturn:self_bientity_action`

Runs a bi-entity action with the same entity as both actor and target.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:self_bientity_action` |
| `action` | [Bi-entity action](../bientity-action/index.md) | yes | — | The sub-action to run; its kind must match what this field expects. |

## JSON example

```json
{
  "type": "saturn:self_bientity_action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.SelfBiEntityAction`. This page is based on the Codec in the current 26.1.2 source.

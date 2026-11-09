---
title: "Target action"
sidebar_position: 10
---

`saturn:target_action`

Hands the target of the bi-entity context to an entity action.

The context contains an actor (the initiator) and a target. The same ID may have different fields in the entity action and bi-entity action registries; the two kinds are not interchangeable.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:target_action` |
| `action` | [Entity action](../entity-action/index.md) | yes | — | The sub-action to run; its kind must match what this field expects. |
| `use_target_position` | Boolean | no | `false` | Whether to use the target's position as the execution position. |

## JSON example

```json
{
  "type": "saturn:target_action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.bientity.meta.TargetAction`. This page is based on the Codec in the current 26.1.2 source.

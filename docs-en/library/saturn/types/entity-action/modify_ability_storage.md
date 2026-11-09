---
title: "Modify ability storage"
sidebar_position: 10
---

`saturn:modify_ability_storage`

Writes a state of the given kind into the storage of the target ability.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:modify_ability_storage` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `value` | [State storage](../storage/index.md) | yes | — | The value or expression used by this type. |

Only storage kinds that the ability has already declared are modified; when a kind is not declared, a warning is logged and the entry is skipped. Regular ability cooldowns and charges are maintained by the activation flow, so they do not need to be overwritten manually every time.

## JSON example

```json
{
  "type": "saturn:modify_ability_storage",
  "ability": "example:heal",
  "value": {
    "type": "saturn:cooldown",
    "duration": 40
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.ModifyAbilityStorageAction`. This page is based on the Codec in the current 26.1.2 source.

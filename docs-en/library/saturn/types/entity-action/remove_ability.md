---
title: "Remove ability"
sidebar_position: 10
---

`saturn:remove_ability`

Removes the ability granted by the given source; abilities from other sources are not affected.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:remove_ability` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `source` | Resource ID | yes | — | Input collection, resource path or context parameter; see the usage on this page. |

## JSON example

```json
{
  "type": "saturn:remove_ability",
  "ability": "example:heal",
  "source": "example:manual"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.RemoveAbilityAction`. This page is based on the Codec in the current 26.1.2 source.

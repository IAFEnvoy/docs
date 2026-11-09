---
title: "Grant ability"
sidebar_position: 10
---

`saturn:grant_ability`

Grants an ability to the entity under the given source ID.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:grant_ability` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `source` | Resource ID | yes | — | Input collection, resource path or context parameter; see the usage on this page. |

## JSON example

```json
{
  "type": "saturn:grant_ability",
  "ability": "example:heal",
  "source": "example:manual"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.GrantAbilityAction`. This page is based on the Codec in the current 26.1.2 source.

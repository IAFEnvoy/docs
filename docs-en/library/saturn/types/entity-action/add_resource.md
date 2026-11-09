---
title: "Add resource"
sidebar_position: 10
---

`saturn:add_resource`

Adds to the current value of the given Saturn resource.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:add_resource` |
| `resource` | Resource ID | yes | — | ID of a registered Saturn resource. |
| `amount` | [Number provider](../number/index.md) | yes | — | Amount or value; a number provider may be a number, a formula string or an object with a type. |

## JSON example

```json
{
  "type": "saturn:add_resource",
  "resource": "example:mana",
  "amount": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.AddResourceAction`. This page is based on the Codec in the current 26.1.2 source.

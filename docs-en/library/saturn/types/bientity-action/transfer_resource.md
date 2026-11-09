---
title: "Transfer resource"
sidebar_position: 10
---

`saturn:transfer_resource`

Transfers the given Saturn resource between the actor and the target.

The context contains an actor (the initiator) and a target. The same ID may have different fields in the entity action and bi-entity action registries; the two kinds are not interchangeable.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:transfer_resource` |
| `resource` | Resource ID | yes | — | A registered Saturn resource ID. |
| `amount` | [Number provider](../number/index.md) | yes | — | Amount or value; a number provider may be a number, a formula string or an object with a type. |

## JSON example

```json
{
  "type": "saturn:transfer_resource",
  "resource": "example:mana",
  "amount": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.bientity.TransferResourceBiEntityAction`. This page is based on the Codec in the current 26.1.2 source.

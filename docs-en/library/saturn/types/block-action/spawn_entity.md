---
title: "Spawn entity"
sidebar_position: 10
---

`saturn:spawn_entity`

Spawns an entity at the position given by the context or at the specified coordinates.

Acts on the world and block position given by the context. It is not a standalone data pack file; embed it in a field that requires a BlockAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:spawn_entity` |
| `entity_type` | Resource ID | yes | — | Entity type ID. |
| `tag` | Object | no | omitted | Registry tag, or the NBT data declared on this page. |
| `entity_action` | [Entity action](../entity-action/index.md) | no | `{"type":"saturn:no_op"}` | Entity action run on the ability holder or the context entity. |

## JSON example

```json
{
  "type": "saturn:spawn_entity",
  "entity_type": "minecraft:arrow"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.block.SpawnEntityAction`. This page is based on the Codec in the current 26.1.2 source.

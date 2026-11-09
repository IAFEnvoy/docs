---
title: "Explode"
sidebar_position: 10
---

`saturn:explode`

Creates an explosion at the context position, with configurable destruction behavior and protection conditions.

Acts on the world and block position given by the context. It is not a standalone data pack file; embed it in a field that requires a BlockAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:explode` |
| `power` | Number | yes | — | Explosion power. |
| `interaction` | Enum string | no | `"mob"` | How the explosion interacts with blocks. Available values: `none`, `block`, `mob`, `tnt`, `trigger`. |
| `indestructible` | [Block condition](../block-condition/index.md) | no | omitted | Condition for blocks that are protected from this explosion. |
| `create_fire` | Boolean | no | `false` | Whether the explosion tries to create fire. |

## JSON example

```json
{
  "type": "saturn:explode",
  "power": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.block.ExplodeAction`. This page is based on the Codec in the current 26.1.2 source.

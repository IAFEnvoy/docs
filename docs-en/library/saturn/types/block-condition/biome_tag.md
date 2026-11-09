---
title: "Biome tag"
sidebar_position: 10
---

`saturn:biome_tag`

Checks whether the biome at the current position belongs to the given tag.

Checks the block or environment at the context position. Embedded in BlockCondition fields.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:biome_tag` |
| `tag` | Tag ID (with #) | yes | — | Registry tag, or the NBT data declared on this page. |

## JSON example

```json
{
  "type": "saturn:biome_tag",
  "tag": "#example:tag"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.block.BiomeTagBlockCondition`. This page is based on the Codec in the current 26.1.2 source.

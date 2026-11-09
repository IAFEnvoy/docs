---
title: "Specific effect"
sidebar_position: 10
---

`saturn:effect`

Reads the amplifier or duration of the given mob effect.

The full set of EntityValueGetter parameters determines the query identity. It reads only the passed view or an already captured snapshot; a missing value is not the same as a known 0, false, or empty collection.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:effect` |
| `effect` | Resource ID | yes | — | Mob effect ID. |
| `value` | Enum string | no | `"amplifier"` | Selects the projected field to read; it is not an information expression. Available values: `amplifier`, `duration`. |

## JSON example

```json
{
  "type": "saturn:effect",
  "effect": "minecraft:speed",
  "value": "amplifier"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.getter.builtin.EffectGetter`. This page is based on the Codec in the current 26.1.2 source.

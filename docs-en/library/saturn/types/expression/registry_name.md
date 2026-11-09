---
title: "Registry name"
sidebar_position: 10
---

`saturn:registry_name`

Resolves the display name from a registry ID and an entry ID.

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:registry_name` |
| `registry` | Resource ID | yes | — | Registry ID to read. |
| `value` | [Expression](index.md) | yes | — | Value or expression used by this type. |

## JSON example

```json
{
  "type": "saturn:registry_name",
  "registry": "minecraft:item",
  "value": "minecraft:diamond"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.expression.builtin.RegistryNameExpression`. This page is based on the Codec in the current 26.1.2 source.

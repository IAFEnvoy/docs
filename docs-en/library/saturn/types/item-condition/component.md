---
title: "Component data"
sidebar_position: 10
---

`saturn:component`

Checks the data of the given component on the item stack.

Checks a single ItemStack. An item ID string cannot be treated directly as an arbitrary ItemCondition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:component` |
| `component` | Resource ID | yes | — | Data component ID, or a switch for whether to read it as a text component. |
| `nbt` | Object | yes | — | Vanilla CompoundTag data. |

## JSON example

```json
{
  "type": "saturn:component",
  "component": "minecraft:custom_data",
  "nbt": {}
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.item.ComponentCondition`. This page is based on the Codec in the current 26.1.2 source.

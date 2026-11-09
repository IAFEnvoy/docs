---
title: "Has component"
sidebar_position: 10
---

`saturn:has_component`

Checks whether the item stack has the given data component.

Checks a single ItemStack. An item ID string cannot be treated directly as an arbitrary ItemCondition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:has_component` |
| `component` | Resource ID | yes | — | Data component ID, or a switch for whether to read it as a text component. |

## JSON example

```json
{
  "type": "saturn:has_component",
  "component": "minecraft:custom_data"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.item.HasComponentCondition`. This page is based on the Codec in the current 26.1.2 source.

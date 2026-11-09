---
title: "Item on cooldown"
sidebar_position: 10
---

`saturn:on_cooldown`

Checks whether the item in the context is on cooldown.

Checks a single ItemStack. An item ID string cannot be treated directly as an arbitrary ItemCondition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:on_cooldown` |

## JSON example

```json
{
  "type": "saturn:on_cooldown"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.item.OnCooldownCondition`. This page is based on the Codec in the current 26.1.2 source.

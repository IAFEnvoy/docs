---
title: "Tool ability"
sidebar_position: 10
---

`saturn:tool_ability`

Checks whether the item supports the given NeoForge ItemAbility.

Checks a single ItemStack. An item ID string cannot be treated directly as an arbitrary ItemCondition.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:tool_ability` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |

## JSON example

```json
{
  "type": "saturn:tool_ability",
  "ability": "example:heal"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.item.ToolAbilityCondition`. This page is based on the Codec in the current 26.1.2 source.

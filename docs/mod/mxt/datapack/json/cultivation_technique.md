---
title: "Cultivation Technique"
description: "Defines a cultivation technique that modifies cultivation speed and grants passive attributes and abilities."
sidebar_position: 8
---

# Cultivation Technique

A `cultivation_technique` defines a learnable cultivation technique: its grade, learning condition, cultivation multiplier, passive attributes and granted abilities.

## File Location

Cultivation technique files go in `data/<namespace>/mxt/cultivation_technique/` within your datapack.

The filename corresponds to its ID. For example, `data/example/mxt/cultivation_technique/vital_breath.json` has the ID `example:vital_breath`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `grade` | String | `common` | Cultivation technique grade marker. |
| `learn_condition` | `EntityCondition` | `mxt:always_true` | Learning condition. |
| `exclusive_tags` | `Identifier[]` | `[]` | Mutual exclusion tags of the technique. |
| `cultivation_modifier` | `NumberProvider` | `1` | Cultivation multiplier. |
| `passive_modifiers` | `List<AttributeEntry>` | `[]` | Passive attributes; uses vanilla `AttributeModifier`s, `value` is an optional dynamic formula. |
| `granted_abilities` | `HolderOrTag<ability>[]` | `[]` | Abilities granted after learning. |

:::info Multiple Techniques
Every learned cultivation technique is active at the same time.
:::

## Example

```json
{
  "grade": "earth",
  "learn_condition": {"type": "mxt:has_realm", "resource": "example:qi"},
  "exclusive_tags": ["example:fire_technique"],
  "cultivation_modifier": 1.5,
  "passive_modifiers": [
    {"attribute": "minecraft:generic.max_health", "id": "example:technique/vital_breath", "amount": 2, "operation": "add_value"}
  ],
  "granted_abilities": ["example:vital_breath_active"]
}
```

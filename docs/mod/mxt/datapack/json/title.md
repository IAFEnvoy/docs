---
title: "Title"
description: "Defines an unlockable title with passive attribute modifiers, exclusivity groups and levels."
sidebar_position: 10
---

# Title

A `title` defines an unlockable title that grants passive attributes and can be levelled up to a maximum level.

## File Location

Title files go in `data/<namespace>/mxt/title/` within your datapack.

The filename corresponds to its ID. For example, `data/example/mxt/title/sword_saint.json` has the ID `example:sword_saint`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `unlock_condition` | `EntityCondition` | `mxt:always_true` | Unlock condition. |
| `priority` | Integer | `0` | Selection or display priority. |
| `passive_modifiers` | `List<AttributeEntry>` | `[]` | Passive attributes; uses vanilla `AttributeModifier`s. |
| `exclusive_tags` | Identifier[] | `[]` | Title exclusion groups. |
| `maximum_level` | Integer | `1` | Maximum level, range `1..1000`. |

## Example

```json
{
  "unlock_condition": {"type": "mxt:has_realm", "resource": "example:qi"},
  "priority": 10,
  "passive_modifiers": [
    {"attribute": "minecraft:generic.attack_damage", "id": "example:title/sword_saint", "amount": 1, "operation": "add_value"}
  ],
  "exclusive_tags": ["example:sect_title"],
  "maximum_level": 3
}
```

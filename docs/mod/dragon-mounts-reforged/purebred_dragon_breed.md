---
title: Purebred Dragon Breed JSON
sidebar_position: 2
---

# Purebred Dragon Breed JSON

A purebred dragon definition provides a dragon's base values, taming and breeding items, abilities, habitats, and client resource locations.

## File Location

Place files in `data/<namespace>/purebred_dragon_breed/` in a data pack. For example:

```text
data/example/purebred_dragon_breed/azure.json
```

This file has the registry ID `example:azure`.

## Fields

Every field is written directly in the root object. There are no `core` or `content` child objects.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `ambient_sound` | Sound event ID | optional | The dragon's ambient sound. |
| `death_loot` | Loot table ID | optional | The loot table used when the dragon dies. |
| `hatch_time` | Integer | `-1` | Hatching duration in ticks. Values less than or equal to `0` use the server configuration. |
| `growth_time` | Integer | `-1` | Growth duration in ticks. Values less than or equal to `0` use the server configuration. |
| `size_modifier` | Float | `-1.0` | Size multiplier. Values less than or equal to `0` use the server configuration. |
| `primary_color` | Hex color string | optional | Primary color without `#`, for example `"4e91d9"`. |
| `secondary_color` | Hex color string | optional | Secondary color without `#`. |
| `inventory_texture` | Resource ID | `minecraft:textures/block/stone.png` | Texture used by the dragon inventory screen. |
| `breath_type` | Breath type registry ID | optional | References an entry in `dragon_breath_type`. |
| `immunities` | String array | `[]` | Immunity identifiers. For example, `"drown"` changes water pathfinding malus. |
| `attributes` | Object of attribute ID to number | `{}` | Overrides entity attribute base values, such as `"minecraft:max_health": 40.0`. |
| `habitats` | [Habitat](./habitat_type.md) array | `[]` | Inline conditions used for habitat scoring. |
| `abilities` | [Ability](./dragon_ability_type.md) array | `[]` | Inline abilities possessed by the dragon. |
| `taming_items` | Item ID array | `[]` | Items that can tame the dragon. |
| `breeding_items` | Item ID array | `[]` | Items that can breed the dragon. |
| `hatch_particles` | ParticleOptions object | optional | Hatching particle. The object must contain `type`, which is dispatched by the vanilla particle Codec. |
| `accessories` | String array | `[]` | Permitted accessory identifiers. |
| `model_location` | Resource ID | optional | GeckoLib model resource location. |
| `animation_location` | Resource ID | optional | GeckoLib animation resource location. |
| `variants` | Variant array | `[]` | Available variants for this purebred dragon. |

## Variant Object

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | String | **required** | Local variant ID. |
| `texture` | Resource ID | optional | Skin texture. |
| `saddle_texture` | Resource ID | optional | Saddled texture. |
| `glow_texture` | Resource ID | optional | Emissive-layer texture. |
| `egg_texture` | Resource ID | optional | Egg texture. |
| `breath_type` | Inline breath-type object | optional | Variant-specific breath type. Its schema is documented in [Dragon Breath Type](./dragon_breath_type.md). |
| `primary_color` | Hex color string | optional | Variant primary color without `#`. |
| `secondary_color` | Hex color string | optional | Variant secondary color without `#`. |
| `size_modifier` | Float | `-1.0` | Variant size multiplier. |

## Example

```json
{
  "ambient_sound": "minecraft:entity.ender_dragon.ambient",
  "hatch_time": 24000,
  "growth_time": 48000,
  "size_modifier": 1.15,
  "primary_color": "4e91d9",
  "secondary_color": "d8f3ff",
  "inventory_texture": "example:textures/gui/azure_dragon.png",
  "breath_type": "example:frost",
  "attributes": {
    "minecraft:max_health": 40.0,
    "minecraft:movement_speed": 0.28
  },
  "taming_items": ["minecraft:salmon"],
  "breeding_items": ["minecraft:cod"],
  "hatch_particles": {
    "type": "minecraft:snowflake"
  },
  "habitats": [
    {
      "type": "dragon_mounts:biome",
      "biome": "#minecraft:is_snowy",
      "points": 4
    }
  ],
  "abilities": [
    {
      "type": "dragon_mounts:frost_walker",
      "level": 2
    }
  ],
  "variants": [
    {
      "id": "pale",
      "texture": "example:textures/entity/dragon/azure_pale.png",
      "egg_texture": "example:textures/entity/dragon/egg/azure_pale.png",
      "primary_color": "d4efff"
    }
  ]
}
```

:::note
`variants[].breath_type` is a complete inline breath-type object. The root `breath_type` field is a breath-type registry ID. These fields are not interchangeable.
:::

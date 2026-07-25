---
id: datapack-rules
title: Data-Pack Rules
sidebar_position: 2
description: Formats for recipe_rules, food_nutrition, harvest_rules, mob_spawn_rules, and gelatinous_dissolving.
---

All paths are relative to a standard data-pack root:

```text
data/<namespace>/mite/<rule_type>/<name>.json
```

The file name contributes to the resource ID. For example, `data/example/mite/mob_spawn_rules/cave_hunter.json` has the entity rule ID `example:cave_hunter`.

## Recipe rules

Path: `mite/recipe_rules`. The resource ID must match the target recipe ID. A rule adds timed-crafting difficulty, workbench tier, and configuration gates.

```json title="data/example/mite/recipe_rules/steel_hammer.json"
{
  "difficulty": 6400,
  "workbench_tier": "iron",
  "gates": ["metal_tiers", "additional_melee_weapons"]
}
```

| Field | Required | Description |
|---|:---:|---|
| `difficulty` | No | Nonnegative crafting difficulty; omit to use the fallback timing algorithm |
| `workbench_tier` | No | `none`, `flint`, `copper`, `silver`, `gold`, `iron`, `ancient_metal`, `mithril`, `adamantium`, or `obsidian` |
| `gates` | No | Configuration gates; closing any gate hides and disables the recipe |

Common gates include `metal_tiers`, `additional_melee_weapons`, `rune_gates`, `metal_buckets`, `metal_doors`, `metal_bars`, `material_anvils`, `strongboxes`, `furnace_family`, `obsidian_tools`, `chainmail`, and `ore_storage_blocks`.

## Food nutrition

Path: `mite/food_nutrition`. Use one file for each item or tag.

```json title="data/example/mite/food_nutrition/pear.json"
{
  "items": ["example:pear", "#example:pears"],
  "nutrition": 1,
  "phytonutrients": 1,
  "sugar": 800,
  "priority": 10
}
```

| Field | Default | Description |
|---|---:|---|
| `items` | Required | One item ID/tag or an array of item IDs/tags |
| `nutrition` | `0` | Overall nutrition points |
| `protein` | `0` | Protein points |
| `essential_fats` | `0` | Essential-fat points |
| `phytonutrients` | `0` | Phytonutrient points |
| `sugar` | `0` | Nonnegative sugar-response value |
| `priority` | `0` | Priority when multiple definitions match one item |

Exact item matches take precedence over tag matches. Legacy `item`, `tag`, and bulk `entries` formats are not supported.

## Harvesting and drops

Path: `mite/harvest_rules`.

```json title="data/example/mite/harvest_rules/hard_logs.json"
{
  "blocks": "#example:hard_logs",
  "tool_requirement": {
    "items": "#minecraft:axes",
    "config": "require_axe_for_logs",
    "message": "message.example.requires_axe"
  },
  "tree_felling": true,
  "priority": 20
}
```

Optional top-level fields are `tool_requirement`, `tree_felling`, `ore_fortune`, `leaf_drops`, and `progressive_drops`. `leaf_drops.fruits` accepts one entry or an array and can restrict biome IDs/tags with `biomes`. `progressive_drops` uses `base`, optional `base_alternative`, and `tiers` for gravel-style progressive drops.

## Mob spawn conditions

Path: `mite/mob_spawn_rules`. Each file ID corresponds to an entity type ID.

```json title="data/example/mite/mob_spawn_rules/cave_hunter.json"
{
  "base_rule": "monster",
  "max_overworld_y": 40,
  "random_chance": 0.25,
  "nearby_blocks": [
    {
      "blocks": "#c:ores/silver",
      "horizontal": 8,
      "vertical": 4
    }
  ],
  "max_sky_light_when_exposed": 7,
  "spawn_on": "#minecraft:base_stone_overworld"
}
```

| Field | Description |
|---|---|
| `base_rule` | `monster`, `mob`, or another base rule supported by the codec |
| `max_overworld_y` | Normal maximum Overworld height, optionally relaxed by `surface_exception` |
| `absolute_max_overworld_y` | Absolute Overworld height limit that exceptions cannot bypass |
| `surface_exception` | Moon-phase, cold-biome, or biome-selector exception |
| `random_chance` | Additional spawn probability from `0` to `1` |
| `exposure_blocks` | Block set used by exposure or obstruction checks |
| `nearby_blocks` | Nearby blocks, horizontal/vertical radii, and optional Y offset |
| `max_sky_light_when_exposed` | Maximum exposed sky light from `0` to `15` |
| `spawn_on` | Allowed supporting block ID/tag |

## Gelatinous dissolution

Path: `mite/gelatinous_dissolving`.

```json title="data/example/mite/gelatinous_dissolving/soft_metal.json"
{
  "blocks": ["#example:soft_metal", "example:grate"],
  "exclude": "example:protected_grate",
  "normal": {
    "contact_period": 60,
    "projectile_period": 40
  },
  "acidic": {
    "contact_period": 10,
    "projectile_replacement": "minecraft:air"
  },
  "contact_damage": 1.0,
  "priority": 10
}
```

At least one of `blocks` or `predicate` is required. The current predicate is `non_solid_render`. `normal` and `acidic` both support `contact_period`, `projectile_period`, `projectile_replacement`, and `projectile_face`; a period of `0` processes immediately.

:::tip Reload and diagnostics

After saving, run `/reload` and check the server log for `Loaded ... definitions`. Parse errors include the complete resource ID.

:::

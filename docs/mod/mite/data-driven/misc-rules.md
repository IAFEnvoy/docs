---
id: misc-rules
title: Instance Multi-File Rules
sidebar_position: 3
description: Rule directories, selectors, priority, default files, and 16 codecs under config/mite.
---

`config/mite` contains both primary configuration files and the external rule directories for the current game instance. On first launch, MITE copies 71 default rule JSON files into their corresponding subdirectories. Each file can then be added, changed, or removed independently.

```text
config/mite/
|- mite-common.json
|- mite-client.json
|- arrows/
|- bucket_families/
|- butchering/
|- crops/
|- earth_elementals/
|- entity_drops/
|- fishing/
|- livestock/
|- mob_replacements/
|- portals/
|- repair/
|- rune_gates/
|- saplings/
|- silverfish/
|- skeleton_projectiles/
`- village_conversions/
```

## Default-file lifecycle

- `.defaults-installed` records default relative paths provided by the current or earlier versions.
- New defaults introduced by an update are copied in.
- Old default files that the user deliberately deleted do not return on every launch.
- Updating MITE never overwrites an existing customized file.

Back up the complete directory before upgrading. To restore a default, remove its file and recorded marker path before restarting, or extract it from `mite/defaults` in the mod JAR.

## Matching and precedence

Selectors accept item, block, or entity IDs and `#tag` values as either one value or an array. Higher integer `priority` matches first; equal priorities are ordered by relative file path.

The loader only scans the 16 rule subdirectories listed below. It never treats `mite-common.json` or `mite-client.json` in the root as rule files.

:::warning This is not a data-pack directory

These files belong to server-instance configuration and do not go in a world's `datapacks` folder. Modpacks should distribute them under the corresponding `config/mite` subdirectories.

:::

## Directories and fields

| Directory | Required fields | Common optional fields/enums |
|---|---|---|
| `entity_drops` | `entities`, `mode`, `items` | `mode`: `wight_rare_pool`, `arachnid_webs` |
| `mob_replacements` | `entities`, `replacement`, `profile` | `giant_vampire_bat`, `longdead_guardian`, `infernal_creeper` |
| `arrows` | `items`, `recovery` | `silver_damage`, `acid_resistant`; recovery profiles from `flint` through `adamantium` |
| `skeleton_projectiles` | `entities`, `projectile` | `damage_profile`: `default`, `longdead`, `longdead_guardian` |
| `crops` | `blocks`, `young_output`, `mature_output` | `immature_output`, `blighted_output`, `mature_base_count`, `mature_bonus` |
| `saplings` | `blocks` | `requires_precipitation`, `biome_tag`, `temperature`: `none`/`oak`/`birch` |
| `livestock` | `entities`, `food`, `grazing`, `meat`, `raw_meat`, `cooked_meat`, `manure` | `produces_milk`, `egg_output`, `feather_output`, `manure_output`, `bowl_milk_output` |
| `butchering` | `entities`, `raw_output`, `cooked_output` | `mode`: `random_extra`/`single_special`, `requires_wellness` |
| `repair` | `items`, `material`, `tier` | `costs` can override armor slots and tool types |
| `bucket_families` | `material`, `empty`, `water`, `lava`, `milk`, `stone` | Materials: copper, silver, gold, iron, ancient metal, mithril, adamantium |
| `fishing` | `mode`, `success` | `target_block`, `fallback`; modes `deep_ocean`/`grass_worm` |
| `earth_elementals` | `spawn_blocks`, `type`, `tool_block`, `drop_block` | Tags can extend valid spawning bases |
| `portals` | `source_dimension`, `target_dimension`, `color` | `foundation`, `rune_gate` |
| `rune_gates` | `corner_blocks`, `radius` | `radius`: `mithril`/`adamantium` |
| `village_conversions` | `blocks`, `replacement` | Living-to-dead crop mappings |
| `silverfish` | `condition`, `result` | Conditions `source_block`/`dimension`/`nearby_block` with matching `source`, `dimension`, or `nearby` |

Every directory supports `priority`, defaulting to `0`.

## Example: add a modpack silver arrow

```json title="config/mite/arrows/example_silver_arrow.json"
{
  "items": ["example:silver_arrow", "#example:silver_arrows"],
  "recovery": "silver",
  "silver_damage": true,
  "priority": 20
}
```

The damage multiplier does not belong in this file; use `production.silverArrowUndeadDamageMultiplier`.

## Example: custom repair material

```json title="config/mite/repair/example_mithril.json"
{
  "items": "#example:mithril_equipment",
  "material": "#c:nuggets/mithril",
  "tier": "mithril",
  "costs": {
    "helmet": 10,
    "chestplate": 16,
    "pickaxe": 6,
    "standard_tool": 4
  },
  "priority": 20
}
```

Run `/reload` after editing. Reloading bucket-family rules also refreshes dispenser behavior.

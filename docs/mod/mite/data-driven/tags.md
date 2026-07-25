---
id: tags
title: Tag Conventions
sidebar_position: 4
description: Using Minecraft, c, and MITE tags for cross-mod extension.
---

MITE prefers Minecraft 1.21 and NeoForge community tags. Modpacks should extend tags instead of duplicating large per-item rule sets.

## Community `c` tags

Common item tags:

```text
c:ingots/silver              c:nuggets/copper
c:ingots/ancient_metal       c:nuggets/silver
c:ingots/mithril             c:nuggets/ancient_metal
c:ingots/adamantium          c:nuggets/mithril
c:buckets/empty              c:nuggets/adamantium
c:buckets/water              c:chains
c:buckets/lava               c:drinks/milk
c:buckets/milk               c:drinks/water
```

Common block tags include `c:ores/copper`, `c:ores/silver`, `c:ores/mithril`, `c:ores/adamantium`, `c:stones`, `c:gravels`, `c:obsidians`, `c:netherracks`, and material-specific `c:storage_blocks/*` tags.

## MITE functional tags

| Tag | Purpose |
|---|---|
| `mite:metal_smelting_inputs` | Inputs that require metal-smelting heat checks |
| `mite:oven_masonry_inputs` | Masonry inputs accepted by low-tier ovens |
| `mite:livestock_food/<animal>` | Items that can be manually fed to cows, pigs, sheep, or chickens |
| `mite:livestock_grazing/cow` | Grazing blocks consumed by cows |
| `mite:livestock_grazing/general` | General livestock forage blocks |
| `mite:livestock_meat/<animal>` | Meat sets for each livestock species |
| `mite:repair/<material>` | Equipment matched by material repair rules |
| `mite:enchantable/*` | Tools, weapons, or armor supported by MITE enchantments |
| `mite:underworld_portal_foundations` | Portal foundations leading from the Overworld to the Underworld |
| `mite:nether_portal_foundations` | Portal foundations leading directly or subsequently to the Nether |
| `mite:incorrect_for_mithril_tool` | Blocks that mithril tools cannot harvest correctly |
| `mite:extinguishable_torches` | Torches that environmental rules can extinguish |

## Extending tags

```json title="data/example/tags/item/repair/mithril.json"
{
  "replace": false,
  "values": [
    "example:mithril_drill",
    "example:mithril_helmet"
  ]
}
```

This file defines `example:repair/mithril`; it does not automatically join `mite:repair/mithril`. Use the `mite` namespace to extend a MITE tag:

```text
data/mite/tags/item/repair/mithril.json
```

:::tip Keep `replace: false`

Compatibility data packs should normally append values. Use `replace: true` only when intentionally replacing MITE's entire default set.

:::

Prefer tags whenever an item or block test can be expressed as a set. Create a separate rule JSON only when the relationship also needs output values, priority, or conditions.

---
id: crafting-and-materials
title: Harvesting, Crafting, and Materials
sidebar_position: 2
description: Tool requirements, timed crafting, workbench tiers, furnace heat, repairs, and material equipment.
---

## Harvesting requirements

Block drops are no longer determined only by breaking speed. Logs require axes, while stone and ores require pickaxes. Exact blocks and accepted tools come from `harvest_rules`; **Enable tool gates**, **Require an axe for logs**, and **Require a pickaxe for stone and ores** enable the corresponding restrictions.

Leaf fruit, saplings, progressive gravel drops, and ore fortune use the same data rules. Their probabilities remain controlled by the visible leaf drop and Ore Fortune chance settings.

## Timed crafting

When **Enable timed crafting** is enabled, taking a crafting result requires completing a progress timer. The base duration comes from recipe difficulty; recipes without an explicit difficulty use the number of occupied ingredient slots.

| Configuration | Purpose |
|---|---|
| Use MITE recipe difficulties when available | Prefer the MITE difficulty in `recipe_rules` |
| Minimum crafting time | Minimum duration of every recipe |
| Base crafting time | Base duration for the fallback algorithm |
| Crafting time per occupied ingredient slot | Additional duration per occupied ingredient slot |

Moving ingredients, changing the result, closing the menu, or losing crafting eligibility makes the server validate progress again. The client cannot declare crafting complete by itself.

## Workbench tiers

The standard progression is:

| Tier | Supported range |
|---|---|
| Flint | Lowest-tier recipes |
| Copper, silver, gold | All tier 2, although recipes may require a specific material bench |
| Iron | Iron and below |
| Ancient metal | Ancient metal and below |
| Mithril | Mithril and below |
| Adamantium | All regular tiers |
| Obsidian | Only the obsidian and flint branch |

**Require material-tiered workbenches** controls workbench requirements, and **Require clear space above workbenches** controls clearance above a bench. Each recipe's required tier comes from `recipe_rules`.

## Furnace heat

MITE furnaces track a heat tier in addition to burn time:

| Fuel class | Default heat | Configuration |
|---|---:|---|
| Wood/charcoal | 1 | Wood and charcoal heat level |
| Coal | 2 | Coal heat level |
| Lava | 3 | Lava heat level |
| Blaze fuel | 4 | Blaze-rod heat level |

Default requirements for common metal, mithril, and adamantium are controlled by their three visible required-heat settings. Each furnace also has a maximum heat capacity, so changing fuel alone cannot make a low-tier furnace process every ore.

With Jade installed, the furnace overlay shows remaining fuel, remaining smelting time, current heat, capacity, and input requirement.

## Equipment, quality, and repairs

- Copper uses vanilla copper ingots, ore, and blocks; MITE supplies processing components and equipment.
- Silver, ancient metal, mithril, and adamantium have complete tool and armor chains.
- Additional weapons include knives, daggers, hatchets, battle axes, war hammers, war hoes, scythes, and cudgels.
- Equipment quality can automatically select the highest quality or consume experience; the configuration screen exposes separate quality selection and experience-cost settings.
- Material anvils repair equipment with the matching nugget. Relationships come from `config/mite/repair`, while repair effectiveness and experience cost are ordinary settings.
- Metal buckets carrying lava may melt; each material has its own visible lava-melting chance.

See the [progression and crafting rules](../content/progression-and-crafting.md) and [materials and production rules](../content/materials-and-production.md) for the related settings.

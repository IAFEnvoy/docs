---
id: agriculture-and-livestock
title: Agriculture and Livestock
sidebar_position: 3
description: Crop disease, fertilization, sapling restrictions, and livestock survival and production.
---

## Crops and disease

MITE adds onions and repeat-harvest blueberries, and increases the survival pressure on wheat, carrots, potatoes, and other crops. Drought, random disease, or blood-moon conditions can blight or kill crops.

| Configuration | Purpose |
|---|---|
| Enable crop disease | Master switch for crop disease |
| Crop drought-death chance | Chance to die on a dry random tick |
| Natural crop blight chance | Normal random blight chance |
| Enable bowl crop watering | Enable watering and moisture rules |
| Enable blood-moon crop disease | Spread crop disease during a blood moon |
| Blood-moon crop-disease chance | Blood-moon disease chance |

Bundled village farms replace living crops with their corresponding dead variants. Mappings come from `config/mite/village_conversions`.

## Fertilization, harvesting, and saplings

- Manure fertilizes farmland and also serves as low-heat fuel.
- **Enable manure crop fertilization** controls farmland fertilization; **Fertility chance per level** controls the Fertility enchantment.
- **Mature crop bonus-drop chance** and **Harvesting extra-drop multiplier** control mature harvest bonuses.
- Oak, birch, and other saplings may be temperature-restricted by biome. Object relationships come from `config/mite/saplings`, while the configuration screen exposes the temperature thresholds by sapling type.
- Sapling and fruit output from leaves comes from `harvest_rules`; the configuration screen exposes the corresponding leaf-drop chances.

## Three livestock conditions

Cows, pigs, sheep, and chickens track food, water, and freedom from 0% to 100%. An animal is unwell when the lowest of these values falls below 25%, reducing breeding and production.

To improve conditions:

- Place edible blocks for the animal or feed it directly.
- Provide nearby water, a water-filled cauldron, or access to rain.
- Avoid overcrowding and long-term confinement without sky access.
- Fence a protected area while leaving sufficient room to move.

Update frequency and condition changes are controlled by **Livestock update interval**, **Livestock feeding food gain**, **Livestock food decay**, **Livestock water decay**, **Livestock freedom gain**, and the related visible livestock settings.

## Milk, feathers, eggs, and manure

- Milk gradually recovers while a cow is healthy; taking milk with a bowl or material bucket consumes its reserve.
- Chickens have an actual feather count. Jumping or taking damage may shed feathers, and accumulated production can become feathers or eggs.
- Adult livestock produce manure after a species-specific countdown.
- Butchering drops may require a healthy animal; targets and products come from `config/mite/butchering`.

The configuration screen groups cow milk production, chicken production, and each species' manure period with the other livestock settings. Jade displays the three conditions and production and manure timers. See [AGR-08](../content/world-and-ecology.md#agr-08) for the complete rule summary.

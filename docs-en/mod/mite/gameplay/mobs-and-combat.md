---
id: mobs-and-combat
title: Mobs, Combat, and Enchantments
sidebar_position: 5
description: New MITE entities, AI, material arrows, gelatinous mobs, elementals, and enchantments.
---

## New entity families

MITE registers 30 spawnable mob types and provides spawn eggs for the major creatures. Main families include:

- **Undead:** longdead, longdead guardian, bone lord, ancient bone lord, ghoul, revenant, wight, and shadow.
- **Arachnids:** wood spider, black widow, demon spider, and phase spider.
- **Bats and canines:** vampire bat, giant vampire bat, nightwing, dire wolf, and hellhound.
- **Gelatinous mobs:** jelly, blob, ooze, and pudding; acidic variants dissolve a wider range of blocks.
- **Elementals and special monsters:** fire elemental, earth elemental, clay golem, infernal creeper, netherspawn, copperspine, hoary silverfish, and witch.

`mobs.enabled` and `mobs.newMobs` require a restart. Base spawning conditions for each entity are in the `mob_spawn_rules` data pack registry; moon phases, replacement chances, and ability values are in `mobs` configuration.

## AI and environmental interaction

- Zombies can dig eligible blocks while respecting `mobGriefing`.
- Squids contact players in water and apply slowness.
- Spiders fire webs, while gelatinous mobs fire gelatinous projectiles.
- Witches apply delayed curses and summon hostile wolves.
- Livestock seek water and food, avoid rain and fire, and spread panic.

Master behavior switches include `mobs.advancedAi`, `mobs.combatRebalance`, `mobs.entityParityBehaviors`, `mobs.arachnidWebProjectiles`, and `mobs.gelatinousProjectiles`.

## Gelatinous mobs and elementals

Contact and projectile dissolution by gelatinous mobs is defined through `gelatinous_dissolving`; targets, damage, and periods are not hard-coded in entity classes. Jade shows the current count of dissolved blocks and the last completion time.

Earth elementals have internal heat. Lava or fire raises them to a molten threshold, while rain, water, and cold biomes accelerate cooling. Maximum heat, thresholds, cooling, healing, armor, ignition chance, and base attributes use `mobs.earthElemental*`. Health, tracking range, movement speed, and attack damage require a restart.

## Arrows and ranged combat

- Material arrows have separate base damage, recovery chances, and target multipliers.
- `production.silverArrowUndeadDamageMultiplier` controls silver-arrow damage against undead.
- `config/mite/skeleton_projectiles` determines skeleton ammunition.
- Arrow object relationships live in `config/mite/arrows`; recovery chances use `progression.*ArrowRecoveryChance`.

## Enchantments

The current data registry contains 15 MITE enchantments: arrow recovery, stun, fishing fortune, fertility, tree felling, vampiric, speed, regeneration, freedom of action, precise flight, poison, disarming, harvesting, butchering, and endurance.

`progression.enchantments` is the master switch. Trigger chances, durations, and multipliers use `progression.stun*`, `vampiric*`, `poison*`, `disarming*`, and related keys. Enchantments themselves use Minecraft dynamic-registry JSON, allowing modpacks to change supported items, levels, and weights through data packs.

## Status effects

| Effect | Behavior |
|---|---|
| Stalwart Resistance | Subtracts 5 damage per level from every source except suffocation and renders the protection as additional armor on the HUD. Vanilla Resistance is converted to this effect. |
| Malnutrition | Raises hunger consumption and slows natural regeneration until protein and phytonutrients recover. |
| Witch's Curse | Represents 16 persistent curses covering equipment decay, movement and food restrictions, chest fear, and creature fears. Kill the casting witch or use a Bottle o' Disenchanting to clear it. |
| Insulin Resistance | Reaches mild, moderate, and severe tiers at 48,000, 96,000, and 144,000. Eating more sugar applies matching Nausea levels; the severe tier also applies poison. |
| Crushing Slowness | Reduces movement and camera turning by 20% per level. Level III prevents upward swimming in water or lava. Vanilla Slowness is converted to this effect. |
| Deadly Poison | Deals 1 point of lethal magic damage every 5 seconds. Vanilla Poison is converted to this effect. |

Stalwart Resistance, Crushing Slowness, and Deadly Poison use distinct names so they are not mistaken for their weaker vanilla counterparts.

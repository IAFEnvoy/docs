---
id: world-and-portals
title: World, Moon Phases, and Portals
sidebar_position: 4
description: The Underworld, ore generation, moon events, standard portals, and rune gates.
---

## The Underworld

The `mite:underworld` Underworld is a separate dimension, not a copy of overworld caves. Its main features are:

- Deepslate as the base stone, with dense ore veins and independent dungeon and cobweb generation.
- A sealed ceiling and noise-shaped bedrock strata that avoid large areas of floating bedrock and unrestricted ravines.
- Mantle terrain centered around the lower bedrock variation, normally fluctuating near Y=27 to 32.
- Periodic fog, dangerous entities, and the next standard portal stage leading to the Nether.

The in-game configuration screen exposes the Underworld master switch together with separate dungeon, fog, bedrock-strata, terrain-noise, cobweb, and portal-routing settings.

:::warning World-generation settings

Changing dimension or ore-generation rules does not rewrite existing chunks. Back up the world and test in a new world or unexplored terrain.

:::

## Ore generation

MITE uses vanilla copper resources while adjusting copper generation and adding silver, mithril, and adamantium ores. Each ore has visible generation, chunk-attempt, vein-size, and height-range settings. See [WLD-01](../content/world-and-ecology.md#wld-01) for the complete rule summary.

## Standard portal route

A portal's target depends on the current dimension and the foundation blocks beneath its frame. The default route is:

```text
Overworld -> Underworld -> Nether
```

Source dimensions, foundation selectors, targets, and colors are defined in `config/mite/portals/*.json`. Replacing the foundation under an overworld portal updates its color immediately.

## Rune Gates

A lit obsidian portal becomes a rune gate when all four corners use rune stones of the same material. Mithril and adamantium rune stones each have 16 patterns: Nul, Quas, Por, An, Nox, Flam, Vas, Des, Ort, Tym, Corp, Lor, Mani, Jux, Ylem, and Sanct.

- Right-click the crafting output slot to cycle the pattern.
- The four corner patterns and orientation determine a stable destination.
- The destination is relative to the player's respawn point in the current dimension, falling back to world spawn when no valid respawn point exists.
- Rune Gates only travel within the current dimension and do not create return portals.
- Overworld destinations avoid oceans; Nether and other destinations search for a safe landing point.
- The teleport delay is counted and executed by the server. The client only mirrors that timing onto vanilla's Nether portal overlay.

The relevant settings are **Enable Rune Gates**, **Rune Gate teleport delay**, **Mithril Rune Gate domain radius**, and **Adamantium Rune Gate domain radius**. Corner blocks and radius profiles are defined in `config/mite/rune_gates`.

## Moon events

- A blood moon normally occurs every 32 days. It forces a thunderstorm during the day, prevents sleep at night, raises crop-disease risk, empowers hostile mobs, and uses a red moon disc and halo.
- A blue moon normally occurs every 128 days and keeps the whole day clear. At night it lowers surface hostile spawning, repopulates animals, accelerates crops in non-dedicated worlds, and uses a blue moon disc and halo.
- Harvest Moon and Moon Dog occur the configured number of offset days before blood moons and blue moons. They currently provide special moon coloring, with Moon Dog also rendering a pale ring.
- Vanilla full and new moons retain separate surface-spawn chance settings.
- Each special moon has its own surface-spawn probability.

The master switches appear as **Enable moon events** and **Enable MITE moon-based surface spawning**.

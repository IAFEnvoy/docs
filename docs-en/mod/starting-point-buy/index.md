---
title: Starting Point Buy
description: Define starting points, linked choices, presets, completion rules and rewards with data packs.
sidebar_position: 0
---

![Starting Point Buy logo](./assets/logo.webp)

Starting Point Buy (mod ID: `spb`) provides a data-driven starting-point allocation screen. Modpack authors define professions, talents, attributes and drawbacks in JSON. Players choose a preset in the narrow left sidebar, adjust options on the right, and confirm once all rules pass.

The mod contains no built-in professions, currencies or balance values. Resources, formulas, conditions, abilities and actions use [Saturn](../../library/saturn/index.md). Plans support multiple resources, single choice, multiple choice, repeated purchases, and choices that change other prices or quantity limits.

:::info Extension of Saturn
This mod is built on [Saturn](../../library/saturn/index.md): types such as resources, formulas, conditions, abilities and actions are provided by Saturn.
:::

:::info Extension of Saturn
This mod is built on [Saturn](../../library/saturn/index.md): types such as resources, formulas, conditions, abilities and actions are provided by Saturn.
:::

## Applicable versions

| Item | Version covered here |
| --- | --- |
| Starting Point Buy | Current 1.0.0 implementation with generated formula aliases |
| Minecraft | 26.1.2 |
| NeoForge | Development and verification version 26.1.2.126 |
| Java | 25 |
| Required dependency | Saturn 1.3 or a newer compatible version |

Install the mod and its dependency on both client and server. The production mod contains no example plans: a modpack must provide a data pack. Try the [complete example](./datapack/example.md) to get started.

## Start here

- [Installation](./install.md): versions, installation locations and when data changes take effect.
- [Player guide and commands](./usage.md): presets, quantities, confirmation, refreshing and recovery.
- [Your first data pack](./datapack/index.md): a working minimal plan and its file layout.
- [Plans and screen settings](./datapack/plan.md): resources, inputs, presets, completion rules and closing.
- [Groups and options](./datapack/selection.md): choice modes, dynamic limits, prerequisites and exclusions.
- [Formulas and comparisons](./datapack/formulas.md): generated names, resource interactions and `spb:compare`.
- [Abilities and delayed actions](./datapack/rewards.md): rewards based on final choices or attributes.
- [Warrior and scholar example](./datapack/example.md): downloadable packs and expected calculations.

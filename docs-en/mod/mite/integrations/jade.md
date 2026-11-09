---
id: jade
title: Jade
sidebar_position: 2
description: MITE block and entity state displayed by Jade and its server-data synchronization.
---

Jade integration is optional. The MITE plugin extends Jade's vanilla name, container, health, crop, and furnace components without redrawing their basic information.

## Displayed information

| Provider group | Targets | Information |
|---|---|---|
| MITE furnace state | 5 MITE furnaces | Fuel/smelting seconds remaining, current/maximum heat, input requirement, incompatibility |
| MITE agriculture state | Crops and farmland | Dead, diseased, fertilized; dead crops omit misleading maturity |
| MITE block details | Workbenches, rune stones, strongboxes | Workbench tier, rune name, owner, lock state |
| MITE livestock state | Cows, pigs, sheep, chickens | Food, water, freedom, manure time, milk, feathers, production progress |
| MITE mob state | Earth elementals and gelatinous mobs | Heat/molten threshold, dissolving-block count, latest completion time |

Each provider group can be disabled independently in Jade's plugin settings. Detailed chicken production thresholds follow Jade's "show details" setting.

## Client and server

The client can directly read workbench tiers, runes, and fertilized state from block states. The following server-authoritative values use Jade's on-demand request/response channel:

- Internal furnace timing and heat.
- Crop disease stored in saved data.
- Livestock condition and production countdowns.
- Strongbox owner and access results.
- Earth-elemental internal heat and gelatinous dissolution progress.

The server does not continuously broadcast this data. Jade requests it only while a player is looking at the target.

:::tip Recommended installation

For single-player, install Jade normally. On a dedicated server, install Jade 15.9+ on both clients and the server; otherwise only basic information already known by the client is available.

:::

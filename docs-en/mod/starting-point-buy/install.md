---
title: Installation
description: Install Starting Point Buy, Saturn and a starting-plan data pack.
sidebar_position: 1
---

This page covers the current Starting Point Buy 1.0.0 implementation for Minecraft 26.1.2, NeoForge 26.1.2.126 and Java 25, with Saturn 1.3.

## Install the mods and a plan

1. Install NeoForge for the matching Minecraft version on both client and server.
2. Put the Starting Point Buy and Saturn JARs in both `mods/` directories. For singleplayer, install them in the local instance.
3. Enable your modpack's plan data pack when creating a world. For an existing world, leave the world or stop the server before adding the pack to `<world>/datapacks/`.
4. Reopen the world or start the server, then run `/spb open <plan_id>`, for example `/spb open example:first_start`.

The production mod supplies no playable plan. Without a data pack, no profession screen or starting points appear automatically. Install the [complete example](./datapack/example.md) first, or create a plan with the [tutorial](./datapack/index.md).

A plan with `activation.on_first_join: true` is offered automatically to players who have not completed it; the default is `false`. With no current session, `/spb open` without an ID tries to choose an eligible automatic plan. Specify the full ID for a plan that is only opened manually.

## Data packs and resource packs

| Content | Location | Installed on |
| --- | --- | --- |
| Plans, groups, options, Saturn resources and abilities | The data pack's `data/` directory | Server, or the local singleplayer world |
| Translations and custom icon textures | The resource pack's `assets/` directory | Client |

A data pack ZIP must contain `pack.mcmeta` and `data/` directly at its root. The ID `example:profession` corresponds to `data/example/spb/group/profession.json`; it is separate from translation keys.

## When changes take effect

Plans use data pack registries. Reopen the world or restart the server after editing definitions; `/reload` is not a replacement for rebuilding these registries.

Loading checks JSON fields, resource and ability references, groups, options, tags, variable scope and generated alias collisions. Any definition error rejects the complete registry load and prevents the world from opening. Fix the reported definition ID and field path before starting again.

Definition changes can require an uncommitted draft to be refreshed. [Refreshing](./usage.md#refresh) reads current real resources and captures inputs again; it never grants `initial` a second time.

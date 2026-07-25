---
id: ageratum
title: Ageratum In-Game Manual
sidebar_position: 3
description: Optional Ageratum integration, bilingual in-game manuals, item bindings, and entry points.
---

MITE provides Chinese and English in-game manuals for Ageratum. The integration is implemented entirely as resource-pack Markdown and does not link Ageratum API classes from Java. Without Ageratum, mod loading, referenced books, and all gameplay continue normally.

## Content and entry points

- Chinese resources: `assets/mite/ageratum/zh_cn/`
- English resources: `assets/mite/ageratum/en_us/`
- Client command: `/ageratum mite`
- A missing client language automatically falls back to `en_us`.

The manual contains nine pages covering the overview, progression, survival and nutrition, harvesting and crafting, farming, world and portals, mobs and combat, configuration, and data-driven content.

## Item bindings

The home page binds `mite:referenced_book`. Workbenches, a low-tier furnace, farming items, rune stones, material arrows, and selected spawn eggs also bind to their relevant chapters. With Ageratum installed, hover one of these items in an inventory and hold Ageratum's ponder key (`W` by default) to open the matching page.

:::info Optional dependency boundary

NeoForge metadata declares `ageratum` as an optional client dependency. Servers do not need Ageratum; clients without it simply ignore the Markdown resources.

:::

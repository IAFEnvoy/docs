---
title: "Saturn"
sidebar_position: 0
---

Saturn is a NeoForge development library for data-driven mods. Modpack authors can define resources, abilities, trigger rules and player information rows in JSON; mod authors can extend actions, conditions, costs, getters and the HUD.

## Supported versions

| Item | Version used in this documentation |
| --- | --- |
| Minecraft | 26.1.2 |
| NeoForge | 26.1.2.99 |
| Java | 25 |
| Saturn | Current source of the development branch that contains 1.2.6 |

The documentation covers interfaces already implemented in the current source, such as `FileAccess.write` and `saturn:advancement_completed`; before using a released JAR, confirm that the version contains the corresponding interfaces. The Saturn release that System currently depends on does not yet use these two new entry points.

## Start here

- [Installation and basic conventions](./install.md): where to install, dependencies, resource IDs, data pack directories and when changes take effect.
- [Data definitions](./data/index.md): one page for each standalone JSON definition.
- [Type reference](./types/index.md): actions, conditions, abilities, costs, triggers, information expressions and more; one page per type family with field tables and JSON examples, and meta types listed at the end of each page.
- [Triggers](./guides/triggers.md): publishing, subscriptions, rebuilding and advancement completion events.
- [Costs and payment](./guides/costs.md): cost preparation, trial calculation and commit.
- [Player information](./guides/information.md): information rows, groups, getters and missing-value handling.
- [Development API](./development/api.md): registries, DataStorage, HUD, file access and extension interfaces.

[Source code](https://github.com/IAFEnvoy/Saturn)

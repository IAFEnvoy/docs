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
| Saturn | 1.3.1 |

This documentation describes the current API and data formats, organized by feature rather than release. System uses the published dependency `curse.maven:saturn-lib-1767455:9606807`.

## Start here

- [Installation and basic conventions](./install.md): where to install, dependencies, resource IDs, data pack directories and when changes take effect.
- [Data definitions](./data/index.md): one page for each standalone JSON definition.
- [Type reference](./types/index.md): actions, conditions, abilities, costs, triggers, information expressions and more, grouped by type family; each family page includes fields, defaults, examples and behavior notes.
- [Triggers](./guides/triggers.md): publishing, subscriptions, rebuilding and advancement completion events.
- [Costs and payment](./guides/costs.md): cost preparation, trial calculation and commit.
- [Player information](./guides/information.md): information rows, groups, getters and missing-value handling.
- [Adapting Origins data](./development/origins-ports.md): equivalent types, field differences and compatibility limits.
- [Development API](./development/api.md): registries, DataStorage, HUD, file access and extension interfaces.

[Source code](https://github.com/IAFEnvoy/Saturn)

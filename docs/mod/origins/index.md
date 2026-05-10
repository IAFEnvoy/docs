# Origins (NeoForge)

Welcome to the Origins (NeoForge) documentation! This mod allows players to choose an **Origin** at the start of the game, granting unique abilities and traits.

*This document is written by AI and may contain inaccuracies. Please report any issues you find to the mod developers.*

:::info
This mod is a fully rewritten version of the original Origins mod, built on top of NeoForge. Some APIs and features from the original mod may not be present in this version, and some behaviors may differ. 

Please refer to the documentation for details on how to use the new systems.
:::

## Download

| Platform | Link |
|----------|------|
| CurseForge | [Origins on CurseForge](https://www.curseforge.com/minecraft/mc-mods/origins-neoforge) |
| Modrinth | [Origins on Modrinth](https://modrinth.com/mod/origins-neoforge) |
| GitHub | [Source Code](https://github.com/IAFEnvoy/Origins-NeoForge) |

## Overview

- Origins, Powers, Layers, and Badges are all configurable via **[data packs](./guides/datapack)**
- All JSON formats are documented in **[JSON Data Formats](./json/index)**
- The type system is covered in **[Basic Concepts](./types/basic_concepts)**, **[Shared Data Types](./types/shared_data_types)**, and **[Minecraft Data Types](./types/minecraft_data_types)**
- Condition and action types are listed in **[Types Reference](./types/index)**
- KubeJS add-on documentation: **[Origins JS](./js/index)**

## Data Paths

Data files use Vanilla's **DataPack Registry** system. See **[JSON Data Formats](./json/index)** for full format documentation.

| Content | Registry Key | Data Path |
|---------|-------------|-----------|
| Origin | `origins:origin` | `data/<namespace>/origins/origin/` |
| Power | `origins:power` | `data/<namespace>/origins/power/` |
| Layer | `origins:layer` | `data/<namespace>/origins/layer/` |
| Badge | `origins:badge` | `data/<namespace>/origins/badge/` |

Language and translation keys are specified per JSON type — see each format page for details.

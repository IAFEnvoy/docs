---
title: "Dragon Mounts: Reforged"
---

# Dragon Mounts: Reforged

This section documents the data pack definitions used by Dragon Mounts: Reforged. All data is loaded through Minecraft `Codec`s, so field names, defaults, and object shapes match the current mod implementation.

## Registries

| Registry | Data pack directory | Purpose |
| --- | --- | --- |
| `dragon_mounts:purebred_dragon_breed` | `data/<namespace>/purebred_dragon_breed/` | Defines registered purebred dragons. |
| `dragon_mounts:dragon_breath_type` | `data/<namespace>/dragon_breath_type/` | Defines breath damage, colors, and status effects. |
| `dragon_mounts:dragon_ability_type` | No standalone directory | Selects an inline ability through the `type` field in a breed's `abilities` array. |
| `dragon_mounts:habitat_type` | No standalone directory | Selects an inline habitat condition through the `type` field in a breed's `habitats` array. |

The purebred dragon and breath-type registries are synchronized to clients automatically by NeoForge. Hybrid dragons are not data-pack registry entries: they are created at runtime from the registry Holders of two purebred dragons. Data packs should therefore define purebred dragons only.

import DocCardList from '@theme/DocCardList';

<DocCardList />

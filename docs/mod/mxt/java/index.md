---
title: "Java API"
description: "How a Java addon extends MiXianTu: the public runtime services and the extension surfaces they build on."
sidebar_position: 1
---

# Java API

MiXianTu is a framework: the mod ships the runtime that resolves data definitions, and the concrete content is supplied by datapacks, KubeJS or another content mod. A Java extension should reuse the existing data definitions, actions, conditions, costs and runtime services first, and add its own gameplay on top of them.

## Public API

| API | Purpose |
|-----|---------|
| `MxtDatapackRegistries` | Queries native datapack registries, holders, disabled tags and client-synchronised data. |
| `AuraService` | Queries the final aura at a position, its environment sources, the per-resource aura pools and area overrides; a resource may carry element markers. |
| `ResourceService` | Initialises, reads and modifies resources, and performs maximum and regeneration calculations. |
| `CultivationService` | Cultivation, resource conversion, realm breakthrough and realm assignment. |
| `AbilityService` | Server-side ability execution, costs, cooldowns, cancellation and actions. |
| `CurrencyValueService` | Computes an item's currency value and the reason it is unavailable. |
| `ItemMatcher` / `UniversalMatcher` | Matches items, tags, wildcards, regular expressions and mixed arrays. |
| `NumberProvider` | Constants, expressions, registry type dispatch and finite value handling. |

:::warning

Unless an interface is explicitly marked as a client API, do not call server lifecycle registry queries from the render thread.

:::

## Extension Surfaces

| Surface | What an addon can do |
|---------|----------------------|
| **Datapack registries** | Add or override data table entries under `data/<namespace>/mxt/`; see [JSON Data Formats](../datapack/json/index.md). |
| **Attachments** | Store per-entity, per-level and per-chunk state in NeoForge attachment types; the mod registers its own in `MxtAttachments`, for example `CULTIVATION`, `SPIRIT_IDENTITY` and `RESOURCE_HOLDER`, and they are read with `entity.getData(...)`. |
| **Actions and conditions** | Reuse the built-in entity, bi-entity, block, item and damage action and condition types, or register new built-in types; see [Types Reference](../datapack/types/index.md). |
| **Number providers** | Supply any numeric field from a constant, an expression or a registered provider type; see [Number Provider Types](../datapack/types/number_provider_types.md). |
| **Information panel** | Add your own lines to the character information panel with `InformationManager`; see [Information Panel](./information-panel.md). |
| **Hotbar entries** | Add a client-side hotbar entry by implementing `HotbarEntry`; see [Hotbar Entries](./hotbar.md). |

## Next Steps

- [Registries and Data Tables](./registries.md) — built-in type registries, the datapack registry list and the codec naming convention.
- [Interfaces](./interfaces.md) — `SpiritAccess`, `SpiritItemAccess`, `Cost` and `HotbarEntry`.
- [Information Panel](./information-panel.md) — register your own lines in the character information panel.
- [Hotbar Entries](./hotbar.md) — how to add an entry to the client hotbar.
- [Types Reference](../datapack/types/index.md) — every built-in action and condition type.
- [JSON Data Formats](../datapack/json/index.md) — every field of every data table.
- [Datapack Overview](../datapack/overview.md) — the datapack directory layout and when changes take effect.
- [KubeJS API](../kubejs/index.md) — the scripted alternative for content that does not need Java.

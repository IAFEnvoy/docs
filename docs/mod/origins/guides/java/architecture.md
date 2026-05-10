---
sidebar_position: 2
---

# Architecture Overview

This page explains how the mod is structured internally so you can navigate the codebase.

## Project Structure

```
src/main/java/com/iafenvoy/origins/
├── data/
│   ├── action/         # Entity, Block, Item, Bi-entity action types
│   ├── badge/          # Badge system
│   ├── condition/      # Entity, Block, Item, Bi-entity, Damage, Biome, Fluid conditions
│   ├── layer/          # Layer registry and data
│   ├── origin/         # Origin registry and data
│   └── power/          # Power registry, base classes, built-in powers
│       ├── builtin/
│       │   ├── action/     # Action-triggered powers
│       │   ├── modify/     # Stat/damage modifier powers
│       │   ├── prevent/    # Blocking powers
│       │   └── regular/    # Standalone powers
│       └── component/      # Reusable power components (active, cooldown, toggle, resource, etc.)
├── registry/           # Block, item, entity, recipe registrations
├── attachment/         # Player data storage (OriginDataHolder)
├── command/            # In-game commands
├── config/             # Mod configuration
├── network/            # Network packet handling
└── render/             # Client-side rendering
```

## Registry System

Origins uses Vanilla's **DataPack Registry** system. There are two kinds:

| Kind | Examples | Loaded from |
|------|----------|-------------|
| **Built-in** (codec registries) | Action types, condition types, power types | `DeferredRegister` in Java code |
| **Dynamic** (data pack registries) | Origins, layers, powers, badges | `data/<ns>/origins/<type>/` JSON files |

Dynamic registries are declared in `OriginsRegistries.newDatapackRegistries()`. Each has a `ResourceKey`:
- `origins:origin` → `OriginRegistries.ORIGIN_KEY`
- `origins:layer` → `LayerRegistries.LAYER_KEY`
- `origins:power` → `PowerRegistries.POWER_KEY`
- `origins:badge` → `BadgeRegistries.BADGE_KEY`

## Power Lifecycle

When a power is granted to a player:

1. `Power.grant(holder)` is called.
2. If the `condition` field is satisfied, the power becomes **active** via `Power.active(holder)`.
3. On each tick, `Power.tick(holder)` runs.
4. If the condition becomes false, `Power.inactive(holder)` fires.
5. When the power is revoked, `Power.revoke(holder)` fires.

**Components** (`ActiveComponent`, `CooldownComponent`, `ToggleComponent`, `ResourceComponent`, `InventoryComponent`, `EntitySetComponent`) are attached to each power instance and persist runtime state.

## Adding Custom Types

To add a new **power type**:

1. Extend `com.iafenvoy.origins.data.power.Power`.
2. Provide a `MapCodec` via `codec()`.
3. Register it through `DeferredRegister` on `PowerRegistries.POWER_TYPE`.

To add a new **condition** or **action**:

1. Implement the appropriate interface (`EntityCondition`, `BlockCondition`, `EntityAction`, etc.).
2. Provide a `MapCodec`.
3. Register through `ConditionRegistries` or `ActionRegistries`.

## Differences from the Fabric Version

This NeoForge port consolidates what used to be separate libraries (Apoli, Calio) into a single mod. The namespace changed from `apoli`/`calio` to `origins`. The data path structure uses NeoForge's DataPack Registry system instead of Fabric's custom loading.

Class names and type IDs mostly match the Fabric version, but always check the source rather than assuming they're identical.

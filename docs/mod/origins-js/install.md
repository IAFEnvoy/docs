---
sidebar_position: 1
description: "How to install Origins JS for Minecraft 1.20.1"
---

# Installation

## Prerequisites

| Mod | Version | Notes |
|-----|---------|-------|
| **Origins** | 1.20.1 | Fabric or Forge |
| **Apoli** | 2.9.x | Bundled inside Origins |
| **Calio** | 1.11.x | Bundled inside Apoli |
| **KubeJS** | 2001.6.5+ | Fabric or Forge |

## Setup

1. Download the JAR from [GitHub Releases](https://github.com/IAFEnvoy/Origins-JS-Legacy/releases) or build from source.
2. Place it into your `mods/` folder.
3. Launch the game — Origins JS auto-registers with KubeJS on startup.

## Script Locations

| Directory | Purpose |
|-----------|---------|
| `kubejs/startup_scripts/` | Register actions, conditions, powers (runs once at startup) |
| `kubejs/server_scripts/` | Runtime origin / power management and event handling |

## Quick Verification

Create `kubejs/startup_scripts/origins_test.js`:

```js
console.info("[OriginsJS] Plugin loaded!");

OriginsJS.registerEntityAction("test_action", (entity, params) => {
    console.info("Test action executed on: " + entity);
});
```

Look for `[OriginsJS] Plugin loaded!` in the server log.

---
title: "Origins JS"
description: "KubeJS addon for Origins — register custom Actions, Conditions, and Powers from JavaScript."
---

# Origins JS (1.20.1)

:::warning

This document is for 1.20.1, for 1.21.1, see the [1.21 docs](./origins/js).

:::

Origins JS is a KubeJS addon for Minecraft 1.20.1 that lets you register custom **Actions**, **Conditions**, and **Powers** from JavaScript, and directly manipulate entity origins at runtime.

---

## Quick Links

- **[Installation](install)** — prerequisites, setup, script locations
- **[API Reference](api/global-api)** — complete method reference
- **[Examples](examples/entity-action)** — practical, copy-pasteable recipes

---

## What You Can Do

| Capability | How |
|-----------|-----|
| Custom entity / block / item actions | `OriginsJS.registerEntityAction(...)` etc. |
| Custom conditions (entity, biome, damage, fluid…) | `OriginsJS.registerEntityCondition(...)` etc. |
| Fully scripted powers with tick / toggle / grant | `OriginsJS.powerBuilder(...)` |
| Change origins at runtime | `holder.setOrigin(...)` |
| Grant / revoke powers on the fly | `holder.grantPower(...)` |

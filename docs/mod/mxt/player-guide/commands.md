---
title: "Commands"
description: "Every command MiXianTu adds, with its effect, its permission requirement and how registry IDs are completed."
sidebar_position: 3
---

# Commands

MiXianTu adds two command roots: `/mxt` for its own registries, resources, cultivation and world state, and `/display` for showing equipment in chat. Commands are diagnostic and administrative helpers for the framework; the gameplay itself is driven by datapacks.

## Command List

| Command | Effect |
|---|---|
| `/mxt registries list` | Lists the dynamic registries and their entry counts. |
| `/mxt registries validate` | Shows the current datapack registry validation state. |
| `/mxt attachment status` | Shows your own attachment counts and cultivation data: resources, abilities, cooldowns, curses, spirit roots and physiques. |
| `/mxt resource <id>` | Queries a resource value. |
| `/mxt resource <id> set <value>` | Sets a resource value. |
| `/mxt resourcebar [resource] [index]` | Shows a resource bar's raw current value, minimum, maximum, untruncated percentage, context, anchor and order; without arguments it lists every resource bar. |
| `/mxt cultivate status` | Shows the cultivation state: the active cultivation behaviour, the progress stored per resource and the next cultivation tick. |
| `/mxt aura` | Opens the spirit power hotbar configuration screen. |
| `/mxt aura query [type]` | Queries the aura at your current position; `type` is a resource ID, and when it is omitted every resource is shown together with its element marker. |
| `/mxt aura vein` | Queries the spirit stone vein grade at your current position. |
| `/mxt aura cache clear [radius]` | Clears and immediately rebuilds the subsection aura caches of the nearby loaded chunks; the radius is counted in chunks, defaults to 3 and accepts 0–32. |
| `/mxt ability` | Opens the ability hotbar configuration screen. |
| `/mxt ability cast <id>` | Forces an ability to be cast. |
| `/mxt breakthrough <resource>` | Attempts a breakthrough to the realm that the given resource leads to. |
| `/mxt realm set <realm>` | Sets a linear realm. |
| `/mxt sect claim` | Claims the sect territory at your position. |
| `/mxt sect release` | Releases the sect territory at your position. |
| `/mxt soul reclaim` | Reclaims a reclaimable soul. |
| `/display [player] [slot]` | Displays a slot item in chat; see [Keys and HUD](./keys-and-hud.md) for the argument forms. |

## Permissions

Commands that need administrator rights validate the `gamemaster` permission in the command tree: `/mxt resource <id> set`, `/mxt aura cache clear`, `/mxt ability cast`, `/mxt breakthrough`, `/mxt realm set` and `/mxt soul reclaim`. The remaining commands have no permission requirement, but several of them need an executing player and report that requirement when they are run from the console.

## Tab Completion

Registry IDs in commands use the vanilla `IdentifierArgument`, and tab completion is generated from the server's current registries, so it always suggests the IDs that the loaded datapacks actually define.

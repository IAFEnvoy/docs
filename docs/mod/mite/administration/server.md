---
id: server
title: Server Administration
slug: /mod/mite/administration/server
sidebar_position: 1
description: Dedicated-server configuration, reloads, backups, updates, and troubleshooting for MITE.
---

## Server-authoritative state

The server must decide and synchronize:

- Health, food, nutrition, skills, curses, and timed-crafting progress.
- Recipe availability, workbench tiers, furnace heat, and repair results.
- Crop disease, livestock status, village unlocks, and moon events.
- Portal routes, rune gate destinations, entity AI, spawning, and drops.

Keep **Enforce server authority** enabled. Disabling it is only appropriate for compatibility diagnosis, not normal public-server operation.

## What to back up

Before updates or major rule changes, back up at least:

```text
world/                         # World, dimensions, players, and SavedData
config/mite/mite-common.json   # Server balance configuration
config/mite/                   # Rule directories except mite-client.json
world/datapacks/               # World-level data packs
```

`mite-client.json` contains each player's presentation preferences and does not need server-wide distribution.

## Reload matrix

| Content | `/reload` | Server restart | New chunks/world |
|---|:---:|:---:|:---:|
| Data-pack nutrition, recipes, harvesting, spawning, dissolution | Yes | No | No |
| Rule directories under `config/mite` | Yes | No | No |
| Ordinary `mite-common.json` balance values | Depends on Jupiter save/reload | No | No |
| Configuration marked `restartRequired` | No | Yes | No |
| Ores and Underworld terrain | No | Recommended | Existing chunks are unchanged |
| Dynamic-registry dimensions, enchantments, world-generation JSON | Partial | Recommended | Often needs new chunks or a new world |

After `/reload`, inspect the log for:

```text
Loaded ... recipe rules
Loaded ... food nutrition definitions
Loaded ... harvest rule targets
Loaded ... mob spawn rules
Loaded ... gelatinous dissolving rule targets
Loaded ... misc definitions from .../config/mite
```

A count unexpectedly becoming `0` usually means the directory is wrong, JSON is invalid, or the data pack is disabled.

## MITE commands

All mod commands are under `/mite`. Run `/mite` or `/mite commands` for the complete in-game list.

| Command | Purpose |
|---|---|
| `/mite day` | Show the current world day |
| `/mite ground` | Correct the floor/ceiling bouncing position bug |
| `/mite rendering` | Show the server view and simulation distances |
| `/mite skills` | List available professions |
| `/mite skill <profession>` | Show a profession and whether it is learned |
| `/mite learn <profession>` | Learn a profession |
| `/mite abandon <profession>` | Abandon a profession |
| `/mite stats` | Write character statistics to client-side `MITE/stats/<player>.txt` |
| `/mite syncpos` | Resynchronize the client position with the server |
| `/mite tournament` | Show the tournament objective or report that none is active |
| `/mite villages` | Show the village-generation prerequisites |
| `/mite xp` | Show exact experience points and level |

The MITE server-load, JVM-memory, and loaded-chunk diagnostics are intentionally not ported.

## Permissions and configuration UI

Server configuration is registered through Jupiter and is operator-only by default. Player clients read synchronized effective values but cannot override them. Recommended practice:

- Only grant configuration access to trusted production-server administrators.
- Record the previous value and change date when changing probabilities or durations.
- Run `/reload` on a test server and observe at least one full day/night cycle first.

## Performance considerations

- Livestock AI searches for nearby food, water, fences, and entities. Avoid concentrating hundreds of animals in one chunk.
- Zombie digging and gelatinous dissolution respect `mobGriefing`; disabling it reduces block scanning and destruction.
- Underworld terrain, dungeons, and veins only run during chunk generation, although first exploration has normal generation cost.
- Large increases to spawn probabilities, nearby-block radii, or livestock update frequency multiply server load.

## Updating

1. Stop and back up the server.
2. Update the MITE JAR on the server and every client.
3. Start once to install new default `misc` files.
4. Compare changed behavior with the corresponding entries in the [Content index](../content/index.md).
5. Run `/reload` and inspect loaded counts and errors.
6. Test portals, the Underworld, workbenches, furnaces, and player reconnection in a backed-up world.

## Development and automated tests

From the source repository, run:

```powershell
.\gradlew.bat build runGameTestServer
```

The build validates all resource JSON. NeoForge Server GameTest covers registration, configuration/data rules, dimensions, portals, networking, and critical gameplay regressions. GameTest does not replace rendering and input tests with a real client.

## Troubleshooting

### A recipe viewer still shows disabled recipes

Confirm that server rules have synchronized, then reopen the recipe screen after reloading. JEI and EMI filter through `RecipeRules`, but third-party caches may require rejoining the world.

### New ores do not appear in old terrain

Ores are placed only when a chunk is first generated. Travel to unexplored terrain or create a new world.

### The client cannot see complete Jade state

Client-only Jade can display information already available to the client. Server-authoritative furnace timing, disease, livestock, and special-mob state requires Jade on the server as well.

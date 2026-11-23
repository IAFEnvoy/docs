---
title: Reincarnation
description: Start a new life in the same world and browse records of previous lives.
sidebar_position: 0
---

Reincarnation (`reincarnation`) lets players start a new life in the same Minecraft world. The account keeps its UUID, while the player entity and personal progress are replaced. The world and existing builds stay in place. Previous lives can be inspected in the archive.

## Installation {#installation}

Install Reincarnation on the server and every client joining it. For single-player, install it in the client instance.

| Requirement | Version or side |
| --- | --- |
| Minecraft | 26.1.2 |
| NeoForge | 26.1.2.99 or later for this Minecraft version |
| Java | 25 |
| [Jupiter](../../library/jupiter/index.md) | 2.4 or later, client and server |
| [Saturn](../../library/saturn/index.md) | 1.2.5 or later, client and server |
| ApricityUI | 1.2.9 or later, client |
| KubeJS | Optional, for the [scripting API](./kubejs.md) |

[Source and releases](https://github.com/IAFEnvoy/Reincarnation) · [ApricityUI download](https://www.curseforge.com/minecraft/mc-mods/apricityui)

## Your current and previous lives {#life-archive}

Use `/reincarnation view` to open your current life. Select an entry on the left to switch lives and expand its information groups on the right. The archive shows the life number, start and end times, reason for rebirth, and captured player information such as experience, inventory and advancement counts. An online player's current life refreshes about once a second. An offline player's current-life view can show a recorded summary. Archived lives are read-only. See [commands and permissions](./commands.md).

## Starting a new life {#new-life}

A full rebirth archives the previous life, increases the visible life number by one, and creates a fresh player at the default spawn. It resets inventory, ender chest, experience, recipes, advancements and statistics. `keepInventory` does not preserve inventory through a full rebirth. Scores, team membership, game mode, and selected mod data follow the server's [reset settings](#reset-settings).

Operators can start a new life with `/reincarnation rebirth`. A server can also start a new life when a dead player respawns. Both triggers are independent of [natural ageing](./lifespan.md). To keep the current player entity and life number while renewing lifespan, use the lifespan system's in-place reset.

Full rebirth also ends relationships bound to the previous life, such as vanilla pet ownership. If a committed rebirth is interrupted, reconnect so the server can finish it. The archive and recovery records are stored under `reincarnation/` inside the world save. Include this directory in world backups.

## Server configuration {#server-configuration}

Open **Mods → Reincarnation → Config**. Editing server settings requires operator permission. The settings file is `config/reincarnation/reincarnation-server.json`.

### Lifecycle and history {#lifecycle}

| Setting | Default | Effect |
| --- | --- | --- |
| `lifecycle.auto_reincarnate_on_death` | Off | Start a full new life when a dead player respawns. |
| `lifecycle.filter_death_damage_types` | Off | Limit automatic rebirth to damage types in `reincarnation:reincarnate_on_death`. The built-in tag contains lifespan damage. |
| `query.history_page_size` | `8` | Entries per chat history page, from `1` to `50`. |

See [the damage-type tag](./datapack.md#death-filter) for an example of extending the filter.

### Reset settings {#reset-settings}

| Setting | Default | Effect |
| --- | --- | --- |
| `reset.scores` | On | Clear the player's scoreboard scores on full rebirth. |
| `reset.team` | Off | Remove the player from their scoreboard team on full rebirth. |
| `reset.keep_game_mode` | On | Keep the player's game mode on full rebirth. When off, use the server default. |
| `reset.unknown_mod_data` | Off | On full rebirth, clear unknown persistent mod data. In either rebirth mode, skip attachment retention when enabled. Registered handlers can still explicitly restore their data during a full rebirth. |
| `reset.clear_resources` | On | Clear the Saturn resource attachment unless a data pack explicitly retains it. Disabling this setting preserves that attachment unless unknown mod data is also being reset. |

Use [attachment retention](./datapack.md#attachment-retention) to specify what survives. See [MiXianTu integration](../mxt/player-guide/lifespan.md) for cultivation data and breakthrough rewards.

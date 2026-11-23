---
title: Lifespan
description: Configure online ageing, lifespan warnings, expiry, and in-place rebirth.
sidebar_position: 2
---

## Age and lifespan {#age}

The lifespan ledger records remaining ticks and total ticks granted in this life. Age is the difference between the two. Extending a finite lifespan adds to both values and leaves age unchanged. The archive and `/lifespan get` display **age / total lifespan**. By default, `24000` ticks display as one year.

Natural ageing is off by default. Enable it in the **Lifespan** settings to seed players with the configured initial amount. By default, each living, ticking entity with a finite ledger spends `20` lifespan ticks every `20` game ticks. Players do not age offline. Creative and spectator players are excluded from ageing by default. Ordinary mobs can receive a ledger through [commands](./commands.md#lifespan), [data pack actions](./datapack.md#actions) or scripts.

Ordinary death and respawn preserve the same ledger. Full rebirth begins a fresh ledger when natural ageing is enabled. Explicit in-place resets start with the configured base amount, even while natural ageing is disabled. Use `/lifespan unlimited` to close a ledger. Explicit `set` or a positive `add` can reopen it.

## Outcomes on expiry {#expiry}

| Outcome | Effect |
| --- | --- |
| `none` | Close the ledger and issue the expiry event. |
| `death` | Kill the entity with `reincarnation:lifespan` damage. Players can be switched to spectator instead. A player killed by lifespan damage follows the normal death and respawn flow, including automatic rebirth if enabled. |
| `reincarnate` | Use the configured player mode. **New life** archives and replaces the player. **Reset in place** retains the entity and life number, resets attachments governed by the [retention rules](./datapack.md#attachment-retention), and renews the ledger. Other living entities reset in place. |

To intercept expiry or grant an extension, use the [expiry event](./kubejs.md#events).

## Settings {#settings}

These keys belong to the `lifespan` section of the [server config](./index.md#server-configuration).

| Key | Default | Effect |
| --- | --- | --- |
| `enabled` | Off | Enable automatic grants, ageing, expiry settlement and low-life warnings. |
| `base_lifespan` | `1440000` | Initial grant in ticks, displayed as 60 years by default. Zero disables an automatic finite grant. |
| `settle_interval` | `20` | Game ticks between settlements. |
| `age_per_settle` | `20` | Lifespan ticks spent per settlement. Zero stops age from advancing. |
| `on_expire` | `death` | Outcome when the remaining lifespan reaches zero. |
| `player_death_mode` | `kill` | Kill the player or switch them to spectator. |
| `player_rebirth_mode` | `new_life` | Choose a full new life or an in-place reset. |
| `warning_fraction` | `0.1` | Warn once when the finite remainder reaches or falls below this share of the total. Going above the threshold rearms the warning. Zero disables warnings. |
| `ticks_per_year` | `24000` | Display unit only. Set to `1` to display ticks. |
| `age_creative` | Off | Include creative players in ageing. |
| `age_spectator` | Off | Include spectator players in ageing. |
| `kill_on_reset` | Off | Deal lifespan damage to the entity after an in-place reset. |

---
title: Lifespan
description: Reincarnation lifespan ledgers, online ageing, expiry outcomes and MiXianTu cultivation retention.
---

# Lifespan

<span id="lifespan" />

Reincarnation is optional. When installed, it manages lifespan and reincarnation, and MiXianTu displays its information row. Data packs can configure lifespan changes in breakthrough success actions. Cultivation works without it; lifespan integration content must be excluded with loading conditions. Each body stores remaining lifespan and the total granted in this life, both in game ticks. The default display scale is 24000 ticks per year; it only changes presentation.

## Where the Numbers Come From {#where-the-numbers-come-from}

| Source | Behaviour |
| --- | --- |
| Reincarnation base lifespan | When automatic lifespan is enabled, players receive 1440000 ticks by default, displayed as 60 years; 0 disables automatic grants |
| `success_action` on a [realm stage](../datapack/json/realm_stage.md) | A configured lifespan action runs when a breakthrough reaches that stage; arrays combine it with other success actions |
| `reincarnation:add_lifespan` / `reincarnation:remove_lifespan` | Non-negative amounts grant or spend life; grants raise both numbers, removal spends only the remainder |
| [Commands](./commands/lifespan.md) and [ReincarnationLifespan](../kubejs/api/lifespan.md) | Administrator or server script writes |

A body without a ledger is unaccounted for; ordinary mobs do not all receive ledgers automatically. Adding zero creates nothing, and spending clamps at 0. A closed ledger can receive finite life again through set/add.

## How the Server Settles It {#how-the-server-settles-it}

Natural ageing is disabled by default. In Reincarnation server settings, **Lifespan → Enable lifespan** controls automatic grants, settlement and warnings. Explicit command, action and script writes remain available.

The default settlement spends 20 lifespan ticks every 20 game ticks. Only online entities receiving ticks age; offline time is never charged. Creative and spectator players are excluded by default and have separate switches. Reaching or falling below the warning fraction sends one chat warning.

## After It Runs Out {#after-it-runs-out}

Reincarnation server settings, **Lifespan → On expiry**, choose the outcome.

| Choice | Behaviour |
| --- | --- |
| `none` | Close the ledger and publish the expiry notification |
| `death` | Use **Player death mode** to kill or switch to spectator; non-player beings are killed |
| `reincarnate` | Use **Player rebirth mode** for a new life or an in-place reset; non-player beings always reset in place |

A kill uses the `reincarnation:lifespan` damage type and follows the death flow. It belongs to `mxt:no_bonus`, excluding elemental damage bonuses. Ordinary death respawns keep the same-life ledger. Reincarnation's automatic death rebirth setting can turn the subsequent respawn into a new life.

A new life archives the previous one, advances the life number, replaces the player and grants the configured base lifespan. An in-place reset keeps the entity and life number, reopens the ledger and applies the cultivation rules below. Requests run at the end of the server tick; an accepted command or script call is not a completion notification.

`lifespanEnd.Pre` can cancel expiry. Granting positive life during the callback continues ageing; cancellation without renewal closes the ledger to avoid repeated expiry. Rebirth also passes through cancellable `lifespanRebirth.Pre`; Post and Failed report completion and failure. See [ReincarnationEvents](../kubejs/api/reincarnation_events.md).

## Character Panel {#character-panel}

The character panel and Reincarnation archives share the lifespan row. An unaccounted body has no row, a closed ledger shows Unlimited, and a finite ledger remains visible while natural ageing is disabled. The display is **age / total lifespan**. Age is total minus remaining life and increases from zero. Extending lifespan raises the limit without changing age; rebirth starts age at zero. **Ticks per year** in Reincarnation controls display; 1 shows ticks. Past lives retain the lifespan captured in their archive.

## Server Config {#server-config}

### Reincarnation Lifespan {#reincarnation-lifespan}

These settings belong to Reincarnation's Lifespan tab.

| Setting | Default | Effect |
| --- | --- | --- |
| Enable lifespan | off | Automatic grants, settlement and warnings |
| Base lifespan (ticks) | 1440000 | Initial and new-life grant; 0 disables automatic grants |
| Settlement interval | 20 | Game ticks between settlements |
| Age per settlement | 20 | Ticks spent per settlement; 0 disables natural ageing |
| On expiry | death | none / death / reincarnate |
| Player death mode | kill | Kill or switch to spectator |
| Player rebirth mode | new life | New life or in-place reset |
| Warning threshold | 0.1 | Warn once on a downward crossing; 0 disables it |
| Ticks per year | 24000 | Display conversion only; 1 shows ticks |
| Age creative players | off | Whether creative players age |
| Age spectator players | off | Whether spectator players age |

### Reincarnation Retention {#reincarnation-retention}

Reincarnation handles attachment cleanup for new lives and in-place resets. Cultivation, minor stages, tribulations, identities, techniques and soul values clear by default. In-place reset keeps the entity and life number; vanilla inventory, experience and progress are only reset by a full new life.

| Reincarnation setting | Default | Effect |
| --- | --- | --- |
| Lifespan → Kill on in-place reset | off | Kill with lifespan damage after an in-place reset; never kill the new player after a full rebirth |
| Reincarnation Reset → Clear resource values | on | Clear Saturn resource values; disable to preserve their attachment |

Use `reincarnation:keep_on_rebirth` to retain selected attachments. They must also support copying on death. For example, a data pack can preserve roots, physiques, techniques and soul values with:

`data/reincarnation/tags/neoforge/attachment_types/keep_on_rebirth.json`

```json
{
  "replace": false,
  "values": ["mxt:spirit_identity", "mxt:technique", "mxt:soul_stats"]
}
```

This tag also supports `mxt:cultivation`, `mxt:minor_stages`, `mxt:tribulation` and `saturn:resource_holder`. A tagged resource attachment survives even when resource clearing is enabled. Resetting unknown mod data overrides both the tag and resource retention. Full rebirth freezes the selected attachment IDs in its archive, so recovery does not reread later tag or configuration changes.

Herb catch-up uses **Server Config → Alchemy → Herb catch-up limit (ticks)**, default 24000, independently of lifespan display conversion.

## Related {#related}

- [Entity actions](../datapack/types/action/entity_action_types.md): grant/spend life, close a ledger and request rebirth.
- [Entity conditions](../datapack/types/condition/entity_condition_types.md): lifespan values, ledger states and life numbers.
- [Formula variables](../datapack/types/formula_variables.md): `lifespan_remaining` / `lifespan_total`; negative sentinels return NaN.
- [ReincarnationLifespan](../kubejs/api/lifespan.md), [events](../kubejs/api/reincarnation_events.md) and [commands](./commands/lifespan.md).

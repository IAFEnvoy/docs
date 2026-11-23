---
title: Java API
description: Integrate with rebirth, handle life-specific data, and read player snapshots.
sidebar_position: 5
---

The entry points use `com.iafenvoy.reincarnation.api`. For an optional dependency, isolate calls in a compatibility class loaded when `ModList.get().isLoaded("reincarnation")` is true.

## Entry points {#api}

| API | Method | Behaviour |
| --- | --- | --- |
| `ReincarnationApi` | `reincarnate(ServerPlayer, ReincarnationRequest)` | Run full rebirth and return the replacement player. `ReincarnationRequest.atSpawn(player, reason)` uses default spawn and captures the server's reset policy. A request can also supply an explicit dimension, position, rotation and policy. |
| `ReincarnationApi` | `view(UUID, long)` | Read an optional Saturn `PlayerViewSnapshot`. The caller is responsible for viewer authorization. |
| `LifespanApi` | `get(Entity)`, `set`, `add`, `unlimited` | Read or write the ledger. Amounts and sentinel values match the [KubeJS methods](./kubejs.md#methods). Reading creates no attachment. |
| `LifespanApi` | `rebirth(LivingEntity, RebirthMode, Component)` | Execute lifespan rebirth now and return the resulting entity in a Saturn `Result`. |
| `LifespanApi` | `requestRebirth(LivingEntity, RebirthMode, Component)` | Queue lifespan rebirth after entity ticking. |

Call writes and the full-rebirth API on the logical server thread. After a full rebirth, continue with the returned player. For queued operations, use the Post event to get the resulting entity. The modes are `CONFIGURED`, `NEW_LIFE` and `RESET`. Archive queries use zero-based generations. `LifeNumbers.display` and `LifeNumbers.generation` convert between those IDs and the one-based numbers used in commands.

## Events {#events}

| Event | Phases | Scope |
| --- | --- | --- |
| `ReincarnationEvent` | `Pre`, `Reset`, `Post` | Full player rebirth. `Pre` is cancellable and sees the old player. `Reset` and `Post` see the replacement. |
| `LifeSpanEndEvent` | `Pre`, `Post` | Lifespan expiry. `Pre` can cancel settlement. |
| `LifeSpanRebirthEvent` | `Pre`, `Reset`, `Post`, `Failed` | Lifespan-driven rebirth. `Pre` can cancel. `Reset` is specific to in-place reset. `Failed` reports queued execution failures. |

A lifespan-driven `NEW_LIFE` also enters the full player rebirth flow.

## Rebirth handlers {#handlers}

Listen for `RegisterReincarnationHandlersEvent` on the mod event bus. Each `ReincarnationHandler` has a unique ID, a positive snapshot version (default `1`), and a priority (default `100`). Lower numbers run first. Handlers with equal priority run in ID order. `archive` captures mod data as a `CompoundTag` before replacement. Use `reset` to apply the saved state to the new player. Recovery can call `recover`, which delegates to `reset` by default. Write idempotent handlers that use the saved snapshot and transaction context. Keep the same handler ID and compatible version while any unfinished rebirth still references that snapshot.

## Life-bound player references {#references}

Use `LifeReferences.bind(level, uuid)` to bind a new relationship to a player's current generation, including offline targets. When deserializing a saved generation, use `restore(uuid, generation)`. Use `sameLife` to compare both account and generation and `isCurrent` to check whether a reference still points to the target's current life.

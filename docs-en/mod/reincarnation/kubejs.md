---
title: KubeJS
description: Read and write lifespan and listen to expiry and rebirth events.
sidebar_position: 4
---

Place scripts in `kubejs/server_scripts/`. This integration requires KubeJS.

## ReincarnationLifespan {#methods}

| Method | Return | Behaviour |
| --- | --- | --- |
| `remaining(entity)` | `long` | Remaining ticks, or `-1` for an unaccounted or closed ledger. |
| `total(entity)` | `long` | Total ticks granted, `-1` if unaccounted and `0` if closed. |
| `set(entity, ticks)` | `Result` | Set remaining and total ticks to the same non-negative number. |
| `add(entity, ticks)` | `Result` | Positive amounts extend both values. Negative amounts spend only the remainder. |
| `unlimited(entity)` | `Result` | Close the ledger. |
| `reincarnate(entity)` | `Result` | Queue rebirth in the configured mode. |

Writes require a living entity and the logical server thread. Client reads return `-1` and client writes return `SERVER_ONLY`. Inspect `getFailure()` and `getData()` on Saturn's `Result`. An empty failure means success. For queued rebirth, that means the request was accepted.

## ReincarnationEvents {#events}

The wrapper provides `getType()`, `getPhase()`, `isCancellable()` and `getEvent()`. Call `cancel()` on a `Pre` event to cancel the underlying operation.

| Event | Phases | Native event |
| --- | --- | --- |
| `lifespanEnd` | `Pre`, `Post` | `getEntity()` and `getSpirit()` expose the entity and lifespan ledger. Granting positive life in `Pre` resumes ageing. Cancelling without renewal closes the ledger. `Post` also has `getOutcome()`. |
| `lifespanRebirth` | `Pre`, `Post`, `Failed` | `getEntity()`, `getSpirit()` and `getMode()`. `Post` supplies the resulting entity and its ledger. A rejected queued rebirth can report `Failed` with `getFailure()`. |

Explicit lifespan rebirth publishes `lifespanRebirth` events. Ordinary death-triggered full rebirth and `/reincarnation rebirth` use [the full rebirth events](./java.md#events).

```js title="kubejs/server_scripts/lifespan.js"
ReincarnationEvents.lifespanEnd(event => {
  if (event.getPhase() !== 'Pre') return
  const entity = event.getEvent().getEntity()
  if (!entity.getTags().contains('example:immortal')) return
  ReincarnationLifespan.unlimited(entity)
  event.cancel()
})
```

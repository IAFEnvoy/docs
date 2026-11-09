---
title: 'ReincarnationLifespan: Lifespan'
description: Read and write the shared lifespan ledger and queue rebirth.
---

# `ReincarnationLifespan`: Lifespan

<span id="reincarnationlifespan-lifespan" />

Provided by Reincarnation; put scripts in `kubejs/server_scripts/`. Explicit writes work while natural ageing is disabled. Client reads return -1 and client writes return SERVER_ONLY.

## Methods {#methods}

| Method | Return | Behaviour |
| --- | --- | --- |
| `remaining(entity)` | long | Remaining ticks, or -1 for an unaccounted/closed ledger; creates nothing |
| `total(entity)` | long | Total ticks granted this life; -1 if unaccounted, 0 if closed |
| `set(entity, ticks)` | Result | Rewrite both numbers; negative ticks fail |
| `add(entity, ticks)` | Result | Positive values extend both; negative values spend only the remainder |
| `unlimited(entity)` | Result | Close the ledger until an explicit write grants finite life |
| `reincarnate(entity)` | Result | Queue rebirth in the configured mode; success means accepted |

Read a Result with `getFailure()` and `getData()`, both Optional. An empty failure means success. All amounts are game ticks. The write methods require a living entity and the server thread. Rebirth can later be cancelled or fail; observe `ReincarnationEvents.lifespanRebirth` Post/Failed. Post supplies the new entity: do not continue using the previous player after a full rebirth. Explicit rebirth does not publish `lifespanEnd`.

```js
// kubejs/server_scripts/lifespan.js
PlayerEvents.loggedIn(event => {
  if (ReincarnationLifespan.total(event.player) < 0) {
    ReincarnationLifespan.set(event.player, 60 * 24000)
  }
})
```

Events are provided by [ReincarnationEvents](./reincarnation_events.md).

## Related {#related}

- [Lifespan](../../player-guide/lifespan.md): ageing, expiry and retention settings.
- [KubeJS API reference](../api-reference.md).

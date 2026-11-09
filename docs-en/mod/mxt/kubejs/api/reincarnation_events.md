---
title: 'ReincarnationEvents: Lifespan Events'
---

# `ReincarnationEvents`: Lifespan Events

<span id="reincarnationevents-lifespan-events" />

`ReincarnationEvents` provides two server events with `getType()`, `getPhase()`, `isCancellable()` and `getEvent()`. `getEvent()` returns the native event. `event.cancel()` stops the current script listener chain; only Pre can cancel the underlying operation.

| Event | Phases | Native accessors and behaviour |
| --- | --- | --- |
| `lifespanEnd` | `Pre`, `Post` | `getEntity()` and `getSpirit()` belong to the old life. Pre can cancel: granting positive life resumes ageing; cancellation without renewal closes the ledger. Post adds `getOutcome()`. Explicit rebirth does not publish this event. |
| `lifespanRebirth` | `Pre`, `Post`, `Failed` | Direct expiry rebirth and explicit lifespan rebirth publish it. `getEntity()`, `getSpirit()`, `getMode()`; Pre can cancel. Post supplies the new entity and ledger. Queued failure or cancellation publishes Failed with `getFailure()`. |

```js
ReincarnationEvents.lifespanEnd(event => {
  if (event.getPhase() !== 'Pre') return
  const entity = event.getEvent().getEntity()
  if (!entity.getTags().contains('example:immortal')) return
  ReincarnationLifespan.unlimited(entity)
  event.cancel()
})
```

Automatic death reincarnation and `/reincarnation rebirth` use the full reincarnation flow and do not publish these lifespan events.


## Related {#related}

- [ReincarnationLifespan](./lifespan.md): read/write lifespan and queue rebirth.
- [Lifespan](../../player-guide/lifespan.md): ageing and expiry settings.

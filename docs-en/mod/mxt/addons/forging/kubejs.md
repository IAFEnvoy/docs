---
title: KubeJS Events
---

Install this addon and KubeJS, then subscribe to `ForgingWorkstationsEvents.process` from a server script. The wrapper exposes `getPhase()`, `getEvent()` and `isCancellable()`; use `event.cancel()` to cancel.

| Event | Phases | Native event semantics |
| --- | --- | --- |
| `ForgingWorkstationsEvents.process` | `Start`, `Started`, `StrikePre`, `StrikePost`, `CompletePre`, `CompletePost`, `Cancel` | Every phase can read `getPlayer()` (`ServerPlayer`) and `getPos()` (`BlockPos`, the position of the table). Per phase: `Start.getBlueprint()`; `Started/StrikePost/Cancel.getSession()`; `StrikePre.getMethod()` (`Holder<ForgingMethod>`), `getResources()`, `getContext()`, `getCosts()`, `setCosts(costs)`; `CompletePre.getBlueprint()`, `getSession()`; `CompletePost.getBlueprint()`, `getSession()`, `getResult()`, `getQuality()` (`Holder<ItemQuality>`, the tier this run settled on — `getResult()` gives the forging record only, and a listener runs **before** the finished stack's component is written, so read the tier from here). `Start`, `StrikePre`, `CompletePre` and `Cancel` can be cancelled. |

```js
ForgingWorkstationsEvents.process(event => {
  if (event.getPhase() !== 'StrikePre') return
  const native = event.getEvent()
})
```

## Two Extra Conventions for `forging` {#two-extra-conventions-for-forging}

**The session is read-only.** `getSession()` returns a `ForgingSessionView`, which can read `value()`, `steps()`, `optimalSteps()`, `history()` (an immutable list) and `canComplete()`, but **cannot** modify the session — the native `ForgingSession` is a mutable object and is no longer handed to listeners, so a call such as `event.getEvent().getSession().strike(...)` does not exist. The table itself is not handed to listeners either, only its position `getPos()`; to read a slot, use `player.level().getBlockEntity(pos)`.

**A listener must not throw, and a throw does not break the operation.** The four decision events (`Start`, `StrikePre`, `CompletePre`, `Cancel`) are dispatched in the middle of the transaction, so when a listener throws, the server turns it into a rejection on the spot: the log records `LISTENER_ERROR` (distinct from `CANCELLED` when a script calls `cancel()` deliberately), the operation does not happen, materials are not consumed, and the session stays as it was. The three notification events (`Started`, `StrikePost`, `CompletePost`) are dispatched after the operation has already taken effect, so a throw is only logged and ignored.

## Items and Bindings

Register items in KubeJS startup scripts, then claim tools and blueprints with `data/<namespace>/mxt_forging/tool_binding/<entry>.json` and `data/<namespace>/mxt_forging/blueprint_binding/<entry>.json`. Both tables match items through a nonempty `items` field; entry IDs remain `<namespace>:<entry>`. See [tool bindings](./datapack/tool_binding.md) and [blueprint bindings](./datapack/blueprint_binding.md) for fields.

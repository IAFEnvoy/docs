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

**The session is a read-only view.** `getSession()` returns `ForgingSessionView`, exposing `value()`, `steps()`, `optimalSteps()`, `history()` (an immutable list) and `canComplete()`. Listeners cannot modify the session and do not receive the mutable `ForgingSession` or workstation object. Use `getPos()` for the position and `player.level().getBlockEntity(pos)` when slot access is required.

**Exception handling depends on the event phase.** Decision events (`Start`, `StrikePre`, `CompletePre`, `Cancel`) run within the transaction. A listener exception rejects the operation, preserves materials and session state, and records `LISTENER_ERROR`, distinct from `CANCELLED` produced by an explicit `cancel()`. Notification events (`Started`, `StrikePost`, `CompletePost`) run after the operation takes effect. Their exceptions are logged without affecting the completed operation.

## Items and Bindings

Register items in KubeJS startup scripts, then claim tools and blueprints with `data/<namespace>/mxt_forging/tool_binding/<entry>.json` and `data/<namespace>/mxt_forging/blueprint_binding/<entry>.json`. Both tables match items through a nonempty `items` field; entry IDs remain `<namespace>:<entry>`. See [tool bindings](./datapack/tool_binding.md) and [blueprint bindings](./datapack/blueprint_binding.md) for fields.

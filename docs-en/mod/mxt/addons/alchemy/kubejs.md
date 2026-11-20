---
title: KubeJS Events
---

Install this addon and KubeJS, then subscribe to `AlchemyWorkstationsEvents.process` from a server script. The wrapper exposes `getPhase()`, `getEvent()` and `isCancellable()`; use `event.cancel()` to cancel.

| Event | Phases | Native event semantics |
| --- | --- | --- |
| `AlchemyWorkstationsEvents.process` | `Pre`, `Post` | Both phases have `getRecipe()` (`RecipeHolder<AlchemyRecipe>`, the identity automatically resolved and frozen into the batch rather than the player's choice), `getPos()` and `getOperator()` (UUID). `Pre.getPlayer()` always has the person who lit the furnace, and `Pre.getInputs()` is an immutable `InputCopy` list whose entries carry `role()` (`MAIN` / `AUXILIARY` / `CATALYST`) and a copy in `stack()`; changing a copy or the list **does not change the bill**, cancelling consumes nothing, while touching the **real inventory** refuses the lighting (with `CANCELLED` as the reason) and **does not restore the inventory**. `Post.getPlayer()` is empty when the original operator is offline, and `Post.isSuccess()`, `Post.getReason()` (empty on success) and `Post.getOutputs()` are the output snapshot. Settlement first clears the pending output and the session, then runs the block action, the original operator's player action and the completion check inside the reentrancy guard, and only posts `Post` after leaving it, so a callback may start the next batch on a furnace that is still valid; `Post` does not write the output slots. |

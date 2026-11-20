---
title: Alchemy Extension API
---

## Alchemy {#alchemy}

### `AlchemyWorkstationService` {#alchemyworkstationservice}

Package `com.iafenvoy.mxt.alchemy.runtime.alchemy`. The furnace's **one intake point**: previewing, lighting, aborting and the per tick advance all live here, and the block entity only answers state (see [AlchemyWorkstation](interfaces/alchemy/alchemy workstation.md)).

| Method | Purpose | Notes |
|     |     |     |
| `start(ServerPlayer player, AlchemyWorkstation station)` | Lights the furnace | Returns `StartResult(started, failure, qualityFailure)`. The materials are consumed only once the whole judgement chain has passed: structure, furnace spec, quality, where the inputs sit and how many there are, whether the temperature can be reached, the ambient aura, and whether the output bin can take the result; a cancellation from `alchemyCraft`'s `Pre`, or a listener that moved the real inventory, gives `CANCELLED` and **does not restore the inventory**. |
| `preview(ServerPlayer player, AlchemyWorkstation station)` | Previews the same judgement and **takes no chosen recipe** | Returns `AlchemyPreview(mixture, candidates, resolvedRecipe, blocker, parameters, qualityFailure, successOutputs, failureOutputs)`; lighting uses that same `parameters`, so a preview and a real run never give two different answers. |
| `abort(ServerLevel level, BlockPos pos, AlchemyWorkstation station)` / `abort(..., AlchemyFailure reason)` | Aborts the active batch | Settles it as a failure once, and the materials already consumed are not returned; a batch that is already `READY`, or already settled, is not settled a second time. |
| `furnaceDefinition(Provider access, ItemStack stack)` | Resolves a furnace spec from a furnace item | An empty stack, no component, an empty id inside the component, or a definition that is not in the registry all give empty. |
| `tick(ServerLevel level, BlockPos pos, AlchemyWorkstation station)` | Advances one tick | Called by the core block entity's own server tick; the temperature advance, the phase changes, the pending output and the settlement all happen here. |

Result types: `StartResult`, `AlchemyPreview`, `Parameters` (the recipe vector evaluated once at lighting and frozen into the batch), and `enum AlchemyFailure {FURNACE_QUALITY, QUALITY_CONDITIONS, BINDING_CONDITIONS, UNBOUND, MAX_USES, COOLDOWN, NO_FURNACE, STRUCTURE, ACTIVE, CAPACITY, SLOTS, ZERO_POWER, NOT_HERB, INSUFFICIENT, CONFLICT, IMBALANCE, AMBIGUOUS, TEMPERATURE, ENVIRONMENT, INVALID_FORMULA, OUTPUT_CAPACITY, CANCELLED, DISABLED}` (23 values).

Key points:

  **The temperature and the outputs are not written in from outside**: `Parameters` is evaluated once at the moment of lighting and frozen, the active batch reads that frozen copy, and only a batch started after a `/reload` reads a new recipe.
  **`start` and `preview` share one judgement**: temperature and output capacity only take part in accepting or rejecting the entry that has already been chosen, and never make the judgement pick a weaker recipe.
  **A heat block answers only two numbers**, see [AlchemyHeatSource](../../../java/interfaces/alchemy/alchemy-heat-source.md).

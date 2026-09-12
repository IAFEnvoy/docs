---
title: "KubeJS API Reference"
description: "Complete method reference for the MiXianTu KubeJS bridge: MxtActions, MxtConditions, MxtValues, MxtCosts, MxtResources, the runtime domain APIs and MxtEvents."
sidebar_position: 2
---

# KubeJS API Reference

The MiXianTu KubeJS bridge provides a separate object per domain; it does not provide a `Mxt` root object carrying every method. All APIs that change game state must be called from `kubejs/server_scripts/`, and they enter the mod's existing server transactions and event flow.

The identifiers below — `id`, `resource`, `ability`, `curse`, `zone` and so on — are all namespaced strings, for example `mxt:spirit_power` or `example:fireball`. Passing an invalid identifier, or JSON that cannot be decoded by the matching codec, throws a script error directly, so that data problems can be located.

## Overview

| Global | Responsibility |
| --- | --- |
| `MxtActions` | Register `mxt:js` action callbacks, or run a built-in action. |
| `MxtConditions` | Register `mxt:js` condition callbacks, or test a built-in condition. |
| `MxtValues` | Register or evaluate number providers and resource value providers. |
| `MxtCosts` | Check or pay a single complete `Cost`. |
| `MxtResources` | Pay several resource costs atomically. |
| `MxtAbilities` | Cast an ability the entity already holds. |
| `MxtCultivation` | Add cultivation progress and attempt a realm breakthrough. |
| `MxtCurses` | Apply or explicitly remove a curse. |
| `MxtAura` | Query, add and remove server-side aura areas. |
| `MxtSouls` | Reclaim the transferable soul of an entity. |
| `MxtEvents` | Every MiXianTu server lifecycle event. |

`Entity`, `LivingEntity`, `Player`, `Level`, `BlockPos`, `ItemStack` and `DamageSource` are all vanilla Java objects exposed by KubeJS. A `JsonObject`/`JsonElement` parameter accepts a plain JavaScript object or array.

## Common Data Rules

### Number Provider

Every parameter that is a number provider, such as `amount` or `value`, accepts the following forms:

```js
10                                      // constant
'level * 2 + 1'                         // formula
{ type: 'mxt:uniform', min: 1, max: 3 } // built-in typed object
```

The formula context is created automatically by the called API from the entity or the level. The result computed by a script callback or a provider must be a finite number; `NaN`, `Infinity`, an exception or a callback that is not registered is logged and treated as `0`.

### `mxt:js` Callback Definitions

Actions, conditions, number providers and resource value providers all have a pre-registered `mxt:js` type. First register the callback in a server script:

```js
MxtActions.entity('example:heal', (entity, params) => {
  entity.heal(params.amount || 1)
})
```

Then use it in any matching data pack field:

```json
{
  "type": "mxt:js",
  "id": "example:heal",
  "params": { "amount": 4 }
}
```

An `id` is unique **within the same callback category**. KubeJS clears every callback before reloading server scripts and then re-runs the scripts, which register them again; do not put a registration in a client script that only runs once. When no callback is found, an action does not run, a condition returns `false`, a value returns `0`, and a warning is logged.

## `MxtActions`

### Registering a Script Action

| Method | Callback parameters | Purpose |
| --- | --- | --- |
| `entity(id, callback)` | `(entity: Entity, params: object)` | Registers an entity action. |
| `biEntity(id, callback)` | `(actor: Entity, target: Entity, params: object)` | Registers a bi-entity action. |
| `block(id, callback)` | `(level: Level, pos: BlockPos, params: object)` | Registers a block position action. |
| `item(id, callback)` | `(holder: Entity, stack: ItemStack, params: object)` | Registers an item action. |

All four callbacks correspond to `type: "mxt:js"` in a data pack. An exception thrown by a callback is caught and written to the error log; the current action is aborted, but the server does not crash.

### Running Any Built-in Action Directly

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `executeEntity(entity, definition)` | `Entity`, entity action JSON | `void` | Decodes and runs it through `EntityAction.CODEC`. |
| `executeBiEntity(actor, target, definition)` | Two `Entity`, bi-entity action JSON | `void` | Uses `actor` as the formula context subject. |
| `executeBlock(level, pos, definition)` | `Level`, `BlockPos`, block action JSON | `void` | Uses the level as the formula context. |
| `executeItem(holder, stack, definition)` | `Entity`, `ItemStack`, item action JSON | `void` | Uses the holder as the formula context subject. |

`definition` is an action object whose format is exactly the same as a single action inside a data pack, and its `type` goes through the existing built-in registry dispatch:

```js
MxtActions.executeEntity(player, {
  type: 'mxt:heal',
  amount: 4
})
```

## `MxtConditions`

### Registering a Script Condition

| Method | Callback parameters | Return value |
| --- | --- | --- |
| `entity(id, callback)` | `(entity, params)` | `boolean` |
| `biEntity(id, callback)` | `(actor, target, params)` | `boolean` |
| `block(id, callback)` | `(level, pos, params)` | `boolean` |
| `item(id, callback)` | `(holder, stack, params)` | `boolean` |
| `damage(id, callback)` | `(source: DamageSource, amount: number, params)` | `boolean` |

They correspond to the `mxt:js` built-in types of the Entity, BiEntity, Block, Item and Damage conditions respectively. Returning `true` means the condition is met; an unregistered condition and a callback that throws are both treated as `false`.

### Testing Any Built-in Condition Directly

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `testEntity(entity, definition)` | `Entity`, entity condition JSON | `boolean` | Decodes `EntityCondition.CODEC`. |
| `testBiEntity(actor, target, definition)` | Two `Entity`, bi-entity condition JSON | `boolean` | The formula context comes from `actor`. |
| `testBlock(level, pos, definition)` | `Level`, `BlockPos`, block condition JSON | `boolean` | The formula context comes from the level. |
| `testItem(holder, stack, definition)` | `Entity`, `ItemStack`, item condition JSON | `boolean` | The formula context comes from the holder. |
| `testDamage(level, source, amount, definition)` | `Level`, `DamageSource`, damage amount, damage condition JSON | `boolean` | Uses the formula context of the direct source entity when there is one, otherwise an empty context. |

```js
const enoughQi = MxtConditions.testEntity(player, {
  type: 'mxt:resource_compare',
  resource: 'mxt:spirit_power',
  comparison: '>=',
  value: 10
})
```

## `MxtValues`

### Registering a Script Provider

| Method | Callback parameters | Return value | Purpose |
| --- | --- | --- | --- |
| `number(id, callback)` | `(context: FormulaContext, params: object)` | Finite `number` | `mxt:js` number provider. |
| `resourceValue(id, callback)` | `(holder: ResourceHolderAttachment, resource: Holder<Resource>, context: FormulaContext, params: object)` | Finite `number` | `mxt:js` resource value provider. |

`FormulaContext` exposes:

| Method | Description |
| --- | --- |
| `context.value(name)` | Gets an explicit context variable or a registered formula variable. |
| `context.contains(name)` | Whether the variable is available. |
| `context.player()` | Returns the current player, or `null` when there is none. |
| `context.variables()` | Returns the current explicit variable map. |
| `context.random()` | Returns the authoritative random source used by this evaluation. |

In `resourceValue`, `holder` is the resource attachment and `resource` is the resource holder; they are normally used read-only, for example `holder.get(resource)`. Do not use this callback to write state.

### Evaluation

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `evaluateNumber(entity, definition)` | `Entity`, number provider object | `number` | Evaluates any registered provider. A non-finite result returns `0`. |
| `evaluateResource(entity, resource, definition)` | `LivingEntity`, resource ID, resource value provider JSON | `number` | Evaluates the value of the given resource. An entity-aware provider reads the environment/actual aura at the current position. |

```js
const levelScaled = MxtValues.evaluateNumber(player, {
  type: 'mxt:expression',
  expression: 'level * 2 + 1'
})
const actualAura = MxtValues.evaluateResource(player, 'mxt:spirit_power', {
  type: 'mxt:actual_concentration'
})
```

## `MxtCosts` and `MxtResources`

### `MxtCosts`

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `check(player, definition)` | `Player`, one `Cost` JSON | `boolean` | Only checks; does not change the inventory or resources. |
| `consume(player, definition)` | `Player`, one `Cost` JSON | `boolean` | Checks first and then pays; when it cannot be paid nothing is changed. |

Full cost registry dispatch is supported. The current built-in types:

```js
// Consume a resource. Full form.
{ type: 'mxt:resource', resource: 'mxt:spirit_power', amount: 10 }

// Consume a resource. Compatible shorthand; only the cost API may use the id field.
{ id: 'mxt:spirit_power', amount: 10 }

// Consume items. items accepts an item ID, an item tag, or an ItemMatcher object.
{ type: 'mxt:item', items: ['minecraft:emerald', '#c:mystic_gems'], amount: 2 }
```

A single `Cost` is the safe entry point; for several resources use `MxtResources.consume` below, which has atomic transaction semantics. Do not treat several `MxtCosts.consume` calls as one atomic payment.

### `MxtResources`

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `consume(entity, costs)` | `Entity`, `ResourceCost[]` | `ResourceTransactions.Result` | Pays a group of resources atomically; when any one of them is insufficient, none of the group is deducted. |

Each element of `costs` follows the `ResourceCost` format, and its field name is `resource`, not `id`:

```js
const result = MxtResources.consume(player, [
  { resource: 'mxt:spirit_power', amount: 10 },
  { resource: 'mxt:fire_aura', amount: 'level + 2' }
])

if (result.committed()) {
  console.info(`Deducted: ${result.amounts()}`)
} else {
  console.warn(`Insufficient resource: ${result.failedResource()}`)
}
```

The accessors of the returned record are `committed()`, `failedResource()` and `amounts()`. On the client, with an invalid formula, or when the resources are not satisfied, `committed()` is `false`.

## Runtime Domain APIs

### `MxtAbilities`

| Method | Parameters | Return value |
| --- | --- | --- |
| `use(entity, ability)` | `Entity`, ability ID | `AbilityService.UseResult` |

It can only cast an ability the entity already holds, and it only takes effect on the server. The result record: `committed()` means it completed immediately, `casting()` means the cast has started, `failure()` is the failure enum, `failedResource()` is the ID of the insufficient resource, and `amounts()` are the resources actually paid.

```js
const result = MxtAbilities.use(player, 'example:fireball')
if (result.failure() !== null) console.warn(String(result.failure()))
```

### `MxtCultivation`

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `add(entity, resource, amount)` | `LivingEntity`, resource ID, finite non-negative number | `boolean` | Adds to the cultivation progress of that resource. On the client, with an unknown resource, a negative number or a non-finite number it returns `false`. |
| `tryBreakthrough(entity, resource)` | `LivingEntity`, resource ID | `CultivationService.BreakthroughResult` | Attempts a breakthrough along the realm chain of that resource. |

The accessors of the breakthrough record are `advanced()`, `failure()`, `failedResource()` and `costs()`. It fires the normal `cultivationBreak` flow, breakthrough actions, particles, tribulations and associated abilities.

### `MxtCurses`

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `apply(entity, curse, stacks, source)` | `Entity`, curse ID, positive integer stack count, non-empty source string | `CurseService.ApplyResult` | Goes through the complete conditions and merging logic. |
| `remove(entity, curse)` | `Entity`, curse ID | `boolean` | Removes it with the `EXPLICIT` reason; fires the removal event. |

`ApplyResult` exposes `applied()`, `cancelled()`, `failure()` and `instance()`. For `source` it is recommended to write a stable source such as `example:quest_reward`, so that data and events can be traced.

### `MxtAura`

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `get(level, pos)` | `Level`, `BlockPos` | `AuraResult` | Reads the fully resolved multi-resource aura at that position. Read-only, and the client can query its locally available state. |
| `addBox(level, zone, minX, minY, minZ, maxX, maxY, maxZ, priority)` | Server `Level`, a loaded aura zone ID, two block coordinates, integer priority | `string` | Adds a persistent cuboid area and returns the generated area ID. |
| `remove(level, area)` | Server `Level`, the area ID returned by `addBox` | `boolean` | Removes the matching persistent area. |

`addBox` only accepts a `ServerLevel`, and `zone` must be a loaded `aura_zone` data pack ID; otherwise it throws an exception. The commonly used read-only methods of `AuraResult` are `aura()`, `concentration()`, `maximum()`, `regenPerTick()`, `cultivationSpeed()`, `source()`, `sourceKind()` and `suppressCultivate()`.

### `MxtSouls`

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `reclaim(entity)` | `Entity` | `boolean` | Uses the authoritative soul reclaim flow. It only applies to transferable souls, and it fires the reclaim pre/post events of `soul`. |

## `MxtEvents`

All events are registered in the server event group. Subscribe like this:

```js
MxtEvents.abilityUse(event => {
  if (event.isPre() && event.getAbility() === 'example:forbidden') {
    event.cancel()
  }
})
```

`event.cancel()` stops the current KubeJS listener chain immediately. It only cancels the MiXianTu transaction when the underlying event is a cancellable NeoForge event; calling it in a non-cancellable phase only stops the script listeners and does not undo game behaviour that has already happened.

### Dedicated Event Wrappers

| Event | Phases | Available methods | What can be changed |
| --- | --- | --- | --- |
| `abilityUse` | `Pre`, `Post` | `getEntity()`, `getAbility()`, `isPre()`, `getPaidCosts()` | `Pre` can be cancelled. `getPaidCosts()` returns an empty map in `Pre`. |
| `curseApply` | `Pre`, `Post` | `getCurse()`, `isPre()`, `getStacks()`, `setStacks(n)`, `getSource()`, `setSource(text)` | Only `Pre` can cancel and modify the stack count/source; the stack count must be greater than 0. Calling a setter on `Post` throws an exception. |
| `resourceConsume` | `Pre`, `Post` | `isPre()`, `getAmounts()`, `setAmount(resource, amount)` | Only `Pre` can cancel and modify a single resource amount; the amount must be finite and greater than 0. |
| `auraZone` | `enter`, `leave`, `tick`, `override` | `getKind()`, `getSource()`, `getConcentration()`, `isCultivationSuppressed()`, `getOverrideZone()` | Only `override` can be cancelled. `getOverrideZone()` returns an empty string when it is not an override. |

The keys of a resource map are already converted to string IDs. For example:

```js
MxtEvents.resourceConsume(event => {
  if (!event.isPre()) return
  const amounts = event.getAmounts()
  if (amounts['mxt:spirit_power'] > 0) {
    event.setAmount('mxt:spirit_power', 5)
  }
})
```

### Generic Lifecycle Events

The remaining events use the generic wrapper, with these methods:

| Method | Return value / effect |
| --- | --- |
| `getType()` | The KubeJS event name, for example `cultivationBreak`. |
| `getPhase()` | The actual Java phase class name, for example `Pre`, `StrikePre`, `StartPost`. |
| `isCancellable()` | Whether the current phase can be cancelled. |
| `getEvent()` | The native MiXianTu event instance, whose Java accessors are listed in the table below. |
| `cancel()` | The standard KubeJS cancel method; it only cancels the underlying transaction when `isCancellable()` is `true`. |

In the table below, `native` stands for `const native = event.getEvent()`. Return values such as Identifier, Holder and Attachment are Java objects; use `String(value)` when you need a text ID.

| KubeJS event | Phase class names | Main `native` accessors / semantics |
| --- | --- | --- |
| `abilityTriggered` | `Pre`, `Post` | `getEntity()`, `getAbility()`, `signalType()`, `context()`; `Pre` can cancel the triggered ability. The native event's `ability()` returns `Holder<Ability>`; use `HolderHelper.id(...)` or the KubeJS wrapper's `getAbility()` when you need the ID. |
| `curseRemove` | `Pre`, `Post` | `curse()` (`Holder<Curse>`), `state()`, `reason()`, `gameTime()`, `holder()`; `Pre` can cancel the removal. reason is `EXPLICIT`, `EXPIRED`, `CLEANSED`, `REPLACED`, `CONTENT_ACTION` or `ADMIN`. |
| `cultivationBreak` | `Pre`, `Post` | `target()` (`Holder<RealmStage>`), `threshold()`, `context()`, `spirit()`, `resources()`; `Pre` additionally has `originalCosts()`, `costs()` and `setCost(resource, amount)` and can cancel; `Post` has `paidCosts()`. |
| `techniqueLearn` | `Pre`, `Post` | `technique()` (`Holder<CultivationTechnique>`), `spirit()`; `Pre` can cancel. |
| `alchemyCraft` | `Pre`, `Post` | `recipe()` (`RecipeHolder<AlchemyRecipe>`); `Pre.inputs()` is the list of input IDs and can cancel; `Post.spoiled()` and `Post.outputs()` are the result state. |
| `artifactRefine` | `Pre`, `Post` | `stack()`, `owner()`; `Pre` can cancel. |
| `forging` | `Start`, `Started`, `StrikePre`, `StrikePost`, `CompletePre`, `CompletePost`, `Cancel` | Every phase can read `player()` (`ServerPlayer`) and `pos()` (`BlockPos`, the position of the table). Per phase: `Start.blueprint()`; `Started/StrikePost/Cancel.session()`; `StrikePre.method()` (`Holder<ForgingMethod>`), `resources()`, `context()`, `costs()`, `setCosts(costs)`; `CompletePre.blueprint()`, `session()`; `CompletePost.blueprint()`, `session()`, `result()`. `Start`, `StrikePre`, `CompletePre` and `Cancel` can be cancelled. |
| `formation` | `Activate`, `Deactivate`, `Tick` | `level()`, `controller()`, `instance()` (the formation ID comes from `instance().formation()`); `Activate` and `Tick` can be cancelled. |
| `lifespanEnd` | `Pre`, `Post` | `entity()`, `spirit()`; `Pre` can cancel the end, and after cancelling the lifespan is set to unlimited. |
| `realmInstance` | `EnterPre`, `EnterPost`, `Exit` | `level()`, `definition()` (`Holder<RealmInstance>`), `member()`; only `EnterPre` can be cancelled. |
| `sect` | `JoinPre`, `JoinPost`, `LeavePre`, `LeavePost`, `PromotePre`, `PromotePost` | `sect()`, `data()`; every `*Pre` can be cancelled. |
| `soul` | `TransferPre`, `TransferPost`, `ReclaimPre`, `ReclaimPost` | `entity()`, `soul()`; every `*Pre` can be cancelled. |
| `spiritContract` | `Pre`, `Post` | `contract()`, `contractType()`, `requester()`, `action()`; `contractType()` is an `Optional<Holder<ContractType>>`, `action()` is `BIND`, `BREAK`, `RECALL` or `RELEASE`; `Pre` can be cancelled. |
| `tribulation` | `StartPre`, `StartPost`, `PhasePre`, `PhasePost`, `Complete` | `tribulation()` (`Holder<Tribulation>`), `phase()`, `data()`; `StartPre` and `PhasePre` can be cancelled. |

### Two Extra Conventions for `forging`

**The session is read-only.** `session()` returns a `ForgingSessionView`, which can read `value()`, `steps()`, `optimalSteps()`, `history()` (an immutable list) and `canComplete()`, but **cannot** modify the session — the native `ForgingSession` is a mutable object and is no longer handed to listeners, so a call such as `event.getEvent().session().strike(...)` does not exist. The table itself is not handed to listeners either, only its position `pos()`; to read a slot, use `player.level().getBlockEntity(pos)`.

**A listener must not throw, and a throw does not break the operation.** The four decision events (`Start`, `StrikePre`, `CompletePre`, `Cancel`) are dispatched in the middle of the transaction, so when a listener throws, the server turns it into a rejection on the spot: the log records `LISTENER_ERROR` (distinct from `CANCELLED` when a script calls `cancel()` deliberately), the operation does not happen, materials are not consumed, and the session stays as it was. The three notification events (`Started`, `StrikePost`, `CompletePost`) are dispatched after the operation has already taken effect, so a throw is only logged and ignored.

For example, adjusting the breakthrough cost:

```js
MxtEvents.cultivationBreak(event => {
  if (event.getPhase() !== 'Pre') return
  const native = event.getEvent()
  native.setCost('mxt:spirit_power', 20)
})
```

## Return Values and Errors

Java records returned by the service APIs always use Java accessors, for example `result.committed()`, rather than assuming that JavaScript fields exist. A failure usually does not throw: check the return values such as `failure()`, `committed()`, `advanced()` and `applied()`. An exception is only thrown when an API parameter is invalid, an identifier is invalid, JSON cannot be decoded by the matching codec, or a mutable setter is called on the wrong event phase.

### Custom Trigger Signals

`MxtKubeJsApi.publishTrigger(entity, signal, values)` publishes a custom trigger signal from a server script:

| Parameter | Type | Description |
|---|---|---|
| `entity` | `Entity` | The subject of the signal, which is also the dispatch target for subscribers; a client entity is rejected. |
| `signal` | `Identifier` | A namespaced signal ID, for example `example:pill_taken`. |
| `values` | `Map<String,Object>` | Key/value pairs written into the `TriggerContext` extension fields; may be `null`. |

Trigger subscriptions are not saved to the world. A script that has to wait for an event across restarts should save a stable ID/phase state itself and call its registration logic again after the entity joins the world or the data pack is reloaded.

See [KubeJS Examples](./examples.md) for complete combinations.

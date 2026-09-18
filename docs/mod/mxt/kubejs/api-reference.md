---
title: "KubeJS API Reference"
description: "Complete method reference for the MiXianTu KubeJS bridge: MxtActions, MxtConditions, MxtValues, MxtCosts, MxtResources, the runtime domain APIs, MxtTriggers and MxtEvents."
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
| `MxtTriggers` | Publish custom trigger signals and subscribe scripts to them. |
| `MxtLoot` | Register script loot conditions and loot functions. |
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

Actions, conditions, number providers, resource value providers, trigger matchers, costs, ability target selectors, loot conditions and loot functions all have a pre-registered `mxt:js` type. First register the callback in a server script:

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
| `entity(id, callback)` | `(entity: Entity, params: object, context: FormulaContext)` | Registers an entity action. |
| `biEntity(id, callback)` | `(actor: Entity, target: Entity, params: object, context: FormulaContext)` | Registers a bi-entity action. |
| `block(id, callback)` | `(level: Level, pos: BlockPos, params: object, context: FormulaContext)` | Registers a block position action. |
| `item(id, callback)` | `(holder: Entity, stack: ItemStack, params: object, context: FormulaContext)` | Registers an item action. |

All four callbacks correspond to `type: "mxt:js"` in a data pack. An exception thrown by a callback is caught and written to the error log; the current action is aborted, but the server does not crash.

The last argument is the live formula context of the dispatch, so a script reads the same event payload a data pack action could. This is how a script action sees a value such as `damage` that only the event knows about:

```js
MxtActions.entity('example:knockback_on_hit', (entity, params, context) => {
  const damage = context.explicit('damage')
  if (Number.isNaN(damage)) return
  entity.push(0, params.strength * damage, 0)
})
```

Register the callback with fewer parameters when the context is not needed — JavaScript ignores extra arguments. See [`FormulaContext`](#formulacontext) for the variable methods; a script can read every built-in variable but cannot register a new one.

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
| `entity(id, callback)` | `(entity, params, context)` | `boolean` |
| `biEntity(id, callback)` | `(actor, target, params, context)` | `boolean` |
| `block(id, callback)` | `(level, pos, params, context)` | `boolean` |
| `item(id, callback)` | `(holder, stack, params, context)` | `boolean` |
| `damage(id, callback)` | `(source: DamageSource, amount: number, params, context)` | `boolean` |

They correspond to the `mxt:js` built-in types of the Entity, BiEntity, Block, Item and Damage conditions respectively. Returning `true` means the condition is met; an unregistered condition and a callback that throws are both treated as `false`. The trailing `context` argument is the formula context of the test, exactly as for script actions.

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
  min: 10
})
```

## `MxtValues`

### Registering a Script Provider

| Method | Callback parameters | Return value | Purpose |
| --- | --- | --- | --- |
| `number(id, callback)` | `(context: FormulaContext, params: object)` | Finite `number` | `mxt:js` number provider. |
| `resourceValue(id, callback)` | `(holder: ResourceHolderAttachment, resource: Holder<Resource>, context: FormulaContext, params: object)` | Finite `number` | `mxt:js` resource value provider. |

#### `FormulaContext`

Every callback that receives a formula context uses the same object: `MxtValues.number`, `MxtValues.resourceValue`, and the `mxt:js` action and condition callbacks. It exposes:

| Method | Description |
| --- | --- |
| `context.value(name)` | Reads a variable: an explicit context value first, then the built-in variable registry. A name the context cannot provide is reported — a development environment logs the whole error, production logs one warning line per distinct message — and returns `0`. |
| `context.explicit(name)` | The explicit value alone, or `NaN` when the context carries none. Use it to test whether the current event supplied a payload without asking the variable registry. |
| `context.contains(name)` | Whether the context can provide the name right now. This never reports anything and never throws. |
| `context.variables()` | The explicit values only: event payloads and anything a caller added. Entity and resource variables are read out of the context objects on demand and are not listed here. |
| `context.player()` | Returns the current player, or `null` when there is none. |
| `context.caster()` | Returns the acting entity, or `null` in a context built without one. |
| `context.target()` | Returns the second entity of a bi-entity formula, or `null`. |
| `context.resource()` | Returns the cultivation state bound to this evaluation, or `null` in a formula that is not tied to one resource. |
| `context.random()` | Returns the authoritative random source used by this evaluation. |

Formula variables are built in: a script can read every name listed in [Formula Variables](../datapack/types/formula_variables.md), but it cannot register a new one.

In `resourceValue`, `holder` is the resource attachment and `resource` is the resource holder; they are normally used read-only, for example `holder.get(resource)`. Do not use this callback to write state.

### Evaluation

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `evaluateNumber(entity, definition)` | `Entity`, number provider object | `number` | Evaluates any registered provider. A non-finite result returns `0`. |
| `evaluateResource(entity, resource, definition)` | `LivingEntity`, resource ID, resource value provider JSON | `number` | Evaluates the value of the given resource. An entity-aware provider reads the environment/actual aura at the current position. |

A definition is decoded once per distinct JSON text and then reused, because decoding builds the whole provider tree including its expressions. A script that evaluates the same definition every tick therefore parses it once. The decoded values are dropped when the world's registries change, and a definition a script has edited into a different JSON text is decoded again.

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
| `check(player, definition)` | `Player`, one `Cost` JSON | `boolean` | Only checks; does not change the inventory or resources. It is read-only, so a client script may call it. |
| `consume(player, definition)` | `Player`, one `Cost` JSON | `boolean` | Checks first and then pays; when it cannot be paid nothing is changed. Server-only: on a client script it logs one warning and returns `false` without touching the player. |
| `register(id, check, consume)` | Callback ID, `(player, params, context) => boolean`, `(player, params, context) => void` | `void` | Registers a script cost. Datapack type: `mxt:js`. |

```js
MxtCosts.register('example:quest_token',
  (player, params, context) => {
    const needed = params.count || 1
    return player.persistentData.getInt('tokens') >= needed
  },
  (player, params, context) => {
    const needed = params.count || 1
    player.persistentData.putInt('tokens', player.persistentData.getInt('tokens') - needed)
  }
)
```

```json
{"type": "mxt:js", "id": "example:quest_token", "params": {"count": 3}}
```

A script cost needs a player, because a cost that is not a `resource` cost makes the whole ability require one. `Cost` is checked with a player alone, so the `context` a cost callback receives is built from that player and carries no event payload; `context.value('level')` works, `context.value('damage')` does not.

Full cost registry dispatch is supported. The current built-in types:

```js
// Consume a resource. Typed cost form.
{ type: 'mxt:resource', resource: 'mxt:spirit_power', amount: 10 }

// Consume a resource. The id shorthand, which is also the resource-cost form MxtResources.consume takes.
{ id: 'mxt:spirit_power', amount: 10 }

// Consume items. items accepts an item ID, an item tag, or an ItemMatcher object.
{ type: 'mxt:item', items: ['minecraft:emerald', '#c:mystic_gems'], amount: 2 }
```

A single `Cost` is the safe entry point; for several resources use `MxtResources.consume` below, which has atomic transaction semantics. Do not treat several `MxtCosts.consume` calls as one atomic payment.

### `MxtResources`

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `consume(entity, costs)` | `Entity`, `ResourceCost[]` | `ResourceTransactions.Result` | Pays a group of resources atomically; when any one of them is insufficient, none of the group is deducted. |

Each element of `costs` is a resource cost, whose fields are `id` and `amount`:

```js
const result = MxtResources.consume(player, [
  { id: 'mxt:spirit_power', amount: 10 },
  { id: 'mxt:fire_aura', amount: 'level + 2' }
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
| `selector(id, callback)` | Callback ID, `(actor, context, params) => Entity[]` | `void` |

It can only cast an ability the entity already holds, and it only takes effect on the server. The result record: `committed()` means it completed immediately, `casting()` means the cast has started, `failure()` is the failure enum, `failedResource()` is the ID of the insufficient resource, and `amounts()` are the resources actually paid.

```js
const result = MxtAbilities.use(player, 'example:fireball')
if (result.failure() !== null) console.warn(String(result.failure()))
```

`selector` registers the ability target selector with the datapack type `mxt:js`. Return the entities to affect as an array; `null` entries are dropped:

```js
MxtAbilities.selector('example:nearest_three', (actor, context, params) => {
  const range = params.range || 8
  const found = []
  actor.level().getEntities(actor, actor.getBoundingBox().inflate(range))
    .forEach(entity => found.push(entity))
  found.sort((a, b) => a.distanceToSqr(actor) - b.distanceToSqr(actor))
  return found.slice(0, 3)
})
```

```json
{
  "target_selector": {"type": "mxt:js", "id": "example:nearest_three", "params": {"range": 12}},
  "bi_entity_action": {"type": "mxt:heal", "amount": 4}
}
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

### `MxtTriggers`

A trigger signal is the notification a data pack ability waits for, for example when its carrier lands a hit. `MxtTriggers` publishes the same signal from a script and lets a script wait for it, both through the runtime `TriggerDispatcher`, so script subscriptions and ability triggers observe the same dispatch. Datapack [trigger rules](../datapack/json/trigger.md) observe that same dispatch too, so a script-published signal can drive a rule and a rule's action can publish a signal a script waits for.

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `matcher(id, callback)` | Callback ID, `(signal, params, context) => boolean` | `void` | Registers a datapack trigger matcher (`mxt:js`). |
| `publish(entity, signal, values)` | `Entity`, namespaced signal ID, `object` or `null` | `boolean` | Publishes a server-authoritative signal for that entity; `false` when the entity is on the client. |
| `subscribe(entity, signal, key, callback)` | `Entity`, signal ID, a stable key, `(signal: TriggerSignal) => void` | `boolean` | Registers a runtime subscription for that entity. |
| `subscribeOnce(entity, signal, key, callback)` | Same | `boolean` | Registers a subscription that removes itself after the first matching signal. |
| `unsubscribe(entity, key)` | `Entity`, the key used at registration | `boolean` | Removes one script subscription. |
| `has(entity, key)` | `Entity`, the key used at registration | `boolean` | Whether that subscription exists right now. |
| `subscriptions(entity)` | `Entity` | `number` | How many script subscriptions the entity currently has. |

`matcher` is the data pack side of the same mechanism: a `mxt:js` trigger declares the signal it listens to and lets a callback decide whether it fires. It is how an ability or a breakthrough condition waits for a custom signal id, which the built-in `mxt:tick`-style matchers cannot express:

```js
MxtTriggers.matcher('example:on_pill', (signal, params, context) => {
  return context.explicit('toxicity') >= (params.minimum || 0)
})
```

```json
{
  "type": "mxt:triggered",
  "triggers": [{"type": "mxt:js", "signal": "example:pill_taken", "id": "example:on_pill", "params": {"minimum": 10}}]
}
```

The callback receives the `TriggerSignal` and the signal's formula context, so it reads the payload values a script published with `MxtTriggers.publish`. A matcher never matches when its callback is missing or throws.

```js
// kubejs/server_scripts/mxt_triggers.js
const KEY = 'example:toxicity_watch'

function onPillTaken(signal) {
  const toxicity = signal.context().formula().explicit('toxicity')
  if (!Number.isNaN(toxicity)) console.info(`${signal.type()} with toxicity ${toxicity}`)
}

function watch(entity) {
  // Re-registering the same key replaces the previous subscription, so this guard only keeps
  // the per-tick pass cheap.
  if (!MxtTriggers.has(entity, KEY)) {
    MxtTriggers.subscribe(entity, 'example:pill_taken', KEY, onPillTaken)
  }
}

EntityEvents.spawned(event => watch(event.entity))

// /reload re-evaluates this script, which drops its subscriptions; this re-arms the players
// who are still online. Publishing works whether or not anything is subscribed.
ServerEvents.tick(event => event.server.players.forEach(watch))

// Publish from your own logic: a command handler, a quest hook, or an item use.
function publishPillTaken(player, toxicity) {
  MxtTriggers.publish(player, 'example:pill_taken', { pill: 'example:returning_pill', toxicity })
}
```

`values` is copied into the trigger context as extension data, and every finite numeric value is also added to the trigger's formula context. A script callback therefore reads `toxicity` above through `signal.context().formula().explicit('toxicity')`, exactly like a data pack signal that carries `damage`.

A key identifies one subscription per entity, so give each signal its own key: subscribing the same key again replaces the previous subscription, whichever signal it watched.

The callback receives a `TriggerSignal`, whose accessors are `type()` (the signal ID), `gameTime()` and `context()`. The context exposes `actor()`, `target()`, `level()`, `position()`, `item()`, `block()`, `damageSource()` and `formula()`, plus `get(key)` (an `Optional`) and `data()` (the raw extension map) for the published values. Treat the context as read-only: it is shared with the other subscribers of the same signal.

Trigger subscriptions are runtime-only and are never saved. They are dropped when the entity leaves the world, and also by a server stop, a data pack reload or a server script reload — a reload replaces the callback objects a subscription refers to. Keep a stable key and re-register from a runtime hook, as the example above does. A one-shot subscription removes itself after its first matching signal, which is enough for a quest step that must not repeat.

### `MxtLoot`

MiXianTu adds a few types to the vanilla loot tables; `MxtLoot` lets a script provide two of them, so an ordinary loot table can call into a server script without an item or a block being involved.

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `condition(id, callback)` | Callback ID, `(lootContext, params) => boolean` | `void` | Registers the vanilla loot condition type `mxt:js`. |
| `function(id, callback)` | Callback ID, `(stack, lootContext, params) => ItemStack` | `void` | Registers the vanilla loot function type `mxt:js`. |

```js
// KubeJS does not bind the vanilla loot parameter keys as a global, so load the class once.
const LootParams = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParams')

MxtLoot.condition('example:first_clear', (loot, params) => {
  const player = loot.getParam(LootParams.THIS_ENTITY)
  return player != null && player.tags.contains(`cleared_${params.dungeon}`)
})

MxtLoot.function('example:bless', (stack, loot, params) => {
  stack.grow((params.multiplier || 1) - 1)
  return stack
})
```

```json
{
  "conditions": [{"condition": "mxt:js", "id": "example:first_clear", "params": {"dungeon": "example:fire_temple"}}],
  "functions": [{"function": "mxt:js", "id": "example:bless", "params": {"multiplier": 3}}]
}
```

Both callbacks run on the server while loot is generated, and neither receives a `FormulaContext`: read the vanilla `LootContext` instead, for example with `loot.getParam(LootParams.THIS_ENTITY)`. A loot function returns the stack to keep — return its argument unchanged to leave the drop alone, return a new stack to replace it, or return `null` to keep the original. A missing callback makes a condition false and leaves a function's stack untouched, with a warning in the log.

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
| `friendRelation` | none (a judgement event) | `getJudgeId()`, `getJudge()`, `hasJudge()`, `getCandidate()`, `getResult()`, `isAnswered()`, `setFriend(friend)`, `abstain()` | A script answers for itself: `setFriend(true/false)` gives a verdict, and `abstain()` hands the question back to the player's friend list. `getResult()` returns `"true"`, `"false"` or `"default"`. The judge is given as a **UUID** (`getJudgeId()` is always present), while `getJudge()` returns `null` when that player is offline, so test it with `hasJudge()` first. It is **not cancellable** and should not return a boolean — a verdict is only written through the setters. When no script listens, the event is not dispatched at all. |

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

`friendRelation` is a **judgement**: a script changes no game state, it only answers a question, so it has no phase and no cancellation.

```js
MxtEvents.friendRelation(event => {
  // Only this player counts as a friend; otherwise do nothing and hand the question back
  // to the player's own friend list. To use the judge entity, check hasJudge() first:
  // that player may be offline.
  if (event.getCandidate().getName().getString() === 'Alice') {
    event.setFriend(true)
  }
})
```

Abstaining, or calling `abstain()`, means "go by the list" and is **not** a denial. Every event is dispatched on the server.

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
| `techniqueLearn` | `Pre`, `Post` | `technique()` (`Holder<Technique>`), `spirit()`; `Pre` can cancel. |
| `alchemyCraft` | `Pre`, `Post` | `recipe()` (`RecipeHolder<AlchemyRecipe>`); `Pre.inputs()` is the list of input IDs and can cancel; `Post.spoiled()` and `Post.outputs()` are the result state. |
| `artifactRefine` | `Pre`, `Post` | `stack()`, `owner()`; `Pre` can cancel. |
| `forging` | `Start`, `Started`, `StrikePre`, `StrikePost`, `CompletePre`, `CompletePost`, `Cancel` | Every phase can read `player()` (`ServerPlayer`) and `pos()` (`BlockPos`, the position of the table). Per phase: `Start.blueprint()`; `Started/StrikePost/Cancel.session()`; `StrikePre.method()` (`Holder<ForgingMethod>`), `resources()`, `context()`, `costs()`, `setCosts(costs)`; `CompletePre.blueprint()`, `session()`; `CompletePost.blueprint()`, `session()`, `result()`. `Start`, `StrikePre`, `CompletePre` and `Cancel` can be cancelled. |
| `formation` | `Activate`, `Deactivate`, `Tick`, `TickEffects`, `UpkeepFailed` | `level()`, `controller()`, `instance()` (the formation ID comes from `instance().formation()`); `Activate`, `TickEffects` and `UpkeepFailed` can be cancelled, while `Deactivate` and `Tick` cannot. `Tick` observes a period whose upkeep has already been charged, `TickEffects` suppresses that period's effects without a refund, and cancelling `UpkeepFailed` lets the formation survive a period it could not pay for. |
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

An operation that only makes sense on the server refuses to run from a client script, so a script cannot desync a client: `MxtCosts.consume` and the state-changing methods of `MxtAbilities`, `MxtCultivation`, `MxtCurses`, `MxtAura`, `MxtSouls` and `MxtTriggers` return their failure result unchanged, and `MxtCosts.consume`, `MxtTriggers.subscribe` and `MxtTriggers.subscribeOnce` also write a single warning to the log instead of throwing. `MxtAura.addBox` is the exception: it needs a `ServerLevel` and throws otherwise.

`MxtActions.execute*` is deliberately not guarded, because the built-in actions decide their own side: an action whose JSON opts into client execution, such as a velocity action with its `client` flag, is meant to run where it is called.

See [KubeJS Examples](./examples.md) for complete combinations.

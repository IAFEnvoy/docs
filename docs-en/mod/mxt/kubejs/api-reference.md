---
title: KubeJS API Reference
description: "The MiXianTu KubeJS bridge: one global object per domain (MxtActions, MxtCosts, MxtAbilities and the rest), one page per object, plus the common data rules and the error model."
---

# KubeJS API Reference

<span id="kubejs-api-reference" />

The MiXianTu KubeJS bridge provides **one global object per domain**; it does not provide a `Mxt` root object carrying every method. Each object has its own page, listed below. All APIs that change game state must be called from `kubejs/server_scripts/`, and they enter the mod's existing server transactions and event flow.

The identifiers used here and on the sub-pages — `id`, `resource`, `ability`, `curse`, `zone` and so on — are all namespaced strings, for example `mxt:spirit_power` or `example:fireball`. Passing an invalid identifier, or JSON that cannot be decoded by the matching codec, throws a script error directly, so that data problems can be located.

## Root Objects {#root-objects}

| Object | What it is for | Page |
| --- | --- | --- |
| `MxtActions` | Register `mxt:js` action callbacks, or run a built-in action directly. | [MxtActions](./api/actions.md) |
| `MxtConditions` | Register `mxt:js` condition callbacks, or test a built-in condition directly. | [MxtConditions](./api/conditions.md) |
| `MxtValues` | Register or evaluate number providers and resource value providers; the `FormulaContext` reference lives here. | [MxtValues](./api/values.md) |
| `MxtCosts` | Check or pay **one** `Cost`. | [MxtCosts](./api/costs.md) |
| `MxtResources` | Pay a **whole** `Cost` array as a single atomic transaction. | [MxtResources](./api/resources.md) |
| `MxtAbilities` | Cast an ability, and grant, revoke or query the abilities and sources an entity holds. | [MxtAbilities](./api/abilities.md) |
| `MxtCultivation` | Add cultivation progress and attempt a breakthrough along a resource chain. | [MxtCultivation](./api/cultivation.md) |
| `MxtCurses` | Apply (with an optional duration), release, remove and query curses. | [MxtCurses](./api/curses.md) |
| `MxtAura` | Query world aura, and add or remove server-side aura areas. | [MxtAura](./api/aura.md) |
| `MxtElements` | Read the elements and element accumulation on an entity, and apply accumulation. | [MxtElements](./api/elements.md) |
| `MxtSpiritRoots` | Query, grant, remove and switch spirit roots on and off. | [MxtSpiritRoots](./api/spirit_roots.md) |
| `MxtPhysiques` | Query, grant, remove and switch physiques on and off. | [MxtPhysiques](./api/physiques.md) |
| `MxtTechniques` | Query, learn and forget techniques, and read the progression level one is at. | [MxtTechniques](./api/techniques.md) |
| `MxtProgression` | Read and write the progression level a body holds, per owner, shared by techniques and spirit beasts. | [MxtProgression](./api/progression.md) |
| `MxtQuality` | Read the quality a stack resolves to and its chain, write the override component, or climb one tier. | [MxtQuality](./api/quality.md) |
| `MxtSouls` | Reclaim the transferable soul of an entity. | [MxtSouls](./api/souls.md) |
| `ReincarnationLifespan` | Provided by Reincarnation: read/write lifespan, close the ledger, and queue rebirth. | [ReincarnationLifespan](./api/lifespan.md) |
| `ReincarnationEvents` | Provided by Reincarnation: lifespan expiry and rebirth callbacks. | [ReincarnationEvents](./api/reincarnation_events.md) |
| `MxtTriggers` | Publish custom trigger signals and subscribe scripts to them. | [MxtTriggers](./api/triggers.md) |
| `MxtLoot` | Register script loot conditions and loot functions. | [MxtLoot](./api/loot.md) |
| `MxtEvents` | Every MiXianTu server lifecycle event. | [MxtEvents](./api/events.md) |

The first four objects (`MxtActions`, `MxtConditions`, `MxtValues`, `MxtCosts`), together with `MxtLoot` and `MxtTriggers.matcher`, are where **data pack callbacks** are registered: they implement the pre-registered `mxt:js` types a data pack can name. The rest are **runtime domain APIs**: a script reads state or changes it on its own initiative.

`Entity`, `LivingEntity`, `Player`, `Level`, `BlockPos`, `ItemStack` and `DamageSource` are all vanilla Java objects exposed by KubeJS. A `JsonObject`/`JsonElement` parameter accepts a plain JavaScript object or array.

## Common Data Rules {#common-data-rules}

### Number Provider {#number-provider}

Every parameter that is a number provider, such as `amount` or `value`, accepts the following forms:

```js
10                                      // constant
'level * 2 + 1'                         // formula
{ type: 'mxt:uniform', min: 1, max: 3 } // built-in typed object
```

The formula context is created automatically by the called API from the entity or the level. The result computed by a script callback or a provider must be a finite number; `NaN`, `Infinity`, an exception or a callback that is not registered is logged and treated as `0`.

### `mxt:js` Callback Definitions {#mxt-js-callback-definitions}

Actions, conditions, number providers, resource value providers, trigger matchers, costs, ability target selectors, loot conditions and loot functions all have a pre-registered `mxt:js` type. First register the callback in a server script:

```js
MxtActions.entity('example:heal', (entity, params) => {
  entity.heal(params.amount || 1)
})
```

Then use it in any matching data pack field:

```json
{
  "type": "saturn:js",
  "id": "example:heal",
  "params": { "amount": 4 }
}
```

An `id` is unique **within the same callback category**. KubeJS clears every callback before reloading server scripts and then re-runs the scripts, which register them again; do not put a registration in a client script that only runs once. When no callback is found, an action does not run, a condition returns `false`, a value returns `0`, and a warning is logged.

Each kind of callback is registered on its own page: [MxtActions](./api/actions.md), [MxtConditions](./api/conditions.md), [MxtValues](./api/values.md), [MxtCosts](./api/costs.md), [MxtTriggers](./api/triggers.md), [MxtLoot](./api/loot.md) and [MxtAbilities](./api/abilities.md).

## Return Values and Errors {#return-values-and-errors}

Java records returned by the service APIs always use Java accessors, for example `result.committed()`, rather than assuming that JavaScript fields exist. A failure usually does not throw: check the return values such as `failure()`, `committed()`, `advanced()` and `applied()`. An exception is only thrown when an API parameter is invalid, an identifier is invalid, JSON cannot be decoded by the matching codec, or a mutable setter is called on the wrong event phase.

An operation that only makes sense on the server refuses to run from a client script, so a script cannot desync a client: `MxtCosts.consume` and the state-changing methods of `MxtAbilities`, `MxtCultivation`, `MxtCurses`, `MxtAura`, `MxtSouls`, `ReincarnationLifespan`, `MxtElements`, `MxtSpiritRoots`, `MxtPhysiques`, `MxtTechniques`, `MxtQuality` and `MxtTriggers` return their failure result unchanged — for `MxtSpiritRoots`, `MxtPhysiques`, `MxtTechniques` and `ReincarnationLifespan` that is a result whose `failure` is `SERVER_ONLY`, while `MxtElements.attach` answers `0` — and `MxtCosts.consume`, `MxtTriggers.subscribe` and `MxtTriggers.subscribeOnce` also write a single warning to the log instead of throwing. `MxtAura.addBox` is the exception: it needs a `ServerLevel` and throws otherwise.

`MxtActions.execute*` is deliberately not guarded, because the built-in actions decide their own side: an action whose JSON opts into client execution, such as a velocity action with its `client` flag, is meant to run where it is called.

## Related {#related}

- [KubeJS overview](./index.md) — when you need a script at all, and how content is registered.
- [Items and Bindings](./items.md) — attach the items a script registers to the binding tables.
- [Examples](./examples.md) — complete scripts that combine several objects.
- Full walkthrough: [Create Items and Bind Actions with KubeJS](../tutorial/create-items-with-kubejs.md).

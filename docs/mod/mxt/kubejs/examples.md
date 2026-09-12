---
title: "KubeJS Examples"
description: "Complete KubeJS scripts for MiXianTu: registering items and recipes, binding them into the framework, and reacting to server events."
sidebar_position: 3
---

# KubeJS Examples

These scripts show a complete setup: a startup script registers the content items, and server scripts attach rules and react to events. See the [API Reference](./api-reference.md) for every method used here.

## Registering Items and Recipes

```js
StartupEvents.registry('item', event => {
  event.create('spirit_manual').displayName('Nameless Cultivation Manual')
  event.create('spirit_stone').displayName('Spirit Stone')
})

ServerEvents.recipes(event => {
  event.shaped('example:spirit_manual', ['ABA', ' C ', 'ABA'], {
    A: 'minecraft:paper',
    B: 'minecraft:lapis_lazuli',
    C: 'minecraft:book'
  })
})
```

The item is registered by KubeJS, so the rest of the mod sees it as a normal item and can bind rules to its real item ID.

## Reacting to Events

```js
// kubejs/server_scripts/mxt_events.js
MxtEvents.abilityUse(event => {
  if (event.isPre() && event.getAbility() === 'example:forbidden') event.cancel()
})

MxtEvents.resourceConsume(event => {
  if (event.isPre()) event.setAmount('example:spirit_power', event.getAmounts()['example:spirit_power'] || 0)
})

MxtEvents.cultivationBreak(event => {
  if (event.getPhase() === 'Pre') {
    // event.getEvent() is the native CultivationBreakEvent.Pre.
    event.getEvent().setCost('example:spirit_power', 20)
  }
})
```

The matching data pack can bind `example:spirit_manual` to a technique and hook `example:spirit_stone` into `item_aura` or `currency`. That way the script only registers content, while the rules can still be hot-reloaded and synchronised.

## Defining a Script Action

Register the callback under a namespaced ID in a server script:

```js
MxtActions.entity('example:heal', (entity, params) => {
  entity.heal(params.amount || 1)
})
```

Any matching data pack field can then use it through the pre-registered `mxt:js` type:

```json
{
  "type": "mxt:js",
  "id": "example:heal",
  "params": { "amount": 4 }
}
```

## Running a Built-in Action from a Script

```js
MxtActions.executeEntity(player, {
  type: 'mxt:heal',
  amount: 4
})
```

The `definition` object has the same shape as a single action inside a data pack, so any built-in action type works here.

## Testing a Built-in Condition

```js
const enoughQi = MxtConditions.testEntity(player, {
  type: 'mxt:resource_compare',
  resource: 'mxt:spirit_power',
  comparison: '>=',
  value: 10
})
```

## Evaluating Number Providers

```js
const levelScaled = MxtValues.evaluateNumber(player, {
  type: 'mxt:expression',
  expression: 'level * 2 + 1'
})
const actualAura = MxtValues.evaluateResource(player, 'mxt:spirit_power', {
  type: 'mxt:actual_concentration'
})
```

## Paying Several Resources Atomically

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

When any one of the resources is insufficient, none of them is deducted. Note that a `ResourceCost` uses the `resource` field, while only the cost API may use the `id` shorthand:

```js
// Consume a resource. Full form.
{ type: 'mxt:resource', resource: 'mxt:spirit_power', amount: 10 }

// Consume a resource. Compatible shorthand; only the cost API may use the id field.
{ id: 'mxt:spirit_power', amount: 10 }

// Consume items. items accepts an item ID, an item tag, or an ItemMatcher object.
{ type: 'mxt:item', items: ['minecraft:emerald', '#c:mystic_gems'], amount: 2 }
```

## Casting an Ability

```js
const result = MxtAbilities.use(player, 'example:fireball')
if (result.failure() !== null) console.warn(String(result.failure()))
```

Only an ability the entity already holds can be cast this way, and the call only takes effect on the server.

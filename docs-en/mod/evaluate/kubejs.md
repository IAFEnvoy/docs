---
title: KubeJS
description: Set fixed values, generate final overrides, and register reusable JavaScript evaluators for the shared value graph.
sidebar_position: 4
---

This integration requires **KubeJS `26.1.2-8.0.8+`** and its runtime dependencies, Rhino and Better Advanced Tooltips. Put scripts in `kubejs/server_scripts/` and use `/reload` after changes.

Older KubeJS `8.0.4` has an incompatible `WorldLoaderMixin` target for this project's NeoForge version. Use the version listed above.

## Set fixed values and final overrides

```javascript title="kubejs/server_scripts/evaluate.js"
EvaluateEvents.values(event => {
  event.set('minecraft:diamond', 10000.5)
  event.set(['minecraft:iron_ingot', '#c:ingots/gold'], 256.5, 2000)

  // Changes only the final query result, not the graph's diamond cost.
  event.override('minecraft:diamond', 12000.5)

  // Replace the built-in smelting evaluator by its resource ID.
  event.addEvaluator('evaluate:recipes/smelting', {
    type: 'evaluate:recipe',
    recipe_type: 'minecraft:smelting',
    extra_value: 2.5
  })
})
```

| Method | Behavior |
| --- | --- |
| `event.set(item, value, priority = 1000)` | Generates a fixed `evaluate:constant` definition. |
| `event.override(item, value, priority = 1000)` | Generates a final `value_override` definition. |
| `event.addEvaluator(id, definition)` | Generates an instance of an existing evaluator type, replacing the same resource ID if present. |
| `event.evaluator(id, callback)` | Registers a JS callback and generates an instance with the same ID and empty parameters. |
| `event.js(entryId, callbackId, params)` | Generates an `evaluate:js` instance using a registered callback. |

`item` accepts the same selection syntax as [datapack definitions](./datapack.md#item-selection), backed by [Saturn matchers](../../library/saturn/types/item-matcher.md). Values must be finite and nonnegative.

Repeated `set` calls with the same serialized JSON selector replace the earlier definition. Different selectors compete by priority and resource ID. Generated files follow normal datapack precedence at the same path.

## Contribute calculation relationships

```javascript title="kubejs/server_scripts/custom_evaluator.js"
EvaluateEvents.values(event => {
  event.evaluator('example:custom', (context, params) => {
    context.set('minecraft:amethyst_shard', 16.5)
    context.addValue('minecraft:trial_spawner', 8.5)
    context.conversion(
      '2x minecraft:debug_stick',
      ['minecraft:trial_spawner', 'minecraft:amethyst_shard'],
      1
    )
  })
})
```

| Context method | Meaning |
| --- | --- |
| `context.set(item, value, priority = 1000)` | Fixed base value with the same selectors as `event.set`. |
| `context.addValue(stack, value)` | Unlocked candidate value per item; other sources can provide a lower value. |
| `context.conversion(output, ingredients, extraValue = 0)` | Directed relationship using item stack counts for input and output quantities. |
| `context.context()` | Original Java `EvaluationContext`. |

In this example, each debug stick has candidate value `(8.5 + 16.5 + 1) / 2 = 13`. A fixed base rule for an involved item still takes precedence over inferred candidates.

Callbacks submit inputs to the shared graph. They cannot query a completed value table during that calculation. Declare relationships instead of trying to calculate dependent values in script order.

## Reusable callbacks {#reusable-callbacks}

Register the callback at the top level of a server script:

```javascript title="kubejs/server_scripts/evaluator_types.js"
EvaluateJS.registerEvaluator('example:priced_item', (context, params) => {
  context.set(params.item, params.value)
})

EvaluateEvents.values(event => {
  event.js('example:pearl', 'example:priced_item', {
    item: 'minecraft:ender_pearl',
    value: 1024.5
  })
})
```

Registration alone does not run the callback. Instantiate it with `event.js`, or reference it from a datapack:

```json title="data/example/evaluate/evaluator/custom.json"
{
  "type": "evaluate:js",
  "id": "example:priced_item",
  "params": {
    "item": ["minecraft:diamond"],
    "value": 10000.5
  }
}
```

| Field | Type | Required | Default | Meaning |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | Yes | — | `evaluate:js`. |
| `id` | Resource ID | Yes | — | Registered callback ID, separate from the data file's resource ID. |
| `params` | JSON object | No | `{}` | Parameters copied for each invocation and exposed as JS properties. |
| `comment` | String | No | — | Optional description. |

Multiple instances can share a callback with different parameters. A later registration of the same callback ID replaces the earlier one.

Callbacks belong to the resource reload that loaded them. `/reload` regenerates definitions and captures the new callbacks, clearing deleted contributions and registrations. Callback exceptions are logged and stop the remaining code in that invocation. A missing callback, including when KubeJS is absent, logs a warning and skips that evaluator instance.

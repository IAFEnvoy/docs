---
title: Value Inference
description: Recipe costs, evaluator interactions, unknown and free ingredients, component variants, and bounded cycle calculation.
sidebar_position: 2
---

All evaluators contribute to one graph. Recipes, [quest exchanges](./ftb-quests.md), and [script evaluators](./kubejs.md) can use each other's results regardless of registration order.

Fixed base values take precedence over inferred candidates. For an item without a fixed base value, the lowest valid acquisition cost wins. [Final overrides](./datapack.md#final-overrides) apply only after the graph is solved.

## Recipe evaluators {#recipe-evaluators}

Seven built-in instances under `data/evaluate/evaluate/evaluator/recipes/` select these recipe types:

| File | Recipe type |
| --- | --- |
| `crafting.json` | `minecraft:crafting` |
| `smelting.json` | `minecraft:smelting` |
| `blasting.json` | `minecraft:blasting` |
| `smoking.json` | `minecraft:smoking` |
| `campfire_cooking.json` | `minecraft:campfire_cooking` |
| `stonecutting.json` | `minecraft:stonecutting` |
| `smithing.json` | `minecraft:smithing` |

Their extra value defaults to `0`. To charge an additional value per smelting operation, replace the built-in file:

```json title="data/evaluate/evaluate/evaluator/recipes/smelting.json"
{
  "type": "evaluate:recipe",
  "recipe_type": "minecraft:smelting",
  "extra_value": 2.5
}
```

| Field | Type | Required | Default | Meaning |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | Yes | — | `evaluate:recipe`. |
| `recipe_type` | Recipe type registry ID | Yes | — | Type to scan; a custom type must still contain a supported recipe implementation. |
| `extra_value` | Finite, nonnegative `double` | No | `0` | Additional cost per operation, divided across its output count. |
| `comment` | String | No | — | Optional description. |

Adding an instance at another resource ID keeps both active. If two instances scan the same recipes with different extra values, both contribute candidates and the cheaper one wins. Replace the same built-in path to change its parameters.

## Cost calculation

```text
Value per output item =
    (total input value - returned item value + extra_value) / output count
```

For a recipe with total input value `12.5`, two output items, and extra value `2.5`, each output is worth `(12.5 + 2.5) / 2 = 7.5`.

Input counts matter. Alternative ingredients contribute alternative costs, and crafting remainders are credited before choosing the cheapest alternative. An unknown required input or remainder prevents that candidate from being calculated; it is never assumed to be free.

| Input state | Effect |
| --- | --- |
| Fixed positive value | Used as configured; cheaper recipes cannot reduce it. |
| Inferred positive value | Can feed later recipes and exchanges. |
| Known zero value | Participates as free input, but has no public positive value. |
| Unknown value | Blocks relationships that require it. |

Values remain fractional: an ingot worth `256` gives a nugget `256.0 / 9`, and repacking does not lose value through integer rounding. Configuration, stored values, and query results use `double`. Nonfinite results and positive results that underflow the supported range are not published as free items.

## Automatically supported recipes

Evaluate maps ordinary recipes with known input counts and static outputs:

- Shaped and shapeless crafting.
- Smelting, blasting, smoking, and campfire cooking.
- Stonecutting and smithing transformations.
- Minecraft 26.1's `crafting_transmute`.

Dynamic special recipes, custom ingredient implementations, brewing, drops, and trades are not inferred automatically. Filled buckets, for example, need a definition or another evaluator if no supported relationship supplies their value.

## Cycles {#cycles}

Balanced packing/unpacking recipes can settle normally. A cycle without a known starting value cannot invent values.

Exchanges such as `1 A → 2 B` and `1 B → 1 A` can repeatedly lower inferred costs. Evaluate isolates mutually dependent nodes into strongly connected components, solves their dependencies first, and publishes a component only after it settles. Unrelated recipes cannot increase a cycle's calculation allowance.

| Protection | Current behavior |
| --- | --- |
| Per-node successful updates | `max(64, min(256, component size × 2))` |
| Work per cyclic component | At most `1,000,000` recipe/input evaluation steps |
| Floating-point floor | Temporary DECIMAL128 arithmetic prevents double underflow from appearing to be convergence. |
| Rounding drift | Relative tolerance of about `1.78e-15` within cyclic components. |
| Deep graphs | Iterative traversal avoids recursive Java stack growth. |

A component exceeding either calculation limit is discarded and logged. Its temporary values do not reach downstream items. A downstream item can still receive a value from an independent valid recipe. Fixed base values remain protected; public results and storage remain `double`.

The limits are conservative: an unusually slow but convergent component can also be discarded. In that case, define a fixed base value for a suitable item to break the inferred dependency cycle.

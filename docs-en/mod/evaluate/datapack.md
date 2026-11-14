---
title: Datapacks
description: Evaluate's evaluator and value_override registries, fixed values, matching priorities, and file replacement rules.
sidebar_position: 1
---

Use datapacks to set fixed base values, instantiate evaluators, and override final results. The two native datapack registry directories are **singular**:

```text
data/<namespace>/evaluate/evaluator/<path>.json
data/<namespace>/evaluate/value_override/<path>.json
```

For either registry, the namespace and relative path form the resource ID. For example, `data/example/evaluate/evaluator/metals/iron.json` defines evaluator `example:metals/iron`.

## Fixed base values

An `evaluate:constant` file assigns one value to all selected items:

```json title="data/example/evaluate/evaluator/iron.json"
{
  "type": "evaluate:constant",
  "item": "minecraft:iron_ingot",
  "value": 256,
  "priority": 10,
  "comment": "Base value for recipe inference"
}
```

| Field | Type | Required | Default | Meaning |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | Yes | — | `evaluate:constant`. |
| `item` | Saturn matcher or nonempty array | Yes | — | Items that share this value. |
| `value` | Finite, nonnegative `double` | Yes | — | Value of one item, independent of stack count. |
| `priority` | Signed integer | No | `0` | Higher priorities win when multiple base rules match. |
| `comment` | String | No | — | Description; does not affect calculations. |

Decimals and scientific notation are supported. A fixed value of `0` makes an item free for inference, but queries return no positive value for that item. Negative values, `NaN`, and infinity are invalid.

### Item selection

The field name is `item`, including when using an array. Array entries are alternatives: matching any entry is sufficient, and every match receives the same value.

```json title="data/example/evaluate/evaluator/shared_metal_value.json"
{
  "type": "evaluate:constant",
  "item": ["minecraft:iron_ingot", "#c:ingots/gold"],
  "value": 256.5,
  "priority": 20
}
```

`item` uses Saturn's `ItemMatcher.ENTRIES_CODEC`, including matcher types registered by other mods. Refer to [Saturn's item matcher reference](../../library/saturn/types/item-matcher.md) for individual matcher fields; Evaluate does not define a separate selector language.

Explicit rules match the actual queried `ItemStack`, so component conditions do not become a shared value for all variants of an item. For inference, Evaluate collects default stacks and representative variants from recipes, evaluators, and ingredient displays. A variant that was not collected can still match an explicit rule, but may lack an inferred conversion chain.

## Final overrides {#final-overrides}

Use `value_override` to change final queries and snapshots **without feeding that value back into inference**:

```json title="data/example/evaluate/value_override/iron.json"
{
  "item": "minecraft:iron_ingot",
  "value": 1000,
  "priority": 10
}
```

Overrides use the same `item`, `value`, `priority`, and optional `comment` fields as constant evaluators, but have **no `type` field**.

If the iron ingot base value is `256`, this override makes queries return `1000`, while an iron block is still inferred as `256 × 9 = 2304`. An override of `0` hides the final positive value; it does not fall back to the base or inferred result.

## Matching and pack precedence

1. Files at the same namespace and path follow normal datapack precedence. The higher-priority pack replaces the entire file.
2. Different files remain active together. Within each registry, the highest matching `priority` wins.
3. Equal priorities use the first rule in the resource ID's natural ascending order.

Pack priority does not resolve rules from different file paths. Increase `priority` to override a base rule from another file. Final overrides are resolved separately from base rules and applied after inference.

### Replacing built-in definitions

Built-in constants are under `data/evaluate/evaluate/evaluator/`:

| Kind | Path below that directory |
| --- | --- |
| Individual items | `minecraft/` |
| Tags | `tags/<tag namespace>/` |
| Goat horn variants | `minecraft/goat_horn/` |

For example, provide `data/evaluate/evaluate/evaluator/tags/c/ingots/iron.json` to replace the built-in iron value, or `tags/c/gems/diamond.json` for diamonds.

## Other evaluator types

| `type` | Purpose | Reference |
| --- | --- | --- |
| `evaluate:constant` | Fixed base value | This page |
| `evaluate:recipe` | Relationships from one recipe type | [Value inference](./calculation.md#recipe-evaluators) |
| `evaluate:ftb_quests` | Item-consuming quest exchanges | [FTB Quests](./ftb-quests.md) |
| `evaluate:js` | Named script callback with parameters | [KubeJS](./kubejs.md#reusable-callbacks) |

Evaluator files use `type` to select a registered `MapCodec`. A registered type runs only when a data file or script creates an instance.

## Validation and reloads

Unknown fields are rejected. There are no `before`, `after`, or `phase` fields; old `values`/`evaluators` directories and ProjectE data formats are unsupported. Custom datapack `conversions` are not currently available.

Initial loading uses native registry validation, so invalid data can prevent pack loading. On `/reload`, invalid definition files are logged and skipped without falling back to a lower-priority file at the same path. See [runtime and reloads](./runtime.md) for cache behavior and FTB quest file reloads.

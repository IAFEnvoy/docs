---
id: overview
title: Data-Driven Overview
slug: /mod/mite/data-driven/overview
sidebar_position: 1
description: Responsibility boundaries between MITE data-pack rules, external multi-file rules, tags, and configuration.
---

MITE separates object relationships from balance values. Data-driven rules are appropriate for deciding which items, blocks, entities, or tags participate in a rule. Server-wide probabilities, multipliers, and durations belong in `mite-common.json`.

## Three extension points

| Entry point | Path | Intended content | Application |
|---|---|---|---|
| Data-pack codecs | `data/<namespace>/mite/...` | Recipe rules, nutrition, harvesting, spawning, dissolution | `/reload` |
| Instance multi-file rules | `config/mite/<rule_type>/...` | Portal routes, material families, entity replacement, repair relationships | `/reload` |
| Minecraft tags/dynamic registries | `data/<namespace>/tags/...`, registry JSON | Cross-mod object sets, enchantments, dimensions, world generation | Data-pack reload; some require a restart or new world |

## Choosing the right system

- "How much extra damage do silver arrows deal to undead?" is a balance value: use `production.silverArrowUndeadDamageMultiplier`.
- "Which items count as silver arrows?" is an object relationship: use `config/mite/arrows/*.json` or a tag.
- "Which nutrients does this food provide?" is per-item content: use one `food_nutrition` JSON.
- "What global multiplier applies to all nutrient gain?" is a balance value: use `survival.nutrientGainPerFoodPoint`.
- "Which blocks require a pickaxe?" is an extensible object relationship: use `harvest_rules` and item tags.

:::info One object or tag per file

Bundled data follows a multi-file design instead of storing every definition in one `entries` array. Selector fields accept one ID, one `#tag`, or an array mixing both.

:::

## Selector formats

All three forms are valid:

```json
{ "items": "minecraft:apple" }
```

```json
{ "items": "#c:foods/raw_meat" }
```

```json
{
  "items": [
    "minecraft:apple",
    "example:pear",
    "#example:orchard_fruit"
  ]
}
```

Depending on the rule, the field may be named `items`, `blocks`, `entities`, `spawn_blocks`, or `corner_blocks`; the selector semantics are the same. Tags always begin with `#`.

## Priority and errors

- Multi-file rules may use an integer `priority`; larger values match first.
- Equal priorities are ordered stably by resource ID or relative path, independent of filesystem traversal order.
- Identical data-pack resource IDs follow Minecraft data-pack priority.
- When one file fails to parse, the log includes its path and codec error while other valid files continue loading.

Continue with [data-pack rules](./datapack-rules.md), [instance multi-file rules](./misc-rules.md), and [tag conventions](./tags.md).

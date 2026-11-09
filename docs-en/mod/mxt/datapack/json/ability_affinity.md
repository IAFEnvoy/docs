---
title: ability_affinity
description: The fields and rules of mxt:ability_affinity - which abilities belong to which elements, how several matching roots combine, and what the entry does to the cast gate and the damage multiplier.
---

# ability_affinity

<span id="ability-affinity" />

An ability's element affinity **does not live in the ability definition**; it is a definition of its own in this data pack registry. The reason is simple: which elements one ability belongs to is a rule of the world, not part of the ability's shape - the same `saturn:ability` entry can be reused by any mod, while "it leans towards fire" only holds in this world.

## File and Id {#file-and-id}

- The registry id is `mxt:ability_affinity`, and the file goes under `data/<namespace>/mxt/ability_affinity/<path>.json`.
- One file is one definition and the entry id is `<namespace>:<path>`; nothing else references that id, so any name works.

```json
// data/example/mxt/ability_affinity/qi_bolt.json
{
  "abilities": ["example:qi_bolt"],
  "elements": ["example:fire", "#example:basic"],
  "mode": "average"
}
```

## Fields {#fields}

| Field | Type | Default | What it does |
| --- | --- | --- | --- |
| `abilities` | List of ability ids or `#ability tags` | **Required** | Which abilities this affinity covers; not empty. |
| `elements` | List of element ids or `#element tags` | **Required** | The elements the ability leans towards; an empty list means "this ability is not element-bound". |
| `mode` | `average` / `max` | `average` | How several matching roots combine: `average` takes the mean, `max` takes the best one. |

**First match answers.** One ability can be hit by several definitions (another pack names it too, or one writes a concrete id while another writes a tag). The first entry in registry order wins and the rest are not read - so to make a concrete id win over a tag, put that entry first instead of relying on a priority field.

## What It Does {#what-it-does}

When an ability is named here and its `elements` is not empty, it gets two things:

1. **A cast gate**: a holder whose spirit roots match none of them is refused, with a permission failure.
2. **A damage multiplier**: computed from the matching roots' `element_ability_modifier`, averaged or best per `mode`. It is folded together with the progression chain's multiplier into the formula variable `damage_multiplier`, which layer one of the [damage pipeline](../../technical/damage.md) multiplies into the damage this cast deals.

So a damage formula must **not** write any affinity multiplier by hand, and there is no `element_modifier` variable any more. To scale something that is **not** damage (costs, durations) by affinity there is currently no variable to read.

The wheel tooltip lists those elements under the ability; with no definition, or with an empty `elements`, neither line is drawn.

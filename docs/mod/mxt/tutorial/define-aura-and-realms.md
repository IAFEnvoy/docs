---
title: "Define Aura and Realms"
description: "Build the core cultivation loop from JSON: an aura kind, an aura resource, a linear realm chain, a cultivation action, a minimal aura zone, and how to verify each step in game."
sidebar_position: 2
---

# Define Aura and Realms

This tutorial builds the smallest cultivation loop MiXianTu can run: a **resource** the player fills, a **realm chain** the player climbs, a **cultivation action** that moves aura into the resource, and a tiny **aura zone** so the world actually contains aura. When you are done, a player can press the cultivate key, watch a bar fill, and break through to their first realm.

Nothing here is specific to a setting: the numbers below are placeholders you are expected to replace.

:::info Before you start

Read [Datapack Overview](../datapack/overview.md) first if you have not yet. It explains where files go, how definition IDs work, why a missing holder reference fails the whole load, and when your edits take effect.

:::

## The Shape of the Loop

```text
aura_zone / block_aura        the world supplies aura per chunk
        ↓
cultivate_action              the player absorbs it while cultivating
        ↓
resource  example:qi          the bar fills; the overflow becomes progress
        ↓
realm_stage chain             progress + conditions + costs → next realm
```

A player who has not entered a chain yet is **Mortal**. The Mortal state has no definition of its own: it is described by the value's cultivation profile, through `start_exp` (the progress needed, and the hard cap) and `first_realm` (the stage that the first breakthrough targets).

## What You Are Building

| File | Registry | Purpose |
| --- | --- | --- |
| `element/common.json` | `element` | Marks the aura kind that zones and cultivation actions agree on. |
| `resource/qi.json` | `resource` | The stored number, its bounds and its HUD bar. |
| `cultivation/qi.json` | `cultivation` | The cultivation behaviour of that value: aura kind, regeneration, realm entry. |
| `realm_stage/qi_condensation.json` | `realm_stage` | First realm, and the requirements for the second. |
| `realm_stage/foundation.json` | `realm_stage` | Second realm. |
| `realm_stage/core_formation.json` | `realm_stage` | Third realm, the end of the chain. |
| `cultivate_action/meditation.json` | `cultivate_action` | What the player does while cultivating. |
| `aura_zone/common_land.json` | `aura_zone` | A plains-level supply of aura in the Overworld. |
| `assets/example/lang/en_us.json` | — | Names for the IDs above. |

## Step 1 — The Aura Kind

An `element` is an aura kind: a marker plus the relations and colour attached to it. The marker is what other tables compare against, so define it first.

```json
// data/example/mxt/element/common.json
{
  "aura_kinds": ["example:common_aura"],
  "color": "#66CCFF"
}
```

`aura_kinds` are free-form identifiers — there is no registry behind them. Pick a stable naming scheme, because `aura_zone`, `cultivate_action` and `alchemy_recipe` all match them as sets: a cultivation action runs only where **every** kind it asks for is present.

`overcomes` and `adapted_to` are optional relations to other elements; leave them out until you have more than one. The full field list is in [Element](../datapack/json/element.md).

## Step 2 — The Aura Resource

A `resource` is only a stored number with bounds and a bar; a `cultivation` profile gives it its cultivation behaviour and points back at it. Split the two files first, then read the tables.

```json
// data/example/mxt/resource/qi.json
{
  "default_value": 0,
  "max": "50 + realm_rank * 50 + absorbed_aura * 0.2",
  "particle_color": "#66CCFF",
  "bars": [
    {
      "context": "mxt:self_hud",
      "anchor": "left",
      "order": 0,
      "renderer": {"type": "mxt:boss_bar", "bar_index": 1},
      "value_display": "current_and_maximum"
    }
  ]
}
```

```json
// data/example/mxt/cultivation/qi.json
{
  "resource": "example:qi",
  "regen": "0.05 + realm_rank * 0.05",
  "aura_type": "example:common",
  "first_realm": "example:qi_condensation",
  "start_exp": 100
}
```

| Resource field | What it does here |
| --- | --- |
| `default_value` | A new player starts empty. Required. |
| `max` | The bar's upper bound. A formula, because `max` is evaluated in this value's cultivation context, where `realm_rank` and `absorbed_aura` exist. Required. |
| `particle_color` | Colour of the spirit power rays this value fires. |
| `bars` | One self-HUD bar in the left column; `renderer` is required, and every bar needs an `anchor`. |

| Cultivation field | What it does here |
| --- | --- |
| `resource` | Which stored value this profile describes. Required. |
| `regen` | A slow trickle so the pool refills outside meditation. |
| `aura_type` | The element marker of this pool; the environment and aura fuel use it for type checks. |
| `first_realm` | Where the first breakthrough goes. Without it, a Mortal can never leave the Mortal state. |
| `start_exp` | The cultivation progress a Mortal needs, and the cap they cannot pass until they break through. |

`min` defaults to `0`, and `use_condition` defaults to always true, so a Mortal can see the bar. If you would rather hide the bar until the player has entered the chain, add it to the profile:

```json
"use_condition": {"type": "mxt:has_realm", "resource": "example:qi"}
```

`use_condition` only controls the display and the player's manual consumption. It never blocks cultivation, absorption or a breakthrough. The full field list is in [Cultivation Profile](../datapack/json/cultivation.md).

:::tip Formulas

Any numeric field accepts a plain number, a formula string, or a typed provider object. Formulas are evaluated with exp4j and can use `round`, `clamp`, `min`, `max`, `pi` and `e` on top of the context variables. See [Formula Variables](../datapack/types/formula_variables.md).

:::

## Step 3 — The Realm Chain

Each `realm_stage` file is one stage. A stage names exactly one cultivation profile, and `next_realm` points at a single stage, so a chain is a straight line: a profile has one chain, and it only moves forward. The value the profile stores is what actually fills up.

```json
// data/example/mxt/realm_stage/qi_condensation.json
{
  "cultivation": "example:qi",
  "next_realm": "example:foundation",
  "breakthrough_exp": 800,
  "max_experience": 1600,
  "passive_modifiers": [
    {
      "attribute": "minecraft:max_health",
      "id": "example:realm/qi_condensation",
      "amount": 2,
      "operation": "add_value"
    }
  ],
  "costs": [{"id": "example:qi", "amount": 50}],
  "auto_breakthrough": false
}
```

```json
// data/example/mxt/realm_stage/foundation.json
{
  "cultivation": "example:qi",
  "next_realm": "example:core_formation",
  "breakthrough_exp": 2000,
  "max_experience": 4000,
  "breakthrough": {
    "conditions": [
      {"type": "mxt:resource_compare", "resource": "example:qi", "min": 200}
    ]
  },
  "costs": [{"id": "example:qi", "amount": 200}],
  "auto_breakthrough": false
}
```

```json
// data/example/mxt/realm_stage/core_formation.json
{
  "cultivation": "example:qi",
  "max_experience": 8000,
  "passive_modifiers": [
    {
      "attribute": "minecraft:max_health",
      "id": "example:realm/core_formation",
      "amount": 6,
      "operation": "add_value"
    }
  ]
}
```

Reading the three files together:

- `breakthrough_exp` is the progress required to **leave** this stage, and `max_experience` is the progress cap while you are in it. They must not cross: a constant `breakthrough_exp` greater than a constant `max_experience` is rejected at load time.
- `costs` are paid on a successful breakthrough; `breakthrough.conditions` are checked alongside the progress. Both belong to the stage you are leaving — except for the very first step, where the threshold comes from the cultivation profile's `start_exp` and the conditions come from the target's `breakthrough`.
- `auto_breakthrough` defaults to `false`: the player reaches the threshold and waits. Set it to `true` if you want cultivation mode to attempt the breakthrough on its own.
- `passive_modifiers` are vanilla attribute modifiers granted while the stage is held. `value` is an optional formula, and an entry that declares it is recalculated every tick.
- The last stage simply has no `next_realm`, so the chain ends there.

:::warning Realm conditions are not `caster_level`

Inside a resource, realm or breakthrough formula, `level`, `realm` and `realm_rank` are all the rank in the chain. Inside an *entity* formula such as an ability amount, `caster_level` is the vanilla experience level and there is no realm rank at all. Use `realm_rank` in resource and realm fields to keep the intent obvious.

:::

## Step 4 — A Cultivation Action

A `cultivate_action` is a named activity. The player selects one, and it settles on a fixed interval.

```json
// data/example/mxt/cultivate_action/meditation.json
{
  "default": true,
  "tick_interval": 20,
  "aura_kinds": ["example:common_aura"],
  "absorb_amount": 1.5,
  "aura_costs": {"example:qi": 1},
  "cooldown": 100
}
```

| Field | Effect |
| --- | --- |
| `default` | Used when the player has not selected another behaviour. Without any default, the first registered behaviour is used. |
| `tick_interval` | Settlement interval in ticks; `20` means once per second. |
| `aura_kinds` | All of these kinds must be present at the player's position. This is what makes the element from Step 1 matter. |
| `absorb_amount` | Multiplier for the natural recovery of the current realm's resource; the bar fills first and the overflow becomes cultivation progress. |
| `aura_costs` | Environment aura consumed per tick, per resource. Each entry is allocated on its own, so a shortage of one only reduces that entry. |
| `cooldown` | Ticks before cultivation can start again after it stops. |

`start_condition` and `condition` decide whether cultivation may start and continue; both default to always true.

## Step 5 — A Minimal Aura Zone

Without an aura zone the world contains no aura, and `aura_kinds` is empty, so the meditation action would never run.

```json
// data/example/mxt/aura_zone/common_land.json
{
  "aura": {
    "example:qi": {
      "amount": 200,
      "max": {"type": "mxt:initial_multiplier", "multiplier": 2},
      "regen_per_tick": 0.05,
      "color": "#66CCFF"
    }
  },
  "aura_kinds": ["example:common_aura"],
  "distribution": "equal",
  "biomes": ["#minecraft:is_overworld"]
}
```

- `aura` is the per-resource environment inventory, stored per chunk and shared by everyone in that chunk.
- `amount` is the *base* aura of the template, not the number the HUD shows: with no noise configured the initial concentration is `max(0, amount / 10 - 5)`, so `200` starts around `15`, and `max` resolves from that initial value — here `initial_multiplier: 2`, so the chunk can hold up to about `30`.
- `regen_per_tick` refills the chunk inventory over time.
- `distribution` decides how several players split an insufficient inventory: `random`, `equal` or `realm_weighted`.
- `biomes` and `dimensions` decide where the template applies; `#minecraft:is_overworld` covers every Overworld biome. A dimension-level binding beats a biome-level one, and both sit below manual areas and formations.

The aura environment has enough depth to deserve its own page — that is [Build the Aura Environment](./aura-environment.md), where you will add denser zones, block sources, item fuel and the client-side fog and HUD.

## Step 6 — Names

Display names are generated from the definition ID, so you never write a translation key into the JSON. Add the keys to your own language file:

```json
// assets/example/lang/en_us.json
{
  "resource.example.qi": "Spirit Qi",
  "realm_stage.example.qi_condensation": "Qi Condensation",
  "realm_stage.example.foundation": "Foundation Establishment",
  "realm_stage.example.core_formation": "Core Formation",
  "element.example.common": "Common Aura",
  "cultivate_action.example.meditation": "Meditation",
  "aura_kind.example.common_aura": "Common Aura"
}
```

The pattern is always `<category>.<namespace>.<path>`, and `/` inside a path becomes `.`. A definition without a key still works; the game simply shows the raw key.

## Step 7 — Load and Verify

Data pack registries are read while the world loads, so `/reload` is not enough: leave to the title screen and open the world again (or restart the server) and watch the log for codec errors. A file that cannot be decoded stops the world from loading, so if the world refuses to open, read the last error in the log and fix that file first.

```text
(load the world again)
/mxt registries validate          → registries loaded, no errors
/mxt registries list              → resource 1, realm_stage 3, cultivate_action 1, aura_zone 1, element 1
/mxt resource example:qi          → 0
/mxt aura query example:qi        → the aura inventory of your chunk
/mxt cultivate status             → the selected behaviour and the progress per resource
```

Then, in game:

1. Press the cultivate key (`C` by default) somewhere in the Overworld. The bar appears in the left column and starts filling.
2. Keep cultivating until the bar is full; from then on the overflow becomes cultivation progress. `/mxt cultivate status` and `/mxt attachment status` show the current progress.
3. At `100` progress — the cultivation profile's `start_exp` — the Mortal stage is capped and a breakthrough becomes possible. Because `auto_breakthrough` is `false`, trigger it yourself with `/mxt breakthrough example:qi` (it needs the `gamemaster` permission), or set `auto_breakthrough: true` and let cultivation do it.
4. On success you are in Qi Condensation: `/mxt attachment status` shows the new realm, the `50 + realm_rank * 50` maximum is larger, and the `+2 max health` modifier is applied.
5. Climb to Foundation Establishment the same way. You will need `200` qi in the pool at the same time, because that stage's `breakthrough.conditions` ask for it, and `200` qi will be spent by `costs`.

:::tip Faster testing

`/mxt resource example:qi set 500` (also `gamemaster`) fills the pool instantly so you can check the cost and condition gates without waiting. `/mxt realm set example:foundation` jumps the chain to a stage directly, which is useful when you are tuning later stages.

:::

## Common Mistakes

| Symptom | Cause |
| --- | --- |
| Nobody can ever leave Mortal | `first_realm` is missing on the cultivation profile, so there is no stage to break through to. |
| Cultivation never starts | `aura_kinds` on the action is not fully present at the position — check that the aura zone lists the same markers. |
| The bar never grows | `aura_costs` asks for more environment aura than the chunk holds, or `use_condition` is false. |
| The world refuses to load | A definition failed to decode: a required holder points at an ID that does not exist, or a field has the wrong shape. The whole load fails, not just the file. |
| `breakthrough_exp` greater than `max_experience` | The stage cannot be left; the codec rejects this at load time when both are constants. |
| The realm condition never passes | `mxt:realm` compares against the *current* stage; use `"comparison": "at_least"` when you meant "this or later". |

## Next

- [Build the Aura Environment](./aura-environment.md) — make the concentration vary by place, block and time, and put it on the HUD.
- [Resource](../datapack/json/resource.md) and [Realm Stage](../datapack/json/realm_stage.md) — every remaining field, including resource bars, conversions and tribulations.

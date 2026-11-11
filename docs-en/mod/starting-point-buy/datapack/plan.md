---
title: Plans and Screen Settings
description: Plan fields, resource bindings, captured inputs, presets, completion rules and screen configuration.
sidebar_position: 1
---

File: `data/<namespace>/spb/plan/<path>.json`. A Plan defines the complete starting flow; see the [tutorial](./index.md) for a working minimal example. Plans have no schema-version field.

## Plan fields

| Field | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `title` | Text component | no | no heading | Screen heading and narration title; no fallback to the mod name |
| `description` | Text component | no | omitted | Plan description; the current main screen does not render a top description |
| `activation` | Object | no | see below | Automatic activation and priority |
| `inputs` | Name → NumberProvider | no | `{}` | External values captured at session creation |
| `resources` | ResourceBinding array | yes | — | Bound Saturn resources |
| `presets` | Preset array | no | `[]` | Left sidebar presets |
| `groups` | Array of IDs or `#tags` | yes | — | Ordered Group references |
| `completion_rules` | Completion rule array | no | `[]` | Conditions that must all pass for confirmation |
| `outcomes` | [Outcome](./rewards.md) array | no | `[]` | Rewards derived from the final state |
| `ui` | Object | no | see below | Screen dimensions and closing rules |

Write text components explicitly as `{"text":"Text"}` or `{"translate":"example.plan.title"}`. Bare strings are translation keys. Put language files in a client resource pack, for example `assets/example/lang/en_us.json`.

## Automatic activation

| `activation` field | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `on_first_join` | Boolean | no | `false` | Offer the plan at login to players who have not completed it |
| `priority` | Integer | no | `0` | Higher values win when multiple plans apply |
| `condition` | Saturn EntityCondition | no | always true | Automatic entry condition evaluated against real player state |

Equal priorities are resolved by ascending plan ID. Only one plan is edited at a time; after completing an automatic plan, the next eligible plan is offered on a later login. Explicit commands or actions can specify a nonautomatic plan; `activation.condition` filters the automatic entry point.

## Resource bindings

| ResourceBinding field | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `resource` | Saturn resource ID | yes | — | An existing resource, bound only once per plan |
| `initial` | NumberProvider | no | current real value | Evaluated only when creating a new session |
| `quantum` | Finite positive number | no | `1` | Smallest unit, such as `0.25`, for precision checks |
| `commit` | `replace` / `discard` | no | `replace` | Write the final value on confirmation, or use it only in the draft |
| `display` | Boolean | no | `true` | Show the resource in the bottom bar |
| `name` | Text component | no | generated translation key | Display name; defaults to `spb.resource.<namespace>.<path>` |

```json
{
  "resources": [
    {"resource": "example:points", "initial": 8, "name": {"text": "Points"}},
    {"resource": "example:strength", "name": {"text": "Strength"}},
    {"resource": "example:preview", "commit": "discard", "display": false}
  ]
}
```

This is a Plan fragment; define the three referenced resources separately. Formulas use names generated from IDs, such as `base_example_points` and `resource_example_points`. Resources have no configurable `key`.

Every edit recalculates from the frozen baseline and complete selection. The draft does not change real player resources; successful confirmation writes `replace` resources. `discard` resources still take part in contributions, bounds and precision checks, but are not written back.

Physical bounds come from the Saturn resource definition. Overspending, bound violations and values misaligned with `quantum` block submission; balances are not clamped into validity. For fractional units, check resource defaults, contributions and final values. The first bound resource is the primary currency in price lines; other reduced resources retain their negative sign.

Reset keeps the baseline; reopening keeps the saved draft; refreshing reads current real resources without evaluating `initial` again. Prefer dedicated starting resources so other gameplay does not change the same balance during editing.

## Captured inputs

```json
{
  "inputs": {
    "bonus": 2,
    "roll": {"type": "saturn:uniform", "min": 1, "max": 4}
  }
}
```

Input map names remain configurable: formulas read `input_bonus` and `input_roll`. Names must be nonempty and use only letters, digits and underscores accepted by Saturn variable names. Values are evaluated and saved at new-session creation. Clicks, Reset and reconnecting do not reroll them; an explicit refresh captures them again.

Inputs and `initial` are evaluated before selection editing and should not depend on final draft variables. Other [NumberProviders](../../../library/saturn/types/number.md) can read real player state.

## Presets

| Preset field | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `name` | Text component | yes | — | Sidebar label |
| `description` | Text component | no | omitted | Description |
| `icon` | Saturn IconReference | no | omitted | Icon, such as `{"id":"minecraft:iron_sword"}` |
| `selections` | Full Option ID → non-negative integer | no | `{}` | Complete selection; omitted options have quantity `0` |

Presets have no `key` field. Their one-based list positions produce `preset_1`, `preset_2`, etc. Reordering changes these identities, and duplicate preset contents are allowed.

Applying a preset replaces the complete draft without changing the baseline. Invalid references, hard limits, single-choice structure or candidate availability leave the original draft intact. A preset that violates point or dynamic completion limits can remain as a draft to repair.

## Completion rules

| Rule field | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `key` | Nonblank string | yes | — | Diagnostic identifier |
| `condition` | Saturn EntityCondition | yes | — | Condition that must pass |
| `message` | Text component | no | failure message containing the key | Shown when the rule fails |

All rules must pass, together with resource bounds, group and option limits. See [formulas and comparisons](./formulas.md) for exact-zero, non-negative and range conditions.

## Screen settings

| `ui` field | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `preset_sidebar_width` | Integer, GUI logical pixels | no | `100` | Desired preset sidebar width, constrained by the layout |
| `max_width` | Integer, GUI logical pixels | no | `0` | A positive maximum window width; `0` uses the current logical screen |
| `max_height` | Integer, GUI logical pixels | no | `0` | A positive maximum window height; `0` uses the current logical screen |
| `allow_close_before_complete` | Boolean | no | `false` | Allow saving and closing before confirmation |

These dimensions already account for Minecraft GUI scale; they are not physical pixels. Closing is locked by default, even when point rules pass. With early closing enabled, dismissal still waits for a server acknowledgement. Damage protection while open is always handled by the server and has no separate setting. Plans without presets hide the sidebar.

---
title: Abilities and Delayed Actions
description: Convert final selections and attributes into Saturn abilities and delayed actions with outcomes.
sidebar_position: 4
---

Both Plans and Options support `outcomes`. Plan outcomes are checked once against the final state; Option outcomes also require a quantity greater than zero. Editing selections and switching presets never grants abilities or executes actions.

## Outcome fields

| Field | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `key` | Nonblank string | yes | — | Stable outcome identifier, unique within its owning definition |
| `condition` | Saturn EntityCondition | no | passes | Activation condition on the final snapshot |
| `abilities` | Saturn ability ID array | no | `[]` | Permanent abilities to grant |
| `actions` | Delayed action array | no | `[]` | Actions scheduled after commit |

Embed this fragment in a Plan or Option. Define the referenced `example:strong_body` separately:

```json
{
  "outcomes": [
    {
      "key": "strong_body",
      "condition": {
        "type": "spb:compare",
        "left": "resource_example_strength",
        "operator": ">=",
        "right": 4
      },
      "abilities": ["example:strong_body"],
      "actions": [
        {
          "key": "starter_food",
          "delay": 1,
          "repeat": 1,
          "action": {
            "type": "saturn:give_item",
            "stack": {"id": "minecraft:bread", "count": 2}
          }
        }
      ]
    }
  ]
}
```

Ability files use Saturn's [ability format](../../../library/saturn/data/ability.md), for example `data/example/saturn/ability/strong_body.json`. The mod maintains ability grant sources per plan; drafts do not temporarily grant these abilities.

## Delayed action fields

| Field | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `key` | Nonblank string | yes | — | Unique action identifier within its Outcome |
| `delay` | NumberProvider | no | `1` | Rounded up, with at least one online server tick of delay |
| `repeat` | NumberProvider | no | `1` | Execution count, rounded down; must be non-negative |
| `action` | Saturn EntityAction | yes | — | Action definition frozen at commit |

The current limits are `1024` expanded tasks per submission and `72000` ticks of delay. Exceeding a limit blocks submission. At normal 20 TPS, twenty ticks is roughly one second; waiting does not advance while offline.

Multiple option units do not automatically duplicate rewards. To give a reward per training unit, explicitly use `"repeat": "selected_example_train"` in that option's action. Each repetition runs the complete action: a two-bread action repeated four times gives eight bread.

Conditions, delay, repetition counts and formula variables are evaluated or frozen at confirmation. Later data pack changes do not replace committed actions. At execution, ordinary `caster_*` variables still describe the player at that time; `resource_*` variables retain the frozen starting result.

## Interruptions and recovery

Repeated submission does not repeat rewards. A `RUNNING` checkpoint is saved before an action, followed by its result. Failures or tasks left running after an interruption require administrator review and are not automatically replayed.

Ordinary Saturn actions have no universal success receipt, so arbitrary world changes have no crash-safe exactly-once guarantee. Custom rewards requiring that guarantee should use task identities for idempotence. See [task recovery](../usage.md) for administrator commands.

## Open a plan from a Saturn action

Embed this value in an EntityAction field:

```json
{
  "type": "spb:open_plan",
  "plan": "example:first_start"
}
```

`type` is required; `plan` is an optional plan ID. Without it, the action resumes the current session or chooses an eligible automatic plan when no session exists. It affects server players only and respects current sessions and completion records. This is an embedded action, not a file in `spb/entity_action`.

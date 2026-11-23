---
title: Extension Guide
description: Add companion definitions, tasks, render settings, and Java or KubeJS actions.
sidebar_position: 3
---

## Define a companion and its tasks

Put companion definitions in `data/<namespace>/psychic/spirit/<name>.json` and task definitions in `data/<namespace>/psychic/behavior/<name>.json`. The namespace and file name form the resource ID. For example, `data/example/psychic/behavior/greet.json` defines `example:greet`.

A companion definition takes exactly one of `item_tag` or `block_entity_tag`. It also takes an awakening `condition` and a `tasks` list. When several definitions match, the higher companion `priority` wins. IDs break ties. Use `address_aliases` to add call names and `material_search_range` to set the search radius in blocks. The range is 0–16 with a default of 0. The built-in tool and furnace definitions use 8.

This example gives axes a greeting task, using a new companion definition with a higher priority than the built-in axe definition. Add the built-in task IDs you want to retain to `tasks`.

```json title="data/example/psychic/spirit/greeting_axe.json"
{
  "item_tag": "psychic:axe",
  "priority": 10,
  "condition": { "type": "psychic:always" },
  "render": "psychic:axe",
  "tasks": ["example:greet"]
}
```

```json title="data/example/psychic/behavior/greet.json"
{
  "type": "instant",
  "target_types": ["carried"],
  "commands": ["greet"],
  "action": {
    "type": "psychic:say",
    "text": { "text": "Hello!" }
  }
}
```

Reopen the world or restart the server to load companion and task registries. Awaken an axe with the new definition and try `!greet` while it is selected.

| Task field | Purpose |
| --- | --- |
| `type` | `active` for an order, `passive` for ongoing behavior, `triggered` for an event, or `instant` for immediate work. |
| `target_types` | `carried` for item companions and `fixed` for block entities. The action must support the target and task type. |
| `priority` | Lower values run first when tasks compete for control. |
| `requires` | Required capability IDs such as `psychic:flight`. |
| `commands`, `examples` | Explicit commands and language-keyed examples such as `en` or `zh`. The local example matcher handles tasks without arguments. |
| `arguments` | Enables text arguments. Defaults to `false`. |
| `trigger` | Event ID for a triggered task. |
| `tool_description` | Describes a chat-callable task and its argument syntax for model routing. |
| `interruptible`, `resume`, `timeout_ticks`, `cooldown_ticks` | Scheduling options for work that runs over time. |

## Configure the item render

Place render definitions in `assets/<namespace>/psychic/spirit_render/<name>.json` and reference them through the companion's `render` ID. Specify `back`, `hover`, and `free` poses. The optional `work` pose defaults to `free`. Poses support `offset`, `rotation` in degrees, `pivot`, and `scale`. Use `item_model` to select a resource-pack item model or `align_attack` to orient attacks along the flight direction. Reload client resources to apply render edits.

## Extend with Java

Register a `MapCodec` for a `SpiritAction` or `AttunementCondition` through your mod's `DeferredRegister` using `PsychicResourceKeys.ACTION_TYPE` or `PsychicResourceKeys.CONDITION_TYPE`. Refer to the registered ID in `action.type` or `condition.type`. `SpiritContext.target()` exposes `SpiritTarget.Carried` or `SpiritTarget.Fixed`.

Use `SpiritTasks.submit(context, execution)` for work that spans multiple ticks. Implement `TaskExecution.tick()` and return `true` when finished. `started(resuming)`, `paused()`, and `stopped(reason)` handle lifecycle transitions. Use `SpiritTasks.registerRequirement` for capability checks and `SpiritTasks.trigger` to dispatch events. Protection integrations can cancel `SpiritAccessEvent`, including the `psychic:extract_material` operation with a container source.

## Extend with KubeJS

Place callbacks in `kubejs/server_scripts/` and reference their IDs in JSON.

```js title="kubejs/server_scripts/psychic.js"
PsychicEvents.condition('example:ready', event => {
  if (event.player.experienceLevel >= 5) event.success()
})

PsychicEvents.action('example:greet', event => {
  event.setReply('Ready to help.')
  event.success()
})
```

Use `{"type":"psychic:script","callback":"example:ready"}` as the condition and `{"type":"psychic:script","callback":"example:greet"}` as the action. For work that spans multiple ticks, use `psychic:script_task` and `PsychicEvents.task`. Each callback receives the current `event.tick` and uses `event.success()` to finish. Depending on the target, callbacks can read `event.item` or `event.blockEntity`, as well as `event.arguments`, `event.entity`, and `event.origin`.

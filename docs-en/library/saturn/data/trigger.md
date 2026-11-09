---
title: "Trigger Rules"
sidebar_position: 5
---

File: `data/<namespace>/saturn/trigger/<path>.json`. This file is the rule definition; the inner `trigger` is the type object that matches game signals.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `trigger` | [Trigger](../types/trigger/index.md) | yes | — | The game signal to subscribe to and match. |
| `condition` | [Entity condition](../types/entity-condition/index.md) | no | always true | Checks the actor after the signal matches. |
| `action` | [Entity action](../types/entity-action/index.md) | no | empty action | Runs after the condition and chance pass. |
| `chance` | [Number provider](../types/number/index.md) | no | `1` | Chance of matching, 0–1. |
| `cooldown` | Number provider | no | `0` | Cooldown of the rule for the same actor, in ticks. |

## Example: notify when a specific advancement is completed

The following trigger is new in the current source; before using it in a release build, confirm that the build already contains this type.

```json title="data/example/saturn/trigger/first_diamond.json"
{
  "trigger": {
    "type": "saturn:advancement_completed",
    "advancement": "minecraft:story/mine_diamond"
  },
  "action": {
    "type": "saturn:send_message",
    "message": {
      "text": "You obtained your first diamond."
    }
  },
  "chance": 1,
  "cooldown": 20
}
```

A rule is not a persistent one-shot advancement record. Completing the advancement again after revoking it may still trigger the rule, and deduplication across restarts is handled by the host's own storage. For signals, subscriptions, load recovery and Java interfaces, see the [trigger lifecycle](../guides/triggers.md). System still uses its own advancement listener configuration and has not yet switched to this trigger.

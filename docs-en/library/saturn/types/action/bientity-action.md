---
title: "Bi-entity action"
sidebar_position: 2
---

The context contains an actor (the initiator) and a target. The same ID may have different fields in the entity action and bi-entity action registries; the two kinds are not interchangeable.

## Types

### `saturn:add_velocity` {#saturnadd_velocity}

Adds velocity, or replaces it with the given vector.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:add_velocity` |
| `x` | Number | no | `0.0` | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | Number | no | `0.0` | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | Number | no | `0.0` | Z coordinate, offset or vector component, depending on this page's behavior. |
| `reference` | Enum string | no | `"position"` | Reference direction used by bi-entity velocity. Available values: `position`, `rotation`. |
| `client` | Boolean | no | `true` | Whether to apply on the client. |
| `server` | Boolean | no | `true` | Whether to apply on the server. |
| `set` | Boolean | no | `false` | true replaces the velocity with the given vector; false adds to it. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:add_velocity"
}
```

</details>

### `saturn:damage_target` {#saturndamage_target}

Damages target on the server, with actor as the damage source entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:damage_target` |
| `damage_type` | Resource ID | yes | — | Reference to the vanilla damage type registry. |
| `amount` | [Number provider](../number.md) | yes | — | Amount for this operation. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:damage_target",
  "damage_type": "minecraft:magic",
  "amount": 2
}
```

</details>

`actor` is the initiator and `target` the other entity; their order is defined by the caller.

Non-positive or non-finite amounts do not deal damage.

### `saturn:heal_target` {#saturnheal_target}

Restores health to the target entity of the bi-entity context.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:heal_target` |
| `amount` | [Number provider](../number.md) | yes | — | Amount or value; a number provider may be a number, a formula string or an object with a type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:heal_target",
  "amount": 1
}
```

</details>

### `saturn:mount` {#saturnmount}

Makes the actor ride the target.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:mount` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:mount"
}
```

</details>

### `saturn:send_message` {#saturnsend_message}

Sends a text component to players that match the recipient condition, optionally to the chat bar or the action bar.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:send_message` |
| `message` | Text component | yes | — | Text component sent to players; strings are treated as translation keys. |
| `channel` | Enum string | no | `"chat"` | Message channel; see the enum notes below for available values. Available values: `chat`, `action_bar`. |
| `target` | Enum string | no | `"self"` | Action target, target ID or target selection; see the type description on this page. Available values: `self`, `other`, `all`. |
| `recipients` | [Entity condition](../condition/entity-condition.md) | no | `{"type":"saturn:always"}` | Entity condition checked for each candidate recipient player. |

channel accepts chat and action_bar. target=self selects the actor / item holder, other selects the bi-entity target, and all selects the players in the current server dimension. Block actions have no recipients of their own, so they usually use all. recipients is checked separately for every candidate player.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:send_message",
  "message": {
    "text": "Operation complete"
  }
}
```

</details>

### `saturn:set_in_love` {#saturnset_in_love}

Puts the target animal in love mode, recording actor when it is a player. Server-only.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:set_in_love` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:set_in_love"
}
```

</details>

`actor` is the initiator and `target` the other entity; their order is defined by the caller.

### `saturn:tame` {#saturntame}

Tames target to actor when actor is a player and target is a tamable animal. Server-only.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:tame` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:tame"
}
```

</details>

`actor` is the initiator and `target` the other entity; their order is defined by the caller.

### `saturn:teleport` {#saturnteleport}

Changes the position of the entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:teleport` |
| `teleport_actor` | Boolean | no | `false` | The teleport_actor parameter of this type. |
| `teleport_target` | Boolean | no | `true` | The teleport_target parameter of this type. |
| `rotate` | Boolean | no | `false` | The rotate parameter of this type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:teleport"
}
```

</details>

### `saturn:transfer_resource` {#saturntransfer_resource}

Transfers the given Saturn resource between the actor and the target.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:transfer_resource` |
| `resource` | Resource ID | yes | — | A registered Saturn resource ID. |
| `amount` | [Number provider](../number.md) | yes | — | Amount or value; a number provider may be a number, a formula string or an object with a type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:transfer_resource",
  "resource": "example:mana",
  "amount": 1
}
```

</details>

## Meta types

These types do not test a concrete value themselves; they combine or delegate other types of the same kind and are embedded in the same fields.

### `saturn:actor_action` {#saturnactor_action}

Hands the actor of the bi-entity context to an entity action.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:actor_action` |
| `action` | [Entity action](./entity-action.md) | yes | — | The sub-action to run; its kind must match what this field expects. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:actor_action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:chance` {#saturnchance}

Decides whether the action fires based on a given chance.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:chance` |
| `action` | [Bi-entity action](./bientity-action.md) | yes | — | The sub-action to run; its kind must match what this field expects. |
| `chance` | Number | yes | — | Hit chance; 0 never fires, 1 always fires. Codec range: `0.0F, 1.0F`. |
| `fail_action` | [Bi-entity action](./bientity-action.md) | no | `{"type":"saturn:no_op"}` | Action to run when the chance check fails. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:chance",
  "action": {
    "type": "saturn:no_op"
  },
  "chance": 1
}
```

</details>

### `saturn:choice` {#saturnchoice}

Picks one action at random by weight and runs it.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:choice` |
| `actions` | Array of weighted entries (value, weight) | yes | — | Array of sub-actions; sequential kinds run in order, weighted kinds pick by value and weight. |

Each entry contains value and weight; see [Weighted entries](../../data/common.md#weighted-entries). Negative weights are treated as 0; when the total weight is 0, an entry is picked uniformly from the non-empty action list. An empty action list does nothing.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:choice",
  "actions": [
    {
      "value": {
        "type": "saturn:no_op"
      },
      "weight": 1
    }
  ]
}
```

</details>

### `saturn:for_range` {#saturnfor_range}

Executes an action a fixed number of times, up to the configured iteration limit.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:for_range` |
| `range` | [Number provider](../number.md) | yes | — | Repetition count, truncated toward zero; negative values execute nothing. |
| `action` | [Bi-entity actions](./bientity-action.md) | yes | — | Nested action of the declared context type. |
| `max_iterations` | Integer | no | `1024` | Maximum iterations per invocation; must be at least 1. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:for_range",
  "range": 3,
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

`actor` is the initiator and `target` the other entity; their order is defined by the caller.

The count is evaluated once before the loop and capped at `max_iterations`.

### `saturn:if_else` {#saturnif_else}

Runs if_action when the condition holds, otherwise runs else_action.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:if_else` |
| `condition` | [Bi-entity condition](../condition/bientity-condition.md) | yes | — | The condition to check. |
| `if_action` | [Bi-entity action](./bientity-action.md) | yes | — | Action to run when the condition holds. |
| `else_action` | [Bi-entity action](./bientity-action.md) | no | `{"type":"saturn:no_op"}` | Action to run when the condition does not hold. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:if_else",
  "condition": {
    "type": "saturn:always"
  },
  "if_action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:if_else_list` {#saturnif_else_list}

Executes the first branch whose condition matches, then stops checking branches.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:if_else_list` |
| `actions` | Branch array | yes | — | Ordered branches; each entry contains condition and action. |

Each `actions` entry:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `condition` | `BiEntityCondition` | yes | Condition selecting this branch. |
| `action` | `BiEntityAction` | yes | Action to run; later branches are not checked. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:if_else_list",
  "actions": [
    {
      "condition": {
        "type": "saturn:always"
      },
      "action": {
        "type": "saturn:no_op"
      }
    }
  ]
}
```

</details>

`actor` is the initiator and `target` the other entity; their order is defined by the caller.

### `saturn:invert` {#saturninvert}

Swaps actor and target before evaluating the nested object.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:invert` |
| `action` | [Bi-entity actions](./bientity-action.md) | yes | — | Nested action of the declared context type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:invert",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

`actor` is the initiator and `target` the other entity; their order is defined by the caller.

### `saturn:js` {#saturnjs}

Calls a callback registered by KubeJS and passes the params argument.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:js` |
| `id` | String | yes | — | Identifier of the callback, option or entry. |
| `params` | Object | no | `{}` | Parameter object passed to the script or formula. |

Registered only when KubeJS is installed. JSON only selects an existing callback; it never executes a JavaScript string inside the JSON directly.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

</details>

### `saturn:no_op` {#saturnno_op}

Does nothing; usable as a placeholder action value.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:no_op` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:no_op"
}
```

</details>

### `saturn:sequence` {#saturnsequence}

Runs several actions of the same kind in array order.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:sequence` |
| `actions` | Array of actions of the same kind | yes | — | Array of sub-actions; sequential kinds run in order, weighted kinds pick by value and weight. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:sequence",
  "actions": []
}
```

</details>

### `saturn:side` {#saturnside}

Executes the nested action only on the selected logical side.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:side` |
| `action` | [Bi-entity actions](./bientity-action.md) | yes | — | Nested action of the declared context type. |
| `side` | Enum string | yes | — | Logical side: client or server. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:side",
  "side": "server",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

`actor` is the initiator and `target` the other entity; their order is defined by the caller.

Uses the level’s logical side. An integrated server is `server` even inside a client process. This action does not send a packet or execute remotely.

### `saturn:target_action` {#saturntarget_action}

Hands the target of the bi-entity context to an entity action.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:target_action` |
| `action` | [Entity action](./entity-action.md) | yes | — | The sub-action to run; its kind must match what this field expects. |
| `use_target_position` | Boolean | no | `false` | Whether to use the target's position as the execution position. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:target_action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:while` {#saturnwhile}

Repeats an action while its condition matches, with a configurable iteration limit.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:while` |
| `condition` | [Bi-entity conditions](../condition/bientity-condition.md) | yes | — | Filter condition of the declared context type. |
| `action` | [Bi-entity actions](./bientity-action.md) | yes | — | Nested action of the declared context type. |
| `max_iterations` | Integer | no | `1024` | Maximum iterations per invocation; must be at least 1. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:while",
  "max_iterations": 64,
  "condition": {
    "type": "saturn:never"
  },
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

`actor` is the initiator and `target` the other entity; their order is defined by the caller.

The condition is checked before every iteration. If it is still true after `max_iterations`, the action throws and stops; actions already executed are not rolled back.

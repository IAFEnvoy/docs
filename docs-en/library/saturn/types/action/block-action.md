---
title: "Block action"
sidebar_position: 3
---

# Block action

Acts on the world and block position given by the context. It is not a standalone data pack file; embed it in a field that requires a BlockAction.

### `saturn:bonemeal` {#saturnbonemeal}

Attempts to apply the bonemeal effect to the block in the context.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:bonemeal` |
| `effect` | Boolean | no | `true` | Status effect ID. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:bonemeal"
}
```

</details>

### `saturn:break_block` {#saturnbreak_block}

Breaks the block at the context position and optionally controls whether items drop.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:break_block` |
| `drop` | Boolean | no | `true` | Whether block drops are generated. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:break_block"
}
```

</details>

### `saturn:explode` {#saturnexplode}

Creates an explosion at the context position, with configurable destruction behavior and protection conditions.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:explode` |
| `power` | Number | yes | — | Explosion power. |
| `interaction` | Enum string | no | `"mob"` | How the explosion interacts with blocks. Available values: `none`, `block`, `mob`, `tnt`, `trigger`. |
| `indestructible` | [Block condition](../condition/block-condition.md) | no | omitted | Condition for blocks that are protected from this explosion. |
| `create_fire` | Boolean | no | `false` | Whether the explosion tries to create fire. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:explode",
  "power": 1
}
```

</details>

### `saturn:light_up` {#saturnlight_up}

Tries to set the context position on fire.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:light_up` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:light_up"
}
```

</details>

### `saturn:schedule_tick` {#saturnschedule_tick}

Schedules a delayed tick for the block at the context position.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:schedule_tick` |
| `delay` | Integer | yes | — | Delay in ticks. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:schedule_tick",
  "delay": 1
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

### `saturn:set_block` {#saturnset_block}

Sets the current position to the given block.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:set_block` |
| `block` | Resource ID | yes | — | Block ID or block argument. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:set_block",
  "block": "minecraft:stone"
}
```

</details>

### `saturn:spawn_entity` {#saturnspawn_entity}

Spawns an entity at the position given by the context or at the specified coordinates.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:spawn_entity` |
| `entity_type` | Resource ID | yes | — | Entity type ID. |
| `tag` | Object | no | omitted | Registry tag, or the NBT data declared on this page. |
| `entity_action` | [Entity action](./entity-action.md) | no | `{"type":"saturn:no_op"}` | Entity action run on the ability holder or the context entity. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:spawn_entity",
  "entity_type": "minecraft:arrow"
}
```

</details>

## Meta types

These types do not test a concrete value themselves; they combine or delegate other types of the same kind and are embedded in the same fields.

### `saturn:chance` {#saturnchance}

Decides whether the action fires based on a given chance.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:chance` |
| `action` | [Block action](./block-action.md) | yes | — | The sub-action to run; its kind must match what this field expects. |
| `chance` | Number | yes | — | Hit chance; 0 never fires, 1 always fires. Codec range: `0.0F, 1.0F`. |
| `fail_action` | [Block action](./block-action.md) | no | `{"type":"saturn:no_op"}` | Action to run when the chance check fails. |

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

### `saturn:if_else` {#saturnif_else}

Runs if_action when the condition holds, otherwise runs else_action.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:if_else` |
| `condition` | [Block condition](../condition/block-condition.md) | yes | — | The condition to check. |
| `if_action` | [Block action](./block-action.md) | yes | — | Action to run when the condition holds. |
| `else_action` | [Block action](./block-action.md) | no | `{"type":"saturn:no_op"}` | Action to run when the condition does not hold. |

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

### `saturn:offset` {#saturnoffset}

Moves the block context by the given offset before checking or running the child.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:offset` |
| `action` | [Block action](./block-action.md) | yes | — | Child action to run; its kind must match what the current field requires. |
| `x` | Integer | no | `0` | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | Integer | no | `0` | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | Integer | no | `0` | Z coordinate, offset or vector component, depending on this page's behavior. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:offset",
  "action": {
    "type": "saturn:no_op"
  }
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

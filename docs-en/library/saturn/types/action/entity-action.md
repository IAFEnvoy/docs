---
title: "Entity action"
sidebar_position: 1
---

# Entity action

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

### `saturn:add_experience` {#saturnadd_experience}

Adds experience points, levels, or both to the player.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:add_experience` |
| `points` | Integer | no | omitted | Vanilla experience points; when omitted, the points are not changed. |
| `levels` | Integer | no | omitted | Vanilla experience levels; when omitted, the levels are not changed. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:add_experience",
  "points": 100
}
```

</details>

### `saturn:add_resource` {#saturnadd_resource}

Adds to the current value of the given Saturn resource.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:add_resource` |
| `resource` | Resource ID | yes | — | ID of a registered Saturn resource. |
| `amount` | [Number provider](../number.md) | yes | — | Amount or value; a number provider may be a number, a formula string or an object with a type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:add_resource",
  "resource": "example:mana",
  "amount": 1
}
```

</details>

### `saturn:add_velocity` {#saturnadd_velocity}

Adds velocity, or replaces it with the given vector.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:add_velocity` |
| `x` | Number | no | `0.0` | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | Number | no | `0.0` | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | Number | no | `0.0` | Z coordinate, offset or vector component, depending on this page's behavior. |
| `space` | Enum string | no | `"world"` | Vector coordinate space. Available values: `world`, `local`, `local_horizontal`, `local_horizontal_normalized`, `velocity`, `velocity_normalized`, `velocity_horizontal`, `velocity_horizontal_normalized`. |
| `set` | Boolean | no | `false` | true replaces the velocity with the given vector; false adds to it. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:add_velocity"
}
```

</details>

### `saturn:apply_effect` {#saturnapply_effect}

Applies a mob effect with the given duration and amplifier to the entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:apply_effect` |
| `effect` | Resource ID | yes | — | Mob effect ID. |
| `duration_ticks` | [Number provider](../number.md) | yes | — | Effect duration, in game ticks. |
| `amplifier` | [Number provider](../number.md) | no | `0.0` | Effect amplifier index; 0 means level I. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:apply_effect",
  "effect": "minecraft:speed",
  "duration_ticks": 200,
  "amplifier": 0
}
```

</details>

### `saturn:block_action` {#saturnblock_action}

Runs a block action on the block at the entity's position.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_action` |
| `action` | [Block action](./block-action.md) | yes | — | The sub-action to run; its kind must match what this field expects. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:block_action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:dismount` {#saturndismount}

Makes the entity leave its current mount.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:dismount` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:dismount"
}
```

</details>

### `saturn:emit_game_event` {#saturnemit_game_event}

Emits a vanilla game event that sculk sensors and similar blocks can receive.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:emit_game_event` |
| `event` | Resource ID | yes | — | Vanilla GameEvent ID. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:emit_game_event",
  "event": "minecraft:step"
}
```

</details>

### `saturn:equipped_item_action` {#saturnequipped_item_action}

Runs an item action on the item stack in the given equipment slot.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:equipped_item_action` |
| `slot` | Enum string | yes | — | Equipment slot. Available values: `mainhand`, `offhand`, `feet`, `legs`, `chest`, `head`, `body`, `saddle`. |
| `action` | [Item action](./item-action.md) | yes | — | The sub-action to run; its kind must match what this field expects. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:equipped_item_action",
  "slot": "mainhand",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:exhaust` {#saturnexhaust}

Adds to the player's food exhaustion.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:exhaust` |
| `amount` | Number | yes | — | Amount or value; a number provider may be a number, a formula string or an object with a type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:exhaust",
  "amount": 1
}
```

</details>

### `saturn:extinguish` {#saturnextinguish}

Clears the entity's current burning state.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:extinguish` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:extinguish"
}
```

</details>

### `saturn:feed` {#saturnfeed}

Adds food and saturation to the player.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:feed` |
| `food` | Integer | yes | — | Food restored. |
| `saturation` | Number | yes | — | Saturation parameter restored. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:feed",
  "food": 1,
  "saturation": 1
}
```

</details>

### `saturn:gain_air` {#saturngain_air}

Modifies the entity's remaining air.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:gain_air` |
| `value` | Integer | yes | — | The value or expression used by this type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:gain_air",
  "value": 1
}
```

</details>

### `saturn:give_item` {#saturngive_item}

Creates an item stack and hands it to the entity, optionally with a preferred equipment slot.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:give_item` |
| `stack` | Item stack template | yes | — | The vanilla ItemStackTemplate to create. |
| `item_action` | [Item action](./item-action.md) | no | `{"type":"saturn:no_op"}` | Item action to run on the item stack. |
| `preferred_slot` | Enum string | no | omitted | Preferred equipment slot; when the stack cannot be placed there, delivery continues according to the implementation. Available values: `mainhand`, `offhand`, `feet`, `legs`, `chest`, `head`, `body`, `saddle`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:give_item",
  "stack": {
    "id": "minecraft:diamond",
    "count": 1
  }
}
```

</details>

### `saturn:grant_ability` {#saturngrant_ability}

Grants an ability to the entity under the given source ID.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:grant_ability` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `source` | Resource ID | yes | — | Input collection, resource path or context parameter; see the usage on this page. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:grant_ability",
  "ability": "example:heal",
  "source": "example:manual"
}
```

</details>

### `saturn:heal` {#saturnheal}

Restores the entity's health.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:heal` |
| `amount` | [Number provider](../number.md) | yes | — | Amount or value; a number provider may be a number, a formula string or an object with a type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:heal",
  "amount": 1
}
```

</details>

### `saturn:knockback` {#saturnknockback}

Applies velocity to the entity along the given vector.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:knockback` |
| `x` | [Number provider](../number.md) | yes | — | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | [Number provider](../number.md) | yes | — | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | [Number provider](../number.md) | yes | — | Z coordinate, offset or vector component, depending on this page's behavior. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:knockback",
  "x": 1,
  "y": 1,
  "z": 1
}
```

</details>

### `saturn:modify_ability_storage` {#saturnmodify_ability_storage}

Writes a state of the given kind into the storage of the target ability.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:modify_ability_storage` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `value` | [State storage](../storage.md) | yes | — | The value or expression used by this type. |

Only storage kinds that the ability has already declared are modified; when a kind is not declared, a warning is logged and the entry is skipped. Regular ability cooldowns and charges are maintained by the activation flow, so they do not need to be overwritten manually every time.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:modify_ability_storage",
  "ability": "example:heal",
  "value": {
    "type": "saturn:cooldown",
    "duration": 40
  }
}
```

</details>

### `saturn:passenger_action` {#saturnpassenger_action}

Runs an action on the passengers of the entity, and can walk multiple levels of passengers recursively.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:passenger_action` |
| `action` | [Entity action](./entity-action.md) | no | `{"type":"saturn:no_op"}` | The sub-action to run; its kind must match what this field expects. |
| `bientity_action` | [Bi-entity action](./bientity-action.md) | no | `{"type":"saturn:no_op"}` | Action run between the two sides of the context. |
| `bientity_condition` | [Bi-entity condition](../condition/bientity-condition.md) | no | `{"type":"saturn:always"}` | Condition that filters the two sides of the context. |
| `recursive` | Boolean | no | `false` | Whether to walk the riding or passenger chain recursively. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:passenger_action"
}
```

</details>

### `saturn:play_sound` {#saturnplay_sound}

Plays the given sound event at the entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:play_sound` |
| `sound` | Resource ID | yes | — | SoundEvent ID. |
| `category` | Enum string | no | omitted | Sound category. Available values: `master`, `music`, `records`, `weather`, `blocks`, `hostile`, `neutral`, `players`, `ambient`, `voice`, `ui`. |
| `volume` | Number | no | `1.0` | Volume multiplier. |
| `pitch` | Number | no | `1.0` | Pitch angle in degrees when not following the mouse. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:play_sound",
  "sound": "minecraft:entity.experience_orb.pickup",
  "category": "players"
}
```

</details>

### `saturn:remove_ability` {#saturnremove_ability}

Removes the ability granted by the given source; abilities from other sources are not affected.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:remove_ability` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `source` | Resource ID | yes | — | Input collection, resource path or context parameter; see the usage on this page. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:remove_ability",
  "ability": "example:heal",
  "source": "example:manual"
}
```

</details>

### `saturn:remove_effect` {#saturnremove_effect}

Removes the given status effect from the entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:remove_effect` |
| `effect` | Resource ID | yes | — | Status effect ID. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:remove_effect",
  "effect": "minecraft:speed"
}
```

</details>

### `saturn:riding_action` {#saturnriding_action}

Runs an action on what the entity is riding, and can walk the riding chain recursively.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:riding_action` |
| `action` | [Entity action](./entity-action.md) | no | `{"type":"saturn:no_op"}` | The sub-action to run; its kind must match what this field expects. |
| `bientity_action` | [Bi-entity action](./bientity-action.md) | no | `{"type":"saturn:no_op"}` | Action run between the two sides of the context. |
| `bientity_condition` | [Bi-entity condition](../condition/bientity-condition.md) | no | `{"type":"saturn:always"}` | Condition that filters the two sides of the context. |
| `recursive` | Boolean | no | `false` | Whether to walk the riding or passenger chain recursively. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:riding_action"
}
```

</details>

### `saturn:self_bientity_action` {#saturnself_bientity_action}

Runs a bi-entity action with the same entity as both actor and target.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:self_bientity_action` |
| `action` | [Bi-entity action](./bientity-action.md) | yes | — | The sub-action to run; its kind must match what this field expects. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:self_bientity_action",
  "action": {
    "type": "saturn:no_op"
  }
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

### `saturn:set_fall_distance` {#saturnset_fall_distance}

Changes the accumulated fall distance of the entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:set_fall_distance` |
| `distance` | Number | yes | — | Distance or a vanilla distance predicate. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:set_fall_distance",
  "distance": 1
}
```

</details>

### `saturn:set_no_gravity` {#saturnset_no_gravity}

Controls whether the entity ignores gravity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:set_no_gravity` |
| `no_gravity` | Boolean | no | `true` | Whether no-gravity is enabled. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:set_no_gravity"
}
```

</details>

### `saturn:set_on_fire` {#saturnset_on_fire}

Sets the entity on fire for the given number of ticks.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:set_on_fire` |
| `ticks` | Integer | yes | — | Number of game ticks; 20 ticks is usually one second. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:set_on_fire",
  "ticks": 1
}
```

</details>

### `saturn:spawn_effect_cloud` {#saturnspawn_effect_cloud}

Spawns an area effect cloud with status effects near the entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:spawn_effect_cloud` |
| `radius` | Number | no | `3.0` | Radius in blocks; in a resource bar it is in pixels. |
| `radius_on_use` | Number | no | `-0.5` | Radius change after each application of the effect cloud. |
| `wait_time` | Integer | no | `10` | Number of ticks to wait before the effect cloud starts applying. |
| `effects` | Array of enum strings | no | `[]` | List of status effects or a vanilla effect predicate. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:spawn_effect_cloud"
}
```

</details>

### `saturn:spawn_entity` {#saturnspawn_entity}

Spawns an entity at the position provided by the context or at the given coordinates.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:spawn_entity` |
| `entity_type` | Resource ID | yes | — | Entity type ID. |
| `x` | [Number provider](../number.md) | yes | — | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | [Number provider](../number.md) | yes | — | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | [Number provider](../number.md) | yes | — | Z coordinate, offset or vector component, depending on this page's behavior. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:spawn_entity",
  "entity_type": "minecraft:arrow",
  "x": 1,
  "y": 1,
  "z": 1
}
```

</details>

### `saturn:spawn_particles` {#saturnspawn_particles}

Spawns particles near the entity using offset and spread parameters.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:spawn_particles` |
| `particle` | Enum string | yes | — | Vanilla particle parameter. |
| `bientity_condition` | [Bi-entity condition](../condition/bientity-condition.md) | no | `{"type":"saturn:always"}` | Condition that filters the two sides of the context. |
| `count` | Integer | yes | — | Count or count matching pattern. Codec range: `0, 2147483647`. |
| `speed` | Number | no | `0.0` | Particle speed. |
| `force` | Boolean | no | `false` | Whether to force the particles to be sent. |
| `spread` | Array of three numbers | no | `[0.5,0.5,0.5]` | Spread range on the three axes. |
| `offset_x` | Number | no | `0.0` | Offset along the X axis. |
| `offset_y` | Number | no | `0.5` | Offset along the Y axis. |
| `offset_z` | Number | no | `0.0` | Offset along the Z axis. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:spawn_particles",
  "particle": {
    "type": "minecraft:cloud"
  },
  "count": 1
}
```

</details>

### `saturn:spawn_projectile` {#saturnspawn_projectile}

Spawns an entity and gives it the given initial velocity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:spawn_projectile` |
| `entity_type` | Resource ID | yes | — | Entity type ID. |
| `velocity_x` | [Number provider](../number.md) | yes | — | X component of the initial velocity. |
| `velocity_y` | [Number provider](../number.md) | yes | — | Y component of the initial velocity. |
| `velocity_z` | [Number provider](../number.md) | yes | — | Z component of the initial velocity. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:spawn_projectile",
  "entity_type": "minecraft:arrow",
  "velocity_x": 1,
  "velocity_y": 1,
  "velocity_z": 1
}
```

</details>

### `saturn:swing_hand` {#saturnswing_hand}

Triggers the swing animation of the given hand.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:swing_hand` |
| `hand` | Enum string | yes | — | Hand to use. Available values: `main_hand`, `off_hand`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:swing_hand",
  "hand": "main_hand"
}
```

</details>

### `saturn:teleport` {#saturnteleport}

Changes the position of the entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:teleport` |
| `x` | [Number provider](../number.md) | yes | — | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | [Number provider](../number.md) | yes | — | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | [Number provider](../number.md) | yes | — | Z coordinate, offset or vector component, depending on this page's behavior. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:teleport",
  "x": 1,
  "y": 1,
  "z": 1
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
| `action` | [Entity action](./entity-action.md) | yes | — | The sub-action to run; its kind must match what this field expects. |
| `chance` | Number | yes | — | Hit chance; 0 never fires, 1 always fires. Codec range: `0.0F, 1.0F`. |
| `fail_action` | [Entity action](./entity-action.md) | no | `{"type":"saturn:no_op"}` | Action to run when the chance check fails. |

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
| `condition` | [Entity condition](../condition/entity-condition.md) | yes | — | The condition to check. |
| `if_action` | [Entity action](./entity-action.md) | yes | — | Action to run when the condition holds. |
| `else_action` | [Entity action](./entity-action.md) | no | `{"type":"saturn:no_op"}` | Action to run when the condition does not hold. |

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

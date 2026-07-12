# Meta Action Types

Meta actions are actions that execute other actions, allowing for more complex behavior and logic. They can be used to combine multiple actions, add conditions, introduce randomness, and more.

## Universal Types

:::info
These meta action types can be used in all types of actions.
:::

### `origins:and`

Executes multiple actions in sequence.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `actions` | List of Actions | **required** | Actions to execute |

<details>
<summary>Example1</summary>

```json
"entity_action": {
    "type": "origins:and",
    "actions": [
        {
            "type": "origins:exhaust",
            "amount": 0.5
        },
        {    
            "type": "origins:apply_effect",
            "effect": {
            "effect": "minecraft:regeneration",
            "amplifier": 1,
            "duration": 100
            }
        }
    ]
}
```

This example will apply exhaustion with a value of 0.5 to the player, and apply a Regeneration II status effect that would last for 5 seconds.

</details>

<details>
<summary>Example2</summary>

```json
"entity_action": {
  "type": "origins:and",
  "actions": [
    {
      "type": "origins:execute_command",
      "command": "say first"
    },
    {
      "type": "origins:execute_command",
      "command": "say second"
    }
  ]
}
```

This example will execute two commands in sequence: first "say first", then "say second".

</details>

### `origins:chance`

Random chance execution.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | Action | **required** | Action |
| `chance` | [Float](../basic_concepts#float) | **required** | Chance (0-1) |
| `fail_action` | Action | optional | Action if chance fails |

<details>
<summary>Example1</summary>

```json
"entity_action": {
    "type": "origins:chance",
    "action": {
        "type": "origins:set_on_fire",
        "duration": 5
    },
    "chance": 0.4
}
```

This example has a 40% chance to set the entity on fire for 5 seconds.

</details>

<details>
<summary>Example2</summary>

```json
"entity_action": {
  "type": "origins:chance",
  "chance": 0.5,
  "action": {
    "type": "origins:execute_command",
    "command": "say lucky!"
  },
  "fail_action": {
    "type": "origins:execute_command",
    "command": "say unlucky..."
  }
}
```

This example has a 50% chance of printing "lucky!" and a 50% chance of printing "unlucky...".

</details>

### `origins:choice`

Selects from a weighted list.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `actions` | List of WeightedAction | **required** | Weighted action list |

For each entry in the `actions` list:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `element` | Action | **required** | Action to execute |
| `weight` | [Integer](../basic_concepts#integer) | `1` | Weight for selection |

<details>
<summary>Example1</summary>

```json
"entity_action": {
    "type": "origins:choice",
    "actions": [
        {
            "element": {
                "type": "origins:exhaust",
                "amount": 0.5
            },
            "weight": 10
        },
        {
            "element": {    
            "type": "origins:apply_effect",
                "effect": {
                    "effect": "minecraft:regeneration",
                    "amplifier": 1,
                    "duration": 100
                }
            },
            "weight": 10
        },
        {
            "element": {
                "type": "origins:set_on_fire",
                "duration": 8
            },
            "weight": 20
        }
    ]
}
```

This example has multiple entity action types with different weights: one with a 25% chance of applying exhaustion with a value of `0.5` to the player, another with a 25% chance of applying a Regeneration II status effect that would last for 5 seconds, and another one with a 50% of setting the entity on fire for 8 seconds.

</details>

<details>
<summary>Example2</summary>

```json
"entity_action": {
  "type": "origins:choice",
  "actions": [
    {
      "action": {
        "type": "origins:execute_command",
        "command": "say option A"
      },
      "weight": 3
    },
    {
      "action": {
        "type": "origins:execute_command",
        "command": "say option B"
      },
      "weight": 1
    }
  ]
}
```

This example has a 75% chance of picking option A and 25% chance for option B.

</details>

### `origins:delay`

Delays execution.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | Action | **required** | Action |
| `ticks` | [Integer](../basic_concepts#integer) | **required** | Delay in ticks |

<details>
<summary>Example1</summary>

```json
"entity_action": {
    "type": "origins:delay",
    "ticks": 20,
    "action": {
        "type": "origins:apply_effect",
        "effect": {
            "effect": "minecraft:speed",
            "amplifier": 1,
            "duration": 80
        }
    }
}
```

This example will apply a Speed II status effect after 1 second.

</details>

<details>
<summary>Example2</summary>

```json
"entity_action": {
  "type": "origins:delay",
  "ticks": 40,
  "action": {
    "type": "origins:execute_command",
    "command": "say 2 seconds have passed"
  }
}
```

This example will execute the command after a 2-second (40 tick) delay.

</details>

### `origins:empty`

Does nothing.

### `origins:if_else`

Conditional execution.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | Action | **required** | Condition |
| `if_action` | Action | optional | Action if true |
| `else_action` | Action | optional | Action if false |

<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:if_else",
    "condition": {
        "type": "origins:fall_flying"
    },
    "if_action": {
        "type": "origins:set_on_fire",
        "duration": 5
    },
    "else_action": {
        "type": "origins:heal",
        "amount": 6
    }
}
```

This example will set the entity on fire for 5 seconds if they are "fall flying". Otherwise, it will restore 3 hearts of health to the entity instead.

</details>

### `origins:if_else_list`

Condition-action pairs.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `actions` | List of IfElseEntry | **required** | Condition-action pairs |

For each entry in the `actions` list:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | Action | **required** | Condition |
| `action` | Action | **required** | Action if condition is true |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:if_else_list",
  "actions": [
    {
      "condition": {
        "type": "origins:health",
        "comparison": "<=",
        "compare_to": 6
      },
      "action": {
        "type": "origins:apply_effect",
        "effect": {
          "effect": "minecraft:speed",
          "amplifier": 2,
          "duration": 80
        }
      }
    },
    {
      "condition": {
        "type": "origins:health",
        "comparison": "<=",
        "compare_to": 12
      },
      "action": {
        "type": "origins:apply_effect",
        "effect": {
          "effect": "minecraft:speed",
          "amplifier": 1,
          "duration": 80
        }
      }
    },
    {
      "condition": {
        "type": "origins:health",
        "comparison": "<=",
        "compare_to": 18
      },
      "action": {
        "type": "origins:apply_effect",
        "effect": {
          "effect": "minecraft:speed",
          "amplifier": 0,
          "duration": 80
        }
      }
    }
  ]
}
```

This example will apply a stronger Speed status effect the lower the entity's health is, in three stages (&lt;= 3 hearts, &lt;= 6 hearts or &lt;= 9 hearts).

</details>

### `origins:side`

Specific side only.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | Action | **required** | Action |
| `side` | [String](../basic_concepts#string) | **required** | `client` or `server` |

<details>
<summary>Example1</summary>

```json
"entity_action": {
    "type": "origins:side",
    "side": "client",
    "action": {
        "type": "origins:change_resource",
        "resource": "example:resource",
        "change": 1
    }
}
```

This example will add 1 to the `example:resource` power on the client-side.

</details>

<details>
<summary>Example2</summary>

```json
"entity_action": {
  "type": "origins:side",
  "side": "server",
  "action": {
    "type": "origins:execute_command",
    "command": "say server only"
  }
}
```

This action will only execute on the server side.

</details>

## Bi-entity Specific

### `origins:invert`

Swaps actor and target.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Bi-entity Action](../action/bientity_action_types) | **required** | Action with swapped entities |

<details>
<summary>Example</summary>

```json
"bientity_action": {
    "type": "origins:invert",
    "action": {
        "type": "origins:mount"
    }
}
```

This example will mount the target entity onto the actor entity, as their roles are now swapped.

</details>

### `origins:source_action`

Executes an entity action on the actor only.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Bi-entity Action](../action/bientity_action_types) | **required** | Action on the actor |

<details>
<summary>Example</summary>

```json
"bientity_action": {
    "type": "origins:actor_action",
    "action": {
        "type": "origins:set_on_fire",
        "duration": 5
    }
}
```

This example will set the actor entity on fire for 5 seconds.

</details>

### `origins:target_action`

Executes an entity action on the target only.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Bi-entity Action](../action/bientity_action_types) | **required** | Action on the target |

<details>
<summary>Example</summary>

```json
"bientity_action": {
    "type": "origins:target_action",
    "action": {
        "type": "origins:set_on_fire",
        "duration": 5
    }
}
```

This example will set the target entity on fire for 5 seconds.

</details>

## Block Specific

### `origins:absolute_offset`

Executes an action at an absolute offset.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Block Action](../action/block_action_types) | **required** | Action |
| `x` | [Integer](../basic_concepts#integer) | `0` | X offset |
| `y` | [Integer](../basic_concepts#integer) | `0` | Y offset |
| `z` | [Integer](../basic_concepts#integer) | `0` | Z offset |

### `origins:region_apply`

Applies an action to all blocks in a cubic region.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `radius` | [Double](../basic_concepts#double) | `16.0` | Radius |
| `shape` | [Shape](../shared_data_types#shape) | `cube` | How to select blocks |
| `block_action` | [Block Action](../action/block_action_types) | **required** | Action to apply |
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition to filter blocks |

<details>
<summary>Example</summary>

```json
"block_action": {
    "type": "origins:area_of_effect",
    "radius": 16,
    "shape": "cube",
    "block_action": {
        "type": "origins:modify_block_state",
        "property": "waterlogged",
        "value": false
    }
}
```

This example will make all waterloggable blocks not waterlogged within 16 blocks radius with a shape of a cube.

</details>

### `origins:relative_offset`

Executes an action at a relative offset based on the entity's facing.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Block Action](../action/block_action_types) | **required** | Action |
| `forward` | [Integer](../basic_concepts#integer) | `0` | Forward offset |
| `right` | [Integer](../basic_concepts#integer) | `0` | Right offset |
| `up` | [Integer](../basic_concepts#integer) | `0` | Up offset |

<details>
<summary>Example</summary>

```json
"block_action": {
    "type": "origins:offset",
    "action": {
        "type": "origins:add_block",
        "block": "minecraft:gravel"
    },
    "y": 1
}
```

This example will offset the position of the [Add Block](./#originsadd_block) in the positive Y axis, raising the positional context of the block action to be 1 block above to where it initially was.

</details>

## Entity Specific

### `origins:region_apply`

Applies an action to all entities in a cubic region.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `radius` | [Double](../basic_concepts#double) | `16.0` | Radius |
| `shape` | [Shape](../shared_data_types#shape) | `cube` | How to select entities |
| `bientity_action` | [BiEntity Action](../action/bientity_action_types) | **required** | Action to apply |
| `bientity_condition` | [BiEntity Condition](../condition/bientity_condition_types) | optional | Condition to filter entities |
| `includeActor` | [Boolean](../basic_concepts#boolean) | `false` | Whether to include the actor entity in the selection |

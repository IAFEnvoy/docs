# Bi-entity Action Types

Bi-entity actions involve interactions between two entities (actor and target).

## Built-in Actions

### `origins:add_to_set`

Adds the actor to an entity set, conditioned on a bi-entity condition.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `set` | [Identifier](../basic_concepts#identifier) | **required** | Entity set ID |

<details>
<summary>Example</summary>

```json
"bientity_action": {
  "type": "origins:add_to_set",
  "set": "origins:monsters"
}
```

This example will set the actor entity on fire for 5 seconds.

</details>

### `origins:add_velocity`

Adds velocity to the target.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `x` | [Float](../basic_concepts#float) | `0.0` | X velocity |
| `y` | [Float](../basic_concepts#float) | `0.0` | Y velocity |
| `z` | [Float](../basic_concepts#float) | `0.0` | Z velocity |
| `set` | [Boolean](../basic_concepts#boolean) | `false` | If true, sets velocity instead of adding |
| `space` | [String](../basic_concepts#string) | `local` | Coordinate space: `local` or `world` |

<details>
<summary>Example</summary>

```json
"bientity_action": {
  "type": "origins:add_velocity",
  "y": 2
}
```

This example will "pull" the target entity to the actor entity.

</details>

### `origins:damage_target`

Damages the target entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `damage_type` | [Identifier](../basic_concepts#identifier) | **required** | Damage type ID |
| `amount` | [Float](../basic_concepts#float) | **required** | Damage amount |
| `modifier` | [Modifier](../shared_data_types#modifier) or List | `[]` | Modifiers applied to the damage |

<details>
<summary>Example</summary>

```json
"bientity_action": {
  "type": "origins:damage_target",
  "amount": 10,
  "damage_type": "minecraft:cramming"
}
```

This example will deal 5 hearts of `cramming` damage to the target as if the actor has hit them, and that, if killed, will display a *"`<targetName>` was squashed by `<actorName>`",* where `<targetName>` is the name of the target and `<actorName>` is the name of the actor.

</details>

### `origins:remove_from_set`

Removes the actor from an entity set.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `set` | [Identifier](../basic_concepts#identifier) | **required** | Entity set ID |

---

## Meta Actions

### `origins:and`

Executes multiple actions in sequence.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `actions` | List of [Bi-entity Action](../action/bientity_action_types) | **required** | Actions to execute |


<details>
<summary>Example</summary>

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

### `origins:chance`

Random chance execution.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Bi-entity Action](../action/bientity_action_types) | **required** | Action |
| `chance` | [Float](../basic_concepts#float) | **required** | Chance (0-1) |
| `fail_action` | [Bi-entity Action](../action/bientity_action_types) | optional | Action if chance fails |


<details>
<summary>Example</summary>

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

### `origins:choice`

Selects from a weighted list.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `actions` | List of WeightedAction | **required** | Weighted action list |


<details>
<summary>Example</summary>

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

### `origins:delay`

Delays execution.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Bi-entity Action](../action/bientity_action_types) | **required** | Action |
| `ticks` | [Integer](../basic_concepts#integer) | **required** | Delay in ticks |


<details>
<summary>Example</summary>

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

### `origins:if_else`

Conditional execution.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Bi-entity Condition](../condition/bientity_condition_types) | **required** | Condition |
| `if_action` | [Bi-entity Action](../action/bientity_action_types) | optional | Action if true |
| `else_action` | [Bi-entity Action](../action/bientity_action_types) | optional | Action if false |


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

### `origins:side`

Specific side only.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Bi-entity Action](../action/bientity_action_types) | **required** | Action |
| `side` | [String](../basic_concepts#string) | **required** | `client` or `server` |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:side",
    "action": {
        "type": "origins:change_resource",
        "resource": "example:resource",
        "change": 1
    },
    "side": "client"
}
```

This example will add 1 to the `example:resource` power on the client-side.

</details>

### `origins:source_action`

Executes an entity action on the actor only.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Entity Action](../action/entity_action_types) | **required** | Action on the actor |


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
| `action` | [Entity Action](../action/entity_action_types) | **required** | Action on the target |


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

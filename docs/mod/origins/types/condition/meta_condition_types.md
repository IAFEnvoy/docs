# Meta Condition Types

Meta condition types are conditions that execute other conditions. They can be used to create complex conditions by combining multiple conditions together.

## Universal Types

:::info
These meta condition types can be used in all types of conditions.
:::

### `origins:and`

All conditions must be true.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `conditions` | List of [Bi-entity Condition](../condition/bientity_condition_types) | **required** | Conditions |

### `origins:chance`

Random chance.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `chance` | [Float](../basic_concepts#float) | **required** | Probability (0-1) |

### `origins:constant`

Always true or false.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | [Boolean](../basic_concepts#boolean) | `true` | Constant value |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:constant",
    "value": true
}
```

This example is always true.

</details>

### `origins:not`

Inverts a condition.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Bi-entity Condition](../condition/bientity_condition_types) | **required** | Condition to invert |

<details>
<summary>Example1</summary>

```json
"condition": {
    "type": "origins:sprinting",
    "inverted": true
}
```

This example will check if the player is **not** sprinting.

</details>

<details>
<summary>Example2</summary>

```json
"condition": {
  "type": "origins:not",
  "condition": {
    "type": "origins:exposed_to_sun"
  }
}
```

This example will check if the entity is **not** exposed to the sun.

</details>

### `origins:or`

At least one condition must be true.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `conditions` | List of [Bi-entity Condition](../condition/bientity_condition_types) | **required** | Conditions |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:or",
    "conditions": [
        {
            "type": "origins:status_effect",
            "effect": "minecraft:poison"
        },
        {    
            "type": "origins:status_effect",
            "effect": "minecraft:wither"
        }
    ]
}
```

This example will check if the entity has either the Poison or Wither status effects.

</details>

## Bi-entity Specific

### `origins:actor_condition`

Evaluates an entity condition on the actor.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Entity Condition](../condition/entity_condition_types) | **required** | Condition on the actor |

<details>
<summary>Example</summary>

```json
"bientity_condition": {
    "type": "origins:actor_condition",
    "condition": {
       "type": "origins:tamed"
    }
}
```

This example will check if the actor entity is a tamable and tamed mob.

</details>

### `origins:target_condition`

Evaluates an entity condition on the target.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Entity Condition](../condition/entity_condition_types) | **required** | Condition on the target |

<details>
<summary>Example</summary>

```json
"bientity_condition": {
    "type": "origins:target_condition",
    "condition": {
       "type": "origins:tamed"
    }
}
```

This example will check if the target entity is a tamable and a tamed mob.

</details>

### `origins:both`

Evaluates an entity condition on both actor and target.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Entity Condition](../condition/entity_condition_types) | **required** | Condition for both entities |

<details>
<summary>Example</summary>

```json
"bientity_condition": {
    "type": "origins:both",
    "condition": {
        "type": "origins:entity_type",
        "entity_type": "minecraft:player"
    }
}
```

This example will check if both the actor entity and the target entity is a player.

</details>

### `origins:either`

Evaluates an entity condition on either entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Entity Condition](../condition/entity_condition_types) | **required** | Condition for either |

<details>
<summary>Example</summary>

```json
"bientity_condition": {
    "type": "origins:either",
    "condition": {
        "type": "origins:in_rain"
    }
}
```

This example will check if either the actor or target entities are in rain.

</details>

### `origins:invert`

Swaps actor and target.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Bi-entity Condition](../condition/bientity_condition_types) | **required** | Condition with swapped entities |

## Block Specific

### `origins:offset`

Evaluates a condition at an offset position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Block Condition](../condition/block_condition_types) | **required** | Condition to evaluate |
| `x` | [Integer](../basic_concepts#integer) | `0` | X offset |
| `y` | [Integer](../basic_concepts#integer) | `0` | Y offset |
| `z` | [Integer](../basic_concepts#integer) | `0` | Z offset |

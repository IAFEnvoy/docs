# Bi-entity Condition Types

Bi-entity conditions check the relationship between two entities (actor and target).

## Built-in Conditions

### `origins:attacker`

Checks if the actor entity has attacked the target entity within the last 5 seconds, and still exists.

### `origins:attack_target`

Checks if the actor entity is currently aggressive to the target entity.

### `origins:can_see`

Checks if the actor can see the target (has line of sight).

<details>
<summary>Example</summary>

```json
"bientity_condition": {
    "type": "origins:can_see"
}
```

This example will check if the straight path from the actor entity's eyes to the target entity's eyes is unobstructed. If the actor/target is behind a source/flowing fluid, is submerged in any kind of fluids, or behind a block that is not see-through (like Glass), the condition will return false.

</details>

### `origins:distance`

Checks the distance between actor and target.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Distance to compare against |

<details>
<summary>Example</summary>

```json
"bientity_condition": {
  "type": "origins:distance",
  "comparison": "<=",
  "compare_to": 30
}
```

This example will check if the actor entity is a tamable and tamed mob.

</details>

### `origins:in_set`

Checks if the actor is in a specific entity set.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `set` | [Identifier](../basic_concepts#identifier) | **required** | Entity set ID |

### `origins:owner`

Checks if the actor is the owner of the target.

### `origins:relative_rotation`

Checks the relative rotation/angle between actor and target.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `axes` | List of String | **required** | Axes to check: `x`, `y`, `z` |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Angle to compare against |


<details>
<summary>Example</summary>

```json
"bientity_condition": {
    "type": "origins:relative_rotation",
    "actor_rotation": "head",
    "target_rotation": "body",
    "comparison": ">=",
    "compare_to": -0.8
}
```

This example will check if the actor and target are essentially facing each other.

</details>

### `origins:riding`

Checks if the actor entity is currently riding the target entity.

### `origins:riding_recursive`

Checks if the actor is riding the target (recursively).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Nested condition |

### `origins:riding_root`

Checks if the actor entity is riding the target entity from the very end of the riding chain.

---

## Meta Conditions

### `origins:and`

All conditions must be true.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `conditions` | List of [Bi-entity Condition](../condition/bientity_condition_types) | **required** | Conditions |

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

### `origins:not`

Inverts a condition.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Bi-entity Condition](../condition/bientity_condition_types) | **required** | Condition to invert |


<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:sprinting",
    "inverted": true
}
```

This example will check if the player is **not** sprinting.

</details>

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

### `origins:equal`

Checks if actor and target are the same entity.

### `origins:invert`

Swaps actor and target.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Bi-entity Condition](../condition/bientity_condition_types) | **required** | Condition with swapped entities |

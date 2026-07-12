# Bi-entity Condition Types

Bi-entity conditions check the relationship between two entities (actor and target).

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

### `origins:equal`

Checks if actor and target are the same entity.

### `origins:in_set`

Checks if the actor is in a specific entity set.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `set` | [Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Entity set ID |

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

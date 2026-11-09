# Damage Condition Types

Damage conditions check properties of damage instances.

### `origins:amount`

Checks the damage amount.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Damage amount |

<details>
<summary>Example</summary>

```json
"damage_condition": {
    "type": "origins:amount",
    "comparison": "==",
    "compare_to": 4
}
```

This example will check if the damage dealt/taken is equal to 2 hearts.

</details>

### `origins:attacker`

Checks the source entity (attacker).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_condition` | [Entity Condition](../condition/entity_condition_types) | **required** | Condition on the attacker |

### `origins:id`

Checks the damage type ID.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | [Identifier](../basic_concepts#identifier) | optional | Damage type ID |

<details>
<summary>Example</summary>

```json
"damage_condition": {
    "type": "origins:id",
    "value": "minecraft:in_wall"
}
```

This example will check if the damage type is `minecraft:in_wall`, meaning that the condition will evaluate to true if the entity is suffocating in a block.

</details>

### `origins:in_tag`

Checks if the damage type is in a damage type tag.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tag` | [Identifier](../basic_concepts#identifier) | **required** | Damage type tag ID |

### `origins:magic`

:::caution Unstable
This condition is currently unstable and may not work as intended. Please report if you encounter any issues with it.
:::

Checks whether the damage is classified as magic damage, such as potion or dragon-breath damage.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| None | - | - | - |

### `origins:projectile`

Checks if the damage is from a projectile.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `projectile` | Entity Type ID | optional | Restricts the check to a specific projectile entity type |
| `projectile_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition the projectile entity must meet |

<details>
<summary>Example</summary>

```json
"damage_condition": {
    "type": "origins:projectile",
    "projectile": "minecraft:spectral_arrow"
}
```

This example will check if the damage source is a Spectral Arrow projectile entity.

</details>

### `origins:type`

Checks the damage type (similar to `id`).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `damage_type` | [Identifier](../basic_concepts#identifier) | **required** | Damage type ID |

<details>
<summary>Example</summary>

```json
"damage_condition": {
    "type": "origins:type",
    "damage_type": "minecraft:fall"
}
```

This example will check if the damage type is `minecraft:fall`.

</details>

### `origins:fire`

Checks whether the damage is fire damage.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| None | - | - | - |

<details>
<summary>Example</summary>

```json
"damage_condition": {
    "type": "origins:fire"
}
```

This example will check if the damage source is classified as fire damage.

</details>

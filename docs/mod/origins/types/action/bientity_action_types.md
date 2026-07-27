# Bi-entity Action Types

Bi-entity actions involve interactions between two entities (actor and target).

### `origins:add_to_set`

Adds the actor to an entity set, with an optional time limit. After the time limit expires, the actor will be removed from the set. A time limit of -1 means to be in the set permanently until removed by another action.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `set` | [ Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Entity set ID |
| `time_limit` | [Integer](../basic_concepts#integer) | `-1` | Time limit in ticks to be in the set, after which the actor will be removed from the set |

<details>
<summary>Example</summary>

```json
"bientity_action": {
  "type": "origins:add_to_set",
  "set": "origins:monsters"
}
```

This example will add the target entity to the `origins:monsters` set on actor entity permanently.

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

This example will "pull" the target entity to the actor entity on the Y axis.

</details>

### `origins:copy_origin`

:::caution Unstable
This action is currently unstable and may not work as intended. Please report if you encounter any issues with it.
:::

Copies the actor and/or target origin in a layer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `layer` | Layer | **required** | Layer whose origins are copied |
| `modify_actor` | Boolean | `false` | Copy the target's origin to the actor |
| `modify_target` | Boolean | `true` | Copy the actor's origin to the target |
### `origins:copy_origin`

:::caution Unstable
This action is currently unstable and may not work as intended. Please report if you encounter any issues with it.
:::

Copies the actor and/or target origin in a layer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `layer` | Layer | **required** | Layer whose origins are copied |
| `modify_actor` | Boolean | `false` | Copy the target's origin to the actor |
| `modify_target` | Boolean | `true` | Copy the actor's origin to the target |

### `origins:copy_origin`

:::caution Unstable
This action is currently unstable and may not work as intended. Please report if you encounter any issues with it.
:::

Copies each entity's origin from the other entity in a layer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `layer` | Layer | **required** | Layer whose origins are read and changed |
| `modify_actor` | [Boolean](../basic_concepts#boolean) | `false` | Replace the actor's origin with the target's origin |
| `modify_target` | [Boolean](../basic_concepts#boolean) | `true` | Replace the target's origin with the actor's origin |

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

### `origins:mount`

Mounts the target entity on the actor.

### `origins:remove_from_set`

Removes the actor from an entity set.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `set` | [Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Entity set ID |

### `origins:set_in_love`

Sets the target entity in love with the actor.

### `origins:tame`

Tames the target entity.

### `origins:teleport`

:::caution Unstable
This action is currently unstable and may not work as intended. Please report if you encounter any issues with it.
:::

Teleports the actor and/or target to the other entity's original position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `teleport_actor` | [Boolean](../basic_concepts#boolean) | `false` | Teleport the actor to the target |
| `teleport_target` | [Boolean](../basic_concepts#boolean) | `true` | Teleport the target to the actor |
| `rotate` | [Boolean](../basic_concepts#boolean) | `false` | Copy the destination entity's rotation |

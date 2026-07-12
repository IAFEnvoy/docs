# Block Action Types

Block actions perform operations on a block at a specific position.

### `origins:add_block`

Adds a block at the position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block` | [Identifier](../basic_concepts#identifier) | **required** | Block ID to add |

<details>
<summary>Example</summary>

```json
"block_action": {
    "type": "origins:add_block",
    "block": "minecraft:coal_ore"
}
```

This example will add a Coal Ore block at the position of the block action type.

</details>

### `origins:bonemeal`

Applies bonemeal effect to the block.

<details>
<summary>Example</summary>

```json
"block_action": {
    "type": "origins:bonemeal",
    "effects": false
}
```

This example will apply bonemeal to the target block of the block action without the visual effects.

</details>

### `origins:execute_command`

Executes a command at the block position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `command` | [String](../basic_concepts#string) | **required** | Command to execute |

<details>
<summary>Example</summary>

```json
"block_action": {
    "type": "origins:execute_command",
    "command": "summon minecraft:item ~ ~ ~ {Item:{id:\"minecraft:wheat\",Count:1}}"
}
```

This example will summon a Wheat item entity at the position of the block action type.

</details>

### `origins:explode`

Creates an explosion at the block position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Float](../basic_concepts#float) | **required** | Explosion power |
| `destruction_type` | [String](../basic_concepts#string) | `break` | Block destruction: `break`, `destroy`, `none` |
| `indestructible` | [Block Condition](../condition/block_condition_types) | optional | Blocks immune to the explosion |
| `create_fire` | [Boolean](../basic_concepts#boolean) | `false` | Whether to create fire |

<details>
<summary>Example</summary>

```json
"block_action": {
    "type": "origins:explode",
    "power": 5,
    "destruction_type": "none",
    "create_fire": false
}
```

This example will summon an explosion at the position of where the block action was invoked that would not destroy the terrain nor spread fire.

</details>

### `origins:modify_block_state`

Modifies the block's state properties.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `property` | [String](../basic_concepts#string) | **required** | Block state property name |
| `value` | [String](../basic_concepts#string) | optional | New property value |
| `operation` | [String](../basic_concepts#string) | optional | Operation to perform |
| `enum_values` | List of String | optional | Cycle through values |
| `cycle` | [Boolean](../basic_concepts#boolean) | `true` | Whether to cycle through enum values |

<details>
<summary>Example</summary>

```json
"block_action": {
	"type": "origins:modify_block_state",
	"property": "facing",
	"cycle": true
}
```

This example will cycle through the values of the `facing` property if available.

</details>

### `origins:set_block`

Sets the block at the position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block` | [Identifier](../basic_concepts#identifier) | **required** | Block ID |

<details>
<summary>Example</summary>

```json
"block_action": {
    "type": "origins:set_block",
    "block": "minecraft:coal_ore"
}
```

This example will set a Coal Ore block at the position of the block action type.

</details>

### `origins:spawn_entity`

Spawns an entity at the block position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_type` | [Identifier](../basic_concepts#identifier) | **required** | Entity type ID |
| `tag` | NBT | optional | Initial NBT data |
| `action` | [Entity Action](../action/entity_action_types) | optional | Action on the spawned entity |

<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:spawn_entity",
    "entity_type": "minecraft:zombie",
    "tag": "{NoAI:1b,IsBaby:1,HandItems:[{id:\"minecraft:gold_block\",Count:1},{}]}"
}
```

This example will spawn a baby Zombie holding a Gold Block that has no AI at the position of the entity.

</details>

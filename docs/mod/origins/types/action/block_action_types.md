# Block Action Types

Block actions perform operations on a block at a specific position.

## Built-in Actions

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

---

## Meta Actions

### `origins:and`

Executes multiple block actions in sequence.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `actions` | List of [Block Action](../action/block_action_types) | **required** | Actions to execute |

### `origins:chance`

Executes an action with a probability.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Block Action](../action/block_action_types) | **required** | Action to execute |
| `chance` | [Float](../basic_concepts#float) | **required** | Chance (0-1) |
| `fail_action` | [Block Action](../action/block_action_types) | optional | Action if chance fails |

### `origins:choice`

Randomly selects one action from a weighted list.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `actions` | List of WeightedAction | **required** | Weighted action list |

### `origins:delay`

Delays execution by a number of ticks.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Block Action](../action/block_action_types) | **required** | Action to execute |
| `ticks` | [Integer](../basic_concepts#integer) | **required** | Ticks to delay |

### `origins:if_else`

Conditional execution.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Block Condition](../condition/block_condition_types) | **required** | Condition |
| `if_action` | [Block Action](../action/block_action_types) | optional | Action if true |
| `else_action` | [Block Action](../action/block_action_types) | optional | Action if false |

### `origins:if_else_list`

Evaluates a list of condition-action pairs.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `actions` | List of IfElseEntry | **required** | Condition-action pairs |

### `origins:side`

Executes on a specific side only.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Block Action](../action/block_action_types) | **required** | Action |
| `side` | [String](../basic_concepts#string) | **required** | `client` or `server` |

### `origins:absolute_offset`

Executes an action at an absolute offset.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Block Action](../action/block_action_types) | **required** | Action |
| `x` | [Integer](../basic_concepts#integer) | `0` | X offset |
| `y` | [Integer](../basic_concepts#integer) | `0` | Y offset |
| `z` | [Integer](../basic_concepts#integer) | `0` | Z offset |

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

### `origins:region_apply`

Applies an action to all blocks in a cubic region.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Block Action](../action/block_action_types) | **required** | Action to apply |
| `radius_x` | [Integer](../basic_concepts#integer) | **required** | X radius |
| `radius_y` | [Integer](../basic_concepts#integer) | **required** | Y radius |
| `radius_z` | [Integer](../basic_concepts#integer) | **required** | Z radius |


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

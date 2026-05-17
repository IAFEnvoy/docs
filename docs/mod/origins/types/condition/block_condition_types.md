# Block Condition Types

Block conditions check properties of a block at a location.

## Built-in Conditions

### `origins:adjacent`

Checks if a matching block is adjacent.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `adjacent_condition` | [Block Condition](../condition/block_condition_types) | **required** | Condition for adjacent blocks |
| `comparison` | [String](../basic_concepts#string) | optional | Comparison for matching count |
| `compare_to` | [Integer](../basic_concepts#integer) | optional | Count to compare against |


<details>
<summary>Example</summary>

```json
"block_condition": {
    "type": "origins:adjacent",
    "adjacent_condition": {
        "type": "origins:block",
        "block": "minecraft:iron_ore"
    },
    "comparison": ">=",
    "compare_to": 4
}
```

This example will check if there are four or more Iron Ore blocks next to the block in question.

</details>

### `origins:attachable`

Checks whether the block is in a place where a supported block can be attached (i.e. checks whether any of the adjacent blocks' sides towards this block position are solid).

### `origins:blast_resistance`

Checks the block's blast resistance.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Value to compare against |


<details>
<summary>Example</summary>

```json
"block_condition": {
    "type": "origins:blast_resistance",
    "comparison": ">=",
    "compare_to": 1200
}
```

This example will check if the blast resistance value of the block is that of an Obsidian block or greater.

</details>

### `origins:block_entity`

Checks if the block has a block entity.

### `origins:block_id`

Checks the block's ID.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block` | [Identifier](../basic_concepts#identifier) | **required** | Block ID |

<details>
<summary>Example</summary>

```json
"block_condition": {
  "type": "origins:block_id",
  "block": "minecraft:stone"
}
```

This example will check if there are four or more Iron Ore blocks next to the block in question.

</details>

### `origins:block_state`

Checks a specific block state property.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `property` | [String](../basic_concepts#string) | **required** | Property name |
| `value` | [String](../basic_concepts#string) | **required** | Expected value |
| `comparison` | [String](../basic_concepts#string) | optional | Comparison type |


<details>
<summary>Example</summary>

```json
"block_condition": {
    "type": "origins:and",
    "conditions": [
        {
            "type": "origins:block",
            "block": "minecraft:chest"
        },
        {
            "type": "origins:block_state",
            "property": "facing",
            "enum": "north"
        }
    ]
}
```

This example will check if a Chest block is facing north.

</details>

### `origins:distance_from_coordinates`

Checks the block's distance from coordinates.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `x` | [Float](../basic_concepts#float) | `0` | Reference X |
| `y` | [Float](../basic_concepts#float) | `0` | Reference Y |
| `z` | [Float](../basic_concepts#float) | `0` | Reference Z |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Distance value |


<details>
<summary>Example</summary>

```json
"block_condition": {
    "type": "origins:distance_from_coordinates",
    "offset": {
        "x": 1024,
        "z": 512
    },
    "ignore_y": true,
    "comparison": "<",
    "compare_to": 8
}
```

This example will check if the block is within an 8 blocks radius relative to the specified coordinates (X: 1024, Z: 512).

</details>

### `origins:exposed_to_sky`

Checks if the block is exposed to the sky.

### `origins:fluid`

Checks the fluid at the block position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fluid_condition` | [Fluid Condition](../condition/fluid_condition_types) | **required** | Fluid condition to evaluate |


<details>
<summary>Example</summary>

```json
"block_condition": {
    "type": "origins:fluid",
    "fluid_condition": {
        "type": "origins:still"
    }
}
```

This example will check if the block is a source fluid.

</details>

### `origins:hardness`

Checks the block's hardness.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Value to compare against |


<details>
<summary>Example</summary>

```json
"block_condition": {
    "type": "origins:hardness",
    "comparison": "==",
    "compare_to": 1.5
}
```

This example will check if the block is as hard as Stone.

</details>

### `origins:height`

Checks the block's height (Y-level).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Y-level to compare against |

<details>
<summary>Example</summary>

```json
"block_condition": {
  "type": "origins:height",
  "comparison": "<=",
  "compare_to": 64
}
```

This example will check if the blast resistance value of the block is that of an Obsidian block or greater.

</details>

### `origins:in_tag`

Checks if the block is in a block tag.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tag` | [Identifier](../basic_concepts#identifier) | **required** | Block tag ID |

<details>
<summary>Example</summary>

```json
"block_condition": {
  "type": "origins:in_tag",
  "tag": "origins:natural_stone"
}
```

This example checks if the block is a Diamond Block.

</details>

### `origins:light_blocking`

Checks whether the block is marked in code as blocking light. Glass for example would not fulfill this condition.

### `origins:light_level`

Checks the light level at the block.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Light level to compare against |
| `light_type` | [String](../basic_concepts#string) | `block` | `block` or `sky` |

<details>
<summary>Example</summary>

```json
"block_condition": {
  "type": "origins:light_level",
  "comparison": ">",
  "compare_to": 7
}
```

This example will check if a Chest block is facing north.

</details>

### `origins:movement_blocking`

Checks if the block blocks movement (solid).

### `origins:nbt`

Checks the block entity's NBT data.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `nbt` | [String](../basic_concepts#string) | **required** | NBT query string |


<details>
<summary>Example</summary>

```json
"block_condition": {
    "type": "origins:and",
    "conditions": [
        {
            "type": "origins:block",
            "block": "minecraft:beacon"
        },
        {
            "type": "origins:nbt",
            "nbt": "{Levels: 1}"
        }
    ]
}
```

This example will check if Beacon block has a `Level` value of 1.

</details>

### `origins:replaceable`

Checks if the block can be replaced by another block (i.e. if it's a non-solid block like tall grass or air).

### `origins:slipperiness`

Checks the block's slipperiness.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Value to compare against |


<details>
<summary>Example</summary>

```json
"block_condition": {
    "type": "origins:slipperiness",
    "comparison": "==",
    "compare_to": 0.98
}
```

This example will check if the block has the same slipperiness of an Ice (or Packed Ice) block.

</details>

### `origins:water_loggable`

Checks if the block can be waterlogged.

---

## Meta Conditions

### `origins:and`

All conditions must be true.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `conditions` | List of [Block Condition](../condition/block_condition_types) | **required** | Conditions to evaluate |

### `origins:or`

At least one condition must be true.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `conditions` | List of [Block Condition](../condition/block_condition_types) | **required** | Conditions to evaluate |

### `origins:not`

Inverts a condition.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Block Condition](../condition/block_condition_types) | **required** | Condition to invert |

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

### `origins:offset`

Evaluates a condition at an offset position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Block Condition](../condition/block_condition_types) | **required** | Condition to evaluate |
| `x` | [Integer](../basic_concepts#integer) | `0` | X offset |
| `y` | [Integer](../basic_concepts#integer) | `0` | Y offset |
| `z` | [Integer](../basic_concepts#integer) | `0` | Z offset |

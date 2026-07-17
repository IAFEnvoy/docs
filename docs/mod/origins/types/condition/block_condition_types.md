# Block Condition Types

Block conditions check properties of a block at a location.

### `origins:air`

:::caution Unstable
This condition is currently unstable and may not work as intended. Please report if you encounter any issues with it.
:::

Checks whether the target block is air.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| None | - | - | - |

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

### `origins:in_rain`

:::caution Unstable
This condition is currently unstable and may not work as intended. Please report if you encounter any issues with it.
:::

Checks whether rain reaches the target block.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| None | - | - | - |

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

### `origins:raining`

:::caution Unstable
This condition is currently unstable and may not work as intended. Please report if you encounter any issues with it.
:::

Checks whether it is currently raining in the level.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| None | - | - | - |

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

### `origins:thundering`

:::caution Unstable
This condition is currently unstable and may not work as intended. Please report if you encounter any issues with it.
:::

Checks whether it is currently thundering in the level.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| None | - | - | - |

### `origins:water_loggable`

Checks if the block can be waterlogged.

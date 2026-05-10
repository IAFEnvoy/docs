# Biome Condition Types

Biome conditions check properties of a biome.

## Built-in Conditions

### `origins:in_tag`

Checks if the biome is in a biome tag.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tag` | [Identifier](../basic_concepts#identifier) | **required** | Biome tag ID |


<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:in_tag",
    "tag": "minecraft:allows_surface_slime_spawn"
}
```

This example will check if the biome is included in the `#minecraft:allows_surface_slime_spawn` (`data/minecraft/tags/worldgen/biome/allows_surface_slime_spawn.json`) biome tag.

</details>

### `origins:precipitation`

Checks the biome's precipitation type.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `precipitation` | [String](../basic_concepts#string) | **required** | `none`, `rain`, or `snow` |


<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:biome",
    "condition": {
        "type": "origins:precipitation",
        "precipitation": "snow"
    }
}
```

This example will check if the biome the entity is currently in has a snowy precipitation. (e.g: `minecraft:snowy_taiga`, `minecraft:ice_spikes`, etc.)

</details>

### `origins:temperature`

Checks the biome's temperature.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Temperature value |


<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:biome",
    "condition": {
        "type": "origins:temperature",
        "comparison": ">=",
        "compare_to": 2
    }
}
```

This example will check if the biome the entity is currently in has a temperature of 2 or more. (e.g: `minecraft:badlands`, `minecraft:desert`, etc.)

</details>

---

## Meta Conditions

### `origins:and`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `conditions` | List of [Biome Condition](../condition/biome_condition_types) | **required** | Conditions |

### `origins:or`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `conditions` | List of [Biome Condition](../condition/biome_condition_types) | **required** | Conditions |

### `origins:not`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Biome Condition](../condition/biome_condition_types) | **required** | Condition to invert |

### `origins:chance`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `chance` | [Float](../basic_concepts#float) | **required** | Probability (0-1) |

### `origins:constant`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | [Boolean](../basic_concepts#boolean) | `true` | Constant value |

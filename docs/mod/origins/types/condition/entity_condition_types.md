# Entity Condition Types

Entity conditions check the state of an entity.

### `origins:ability`

Checks if the player has a specific ability (e.g. `invulnerable`, `mayfly`).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `ability` | [String](../basic_concepts#string) | **required** | Ability: `flying`, `instabuild`, `invulnerable`, `may_build`, `mayfly` |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:ability",
  "ability": "minecraft:mayfly"
}
```

This example will check if the player can fly in a Creative Mode-like fashion.

</details>

### `origins:advancement`

Checks if an advancement has been granted.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `advancement` | [Identifier](../basic_concepts#identifier) | **required** | Advancement ID |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:advancement",
  "advancement": "minecraft:story/smelt_iron"
}
```

This example will check if the player has the `minecraft:story/smelt_iron` advancement, obtained by smelting their first Iron Ingot.

</details>

### `origins:air`

Checks the entity's remaining air.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | `==`, `!=`, `<`, `<=`, `>`, `>=` |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:air",
  "comparison": "==",
  "compare_to": 0
}
```

This example will check if the player has no breath / air / bubbles left.

</details>

### `origins:attribute`

Checks an entity's attribute value.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `attribute` | [Identifier](../basic_concepts#identifier) | **required** | Attribute ID |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:attribute",
  "attribute": "minecraft:generic.armor",
  "comparison": ">=",
  "compare_to": 10.0
}
```

This example will check if the entity's armor attribute is 10 or more.

</details>

### `origins:biome_in`

Checks if the entity is in one of the specified biomes.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `biome` | Identifier or List | optional | Biome ID(s) |
| `biomes` | List of Identifier | optional | Alternative biome list |
| `condition` | [Biome Condition](../condition/biome_condition_types) | optional | Biome condition to evaluate |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:biome_in",
  "biome": "minecraft:plains"
}
```

This example will check if the entity is currently in a Plains biome.

</details>

### `origins:block_collision`

Checks for block collision at an offset from the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `offset_x` | [Float](../basic_concepts#float) | `0.0` | X offset |
| `offset_y` | [Float](../basic_concepts#float) | `0.0` | Y offset |
| `offset_z` | [Float](../basic_concepts#float) | `0.0` | Z offset |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:block_collision",
  "offset_x": 0.1,
  "offset_z": 0.1
}
```

This example will check if the entity is colliding with the positive X or Z faces of a block.

</details>

### `origins:block_in_radius`

Checks for blocks matching a condition within a radius of the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition for matching blocks |
| `radius` | [Integer](../basic_concepts#integer) | **required** | Search radius |
| `shape` | [String](../basic_concepts#string) | `cube` | `cube` or `sphere` |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:block_in_radius",
    "block_condition": {
        "type": "origins:in_tag",
        "tag": "origins:natural_stone"
    },
    "radius": 1,
    "shape": "cube",
    "comparison": ">=",
    "compare_to": 4
}
```

This example will check if 4 or more blocks that is included in the `#origins:natural_stone` block tag is within a 1 block radius relative from the entity.

</details>

### `origins:brightness`

Checks the light level at the entity's eyes.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:brightness",
  "comparison": "<=",
  "compare_to": 0.5
}
```

This example will check if brightness is 0.5 or lower (light level of 11 or below).

</details>

### `origins:climbing`

Checks whether the entity is currently climbing.

### `origins:collided_horizontally`

Checks if the entity is colliding horizontally with a wall.

### `origins:command`

Checks if a command returns a specific result.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `command` | [String](../basic_concepts#string) | **required** | Command to execute |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Value to compare against |

### `origins:creative_flying`

Checks if the player is Creative Mode flying.

### `origins:daytime`

Checks whether it's currently daytime.

### `origins:dimension`

Checks the entity's current dimension.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `dimension` | [Identifier](../basic_concepts#identifier) | **required** | Dimension ID |
| `inverted` | [Boolean](../basic_concepts#boolean) | `false` | If `true`, inverts the result |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:dimension",
  "dimension": "minecraft:the_nether"
}
```

This example will check if the entity is in the Nether dimension.

</details>

### `origins:distance_from_coordinates`

Checks the entity's distance from a set of coordinates.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `x` | [Float](../basic_concepts#float) | `0` | Reference X |
| `y` | [Float](../basic_concepts#float) | `0` | Reference Y |
| `z` | [Float](../basic_concepts#float) | `0` | Reference Z |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Distance to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:distance_from_coordinates",
  "x": 256,
  "y": 64,
  "z": 32,
  "comparison": "<",
  "compare_to": 8
}
```

This example will check if the entity is within 8 blocks of (256, 64, 32).

</details>

### `origins:elytra_flight_possible`

Checks if elytra flight is currently possible for the entity.

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:elytra_flight_possible",
    "check_state": true,
    "check_abilities": true
}
```

This example will check if the player can activate elytra flight.

</details>

### `origins:enchantment`

Checks if an equipped item has a specific enchantment.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enchantment` | [Identifier](../basic_concepts#identifier) | **required** | Enchantment ID |
| `calculation` | [String](../basic_concepts#string) | `sum` | `sum` or `max`: how to combine enchantment levels across items |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison for level |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Level to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:enchantment",
    "enchantment": "minecraft:protection",
    "calculation": "sum",
    "comparison": ">=",
    "compare_to": 16
}
```

This condition will check whether the entity is wearing a full set of Protection IV armor (or better, which might be possible with mods).

</details>

### `origins:entity_in_radius`

Checks for entities matching a condition within a radius of the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition for matching entities |
| `radius` | [Integer](../basic_concepts#integer) | **required** | Search radius |
| `shape` | [String](../basic_concepts#string) | `cube` | `cube` or `sphere` |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Value to compare against |

### `origins:entity_type`

Checks the entity's type.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_type` | [Identifier](../basic_concepts#identifier) | **required** | Entity type ID |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:entity_type",
  "entity_type": "minecraft:creeper"
}
```

This example will check if the entity is a Creeper.

</details>

### `origins:equipped_item`

Checks an item equipped in a specific slot.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `equipment_slot` | [Equipment Slot](../minecraft_data_types#equipment-slot-group) | **required** | Slot to check |
| `item_condition` | [Item Condition](../condition/item_condition_types) | **required** | Item condition |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:equipped_item",
    "equipment_slot": "mainhand",
    "item_condition": {
        "type": "origins:harvest_level",
        "comparison": ">=",
        "compare_to": 2
    }
}
```

This example will check if the item in the entity's mainhand has a harvest level of 2 or more.

</details>

### `origins:exists`

Checks if the entity exists.

### `origins:exposed_to_sky`

Checks if the entity is exposed to the sky.

### `origins:exposed_to_sun`

Checks if the entity is exposed to sunlight.

### `origins:fall_distance`

Checks the entity's fall distance.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:fall_distance",
  "comparison": ">=",
  "compare_to": 4
}
```

This example will check if the entity has been falling for 4 or more blocks.

</details>

### `origins:fall_flying`

Checks whether the entity is currently fall flying (with an Elytra, an Elytra power, or similar).

### `origins:fluid_height`

Checks the height of fluid the entity is submerged in.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fluid` | [Identifier](../basic_concepts#identifier) | **required** | Fluid ID filter |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:fluid_height",
    "fluid": "minecraft:lava",
    "comparison": "==",
    "compare_to": 0
}
```

This example will check if the entity is not touching a lava fluid.

</details>

### `origins:food_level`

Checks the entity's food level.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:food_level",
    "comparison": "==",
    "compare_to": 0
}
```

This example will check if the player have 0 hunger shanks (or 0 food points).

</details>

### `origins:gamemode`

Checks the player's game mode.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `gamemode` | [String](../basic_concepts#string) | **required** | Game mode: `survival`, `creative`, `adventure`, `spectator` |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:gamemode",
  "gamemode": "creative"
}
```

This example will check if the player is in Creative Mode.

</details>

### `origins:glowing`

Checks if the entity is glowing.

### `origins:health`

Checks the entity's current health.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:health",
    "comparison": "<",
    "compare_to": 20
}
```

This example will check if the entity's health is less than 10 hearts (or 20 health points).

</details>

### `origins:in_block`

Checks if the entity's hitbox intersects a specific block.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition](../condition/block_condition_types) | **required** | Block condition |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:in_block",
    "block_condition": {
        "type": "origins:block",
        "block": "minecraft:grass"
    }
}
```

This example will check if Grass (foliage) is currently overlapping the entity's feet.

</details>

### `origins:in_block_anywhere`

Checks if any block matching a condition exists within the entity's bounding box.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition](../condition/block_condition_types) | **required** | Block condition |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Minimum number of matching blocks |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:in_block_anywhere",
    "block_condition": {
        "type": "origins:in_tag",
        "tag": "minecraft:flowers"
    },
    "comparison": ">",
    "compare_to": 1
}
```

This example will check if the entity is currently inside a two-block tall foliage block that belongs in the `#minecraft:flowers` (`data\minecraft\tags\blocks\flowers.json`) block tag. An example is the rose bush block.

</details>

### `origins:in_rain`

Check if it's raining at the entity's position.

### `origins:in_snow`

Checks if it's snowing at the entity's position.

### `origins:in_tag`

Checks if the entity is in an entity type tag.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tag` | [Identifier](../basic_concepts#identifier) | **required** | Entity type tag ID |

### `origins:in_thunderstorm`

Checks if there's a thunderstorm at the entity's position.

### `origins:inventory`

Checks the entity's inventory contents.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Item condition |
| `slot` | List of Integer | optional | Slots to check |
| `process_mode` | [String](../basic_concepts#string) | `stacks` | `stacks` or `items` |
| `power` | [Identifier](../basic_concepts#identifier) | optional | Power whose inventory to check |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison for matching count |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Count to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:inventory",
    "process_mode": "stacks",
    "comparison": ">=",
    "compare_to": 10
}
```

This example will check if 10 or more slots are occupied by any items in the entity's inventory.

</details>

### `origins:invisible`

Checks whether the entity is currently invisible.

### `origins:living`

Checks if the entity is an instance of `LivingEntity`, or in simple terms, a mob or a player.

### `origins:mob_effect`

Checks if a specific status effect is active.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | [Identifier](../basic_concepts#identifier) | **required** | Effect ID |
| `min_amplifier` | [Integer](../basic_concepts#integer) | `0` | Minimum amplifier |
| `max_amplifier` | [Integer](../basic_concepts#integer) | `2147483647` | Maximum amplifier |
| `min_duration` | [Integer](../basic_concepts#integer) | `-1` | Minimum remaining duration ticks |
| `max_duration` | [Integer](../basic_concepts#integer) | `2147483647` | Maximum remaining duration ticks |
| `inverted` | [Boolean](../basic_concepts#boolean) | `false` | If `true`, checks the effect is NOT active |

### `origins:moving`

Checks whether the entity is currently moving.

### `origins:nbt`

Checks the entity's NBT data.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `nbt` | NBT Object | **required** | NBT data to match against the entity |

### `origins:on_block`

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:on_block"
}
```

This example will check if the entity is currently on the ground.

</details>

Checks if the entity is standing on a block (not in the air).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition on the block being stood on |

### `origins:on_fire`

Checks if the entity is on fire.

### `origins:origin`

Checks the entity's origin.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `origin` | [Identifier](../basic_concepts#identifier) | **required** | Origin ID |
| `layer` | [Identifier](../basic_concepts#identifier) | optional | Layer ID |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:origin",
  "origin": "origins:phantom",
  "layer": "origins:origin"
}
```

This example will check if the entity has the `origins:phantom` origin on the default layer.

</details>

### `origins:passenger`

Checks if the entity has a matching passenger.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Bi-entity condition for the passenger |
| `comparison` | Comparison | **required** | Comparison with count of matching passengers |
| `recursive` | [Boolean](../basic_concepts#boolean) | optional | Whether to check recursively |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:passenger",
    "bientity_condition": {
        "type": "origins:actor_condition",
        "condition": {
            "type": "origins:entity_type",
            "entity_type": "minecraft:player"
        }
    }
}
```

This example will check if the target entity is being ridden by a player (actor entity).

</details>

### `origins:passenger_recursive`

Recursively checks passengers.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition at each level |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:passenger_recursive",
    "bientity_condition": {
        "type": "origins:actor_condition",
        "condition": {
            "type": "origins:entity_type",
            "entity_type": "minecraft:armor_stand"
        }
    },
    "comparison": ">=",
    "compare_to": 2
}
```

This example will check if the target entity is being ridden by an armor stand that is also being ridden by an armor stand (and so on).

</details>

### `origins:power_active`

Checks if a specific power is active.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](../basic_concepts#identifier) | **required** | Power ID |

<details>
<summary>Example</summary>

```json
"condition": {
  "type": "origins:power_active",
  "power": "origins:primary_key"
}
```

This example will check if the `origins:primary_key` power is currently active.

</details>

### `origins:power_type`

Checks if the entity has a power of a specific type active.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power_type` | [Identifier](../basic_concepts#identifier) | **required** | Power type ID |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:power_type",
    "power_type": "origins:active_self"
}
```

This example will check if the entity has a power that uses the [Active Self (Power Type)](../power/action).

</details>

### `origins:predicate`

Checks against a predicate defined in the data pack.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `predicate` | [Identifier](../basic_concepts#identifier) | **required** | Predicate resource location |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:predicate",
    "predicate": "example:weather/is_thunderstorm"
}
```

This example will check if the `example:check_if_thunderstorm` predicate (`data\example\predicates\weather\is_thunderstorm.json`) is true.

</details>

### `origins:raycast`

Performs a raycast and checks for matching entities/blocks.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `distance` | [Float](../basic_concepts#float) | **required** | Raycast distance |
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Block to match |
| `entity_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Entity to match |

### `origins:relative_health`

Checks the entity's health as a percentage of max.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Percentage value (0-1) |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:relative_health",
    "comparison": "<=",
    "compare_to": 0.5
}
```

This example will check if the player has half or less of their max health.

</details>

### `origins:resource`

Checks the value of a resource.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `resource` | [Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Resource power ID |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:resource",
    "resource": "example:a_simple_resource",
    "comparison": "==",
    "compare_to": 1
}
```

This example will check if the player has a value of 1 in the `example:a_simple_resource` resource power. (`data\example\powers\a_simple_resource.json`)

</details>

### `origins:riding`

Checks if the entity is riding another entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Bi-entity condition between rider and vehicle |
| `recursive` | [Boolean](../basic_concepts#boolean) | optional | Whether to check recursively |

### `origins:riding_recursive`

Recursively checks ridden entities.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition at each level |

### `origins:riding_root`

Checks the root ridden entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Condition for the root vehicle |

### `origins:saturation_level`

Checks the player's saturation level.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:saturation_level",
    "comparison": "==",
    "compare_to": 0
}
```

This example will check if the player's saturation level reaches 0.

</details>

### `origins:scoreboard`

Checks a scoreboard score.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | [String](../basic_concepts#string) | optional | Score holder name (defaults to entity name) |
| `objective` | [String](../basic_concepts#string) | **required** | Scoreboard objective name |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:scoreboard",
    "objective": "obj",
    "comparison": ">",
    "compare_to": 3
}
```

This example will check if the score of the player in the `obj` scoreboard objective is greater than 3.

</details>

### `origins:set_size`

Checks the entity's current set membership.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `set` | [Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Entity set ID |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Value to compare against |

### `origins:sneaking`

Checks if the entity is sneaking.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `inverted` | [Boolean](../basic_concepts#boolean) | `false` | If `true`, checks that the entity is NOT sneaking |

### `origins:sprinting`

Checks if the entity is sprinting.

### `origins:stat`

Checks the value of a Minecraft statistic for the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `stat` | [Stat Reference](../shared_data_types#stat-reference) | **required** | The stat to check. |
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Value to compare against |

<details>
<summary>Example 1</summary>

```json
{
  "type": "origins:stat",
  "stat": "minecraft:deaths",
  "comparison": ">=",
  "compare_to": 10
}
```

This example will check if the player has died 10 or more times.

</details>

<details>
<summary>Example 2</summary>

```json
{
  "type": "origins:stat",
  "stat": {
    "stat_type": "minecraft:mined",
    "id": "minecraft:diamond_ore"
  },
  "comparison": ">=",
  "compare_to": 100
}
```

This example will check if the player has mined 100 or more diamond ores.

</details>

### `origins:submerged_in`

Checks if the entity is submerged in a specific fluid.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fluid` | [Identifier](../basic_concepts#identifier) | **required** | Fluid ID |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:submerged_in",
    "fluid": "minecraft:water"
}
```

This example will check if the player is submerged in water.

</details>

### `origins:swimming`

Checks if the entity is swimming.

### `origins:tamed`

Checks if the entity is tamed.

### `origins:time_of_day`

Checks the time of day.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Ticks to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:and",
    "conditions": [
        {
            "type": "origins:time_of_day",
            "comparison": ">=",
            "compare_to": 12000
        },
        {
            "type": "origins:time_of_day",
            "comparison": "<=",
            "compare_to": 13000
        }
    ]
}
```

This example will check if it's the sun is currently setting.

</details>

### `origins:using_effective_tool`

Checks if the entity is holding an effective tool for the block they're looking at.

### `origins:using_item`

Checks if the entity is currently using an item.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Condition for the item being used |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:using_item",
    "item_condition": {
        "type": "origins:food"
    }
}
```

This example will check if the entity is currently eating a food item.

</details>

### `origins:xp_levels`

Checks the player's XP levels.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:xp_levels",
    "comparison": "<=",
    "compare_to": 5
}
```

This example will check if the player has 5 levels or less.

</details>

### `origins:xp_points`

Checks the player's XP points (progress toward next level).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Value to compare against |

<details>
<summary>Example</summary>

```json
"condition": {
    "type": "origins:xp_points",
    "comparison": ">=",
    "compare_to": 90
}
```

This example will check if the player has 90 or more experience points, which is only achieveable if the player have at least 7 levels.

</details>

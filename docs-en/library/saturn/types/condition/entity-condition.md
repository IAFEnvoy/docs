---
title: "Entity condition"
sidebar_position: 1
---

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## Types

### `saturn:ability_storage_charges` {#saturnability_storage_charges}

Checks the remaining charge count of an ability.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ability_storage_charges` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `remaining` | Number or range object | no | omitted | Range of the remaining amount, or a runtime remaining value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:ability_storage_charges",
  "ability": "example:heal"
}
```

</details>

### `saturn:ability_storage_cooldown` {#saturnability_storage_cooldown}

Checks the current remaining cooldown duration of an ability.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ability_storage_cooldown` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `remaining` | Number or range object | no | omitted | Range of the remaining amount, or a runtime remaining value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:ability_storage_cooldown",
  "ability": "example:heal"
}
```

</details>

### `saturn:ability_storage_resource` {#saturnability_storage_resource}

Checks the resource value in the storage of an ability.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ability_storage_resource` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `amount` | Number or range object | no | omitted | Amount or value; a number provider accepts a number, a formula string, or an object with a type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:ability_storage_resource",
  "ability": "example:heal"
}
```

</details>

### `saturn:ability_storage_target` {#saturnability_storage_target}

Checks whether an ability has a locked target that matches the distance condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ability_storage_target` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `locked` | Boolean | no | `true` | Whether a locked target must exist. |
| `max_distance` | [Number provider](../number.md) | no | omitted | Maximum allowed target distance. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:ability_storage_target",
  "ability": "example:heal"
}
```

</details>

### `saturn:ability_storage_timer` {#saturnability_storage_timer}

Checks the remaining duration of an ability timer.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ability_storage_timer` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `remaining` | Number or range object | no | omitted | Range of the remaining amount, or a runtime remaining value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:ability_storage_timer",
  "ability": "example:heal"
}
```

</details>

### `saturn:ability_storage_toggle` {#saturnability_storage_toggle}

Checks the toggle value of the given ability storage.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ability_storage_toggle` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `expected` | Boolean | no | `true` | The expected toggle value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:ability_storage_toggle",
  "ability": "example:heal"
}
```

</details>

### `saturn:advancement` {#saturnadvancement}

Checks whether a server player has completed the specified advancement.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:advancement` |
| `advancement` | Resource ID | yes | — | Advancement ID; ignored when selection is everything. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:advancement",
  "advancement": "minecraft:story/root"
}
```

</details>

### `saturn:air` {#saturnair}

Reads or compares the remaining air of an entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:air` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:air",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:attack_cooldown` {#saturnattack_cooldown}

Compares the attack charge progress of a player.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:attack_cooldown` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:attack_cooldown",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:attack_target_condition` {#saturnattack_target_condition}

Checks whether a mob currently has an attack target.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:attack_target_condition` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:attack_target_condition"
}
```

</details>

### `saturn:attacker_condition` {#saturnattacker_condition}

Checks whether a living entity has a last attacker.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:attacker_condition` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:attacker_condition"
}
```

</details>

### `saturn:attribute` {#saturnattribute}

Reads or compares the value of a specified attribute of an entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:attribute` |
| `attribute` | Resource ID | yes | — | Attribute ID. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:attribute",
  "attribute": "minecraft:max_health",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:block_collision` {#saturnblock_collision}

Checks whether the offset entity bounding box collides with blocks.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_collision` |
| `offset_x` | Number | no | `0.0` | Offset on the X axis. |
| `offset_y` | Number | no | `0.0` | Offset on the Y axis. |
| `offset_z` | Number | no | `0.0` | Offset on the Z axis. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:block_collision"
}
```

</details>

### `saturn:block_in_radius` {#saturnblock_in_radius}

Counts matching blocks around the entity, enumerating positions lazily.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_in_radius` |
| `block_condition` | [Block conditions](./block-condition.md) | no | `saturn:always` | Filter condition of the declared context type. |
| `radius` | [Number provider](../number.md) | yes | — | Radius in blocks. |
| `shape` | Enum string | no | `"cube"` | cube uses maximum axis distance; star uses Manhattan distance; sphere uses Euclidean distance. |
| `comparison` | Enum string | yes | — | Comparison operator: `==`, `!=`, `<`, `<=`, `>` or `>=`. |
| `compare_to` | Number | yes | — | Numeric comparison target, used with comparison. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:block_in_radius",
  "radius": 3,
  "block_condition": {
    "type": "saturn:block_id",
    "block": "minecraft:diamond_ore"
  },
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

Distances are relative to the query centre. Entity queries use entity positions and exclude spectators. Block radii are floored to a non-negative integer and positions are enumerated lazily. Negative or non-finite radii yield an empty region.

### `saturn:brightness` {#saturnbrightness}

Compares the brightness at the position of an entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:brightness` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:brightness",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:can_have_effect` {#saturncan_have_effect}

Checks whether an entity can receive the given status effect.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:can_have_effect` |
| `effect` | Resource ID | yes | — | Status effect ID. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:can_have_effect",
  "effect": "minecraft:speed"
}
```

</details>

### `saturn:climbing` {#saturnclimbing}

Checks whether a living entity is on a climbable block.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:climbing` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:climbing"
}
```

</details>

### `saturn:collided_horizontally` {#saturncollided_horizontally}

Checks the entity’s horizontal collision flag.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:collided_horizontally` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:collided_horizontally"
}
```

</details>

### `saturn:command` {#saturncommand}

Executes a command and compares its result. The command may have side effects; this condition is server-only.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:command` |
| `command` | String | yes | — | Vanilla command; a leading / is optional. |
| `comparison` | Enum string | yes | — | Comparison operator: `==`, `!=`, `<`, `<=`, `>` or `>=`. |
| `compare_to` | Number | yes | — | Numeric comparison target, used with comparison. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:command",
  "command": "data get entity @s Health",
  "comparison": ">",
  "compare_to": 10
}
```

</details>

Runs as the entity at its own position, with permission level 2; do not use in a condition that must remain read-only.

### `saturn:creative_flying` {#saturncreative_flying}

Checks whether the player is currently using ability-based flight.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:creative_flying` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:creative_flying"
}
```

</details>

### `saturn:daytime` {#saturndaytime}

Checks whether the overworld clock is within the first 13,000 ticks of the day.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:daytime` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:daytime"
}
```

</details>

### `saturn:dimension` {#saturndimension}

Checks the dimension an entity is in.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:dimension` |
| `dimension` | Resource ID | yes | — | Dimension ID. |
| `inverted` | Boolean | no | `false` | Whether to invert the check or the display direction. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:dimension",
  "dimension": "minecraft:overworld"
}
```

</details>

### `saturn:enchantment` {#saturnenchantment}

Sums or takes the highest level of an enchantment across all equipment slots, then compares the result.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:enchantment` |
| `enchantment` | Resource ID | yes | — | Registry reference to the enchantment. |
| `calculation` | Enum string | no | `"sum"` | sum adds levels; max takes the highest level across equipment slots. |
| `comparison` | Enum string | yes | — | Comparison operator: `==`, `!=`, `<`, `<=`, `>` or `>=`. |
| `compare_to` | Number | yes | — | Numeric comparison target, used with comparison. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:enchantment",
  "enchantment": "minecraft:protection",
  "calculation": "sum",
  "comparison": ">=",
  "compare_to": 4
}
```

</details>

Non-living entities return false. All EquipmentSlot values are checked, including non-armour slots.

### `saturn:entity_in_radius` {#saturnentity_in_radius}

Counts matching non-spectator entities in a radius, including the entity itself when it matches.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:entity_in_radius` |
| `entity_condition` | [Entity conditions](./entity-condition.md) | no | `saturn:always` | Filter condition of the declared context type. |
| `radius` | [Number provider](../number.md) | yes | — | Radius in blocks. |
| `shape` | Enum string | no | `"cube"` | cube uses maximum axis distance; star uses Manhattan distance; sphere uses Euclidean distance. |
| `comparison` | Enum string | yes | — | Comparison operator: `==`, `!=`, `<`, `<=`, `>` or `>=`. |
| `compare_to` | Number | yes | — | Numeric comparison target, used with comparison. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:entity_in_radius",
  "radius": 8,
  "shape": "sphere",
  "entity_condition": {
    "type": "saturn:hostile"
  },
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

Distances are relative to the query centre. Entity queries use entity positions and exclude spectators. Block radii are floored to a non-negative integer and positions are enumerated lazily. Negative or non-finite radii yield an empty region.

### `saturn:entity_tag` {#saturnentity_tag}

Checks whether the entity type belongs to the given tag.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:entity_tag` |
| `tag` | Tag ID (with #) | yes | — | Registry tag, or the NBT data declared on this page. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:entity_tag",
  "tag": "#example:tag"
}
```

</details>

### `saturn:entity_type` {#saturnentity_type}

Checks whether the entity is of the given type.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:entity_type` |
| `entity_type` | Resource ID | yes | — | Entity type ID. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:entity_type",
  "entity_type": "minecraft:arrow"
}
```

</details>

### `saturn:equipped_item` {#saturnequipped_item}

Checks whether the item in the given equipment slot satisfies an item condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:equipped_item` |
| `equipment_slot` | Enum string | yes | — | Equipment slot. Available values: `mainhand`, `offhand`, `feet`, `legs`, `chest`, `head`, `body`, `saddle`. |
| `item_condition` | [Item condition](./item-condition.md) | no | `{"type":"saturn:always"}` | Condition checked against the item stack. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:equipped_item",
  "equipment_slot": "mainhand"
}
```

</details>

### `saturn:exists` {#saturnexists}

Checks whether the entity has not been removed; this is separate from being alive.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:exists` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:exists"
}
```

</details>

### `saturn:experience_level` {#saturnexperience_level}

Compares the experience level of a player.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:experience_level` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:experience_level",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:experience_points` {#saturnexperience_points}

Compares the total experience points of a player.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:experience_points` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:experience_points",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:exposed_to_sky` {#saturnexposed_to_sky}

Checks whether the position of an entity can see the sky.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:exposed_to_sky` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:exposed_to_sky"
}
```

</details>

### `saturn:exposed_to_sun` {#saturnexposed_to_sun}

Checks whether an entity is exposed to sunlight.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:exposed_to_sun` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:exposed_to_sun"
}
```

</details>

### `saturn:fall_distance` {#saturnfall_distance}

Compares the accumulated fall distance of an entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:fall_distance` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:fall_distance",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:fall_flying` {#saturnfall_flying}

Checks whether a living entity is fall-flying.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:fall_flying` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:fall_flying"
}
```

</details>

### `saturn:fluid_height` {#saturnfluid_height}

Compares the height of the specified NeoForge fluid type intersecting the entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:fluid_height` |
| `fluid` | Resource ID | yes | — | ID in NeoForge’s fluid_type registry, e.g. minecraft:water; this is separate from the block fluid registry. |
| `comparison` | Enum string | yes | — | Comparison operator: `==`, `!=`, `<`, `<=`, `>` or `>=`. |
| `compare_to` | Number | yes | — | Numeric comparison target, used with comparison. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:fluid_height",
  "fluid": "minecraft:water",
  "comparison": ">",
  "compare_to": 0
}
```

</details>

### `saturn:food_level` {#saturnfood_level}

Compares the food level of a player.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:food_level` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:food_level",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:gamemode` {#saturngamemode}

Checks the game mode of a player.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:gamemode` |
| `gamemode` | Enum string | yes | — | Player game mode. Available values: `survival`, `creative`, `adventure`, `spectator`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:gamemode",
  "gamemode": "survival"
}
```

</details>

### `saturn:glowing` {#saturnglowing}

Checks whether an entity is glowing.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:glowing` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:glowing"
}
```

</details>

### `saturn:grounded` {#saturngrounded}

Checks whether the entity is on the ground.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:grounded` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:grounded"
}
```

</details>

### `saturn:has_ability` {#saturnhas_ability}

Checks whether an entity has the given ability.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:has_ability` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:has_ability",
  "ability": "example:heal"
}
```

</details>

### `saturn:health` {#saturnhealth}

Reads or compares the current health of an entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:health` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:health",
  "comparison": "<",
  "compare_to": 10
}
```

</details>

### `saturn:hostile` {#saturnhostile}

Checks whether the entity implements vanilla’s Enemy interface.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:hostile` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:hostile"
}
```

</details>

### `saturn:in_block` {#saturnin_block}

Checks whether the block an entity is inside satisfies a condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:in_block` |
| `block_condition` | [Block condition](./block-condition.md) | yes | — | The condition to check for the target block. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:in_block",
  "block_condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:in_block_anywhere` {#saturnin_block_anywhere}

Counts the blocks inside the entity bounding box that satisfy a condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:in_block_anywhere` |
| `block_condition` | [Block condition](./block-condition.md) | yes | — | Condition checked against the target block. |
| `comparison` | Comparison object | yes | — | Comparison operator; see the common data types for the comparison object fields. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:in_block_anywhere",
  "block_condition": {
    "type": "saturn:always"
  },
  "comparison": {
    "comparison": ">=",
    "compare_to": 1
  }
}
```

</details>

### `saturn:in_rain` {#saturnin_rain}

Checks whether the target is exposed to rain at its current location.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:in_rain` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:in_rain"
}
```

</details>

### `saturn:in_snow` {#saturnin_snow}

Checks whether the target is exposed to snow at its current position.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:in_snow` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:in_snow"
}
```

</details>

Checks vanilla precipitation at the entity’s feet and eyes. Returns false when sheltered or when it is not raining.

### `saturn:in_thunderstorm` {#saturnin_thunderstorm}

Checks whether the target is exposed to rain during a thunderstorm.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:in_thunderstorm` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:in_thunderstorm"
}
```

</details>

### `saturn:inventory` {#saturninventory}

Counts matching non-empty item stacks or items in vanilla inventory and equipment slots.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:inventory` |
| `process_mode` | Enum string | no | `"items"` | items counts individual items; stacks counts non-empty stacks. |
| `item_condition` | [Item conditions](./item-condition.md) | no | `saturn:always` | Filter condition of the declared context type. |
| `slot` | Integer / string / mixed array | no | `[]` | Vanilla command slot number or slot name/range; mixed arrays are accepted. An empty array selects the default slots. |
| `comparison` | Enum string | yes | — | Comparison operator: `==`, `!=`, `<`, `<=`, `>` or `>=`. |
| `compare_to` | Number | yes | — | Numeric comparison target, used with comparison. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:inventory",
  "item_condition": {
    "type": "saturn:item_id",
    "item": "minecraft:diamond"
  },
  "comparison": ">=",
  "compare_to": 3
}
```

</details>

Defaults to `hotbar.*`, `inventory.*`, `weapon.*`, `armor.*`, `saddle` and `mob.inventory.*`. Only vanilla slots exposed by the entity are visited. The player’s selected hotbar slot and main-hand alias are deduplicated. Origins Power inventories are not read.

### `saturn:invisible` {#saturninvisible}

Checks whether the entity is invisible.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:invisible` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:invisible"
}
```

</details>

### `saturn:living` {#saturnliving}

Checks whether the entity is a living entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:living` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:living"
}
```

</details>

### `saturn:main_hand_item` {#saturnmain_hand_item}

Checks whether the main hand item of an entity satisfies an item condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:main_hand_item` |
| `item_condition` | [Item condition](./item-condition.md) | no | `{"type":"saturn:always"}` | The condition to check for the item stack. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:main_hand_item"
}
```

</details>

### `saturn:mob_effect` {#saturnmob_effect}

Checks whether an entity has the given status effect.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:mob_effect` |
| `effect` | Resource ID | yes | — | Status effect ID. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:mob_effect",
  "effect": "minecraft:speed"
}
```

</details>

### `saturn:nbt` {#saturnnbt}

Matches a subset of the target’s saved NBT, including subset matching for lists.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:nbt` |
| `nbt` | NBT object | yes | — | NBT subset to match, expressed as a JSON object. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:nbt",
  "nbt": {
    "Tags": [
      "example"
    ]
  }
}
```

</details>

Uses vanilla `NbtUtils.compareNbt` subset matching. Match the fields actually saved by this Minecraft version. Block conditions require a block entity and return false when none exists.

### `saturn:on_block` {#saturnon_block}

Checks whether the block below the feet of an entity satisfies a block condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:on_block` |
| `condition` | [Block condition](./block-condition.md) | yes | — | The condition to check. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:on_block",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:on_fire` {#saturnon_fire}

Checks whether the entity is on fire.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:on_fire` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:on_fire"
}
```

</details>

### `saturn:partner` {#saturnpartner}

Checks nearby entities within a range using a bi-entity condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:partner` |
| `range` | Number | no | `5.0` | Check range in blocks. Codec range: `0.5D, 32.0D`. |
| `count` | Count range object (min, max) | no | `{"min":1}` | Range for the number of nearby living entities: min defaults to 1, max may be omitted; requires 0 ≤ min ≤ max. |
| `bientity_condition` | [Bi-entity condition](./bientity-condition.md) | no | `{"type":"saturn:always"}` | The condition that filters both sides of the context. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:partner"
}
```

</details>

### `saturn:passenger` {#saturnpassenger}

Counts the direct passengers that satisfy a bi-entity condition and compares the count.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:passenger` |
| `bientity_condition` | [Bi-entity condition](./bientity-condition.md) | no | `{"type":"saturn:always"}` | The condition that filters both sides of the context. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:passenger",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:passenger_recursive` {#saturnpassenger_recursive}

Recursively counts the passengers that satisfy a condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:passenger_recursive` |
| `bientity_condition` | [Bi-entity condition](./bientity-condition.md) | no | `{"type":"saturn:always"}` | The condition that filters both sides of the context. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:passenger_recursive",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:player_ability` {#saturnplayer_ability}

Checks a vanilla player ability flag; separate from Saturn’s Ability skill system.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:player_ability` |
| `ability` | Enum string | yes | — | Vanilla ability flag: flying, instabuild, invulnerable, may_build or mayfly. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:player_ability",
  "ability": "mayfly"
}
```

</details>

### `saturn:predicate` {#saturnpredicate}

Evaluates a vanilla datapack predicate on the server. Missing predicates return false.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:predicate` |
| `predicate` | Resource ID | yes | — | Vanilla predicate ID, at `data/<namespace>/predicate/<path>.json`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:predicate",
  "predicate": "example:allowed"
}
```

</details>

Provides the vanilla `COMMAND` loot context with `ORIGIN` and `THIS_ENTITY`. Missing definitions and client-side checks return false.

### `saturn:raining` {#saturnraining}

Checks whether the level currently reports rainy weather.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:raining` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:raining"
}
```

</details>

### `saturn:relative_health` {#saturnrelative_health}

Compares the ratio of the current health of an entity to its maximum health.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:relative_health` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:relative_health",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:resource_compare` {#saturnresource_compare}

Checks whether the current value of the given resource reaches at least min.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:resource_compare` |
| `resource` | Resource ID | yes | — | Registered Saturn resource ID. |
| `min` | [Number provider](../number.md) | yes | — | Lower bound. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:resource_compare",
  "resource": "example:mana",
  "min": 1
}
```

</details>

### `saturn:riding` {#saturnriding}

Checks whether the mount of an entity satisfies a bi-entity condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:riding` |
| `bientity_condition` | [Bi-entity condition](./bientity-condition.md) | no | `{"type":"saturn:always"}` | The condition that filters both sides of the context. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:riding"
}
```

</details>

### `saturn:riding_recursive` {#saturnriding_recursive}

Checks multi-level riding relationships.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:riding_recursive` |
| `bientity_condition` | [Bi-entity condition](./bientity-condition.md) | no | `{"type":"saturn:always"}` | The condition that filters both sides of the context. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:riding_recursive",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:riding_root` {#saturnriding_root}

Checks the root entity of the riding chain.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:riding_root` |
| `bientity_condition` | [Bi-entity condition](./bientity-condition.md) | no | `{"type":"saturn:always"}` | The condition that filters both sides of the context. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:riding_root"
}
```

</details>

### `saturn:saturation_level` {#saturnsaturation_level}

Compares the food saturation of a player.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:saturation_level` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:saturation_level",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:scoreboard` {#saturnscoreboard}

Compares scores under the given scoreboard objective.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:scoreboard` |
| `name` | String | no | omitted | Local variable name, scoreboard holder name or configuration name. |
| `objective` | String | yes | — | Scoreboard objective name. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:scoreboard",
  "objective": "kills",
  "comparison": ">=",
  "compare_to": 5,
  "name": "Steve"
}
```

</details>

### `saturn:sneaking` {#saturnsneaking}

Checks whether an entity is sneaking.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:sneaking` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:sneaking"
}
```

</details>

### `saturn:sprinting` {#saturnsprinting}

Checks whether the entity is sprinting.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:sprinting` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:sprinting"
}
```

</details>

### `saturn:stat` {#saturnstat}

Compares a server player’s vanilla statistic.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:stat` |
| `stat` | Resource ID / object | yes | — | A custom statistic ID, or a `{stat_type, id}` object. |
| `comparison` | Enum string | yes | — | Comparison operator: `==`, `!=`, `<`, `<=`, `>` or `>=`. |
| `compare_to` | Number | yes | — | Numeric comparison target, used with comparison. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:stat",
  "stat": "minecraft:jump",
  "comparison": ">=",
  "compare_to": 10
}
```

</details>

A string selects a `minecraft:custom` statistic, e.g. `"minecraft:jump"`. A typed statistic uses `{"stat_type":"minecraft:mined","id":"minecraft:stone"}`. Unknown types or entries do not match or execute.

### `saturn:submerged_in` {#saturnsubmerged_in}

Checks whether the entity’s eyes are in the NeoForge fluid type of the given fluid.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:submerged_in` |
| `fluid` | Resource ID | yes | — | Registered fluid ID. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:submerged_in",
  "fluid": "minecraft:water"
}
```

</details>

The configured value is a fluid ID, but the eye check uses that fluid’s NeoForge FluidType; source and flowing variants sharing the type both match.

### `saturn:swimming` {#saturnswimming}

Checks whether the entity is swimming.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:swimming` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:swimming"
}
```

</details>

### `saturn:tamed` {#saturntamed}

Checks whether an ownable entity has an owner reference.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:tamed` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:tamed"
}
```

</details>

### `saturn:team` {#saturnteam}

Reads or checks the scoreboard team of an entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:team` |
| `team` | String | no | omitted | Scoreboard team name. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:team"
}
```

</details>

### `saturn:thundering` {#saturnthundering}

Checks whether the level currently reports a thunderstorm.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:thundering` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:thundering"
}
```

</details>

### `saturn:time_of_day` {#saturntime_of_day}

Compares the day/night time of the context world.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:time_of_day` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:time_of_day",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:using_item` {#saturnusing_item}

Checks whether an entity is using an item.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:using_item` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:using_item"
}
```

</details>

## Meta types

These types do not test a concrete value themselves; they combine or delegate other types of the same kind and are embedded in the same fields.

### `saturn:always` {#saturnalways}

The condition is always true.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:always` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:always"
}
```

</details>

### `saturn:and` {#saturnand}

Matches only when every sub-condition holds.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:and` |
| `conditions` | Array of conditions of the same kind | yes | — | List of sub-conditions of the same kind. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:and",
  "conditions": []
}
```

</details>

### `saturn:chance` {#saturnchance}

Decides whether the check succeeds based on a given chance.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:chance` |
| `chance` | Number | yes | — | Hit chance; 0 never matches, 1 always matches. Codec range: `0.0D, 1.0D`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:chance",
  "chance": 1
}
```

</details>

### `saturn:constant` {#saturnconstant}

Returns the configured boolean value.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:constant` |
| `value` | Boolean | yes | — | The boolean result, or the expected/new boolean block property value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:constant",
  "value": true
}
```

</details>

### `saturn:js` {#saturnjs}

Calls a callback registered by KubeJS and passes the params argument.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:js` |
| `id` | String | yes | — | Identifier of the callback, option or entry. |
| `params` | Object | no | `{}` | Parameter object passed to the script or formula. |

Registered only when KubeJS is installed. JSON only selects an existing callback; it never executes a JavaScript string inside the JSON directly.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

</details>

### `saturn:never` {#saturnnever}

The condition is always false.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:never` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:never"
}
```

</details>

### `saturn:not` {#saturnnot}

Inverts the match result of the sub-condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:not` |
| `condition` | Condition of the same kind | yes | — | The condition to check. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:not",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:or` {#saturnor}

Matches when any sub-condition holds.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:or` |
| `conditions` | Array of conditions of the same kind | yes | — | List of sub-conditions of the same kind. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:or",
  "conditions": []
}
```

</details>

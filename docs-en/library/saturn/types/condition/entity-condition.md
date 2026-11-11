---
title: "Entity condition"
sidebar_position: 1
---

# Entity condition

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

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

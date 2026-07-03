# Entity Action Types

Entity actions perform operations on a single entity. Use them inside power types and other actions.

### `origins:action_on_set`

Executes a bi-entity action for each entity in an entity set.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `set` | [ Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Entity set ID |
| `bientity_action` | [Bi-entity Action](../action/bientity_action_types) | **required** | Action between source and each set member |
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Filter for set members |
| `limit` | [Integer](../basic_concepts#integer) | `0` | Max entities to target (0 = unlimited) |
| `reverse` | [Boolean](../basic_concepts#boolean) | `false` | If `true`, iterate in reverse order |

### `origins:add_velocity`

Adds velocity to the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `x` | [Float](../basic_concepts#float) | `0.0` | Velocity on the X axis |
| `y` | [Float](../basic_concepts#float) | `0.0` | Velocity on the Y axis |
| `z` | [Float](../basic_concepts#float) | `0.0` | Velocity on the Z axis |
| `space` | [Space](../shared_data_types#space) | `world` | Coordinate space for the velocity |
| `set` | [Boolean](../basic_concepts#boolean) | `false` | If `true`, sets velocity instead of adding |

<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:add_velocity",
    "y": 2
}
```

This example will add an upward velocity to the entity, launching it into the air.

</details>

### `origins:add_xp`

Adds experience points or levels.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `points` | [Integer](../basic_concepts#integer) | **required** | XP points to add |
| `levels` | [Integer](../basic_concepts#integer) | **required** | XP levels to add |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:add_xp",
  "levels": 2
}
```

This example will add 2 levels to the player.

</details>

### `origins:apply_effect`

Applies a status effect (different internal behavior from add_effect).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | [ValueOrList](../basic_concepts#valueorlist) of [MobEffectInstance](../minecraft_data_types#mobeffectinstance) | **required** | Effects to apply |

<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:apply_effect",
    "effect": {
        "id": "minecraft:speed",
        "duration": 400,
        "amplifier": 0
    }
}
```

This example will apply a Speed I status effect to the entity that would last for 20 seconds.

</details>

### `origins:block_action`

Executes a block action at the entity's position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_action` | [Block Action](../action/block_action_types) | **required** | Action to execute |

### `origins:block_action_at`

Executes a block action at a specific offset from the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_action` | [Block Action](../action/block_action_types) | optional | Action to execute |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:block_action_at",
    "block_action": {
        "type": "origins:set_block",
        "block": "minecraft:sand"
    }
}
```

This example will execute a [Set Block](../action/block_action_types) that would set a Sand block at the entity's feet.

</details>

### `origins:change_resource`

Changes a resource value by a specified amount.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `resource` | [Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Resource power ID |
| `change` | [Integer](../basic_concepts#integer) | **required** | Amount to change (can be negative) |
| `operation` | [String](../basic_concepts#string) | optional | Operation: `add` or `set` |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:change_resource",
    "resource": "namespace:example",
    "change": 1
}
```

This example will add 1 to the `namespace:example` (`data/namespace/powers/example.json`) power that uses the [Resource (Power Type)](../power/regular).

</details>

### `origins:crafting_table`

Opens a crafting table GUI for the entity.

### `origins:damage`

Damages the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `damage_type` | [Identifier](../basic_concepts#identifier) | **required** | Damage type ID |
| `amount` | [Float](../basic_concepts#float) | **required** | Damage amount |
| `modifier` | [Modifier](../shared_data_types#modifier) or List | `[]` | Modifiers applied to the damage |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:damage",
  "amount": 4,
  "damage_type": "minecraft:on_fire"
}
```

This example will damage the entity for 4 points (2 hearts) of fire damage.

</details>

### `origins:dismount`

Forces the entity to dismount from any vehicle it is currently riding.

### `origins:drop_inventory`

Drops the entity's inventory.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](../basic_concepts#identifier) | optional | Power whose inventory to drop |
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action on dropped items |
| `item_action` | [Item Action](../action/item_action_types) | optional | Action applied to each dropped item |
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Filter for items to drop |
| `slot` | List of Integer | optional | Specific slots to drop |
| `throw_randomly` | [Boolean](../basic_concepts#boolean) | `false` | Whether items scatter randomly |
| `retain_ownership` | [Boolean](../basic_concepts#boolean) | `true` | Whether dropped items retain ownership |
| `amount` | [Integer](../basic_concepts#integer) | `0` | Max items to drop (0 = all) |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:drop_inventory"
}
```

This example will drop all the items from the entity's inventory.

</details>

### `origins:emit_game_event`

Emits a game event at the entity's location.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Identifier](../basic_concepts#identifier) | **required** | Game event ID |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:emit_game_event",
    "event": "minecraft:ring_bell"
}
```

This example will emit a `minecraft:ring_bell` game event, which has a redstone signal output of 6.

</details>

### `origins:ender_chest`

Opens the ender chest GUI for the entity.

### `origins:equipped_item_action`

Executes an item action on the entity's equipped item.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `slot` | [Equipment Slot Group](../minecraft_data_types#equipment-slot-group) | **required** | Which equipment slot |
| `action` | [Item Action](../action/item_action_types) | **required** | Action to execute |


<details>
<summary>Example</summary>

```json
"entity_action": {
  	"type": "origins:equipped_item_action",
  	"equipment_slot": "mainhand",
  	"action": {
	  	"type": "origins:consume",
	  	"amount": 1
  	}
}
```

This example will "consume" (remove) 1 item from the item stack in the mainhand equipment slot.

</details>

### `origins:execute_command`

Executes a command as the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `command` | [String](../basic_concepts#string) | **required** | Command to execute |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:execute_command",
  "command": "tellraw @a {\"text\": \"Hello world!\", \"color\": \"green\"}"
}
```

This example will execute a [Set Block](../action/block_action_types) that would set a Sand block at the entity's feet.

</details>

### `origins:exhaust`

Adds exhaustion to the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `amount` | [Float](../basic_concepts#float) | **required** | Exhaustion amount |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:exhaust",
  "amount": 0.4
}
```

This example will add 1 to the `namespace:example` (`data/namespace/powers/example.json`) power that uses the [Resource (Power Type)](../power/regular).

</details>

### `origins:explode`

Creates an explosion at the entity's location.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Float](../basic_concepts#float) | **required** | Explosion power |
| `destruction_type` | [String](../basic_concepts#string) | `break` | Block destruction: `break`, `destroy`, `none` |
| `indestructible` | [Block Condition](../condition/block_condition_types) | optional | Blocks immune to the explosion |
| `create_fire` | [Boolean](../basic_concepts#boolean) | `false` | Whether to create fire |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:explode",
  "power": 5,
  "damage_self": false,
  "create_fire": false
}
```

This example will drop all the items from the entity's inventory.

</details>

### `origins:extinguish`

Extinguishes fire on the entity.

### `origins:feed`

Restores hunger and saturation.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `food` | [Integer](../basic_concepts#integer) | **required** | Food points to restore |
| `saturation` | [Float](../basic_concepts#float) | **required** | Saturation to restore |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:feed",
  "food": 4,
  "saturation": 2
}
```

This example will emit a `minecraft:ring_bell` game event, which has a redstone signal output of 6.

</details>

### `origins:fire_projectile`

Fires a projectile from the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_type` | [Identifier](../basic_concepts#identifier) | **required** | Projectile entity type ID |
| `divergence` | [Float](../basic_concepts#float) | `1.0` | Projectile spread/divergence |
| `speed` | [Float](../basic_concepts#float) | `1.0` | Projectile speed multiplier |
| `count` | [Integer](../basic_concepts#integer) | `1` | Number of projectiles to fire |
| `tag` | [NBT Compound](../minecraft_data_types#nbt-compound) | optional | NBT data tag for the projectile entity |
| `projectile_action` | Entity Action | optional | Action to execute for each fired projectile |

### `origins:gain_air`

Refills the entity's air (oxygen).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | [Integer](../basic_concepts#integer) | **required** | Air to add |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:gain_air",
  "value": 20
}
```

This example will "consume" (remove) 1 item from the item stack in the mainhand equipment slot.

</details>

### `origins:give_item`

Gives an item to the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `stack` | [Item Stack](../minecraft_data_types#item-stack) | **required** | Item to give |
| `item_action` | [Item Action](../action/item_action_types) | optional | Action applied to the item before giving |
| `preferred_slot` | [Equipment Slot Group](../minecraft_data_types#equipment-slot-group) | optional | Preferred inventory slot |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:give_item",
  "stack": {
    "item": "minecraft:egg",
    "amount": 3
  }
}
```

This example will restore about 1 second of breath to the entity.

</details>

### `origins:grant_advancement`

Grants an advancement to the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `advancement` | [Identifier](../basic_concepts#identifier) | **required** | Advancement ID |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:grant_advancement",
    "advancement": "minecraft:adventure/arbalistic"
}
```

This example will grant the player the Arbalistic advancement.

</details>

### `origins:grant_power`

Grants a power to the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](../basic_concepts#identifier) | **required** | Power ID |
| `source` | [Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Source identifier for the power |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:grant_power",
    "power": "origins:burn_in_daylight",
    "source": "example:power_source"
}
```

This example will grant the entity the `origins:burn_in_daylight` power from the `example:power_source` source.

</details>

### `origins:heal`

Heals the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `amount` | [Float](../basic_concepts#float) | **required** | Health to restore |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:heal",
  "amount": 6
}
```

This example gives the entity 3 Eggs.

</details>

### `origins:modify_death_ticks`

Modifies the entity's death tick counter.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] | **required** | Modifier applied to death ticks |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:modify_death_ticks",
    "modifier": {
        "operation": "set_total",
        "value": 0
    }
}
```

This example will make the corpse of the entity remain in the world forever.

</details>

### `origins:modify_inventory`

Modifies items in the entity's inventory.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](../basic_concepts#identifier) | optional | Power whose inventory to modify |
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action on the entity |
| `item_action` | [Item Action](../action/item_action_types) | **required** | Action to apply |
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Filter for items to modify |
| `slot` | List of Integer | optional | Specific slots to modify |
| `process_mode` | [String](../basic_concepts#string) | `STACKS` | `STACKS` or `ITEMS` |
| `limit` | [Integer](../basic_concepts#integer) | `0` | Max items to process (0 = unlimited) |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:modify_inventory",
    "inventory_type": "power",
    "power": "origins:extra_inventory",
    "item_action": {
        "type": "origins:consume"
    }
}
```

This example will consume each item in the inventory of the `origins:extra_inventory` power, decreasing their count by 1.

</details>

### `origins:modify_resource`

Modifies a resource value.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `resource` | [Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Resource power ID |
| `modifier` | [Modifier] | **required** | Modifier applied |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:modify_resource",
    "modifier": {
        "operation": "add_base_early",
        "value": 1
    },
    "resource": "example:1st_resource"
}
```

This example will add 1 to the `example:1st_resource` *(`data/example/powers/1st_resource.json`)* power.

</details>

### `origins:passenger_action`

Executes an action on the entity's passengers.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Entity Action](../action/entity_action_types) | **required** | Action to execute |
| `recursive` | [Boolean](../basic_concepts#boolean) | optional | Whether to apply recursively |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:passenger_action",
    "action": {
        "type": "origins:heal",
        "amount": 2
    },
    "recursive": true
}
```

This example will heal all entities that are currently riding the entity that executed this entity action type.

</details>

### `origins:play_sound`

Plays a sound.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sound` | [Identifier](../basic_concepts#identifier) | **required** | Sound event ID |
| `category` | [String](../basic_concepts#string) | optional | Sound category (e.g. `neutral`, `player`, `hostile`, `ambient`) |
| `volume` | [Float](../basic_concepts#float) | `1.0` | Sound volume |
| `pitch` | [Float](../basic_concepts#float) | `1.0` | Sound pitch |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:play_sound",
    "sound": "minecraft:entity.chicken.egg"
}
```

This example will play the `minecraft:entity.chicken.egg` sound event that can be heard within a 16 blocks distance. (`16 * 1.0 = 16`)

</details>

### `origins:random_teleport`

Teleports the entity to a random nearby location.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `area_width` | [Float](../basic_concepts#float) | `8.0` | Width/horizontal radius of the search area |
| `area_height` | [Float](../basic_concepts#float) | `8.0` | Height/vertical radius of the search area |
| `heightmap` | [String](../basic_concepts#string) | optional | Heightmap type for ground placement (`MOTION_BLOCKING`, `WORLD_SURFACE`, etc.) |
| `attempts` | [Integer](../basic_concepts#integer) | optional | Max teleport attempts |
| `landing_block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition the landing block must meet |
| `landing_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition at the landing position |
| `landing_offset` | Object | `{0,0,0}` | Offset from the landing position (`x`/`y`/`z`) |
| `loaded_chunks_only` | [Boolean](../basic_concepts#boolean) | `true` | Only teleport to loaded chunks |
| `success_action` | [Entity Action](../action/entity_action_types) | optional | Action on successful teleport |
| `fail_action` | [Entity Action](../action/entity_action_types) | optional | Action on failed teleport |

### `origins:raycast`

Performs a raycast and executes actions on hit entities/blocks.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `distance` | [Float](../basic_concepts#float) | **required** | Raycast distance |
| `block` | [Boolean](../basic_concepts#boolean) | `true` | Whether blocks are checked |
| `entity` | [Boolean](../basic_concepts#boolean) | `true` | Whether entities are checked |
| `shape_type` | [String](../basic_concepts#string) | `visual` | `visual` or `collider` |
| `fluid_handling` | [String](../basic_concepts#string) | `none` | `none`, `source_only`, `any`, or `water` |
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Filter for hit entities |
| `before_action` | [Entity Action](../action/entity_action_types) | optional | Action executed before the raycast |
| `bientity_action` | [Bi-entity Action](../action/bientity_action_types) | optional | Action on hit entity |
| `block_action` | [Block Action](../action/block_action_types) | optional | Action on hit block |
| `hit_action` | [Entity Action](../action/entity_action_types) | optional | Action on hit (entity or block) |
| `miss_action` | [Entity Action](../action/entity_action_types) | optional | Action if nothing is hit |
| `command_at_hit` | [String](../basic_concepts#string) | optional | Command executed at hit position |
| `command_along_ray` | [String](../basic_concepts#string) | optional | Command executed along the ray path |
| `command_step` | [Float](../basic_concepts#float) | `1.0` | Step distance for along-ray commands |
| `command_hit_offset` | [Float](../basic_concepts#float) | optional | Offset from hit for command execution |
| `command_along_ray_only_on_hit` | [Boolean](../basic_concepts#boolean) | `true` | Only show along-ray particles on hit |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:raycast",
    "distance": 16,
    "block": true,
    "entity": true,
    "shape_type": "visual",
    "fluid_handling": "any",
    "bientity_action": {
        "type": "origins:target_action",
        "action": {
            "type": "origins:execute_command",
            "command": "say I've been hit!"
        }
    },
    "before_action": {
        "type": "origins:execute_command",
        "command": "say Before"
    },
    "hit_action": {
        "type": "origins:execute_command",
        "command": "say After (hit)"
    },
    "miss_action": {
        "type": "origins:execute_command",
        "command": "say After (miss)"
    },
    "command_at_hit": "particle minecraft:block_marker minecraft:emerald_block ~ ~ ~ 0 0 0 0.0 1 normal @a",
    "command_along_ray": "particle minecraft:soul_fire_flame",
    "command_step": 1,
    "command_along_ray_only_on_hit": true
}
```

This example will cast a ray that can go through Glass blocks (or any blocks that are transparent and see-through) that will only display the Soul Fire Flame particle if the ray has hit a block/entity.

</details>

### `origins:remove_effect`

Removes a status effect.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | List of [Identifier](../basic_concepts#identifier) | optional | Effect IDs to remove (all if not specified) |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:clear_effect",
    "effect": "minecraft:poison"
}
```

This example will clear the Poison status effect from the entity.

</details>

### `origins:replace_inventory`

Replaces the entity's inventory contents.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action on the entity |
| `power` | [Identifier](../basic_concepts#identifier) | optional | Power whose inventory to replace |
| `item_action` | [Item Action](../action/item_action_types) | **required** | Action to apply to each item |
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Filter for items |
| `slot` | List of Integer | optional | Specific slots to replace |
| `merge_component` | [Boolean](../basic_concepts#boolean) | `true` | Whether to merge data components |
| `stack` | [Item Stack](../minecraft_data_types#item-stack) | **required** | Replacement item |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:replace_inventory",
    "slot": "weapon.offhand",
    "stack": {
        "item": "minecraft:barrier"
    }
}
```

This example will replace the item in the entity's offhand with a Barrier item.

</details>

### `origins:revoke_advancement`

Revokes an advancement.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `advancement` | [Identifier](../basic_concepts#identifier) | **required** | Advancement ID |
| `criterion` | List of String | `[]` | Specific criteria to revoke |
| `selection` | [String](../basic_concepts#string) | `ONLY` | Selection mode: `ONLY`, `SKIP`, `EVERYTHING` |

<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:revoke_advancement",
    "advancement": "minecraft:adventure/arbalistic"
}
```

This example will revoke the Arbalistic advancement from the player, if they have it.

</details>

### `origins:revoke_power`

Revokes a power from the entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](../basic_concepts#identifier) | optional | Power whose power source to revoke from |
| `source` | [Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Source identifier to revoke |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:revoke_power",
    "power": "origins:elytra",
    "source": "origins:elytrian"
}
```

This example will revoke the `origins:elytra` power from the `origins:elytrian` source from the entity.

</details>

### `origins:riding_action`

Executes an action on the entity being ridden.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Entity Action](../action/entity_action_types) | **required** | Action to execute |
| `recursive` | [Boolean](../basic_concepts#boolean) | optional | Whether to apply recursively |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:riding_action",
    "action": {
        "type": "origins:apply_effect",
        "effect": {
            "effect": "minecraft:speed",
            "duration": 100,
            "amplifier": 1
        }
    }
}
```

This example will apply a Speed II status effect to the entity that is currently being ridden by the entity that executed the entity action type.

</details>

### `origins:selector_action`

Execute action on entities selected by a selector. With a condition to filter the selected entities.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `selector` | [String](../basic_concepts#string) | **required** | Entity selector (e.g. `@p`, `@e[type=minecraft:zombie]`, etc.) |
| `bientity_action` | [Bi-entity Action](../action/bientity_action_types) | **required** | Action to execute |
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Filter for selected entities |

### `origins:set_fall_distance`

Sets the entity's fall distance (affects fall damage).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fall_distance` | [Float](../basic_concepts#float) | **required** | New fall distance |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:set_fall_distance",
    "fall_distance": 0
}
```

This example will reset the entity's fall distance so that the fall damage is now calculated from that point.

</details>

### `origins:set_on_fire`

Sets the entity on fire.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tick` | [Integer](../basic_concepts#integer) | **required** | Fire duration in ticks |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:set_on_fire",
  "duration": 5
}
```

This example will clear the Poison status effect from the entity.

</details>

### `origins:spawn_effect_cloud`

Spawns an effect cloud at the entity's position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | List of [MobEffectInstance](../minecraft_data_types#mobeffectinstance) | optional | Effects in the cloud |
| `radius` | [Float](../basic_concepts#float) | `3.0` | Cloud radius |
| `radius_on_use` | [Float](../basic_concepts#float) | `0.5` | Radius increase on use |
| `wait_time` | [Integer](../basic_concepts#integer) | optional | Cloud duration |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:spawn_effect_cloud",
    "radius": 10.0,
    "wait_time": 40,
    "effect": {
        "effect": "minecraft:resistance",
        "amplifier": 3,
        "duration": 100
    }
}
```

This example will spawn a large Area Effect Cloud, which provides the Resistance IV status effect that will last for 5 seconds at the entity's position.

</details>

### `origins:spawn_entity`

Spawns an entity at the entity's position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_type` | [Identifier](../basic_concepts#identifier) | **required** | Entity type ID |
| `tag` | NBT | optional | Initial NBT data |
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the spawned entity |
| `bientity_action` | [Bi-entity Action](../action/bientity_action_types) | optional | Action between spawner and spawned entity |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:spawn_entity",
  "entity_type": "minecraft:zombie",
  "tag": "{NoAI:1b,IsBaby:1}"
}
```

This example will grant the player the Arbalistic advancement.

</details>

### `origins:spawn_particles`

Spawns particles at the entity's position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `particle` | [Particle Option](../minecraft_data_types#particle-option) | **required** | Particle type and params |
| `count` | [Integer](../basic_concepts#integer) | **required** | Number of particles |
| `speed` | [Float](../basic_concepts#float) | `0.0` | Particle speed |
| `spread` | Object | optional | Spread (`x`/`y`/`z`, default `0.5`) |
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Only show to matching viewers |
| `force` | [Boolean](../basic_concepts#boolean) | optional | Force particle display |
| `offset_x` | [Float](../basic_concepts#float) | `0.0` | X offset |
| `offset_y` | [Float](../basic_concepts#float) | `0.0` | Y offset |
| `offset_z` | [Float](../basic_concepts#float) | `0.0` | Z offset |


<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:spawn_particles",
    "particle": {
        "type": "minecraft:block",
        "params": "minecraft:redstone_block"
    },
    "count": 16,
    "speed": 0.0,
    "force": true,
    "spread": {
        "x": 3.0,
        "y": 0.0,
        "z": 3.0
    }
}
```

This example will spawn a particle cuboid that is about 5x0x5 in size that will use the Redstone Block texture.

</details>

Spread fields: `x`, `y`, `z` (Float, default `0.0`).

### `origins:swing_hand`

Makes the entity swing their hand.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `hand` | [String](../basic_concepts#string) | **required** | `MAIN_HAND` or `OFF_HAND` |

<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:swing_hand",
    "hand": "OFF_HAND"
}
```

This example will swing the entity's off hand.

</details>

### `origins:toggle`

Toggles another power on/off.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Power ID to toggle |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:toggle",
  "power": "origins:phantomize"
}
```

This example will grant the entity the `origins:burn_in_daylight` power from the `example:power_source` source.

</details>

### `origins:trigger_cooldown`

Triggers the cooldown of another power.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Wildcard Identifier](../basic_concepts#wildcard-identifier) | **required** | Power ID whose cooldown to trigger |

<details>
<summary>Example</summary>

```json
"entity_action": {
  "type": "origins:trigger_cooldown",
  "power": "origins:launch_into_air"
}
```

This example will restore about 3 hearts to the entity.

</details>

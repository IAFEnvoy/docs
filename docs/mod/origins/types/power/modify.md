---
sidebar_position: 2
---

# Modify Powers

These powers modify various game mechanics.

---

### `origins:modify_air_speed`

Modifies the player's air speed (flying horizontally in creative/elytra).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] or List | `[]` | Modifier applied to air speed |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_air_speed",
    "modifier": {
        "operation": "multiply_total",
        "value": 1.5
    }
}
```

This example will increase the entity's air speed by 150%.

</details>

### `origins:modify_attribute`

Applies an attribute modifier while active.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `attribute` | [Identifier](../basic_concepts#identifier) | **required** | Minecraft attribute ID (e.g. `minecraft:generic.max_health`) |
| `modifier` | [Attribute Modifier] or List | **required** | The attribute modifier(s) to apply |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:modify_attribute",
  "attribute": "minecraft:generic.max_health",
  "modifier": {
    "id": "origins:extra_health",
    "amount": 10,
    "operation": "add_value"
  }
}
```

This example will set the total value of the entity's `minecraft:generic.attack_damage` attribute using the value of the `example:resource` (`data/example/powers/resource.json`) power.

</details>

### `origins:modify_block_render`

Modifies block rendering distance/shape.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition for blocks to apply the modification |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_block_render",
    "block_condition": {
        "type": "origins:block",
        "block": "minecraft:diamond_ore"
    },
    "block": "minecraft:diamond_block"
}
```

This example will make Diamond Ore blocks look like Diamond Blocks.

</details>

### `origins:modify_break_speed`

Modifies block breaking speed.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] or List | `[]` | Modifier applied to break speed |
| `hardness_modifier` | [Modifier] or List | `[]` | Modifier applied to block hardness |
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition for affected blocks |

<details>
<summary>Example</summary>

```json
{
	"type": "origins:modify_break_speed",
	"block_condition": {
		"type": "origins:block",
		"block": "minecraft:netherrack"
	},
	"modifier": {
		"operation": "multiply_base",
		"value": 0.5
	}
}
```

This example will allow the player to break Netherrack 50% faster than usual.

</details>

### `origins:modify_camera_submersion`

Modifies camera effects when submerged in fluids.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `from` | [Identifier](../basic_concepts#identifier) | **required** | Original camera submersion type |
| `to` | [Identifier](../basic_concepts#identifier) | **required** | Replacement camera submersion type |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:modify_camera_submersion",
  "from": "none",
  "to": "water"
}
```

This example will make it look like the player is submerged in Water if the player is not submerged in any fluid.

</details>

### `origins:modify_crafting`

Modifies crafting results.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `recipe` | [Identifier](../basic_concepts#identifier) | **required** | Recipe ID to modify |
| `result` | [Item Stack](../minecraft_data_types#item-stack) | optional | Replacement result item |
| `result_action` | [Item Action](../action/item_action_types) | optional | Action applied to the crafted result |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_crafting",
    "recipe": "minecraft:wooden_sword",
    "result": {
        "item": "minecraft:diamond_sword"
    }
}
```

This example will replace the result item stack from the `minecraft:wooden_sword` (`data/minecraft/recipes/wooden_sword.json`) vanilla recipe with a Diamond Sword only for the player that has the power.

</details>

### `origins:modify_damage_dealt`

Modifies damage dealt by the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier](../shared_data_types#modifier) or List | `[]` | Modifier applied to damage dealt |
| `target_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition the target must meet |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the damage must meet |
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Bi-entity condition between attacker and target |
| `self_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the attacker |
| `target_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the target |
| `bientity_action` | [Bi-entity Action](../action/bientity_action_types) | optional | Bi-entity action between attacker and target |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_damage_dealt",
    "condition": {
        "type": "origins:in_block_anywhere",
        "block_condition": {
            "type": "origins:block",
            "block": "minecraft:water"
        },
        "comparison": ">=",
        "compare_to": 1
    },
    "modifier": {
        "name": "Extra damage when submerged",
        "operation": "addition",
        "value": 5.0
    }
}
```

This example will give the entity that has the power additional 2 and a half hearts of damage if the entity is in Water, regardless of its fluid level.

</details>

### `origins:modify_damage_taken`

Modifies damage taken by the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] or List | `[]` | Modifier applied to damage taken |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the damage must meet |
| `attacker_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition the attacker must meet |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_damage_taken",
    "damage_condition": {
        "type": "origins:attacker",
        "entity_condition": {
            "type": "origins:equipped_item",
            "equipment_slot": "mainhand",
            "item_condition": {
                "type": "origins:or",
                "conditions": [
                    {
                        "type": "origins:enchantment",
                        "enchantment": "minecraft:binding_curse",
                        "comparison": ">=",
                        "compare_to": 1
                    },
                    {
                        "type": "origins:enchantment",
                        "enchantment": "minecraft:vanishing_curse",
                        "comparison": ">=",
                        "compare_to": 1
                    }
                ]
            }
        }
    },
    "modifier": {
        "name": "Weak to cursed items",
        "operation": "addition",
        "value": 5.5
    }
}
```

This example will make the entity that has the power take 2 and a half additional hearts of damage if the attacker is holding an item with either the Curse of Binding, or Curse of Vanishing enchantments.

</details>

### `origins:modify_death_sound`

:::caution Unstable

This power is currently unstable and may not work as intended. Please report if you encounter any issues with it.

:::

Modifies the sound played when the player dies.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `muted` | [Boolean](../basic_concepts#boolean) | `false` | Whether to mute the death sound |
| `sound` | [Weighted Sound Entry](../shared_data_types#weighted-sound-entry) or list | **required** | Replacement sound to play on death |
| `volume` | [Float](../basic_concepts#float) | `1.0` | Volume of the sound |
| `pitch` | [Float](../basic_concepts#float) | `1.0` | Pitch of the sound |

### `origins:modify_effect_amplifier`

Modifies the amplifier of status effects on the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | [Identifier](../basic_concepts#identifier) | optional | Effect ID to modify |
| `modifier` | [Modifier] or List | `[]` | Modifier applied to the effect amplifier |

### `origins:modify_effect_duration`

Modifies the duration of status effects on the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | [Identifier](../basic_concepts#identifier) | optional | Effect ID to modify |
| `modifier` | [Modifier] or List | `[]` | Modifier applied to the effect duration |

### `origins:modify_enchantment_level`

:::caution Unstable

This power is currently unstable and may not work as intended. Please report if you encounter any issues with it.

:::

Modifies enchantment levels.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enchantment` | [Identifier](../basic_concepts#identifier) | **required** | Enchantment ID to modify |
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Condition the item must meet |
| `modifier` | [Modifier] or List | `[]` | Modifier applied to enchantment level |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_enchantment_level",
    "enchantment": "minecraft:silk_touch",
    "modifier": {
        "operation": "set_total",
        "value": 1
    }
}
```

This example will grant the player the ability to use Silk Touch, regardless of whether the player is holding any item or no item at all.

</details>

### `origins:modify_exhaustion`

Modifies exhaustion gain.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] or List | `[]` | Modifier applied to exhaustion |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_exhaustion",
    "modifier": {
        "name": "Increased exhaustion",
        "operation": "multiply_base",
        "value": 2.0
    }
}
```

This example triples the exhaustion rate of the player.

</details>

### `origins:modify_falling`

Modifies falling damage and speed.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `take_fall_damage` | [Boolean](../basic_concepts#boolean) | `true` | Whether the player takes fall damage |
| `velocity` | [Float](../basic_concepts#float) | optional | Override fall velocity |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_falling",
    "velocity": 1.0,
    "take_fall_damage": false,
    "condition": {
        "type": "origins:sneaking"
    }
}
```

This example will make the player fall faster and not take fall damage if they're sneaking.

</details>

### `origins:modify_fluid_render`

Modifies how fluids are rendered around the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fluid` | [Identifier](../basic_concepts#identifier) | **required** | Fluid ID |
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition at the fluid position |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_fluid_render",
    "block_condition": {
        "type": "origins:block",
        "block": "minecraft:water"
    },
    "fluid": "minecraft:lava"
}
```

This example will make Water look like Lava.

</details>

### `origins:modify_food`

Modifies food value when eating.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `food_modifier` | [Modifier] or List | `[]` | Modifier applied to food restored |
| `saturation_modifier` | [Modifier] or List | `[]` | Modifier applied to saturation restored |
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Condition the food item must meet |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_food",
    "item_condition": {
        "type": "origins:ingredient",
        "ingredient": {
            "item": "minecraft:dried_kelp"
        }
    },
    "food_modifier": {
        "name": "Increased food points",
        "operation": "addition",
        "value": 3.0
    },
    "saturation_modifier": {
        "name": "Increased saturation points",
        "operation": "addition",
        "value": 1
    }
}
```

This example will add 1 and a half shanks of hunger, and 1 saturation point if a player eats a dried kelp, totalling to 2 shanks of hunger and 6.4 saturation points.

</details>

### `origins:modify_grindstone`

Modifies grindstone results.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `result_action` | [Item Action](../action/item_action_types) | optional | Action applied to the grindstone result |
| `result` | [Item Stack](../minecraft_data_types#item-stack) | optional | Replacement result item |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_grindstone",
    "xp_modifier": {
        "operation": "multiply_total_multiplicative",
        "value": 0.5
    }
}
```

This example will increase the experience recieved from removing enchantments from an enchanted item to 50%.

</details>

### `origins:modify_harvest`

Modifies harvest behavior (drops, silk touch, fortune).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition for affected blocks |
| `allow` | [Boolean](../basic_concepts#boolean) | `true` | Whether harvesting is allowed |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_harvest",
    "block_condition": {
        "type": "origins:block",
        "block": "minecraft:diamond_block"
    },
    "allow": true
}
```

This example will allow players to harvest a Diamond Block regardless of using the proper tool or not.

</details>

### `origins:modify_healing`

Modifies natural health regeneration.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] or List | `[]` | Modifier applied to healing |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_healing",
    "modifier": {
        "operation": "multiply_total",
        "value": 1
    }
}
```

This example will double the effectiveness of all healing used on you.

</details>

### `origins:modify_hurt_sound`

:::caution Unstable

This power is currently unstable and may not work as intended. Please report if you encounter any issues with it.

:::

Modifies the sound played when the player is hurt.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `muted` | [Boolean](../basic_concepts#boolean) | `false` | Whether to mute the hurt sound |
| `sound` | [Weighted Sound Entry](../shared_data_types#weighted-sound-entry) or list | **required** | Replacement sound to play when hurt |
| `volume` | [Float](../basic_concepts#float) | `1.0` | Volume of the sound |
| `pitch` | [Float](../basic_concepts#float) | `1.0` | Pitch of the sound |

### `origins:modify_insomnia_ticks`

Modifies phantom insomnia ticks.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] or List | `[]` | Modifier applied to insomnia ticks |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_insomnia_ticks",
    "modifier": {
        "operation": "set_total",
        "value": 0
    }
}
```

This example will set the value used for calculating when a Phantom will spawn for a player to 0, essentially disabling Phantoms from spawning for the player that has the power.

</details>

### `origins:modify_jump`

Modifies jump height.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] or List | `[]` | Modifier applied to jump velocity |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_jump",
    "modifier": {
        "operation": "addition",
        "value": 0.4
    },
    "entity_action": {
        "type": "origins:execute_command",
        "command": "particle cloud ~ ~ ~ 0.3 0.3 0.3 0.01 16 normal @a"
    }
}
```

This example will increase the entity that has the power's jump height to 4 blocks and display a cloud particle at the entity's feet upon jumping.

</details>

### `origins:modify_player_spawn`

Modifies where the player spawns/respawns.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `dimension` | [Identifier](../basic_concepts#identifier) | **required** | Dimension ID for spawning |
| `dimension_distance_multiplier` | [Float](../basic_concepts#float) | `1.0` | Multiplier for the distance from the spawn point in the dimension |
| `spawn_strategy` | [String](../basic_concepts#string) | `default` | Spawn strategy: `default` or `center` |
| `biome` | [Identifier](../basic_concepts#identifier) | optional | Biome ID for spawning |
| `structure` | [Identifier](../basic_concepts#identifier) | optional | Structure ID for spawning |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:modify_player_spawn",
  "dimension": "minecraft:the_end",
  "structure": "minecraft:end_city",
  "spawn_strategy": "center"
}
```

This example will let players spawn at an End City in The End dimension.

</details>

### `origins:modify_projectile_damage`

Modifies projectile damage.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] or List | `[]` | Modifier applied to projectile damage |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the damage must meet |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_projectile_damage",
    "damage_condition": {
        "type": "origins:projectile",
        "projectile": "minecraft:spectral_arrow"
    },
    "modifier": {
        "operation": "addition",
        "value": 8.0
    }
}
```

This example will modify the damage of the Spectral Arrow projectile entity shot by the entity that has the power to deal additional 4 hearts of damage.

</details>

### `origins:modify_slipperiness`

Modifies how slippery blocks are for the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] or List | `[]` | Modifier applied to block slipperiness |
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition for affected blocks |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_slipperiness",
    "modifier": {
        "operation": "multiply_total",
        "value": 0.5
    },
    "block_condition": {
        "type": "origins:block",
        "block": "minecraft:dirt"
    }
}
```

This example will increase the entity's friction by 50% while standing on dirt blocks.

</details>

### `origins:modify_velocity`

Modifies the player's velocity in response to knockback, explosions, etc.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] or List | `[]` | Modifier applied to velocity changes |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:modify_velocity",
  "modifier": {
    "value": -2,
    "operation": "multiply_total"
  },
  "axes": [
    "x",
    "y",
    "z"
  ]
}
```

This example will make all of the player's velocity reversed. You'll fall upwards, your movement keys will be inverted, etc.

</details>

### `origins:modify_xp_gain`

Modifies experience gained.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] or List | `[]` | Modifier applied to XP gain |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:modify_xp_gain",
    "modifier": {
        "operation": "multiply_base",
        "value": 2.0
    }
}
```

This example will triple the gained experience from experience orbs.

</details>

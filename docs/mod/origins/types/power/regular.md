---
sidebar_position: 0
---

# Regular Powers

Standalone powers with unique functionality.

---

### `origins:attribute`

Applies attribute modifiers when the power is active, even without the condition.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [AttributeEntry](../shared_data_types#attributeentry) or List | `[]` | Attribute modifier entries |
| `update_health` | [Boolean](../basic_concepts#boolean) | `true` | Whether to update max health after applying |

### `origins:attribute_modify_transfer`

Transfers attribute modifiers between entities.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `class` | [Identifier](../basic_concepts#identifier) | **required** | Power class to look for on other entities |
| `modifier` | [Modifier](../shared_data_types#modifier) or List | `[]` | Multiplier for transferred values |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:attribute_modify_transfer",
    "class": "modify_break_speed",
    "attribute": "minecraft:generic.movement_speed",
    "multiplier": 1.25
}
```

This example will transfer the value of the attribute modifier for the `minecraft:generic.movement_speed` attribute to the `origins:modify_break_speed` power, essentially giving the player mining speed boost if the player's movement speed is quite high.

</details>

### `origins:burn`

Sets the entity on fire at regular intervals.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `interval` | [Integer](../basic_concepts#integer) | **required** | Interval in ticks between fire applications |
| `burn_duration` | [Integer](../basic_concepts#integer) | **required** | Fire duration in ticks per application |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:burn",
  "interval": 20,
  "burn_duration": 120,
  "condition": {
    "type": "origins:exposed_to_sun"
  }
}
```

This example will check if the value of the entity's `minecraft:generic.armor` attribute is 10 or more.

</details>

### `origins:climbing`

Allows the player to climb walls like a spider.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `allow_holding` | [Boolean](../basic_concepts#boolean) | `true` | Whether the player can hold position on the wall |
| `hold_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition required to hold position |
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition for climbable blocks (defaults to solid blocks) |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:climbing",
  "allow_holding": true,
  "condition": {
    "type": "origins:collided_horizontally"
  }
}
```

This example will allow the player to climb when they're colliding with a wall, and they can hold their position on the wall even when not moving towards it.

</details>

### `origins:conditioned_attribute`

Applies attribute modifiers when active (condition-dependent).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [AttributeEntry](../shared_data_types#attributeentry) or List | `[]` | Attribute modifier entries |
| `update_health` | [Boolean](../basic_concepts#boolean) | `true` | Whether to update max health after applying |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:conditioned_attribute",
    "modifier": {
        "attribute": "minecraft:generic.movement_speed",
        "operation": "addition",
        "value": 0.4,
        "name": "Increased sprinting speed"
    },
    "tick_rate": 20,
    "condition": {
        "type": "origins:sprinting"
    }
}
```

This example power will add 0.4 to the entity's `minecraft:generic.movement_speed` attribute if the entity is sprinting.

</details>

### `origins:conditioned_restrict_armor`

Restricts armor based on conditions, dropping incompatible pieces.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `head` | [Item Condition](../condition/item_condition_types) | optional | Condition for helmets to keep |
| `chest` | [Item Condition](../condition/item_condition_types) | optional | Condition for chestplates to keep |
| `legs` | [Item Condition](../condition/item_condition_types) | optional | Condition for leggings to keep |
| `feet` | [Item Condition](../condition/item_condition_types) | optional | Condition for boots to keep |
| `tick_rate` | [Integer](../basic_concepts#integer) | `20` | Interval in ticks for checking equipment |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:conditioned_restrict_armor",
  	"head": {
    	"type": "origins:armor_value",
    	"comparison": ">",
    	"compare_to": 2
  	},
  	"chest": {
    	"type": "origins:armor_value",
    	"comparison": ">",
    	"compare_to": 5
  	},
  	"legs": {
    	"type": "origins:armor_value",
    	"comparison": ">",
    	"compare_to": 4
  	},
  	"feet": {
    	"type": "origins:armor_value",
    	"comparison": ">",
    	"compare_to": 1
	},
	"condition": {
		"type": "origins:in_block",
		"block_condition": {
			"type": "origins:light_level",
			"comparison": ">",
			"compare_to": 6
		}
	},
	"tick_rate": 20
}
```

This example will prevent the entity from equipping any armor which is more powerful than chainmail, unless the entity is in dark places (light level below 7).

</details>

### `origins:conduit_power_on_land`

Grants conduit power effects while on land.

### `origins:cooldown`

A power that simply provides a cooldown (usable by other mechanisms).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `cooldown` | [Integer](../basic_concepts#integer) | `1` | Cooldown duration in ticks |
| `hud_render` | [Hud Render](../shared_data_types#hudrender) | optional | HUD display settings |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:cooldown",
  "cooldown": 200,
  "hud_render": {
    "bar_index": 3
  }
}
```

This example will set the entity on fire for 1 second, within an interval of 20 ticks if the said entity is not wearing a Leather Helmet.

</details>

### `origins:creative_flight`

Grants creative flight while active.

### `origins:damage_over_time`

Damages the player at regular intervals.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `interval` | [Integer](../basic_concepts#integer) | `20` | Interval in ticks between damage ticks |
| `damage` | [Float](../basic_concepts#float) | `1.0` | Amount of damage per tick |
| `damage_type` | [Identifier](../basic_concepts#identifier) | **required** | Custom damage type |
| `damage_easy` | [Float](../basic_concepts#float) | optional | Damage on Easy difficulty |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:damage_over_time",
  	"interval": 20,
  	"damage": 2,
  	"damage_easy": 1,
  	"damage_type": "origins:hurt_by_water",
  	"protection_enchantment": "origins:water_protection",
  	"protection_effectiveness": 1.0,
  	"condition": {
    	"type": "origins:or",
    	"conditions": [
	      	{
	        	"type": "origins:fluid_height",
		        "fluid": "minecraft:water",
	        	"comparison": ">",
	        	"compare_to": 0.0
	      	},
	      	{
	        	"type": "origins:in_rain"
	      	}
    	]
  	}
}
```

This example will deal damage to the entity if the entity is in water.

</details>

### `origins:disable_regen`

Disables natural health regeneration.

### `origins:edible_item`

:::caution Unstable

This power is currently unstable and may not work as intended. Please report if you encounter any issues with it.

:::

Makes certain items edible for the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | This action will be executed on the player upon consuming an item. |
| `item_action` | [Item Action](../action/item_action_types) | optional | This action will be executed on the item consumed by the player. |
| `result_item_action` | [Item Action](../action/item_action_types) | optional | This action will be executed on the item that is given to the player as a result of consuming an item. |
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Will only make the item edible and the specified actions will only be executed if this condition is fulfilled by the item. |
| `food_properties` | [Food Properties](#food-properties) | **required** | The food component that the item grants upon eating it. |
| `consume_animation` | [String](../basic_concepts#string) | `eat` | Determines whether the animation effect for consuming the item should be `eating` (`eat`, displays particle effects based on the item) or `drinking` (`drink`, no particle effects.) |
| `consume_sound` | [Identifier](../basic_concepts#identifier) | `minecraft:entity.generic.eat` | The sound event with this namespace and ID will be played when the item is eaten. |
| `consuming_time_modifier` | [Modifier](../shared_data_types#modifier) or List | optional | This modifier will be applied on the maximum time the item is being consumed (in ticks). |
| `priority` | [Integer](../basic_concepts#integer) | `0` | Determines the priority of which the power will apply its modification to the item. Must be higher than 0 if the item is already edible.

#### Food Properties

:::tip
The actual food saturation level is determined by the `nutrition * saturation * 2` formula.
:::

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `nutrition` | [Integer](../basic_concepts#integer) | **required** | The amount of hunger the food component recovers upon consumption. |
| `saturation` | [Float](../basic_concepts#float) | **required** | The amount of saturation to give the player upon consumption. |
| `can_always_eat` | [Boolean](../basic_concepts#boolean) | `false` | Whether this food component is edible at full hunger or not. |
| `eat_seconds` | [Float](../basic_concepts#float) | `1.6F` | The time it takes to eat this food component (in seconds). |
| `using_converts_to` | [ItemStack](../minecraft_data_types.md#item-stack) | optional | If specified, this item stack will be given to the player. |
| `effects` | List of [PossibleEffect](#possibleeffect) | optional | A status effect and the chance of it triggering upon consuming something with this food component. |

#### PossibleEffect

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | [MobEffectInstance](../minecraft_data_types#mobeffectinstance) | **required** | The status effect to apply. |
| `probability` | [Float](../basic_concepts#float) | `1.0F` | The probability of the effect triggering upon consumption. |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:edible_item",
    "item_condition": {
        "type": "origins:ingredient",
        "ingredient": {
            "item": "minecraft:axolotl_bucket"
        }
    },
    "food_properties": {
        "nutrition": 4,
        "saturation": 1,
        "using_converts_to": {
            "id": "minecraft:water_bucket",
            "count": 1
        }
    },
    "use_action": "eat"
}
```

This example will grant the players the ability to eat axolotls in buckets. It will give 4 hunger shanks and 8 saturation (4 * 1 * 2), it also counts as meat. This returns a water bucket upon consumption and uses the eat action.

</details>

### `origins:effect_immunity`

Grants immunity to specific status effects.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | [Identifier](../basic_concepts#identifier) or List | **required** | Effect ID(s) to be immune to |
| `inverted` | [Boolean](../basic_concepts#boolean) | `false` | If `true`, only the listed effects apply |

<details>
<summary>Example</summary>

```json
{
	"type": "origins:effect_immunity",
	"effects": [
		"minecraft:weakness",
		"minecraft:strength"
	]
}
```

This example will make the entity immune to the Weakness and Strength status effects.

</details>

### `origins:elytra_flight`

Grants elytra flight capability without needing an elytra item.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `render_elytra` | [Boolean](../basic_concepts#boolean) | `true` | Whether to render elytra wings on the player |
| `texture_location` | [Identifier](../basic_concepts#identifier) | optional | Custom elytra texture location |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:elytra_flight",
  "render_elytra": true
}
```

This example power will grant the player the ability to fly like an elytra, and it will render the default elytra wings on the player.

</details>

### `origins:entity_glow`

Makes other entities glow (outline) for the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition for entities that glow |
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Bi-entity relationship condition |
| `use_teams` | [Boolean](../basic_concepts#boolean) | `true` | Whether to use team colors |
| `color` | [Integer](../basic_concepts#integer) | `0xFFFFFFFF` | ARGB color for the glow outline |

<details>
<summary>Example</summary>

```json
{
	"type": "origins:entity_glow",
    "entity_condition": {
      	"type": "origins:and",
      	"conditions": [
        	{
          		"type": "origins:in_block_anywhere",
          		"block_condition": {
            		"type": "origins:in_tag",
            		"tag": "origins:cobwebs"
          		}
        	},
        	{
          		"type": "origins:entity_group",
          		"group": "arthropod",
          		"inverted": true
        	}
      	]
    }
}
```

This example will make all entities which are not arthropods glow when they're in cobwebs. The glow is the same color as the entity's team.

</details>

### `origins:entity_set`

Adds the entity to an entity set (tag-based group).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `set` | [Identifier](../basic_concepts#identifier) | **required** | Entity set ID |

### `origins:exhaust`

Adds exhaustion to the player at regular intervals.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `interval` | [Integer](../basic_concepts#integer) | `20` | Interval in ticks |
| `exhaustion` | [Float](../basic_concepts#float) | `1.0` | Exhaustion amount per interval |

<details>
<summary>Example</summary>

```json
"entity_action": {
    "type": "origins:exhaust",
    "amount": 0.4
}
```

This example will apply 0.4 exhaustion to the player, which is similar in effect to jumping 8 times (without sprinting).

</details>

### `origins:fire_immunity`

Grants immunity to fire damage.

<details>
<summary>Example</summary>

```json
{
    "type": "origins:fire_immunity",
    "condition": {
        "type": "origins:equipped_item",
        "equipment_slot": "mainhand",
        "item_condition": {
            "type": "origins:ingredient",
            "ingredient": {
                "item": "minecraft:magma_block"
            }
        }
    }
}
```

This example will grant immunity to fire if the entity is holding a Magma Block in their mainhand.

</details>

### `origins:fire_projectile`

Fires a projectile on key press with cooldown.

:::warning
Using [entity action version](../action/entity_action_types#originsfire_projectile) is more recommended
:::

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_type` | [Identifier](../basic_concepts#identifier) | **required** | Entity type ID of the projectile |
| `cooldown` | [Integer](../basic_concepts#integer) | `1` | Cooldown in ticks |
| `hud_render` | [Hud Render](../shared_data_types#hudrender) | optional | HUD display settings |
| `count` | [Integer](../basic_concepts#integer) | `1` | Number of projectiles to fire |
| `interval` | [Integer](../basic_concepts#integer) | `0` | Interval between projectiles when firing multiple |
| `start_delay` | [Integer](../basic_concepts#integer) | `0` | Delay before the first projectile |
| `speed` | [Float](../basic_concepts#float) | `1.5` | Projectile speed |
| `divergence` | [Float](../basic_concepts#float) | `1.0` | Random spread angle |
| `sound` | [Identifier](../basic_concepts#identifier) | optional | Sound event ID played on fire |
| `tag` | NBT | optional | NBT data applied to the projectile |
| `key` | [Key](../shared_data_types#key) | optional | Key binding settings |
| `projectile_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the projectile |
| `shooter_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the shooter |

### `origins:freeze`

Causes the player to freeze (like in powdered snow).

<details>
<summary>Example</summary>

```json
{
    "type": "origins:freeze"
}
```

This example will freeze the entity that has the power.

</details>

### `origins:grounded`

Prevents the player from flying (elytra, creative flight, etc.).

<details>
<summary>Example</summary>

```json
{
    "type": "origins:grounded"
}
```

The most basic example - always counts the player as being on the ground, allowing them to jump even while in the air.

</details>

### `origins:hover`

:::caution Unstable
This power is currently unstable and may not work as intended. Please report if you encounter any issues with it.
:::

Keeps the power holder at their current vertical velocity, allowing them to hover in place.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `step_assist` | [Float](../basic_concepts#float) | `0` | Reserved step-assist distance |

### `origins:ignore_water`

Makes the player ignore water for movement (walk through water normally).

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:ignore_water"
}
```

This example makes the entity that has the power ignore water. :)

</details>

### `origins:inventory`

Provides an additional inventory accessible via key press.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | [Text Component](../minecraft_data_types#text-component) | `container.inventory` | Container title |
| `container_type` | [String](../basic_concepts#string) | `dispenser` | Container type: `chest_1x9` `chest_2x9` `chest_3x9` `chest_4x9` `chest_5x9` `chest_6x9` `hopper` `dispenser` |
| `drop_on_death` | [Boolean](../basic_concepts#boolean) | `false` | Whether contents drop on death |
| `drop_on_death_filter` | [Item Condition](../condition/item_condition_types) | optional | Filter for items that should drop on death |
| `recoverable` | [Boolean](../basic_concepts#boolean) | `true` | Whether items are recovered when re-gaining the power |
| `key` | [Key] | optional | Key binding settings |

### `origins:invisibility`

Makes the player invisible.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `render_armor` | [Boolean](../basic_concepts#boolean) | `false` | Whether armor is rendered while invisible |
| `render_outline` | [Boolean](../basic_concepts#boolean) | `false` | Whether the player outline is rendered |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:invisibility",
	"render_armor": false,
	"condition": {
		"type": "origins:on_fire",
		"inverted": true
	}
}
```

This example will make the entity that has the power invisible if the entity is not burning, even hiding the armor.

</details>

### `origins:invulnerability`

Grants damage invulnerability.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition for damage types the player is vulnerable to (unless `inverted`) |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:invulnerability",
	"damage_condition": {
		"type": "origins:name",
		"name": "fall"
	}
}
```

This example will make the entity immune to fall damage.

</details>

### `origins:item_on_item`

Combines two items on right-click.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `using_item_condition` | [Item Condition](../condition/item_condition_types) | optional | Condition for the item in hand |
| `on_item_condition` | [Item Condition](../condition/item_condition_types) | optional | Condition for the target item |
| `result` | [Item Stack](../minecraft_data_types#item-stack) | optional | Result item |
| `result_action` | [Item Action](../action/item_action_types) | optional | Action applied to the result |
| `using_item_stack_amount` | [Integer](../basic_concepts#integer) | `1` | Consumed amount from the using item |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:item_on_item",
    "on_item_condition": {
        "type": "origins:smeltable"
    },
    "using_item_condition": {
        "type": "origins:ingredient",
        "ingredient": {
            "item": "minecraft:coal"
        }
    },
    "result_from_on_stack": 8,
    "result_item_action": {
        "type": "origins:modify",
        "modifier": "example:furnace_smelt"
    },
    "using_item_action": {
        "type": "origins:consume",
        "amount": 1
    }
}
```

This example will smelt smeltable items by using a Coal item on it.

</details>

### `origins:keep_inventory`

Keeps the player's inventory on death.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `slots` | List of [Integer](../basic_concepts#integer) | optional | Specific inventory slot indices to keep |
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Condition for items to keep |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:keep_inventory",
    "slots": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
    ]
}
```

This example will make items in the hotbar slots persist.

</details>

### `origins:launch`

Launches the player into the air on key press.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `speed` | [Float](../basic_concepts#float) | **required** | Upward launch speed |
| `cooldown` | [Integer](../basic_concepts#integer) | `1` | Cooldown in ticks |
| `hud_render` | [Hud Render](../shared_data_types#hudrender) | optional | HUD display settings |
| `sound` | [Identifier](../basic_concepts#identifier) | optional | Sound event ID played on launch |
| `key` | [Key](../shared_data_types#key) | optional | Key binding settings |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:launch",
  	"cooldown": 600,
  	"hud_render": {
    	"bar_index": 4
  	},
  	"sound": "minecraft:entity.parrot.fly",
  	"speed": 2,
  	"key": {
    	"key": "key.origins.primary_active",
    	"continuous": true
  	}
}
```

This example will launch the player into the air, with a cooldown of 30 seconds.

</details>

### `origins:like_water`

Makes the player treated as being in water for various checks.

### `origins:model_color`

Changes the player model's render color.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `red` | [Float](../basic_concepts#float) | optional | Red channel (0-1) |
| `green` | [Float](../basic_concepts#float) | optional | Green channel (0-1) |
| `blue` | [Float](../basic_concepts#float) | optional | Blue channel (0-1) |
| `alpha` | [Float](../basic_concepts#float) | optional | Alpha channel (0-1) |
| `color` | [Integer](../basic_concepts#integer) | optional | ARGB color as a single integer |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:model_color",
  	"red": 0.5,
  	"green": 0.5,
  	"alpha": 0.7
}
```

This example will give the entity's texture a blue-ish tint and makes it slightly transparent.

</details>

### `origins:multiple`

Allows for defining more than one power in a single file.

Any "key", except for `type`, `name`, `description`, `condition`, `hidden`, `loading_priority`, and `badges`, is considered a sub-power and takes a fully-defined power type as the value.

<details>
<summary>Example</summary>

```json
{
    "type": "origins:multiple",
    "toggle": {
        "type": "origins:toggle",
        "active_by_default": false,
        "key": {
            "key": "key.origins.secondary_active"
        }
    },
    "invisibility": {
        "type": "origins:invisibility",
        "render_armor": false,
        "condition": {
            "type": "origins:power_active",
            "power": "*:*_toggle"
        }
    }
}
```

This example super-power has two "keys", which are considered sub-powers: `toggle` and `invisibility`. The `invisibility` sub-power will only be active (e.g: make the entity invisible) if the `toggle` sub-power is toggled ON.

</details>

:::warning
Using multiple powers in a multiple power is not recommended.
:::

### `origins:night_vision`

Grants night vision.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `strength` | [Float](../basic_concepts#float) | `1.0` | Night vision strength (0-1) |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:night_vision"
}
```

This example will give the player regular night vision.

</details>

### `origins:overlay`

Renders an overlay texture on the screen.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `texture` | [Identifier](../basic_concepts#identifier) | **required** | Overlay texture location |
| `strength` | [Float](../basic_concepts#float) | `1.0` | Overlay opacity (0-1) |
| `draw_mode` | [String](../basic_concepts#string) | optional | Drawing mode (e.g. `nausea`) |
| `draw_phase` | [String](../basic_concepts#string) | optional | Drawing phase |
| `texture_width` | [Integer](../basic_concepts#integer) | optional | Override texture width |
| `texture_height` | [Integer](../basic_concepts#integer) | optional | Override texture height |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:overlay",
    "texture": "minecraft:textures/block/ice.png",
    "strength": 1.0,
    "red": 1.0,
    "green": 1.0,
    "blue": 1.0,
    "draw_mode": "texture",
    "draw_phase": "below_hud",
    "hide_with_hud": false,
    "visible_in_third_person": false
}
```

This example will render an overlay with the texture of an Ice block, below the HUD and is not visible in third person.

</details>

### `origins:particle`

Spawns particles around the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `particle` | [Particle Option](../minecraft_data_types#particle-option) | **required** | Particle type and params |
| `frequency` | [Integer](../basic_concepts#integer) | `4` | How often to spawn particles (ticks per spawn) |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:particle",
  	"particle": "minecraft:portal",
  	"frequency": 4
}
```

This example will continuously spawn portal particles on the entity that has the power.

</details>

### `origins:permanent_effect`

:::caution Unstable

This power is currently unstable and may not work as intended. Please report if you encounter any issues with it.

:::

Applies permanent effects to the player. Cannot be removed by milk or other means.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | [EffectEntry](../shared_data_types#effectentry) or List | **required** | Status effect to apply |
| `allow_higher_level` | [Boolean](../basic_concepts#boolean) | `false` | Whether to allow higher level effects to override this effect |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:permanent_effect",
    "effect": {
        "effect": "minecraft:strength",
        "amplifier": 1,
        "show_particles": false,
        "show_icon": false
    }
}
```

This example will give the player Strength II, without particles or icon.

</details>

### `origins:phasing`

Allows the player to phase through blocks.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `blacklist` | [Boolean](../basic_concepts#boolean) | `false` | If `true`, the block condition becomes a blacklist instead of whitelist |
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition for blocks to phase through (or to block phasing if blacklist) |
| `render_type` | [String](../basic_concepts#string) | `blindness` | Visual effect: `blindness` or `remove_blocks` |
| `view_distance` | [Float](../basic_concepts#float) | `10.0` | How far the player can see while phasing |
| `phase_down_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition to phase downward (default requires sneaking) |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:phasing",
  	"blacklist": true,
  	"render_type": "blindness",
  	"view_distance": 10,
  	"block_condition": {
    	"type": "origins:in_tag",
    	"tag": "origins:unphasable"
  	},
  	"phase_down_condition": {
    	"type": "origins:and",
    	"conditions": [
      		{
        		"type": "origins:sneaking"
      		},
      		{
        		"type": "origins:on_block"
      		}
    	]
  	}
}
```

This example will allow the player to phase through all blocks except for those in the `origins:unphasable` (`data/origins/tags/blocks/unphasable.json`) block tag. They can also phase down while sneaking, but will make a short stop at each block so they don't take fall damage.

</details>

### `origins:recipe`

Grants additional crafting recipes to the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `recipe` | [Identifier](../basic_concepts#identifier) | **required** | Recipe ID to grant |
| `replace` | [Boolean](../basic_concepts#boolean) | optional | If true, replace existing recipe |
| `priority` | [Integer](../basic_concepts#integer) | `0` | Priority of the power, higher priority powers are executed first |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:recipe",
    "recipe": {
      	"id": "origins:master_of_webs/web_crafting",
      	"type": "minecraft:crafting_shapeless",
      	"ingredients": [
        	{
          		"item": "minecraft:string"
        	},
        	{
          		"item": "minecraft:string"
        	}
      	],
      	"result": {
        	"id": "minecraft:cobweb"
      	}
    }
}
```

This example will allow the player that has the power to craft Cobwebs by combining two strings in a crafting grid with no specific order.

</details>

### `origins:replace_loot_table`

Replaces loot tables.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `replace` | Object | **required** | Map of original loot table -> replacement loot table IDs |
| `priority` | [Integer](../basic_concepts#integer) | `0` | Priority of the power, higher priority powers are executed first |

### `origins:resource`

Provides a numeric resource that can be modified by actions.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `min` | [Integer](../basic_concepts#integer) | **required** | Minimum resource value |
| `max` | [Integer](../basic_concepts#integer) | **required** | Maximum resource value |
| `hud_render` | [Hud Render](../shared_data_types#hudrender) | optional | HUD display settings |
| `start_value` | [Integer](../basic_concepts#integer) | optional | Initial resource value (defaults to min) |
| `min_action` | [Entity Action](../action/entity_action_types) | optional | Action executed when resource hits minimum |
| `max_action` | [Entity Action](../action/entity_action_types) | optional | Action executed when resource hits maximum |

### `origins:restrict_armor`

Prevents equipping armor that does not match conditions.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `head` | [Item Condition](../condition/item_condition_types) | optional | Condition for allowed helmets |
| `chest` | [Item Condition](../condition/item_condition_types) | optional | Condition for allowed chestplates |
| `legs` | [Item Condition](../condition/item_condition_types) | optional | Condition for allowed leggings |
| `feet` | [Item Condition](../condition/item_condition_types) | optional | Condition for allowed boots |
| `tick_rate` | [Integer](../basic_concepts#integer) | `20` | Interval for checking equipment |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:restrict_armor",
    "head": {
        "type": "origins:armor_value",
        "comparison": ">",
        "compare_to": 2
    },
    "chest": {
        "type": "origins:armor_value",
        "comparison": ">",
        "compare_to": 5
    },
    "legs": {
        "type": "origins:armor_value",
        "comparison": ">",
        "compare_to": 4
    },
    "feet": {
        "type": "origins:armor_value",
        "comparison": ">",
        "compare_to": 1
    }
}
```

This example will prevent the entity from equipping any armor which has more defense than chainmail.

</details>

### `origins:scare_creepers`

Causes nearby creepers to flee from the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `radius` | [Float](../basic_concepts#float) | optional | Effect radius |
| `speed` | [Float](../basic_concepts#float) | optional | Scare effect intensity |

### `origins:self_glow`

Makes the player glow.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `use_teams` | [Boolean](../basic_concepts#boolean) | `true` | Whether to use team colors |
| `color` | [Integer](../basic_concepts#integer) | optional | ARGB color for the glow |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:self_glow",
    "use_teams": false,
    "red": 0.56862745098,
    "green": 0.89019607843,
    "blue": 0.65098039215,
    "condition": {
        "type": "origins:in_rain"
    }
}
```

This example will make the entity that has the power glow for everyone if the entity in question is in rain.

</details>

### `origins:shader`

Applies a post-processing shader to the player's view.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `shader` | [Identifier](../basic_concepts#identifier) | **required** | Shader resource location |
| `toggleable` | [Boolean](../basic_concepts#boolean) | optional | Whether the shader can be toggled |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:shader",
  	"shader": "minecraft:shaders/post/pencil.json"
}
```

This example makes the player view the world as a pencil sketch!

</details>

### `origins:shaking`

Causes the player's camera to shake.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `shake_intensity` | [Float](../basic_concepts#float) | optional | Shake intensity |
| `shake_frequency` | [Float](../basic_concepts#float) | optional | Shake frequency |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:shaking",
  	"condition": {
    	"type": "origins:on_fire",
      "inverted": true
  	}
}
```

This example will make the entity shake if the entity is not burning.

</details>

### `origins:sprinting`

:::caution Unstable
This power is currently unstable and may not work as intended. Please report if you encounter any issues with it.
:::

Makes the power holder sprint while the power is active.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `requires_input` | [Boolean](../basic_concepts#boolean) | `false` | Only force sprint while the player is already sprinting |

### `origins:stacking_effect`

Applies status effects that stack based on a condition.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | [EffectEntry](../shared_data_types#effectentry) or List | **required** | Effects to apply |
| `min_stacks` | [Integer](../basic_concepts#integer) | `0` | Minimum effect amplifier stacks |
| `max_stacks` | [Integer](../basic_concepts#integer) | `10` | Maximum effect amplifier stacks |
| `duration_per_stack` | [Integer](../basic_concepts#integer) | `10` | Effect duration per stack in seconds |

### `origins:starting_equipment`

Grants items when the power is gained.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `stack` | [PositionedItemStack](../shared_data_types#positioneditemstack) or List | **required** | Items to grant, optionally with slot position |
| `recurrent` | [Boolean](../basic_concepts#boolean) | `false` | If `true`, items are also granted on respawn |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:starting_equipment",
  	"stacks": [
    	{
      		"item": "minecraft:compass"
    	},
    	{
      		"item": "minecraft:clock"
    	},
    	{
      		"item": "minecraft:map",
	    	"amount": 9
    	}
  	]
}
```

This example will give the player the "Explorer Kit" known from Origins: Classes that consists of a compass, a clock and 9 empty maps.

</details>

### `origins:status_bar_texture`

Changes the player's status bar textures (hearts, hunger, etc.).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `texture` | [Identifier](../basic_concepts#identifier) | **required** | Texture location |
| `draw_mode` | [String](../basic_concepts#string) | optional | Drawing mode |
| `priority` | [Integer](../basic_concepts#integer) | `0` | Draw priority |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:status_bar_texture",
    "texture": "example:textures/gui/custom_thing.png"
}
```

This example will replace the status bar textures with the `example:textures/gui/custom_thing.png` (`assets/example/textures/gui/custom_thing.png`) sprite sheet.

</details>

### `origins:toggle`

A toggleable power that can be switched on/off via key press.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `active_by_default` | [Boolean](../basic_concepts#boolean) | `true` | Whether the power starts active |
| `retain_state` | [Boolean](../basic_concepts#boolean) | `true` | Whether the state persists across deaths/dimension changes |
| `key` | [Key](../shared_data_types#key) | optional | Key binding settings |

### `origins:tooltip`

Adds a tooltip line to the player's items.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `text` | [Text Component](../minecraft_data_types#text-component) | **required** | Tooltip text |
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Condition for items that get the tooltip |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:tooltip",
    "sprite": "origins:textures/gui/badge/star.png",
    "text": "A gold star!"
}
```

This example will display the `origins:textures/gui/badge/star.png` texture alongside a text that says "`A gold star!`"

</details>

### `origins:walk_on_fluid`

Allows the player to walk on a specific fluid.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fluid` | [Identifier](../basic_concepts#identifier) | **required** | Fluid ID to walk on (e.g. `minecraft:water`) |

<details>
<summary>Example</summary>

```json
{
  	"type": "origins:walk_on_fluid",
  	"fluid": "minecraft:lava",
  	"condition": {
    	"type": "origins:fluid_height",
    	"fluid": "minecraft:lava",
    	"comparison": "<=",
    	"compare_to": 0.4
  	}
}
```

This example will allow the entity that has the power to walk on lava similar to Striders. The suggested condition was added to allow the entity to swim in lava once they sink, which may happens when they walk into a Lava-fall.

</details>

### `origins:water_breathing`

Grants water breathing (prevents drowning).

### `origins:water_vision`

Improves underwater visibility.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `strength` | [Float](../basic_concepts#float) | `1.0` | Vision clarity strength (0-1) |

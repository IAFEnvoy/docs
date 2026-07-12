---
sidebar_position: 3
---

# Prevent Powers

These powers prevent certain actions.

---

### `origins:prevent_being_used`

Prevents other entities from interacting with the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Condition that must be met to block the interaction |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:prevent_being_used",
    "bientity_action": {
        "type": "origins:actor_action",
        "action": {
            "type": "origins:execute_command",
            "command": "title @s actionbar {\"text\": \"Entity cannot be interacted with!\", \"color\": \"red\"}"
        }
    }
}
```

This example will prevent other players from "using" (right-clicking) the entity that has the power and inform them that the 'entity cannot be interacted with'.

</details>

### `origins:prevent_block_place`

Prevents placing certain blocks.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition for blocks prevented from placement |

### `origins:prevent_block_selection`

Prevents selecting (mining outline) of certain blocks.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition for blocks prevented from selection |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:prevent_block_selection",
    "block_condition": {
      "type": "origins:in_tag",
      "tag": "origins:cobwebs"
    },
    "condition": {
      "type": "origins:sneaking",
      "inverted": true
    }
}
```

This example will prevent the selection of cobwebs (including the Temporary Cobweb block from the Arachnid's power), allowing the player to punch through them, unless they sneak.

</details>

### `origins:prevent_block_use`

Prevents using (right-clicking) certain blocks.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition for blocks prevented from use |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:prevent_block_use",
    "block_condition": {
      "type": "origins:block",
      "block": "minecraft:crafting_table"
    }
}
```

This example will prevent the player from using Crafting Tables.

</details>

### `origins:prevent_death`

Prevents the player from dying.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition for damage types prevented from killing |
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed when death is prevented |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:prevent_death",
    "entity_action": {
		"type": "origins:and",
		"actions": [
			{
				"type": "origins:clear_effect"
			},
			{
				"type": "origins:apply_effect",
				"effects": [
					{
						"effect": "minecraft:regeneration",
						"amplifier": 1,
						"duration": 900
					},
					{
						"effect": "minecraft:fire_resistance",
						"duration": 800
					},
					{
						"effect": "minecraft:absorption",
						"amplifier": 1,
						"duration": 100
					}
				]
			}
		]
	}
}
```

This example will always prevent the entity from dying and then apply the same effects as a Totem of Undying, e.g: clear all status effects on the entity and then apply Regeneration II, Fire Resistance I and Absorption I.

</details>

### `origins:prevent_elytra_flight`

Prevents elytra flight activation.

<details>
<summary>Example</summary>

```json
{
    "type": "origins:prevent_elytra_flight",
    "entity_action": {
        "type": "origins:execute_command",
        "command": "tellraw @s {\"text\": \"You cannot glide from this height!\", \"color\": \"red\"}"
    },
    "condition": {
        "type": "origins:in_block",
        "block_condition": {
            "type": "origins:height",
            "comparison": "<=",
            "compare_to": 64
        }
    }
}
```

This example will display a warning and prevent the entity that has the power from flying with an Elytra if they're at Y=64 or lower.

</details>

### `origins:prevent_entity_collision`

Prevents collision with certain entities.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Condition for entities whose collision is prevented |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:prevent_entity_collision"
}
```

This example will prevent the entity that has the power from colliding with other entities.

</details>

### `origins:prevent_entity_render`

Prevents rendering of certain entities.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition for entities hidden from rendering |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:prevent_entity_render",
    "entity_condition": {
		"type": "origins:entity_type",
		"entity_type": "minecraft:creeper"
	},
	"condition": {
		"type": "origins:daytime"
	}
}
```

This example will make creepers invisible for the player that has the power during the day.

</details>

### `origins:prevent_entity_use`

Prevents interacting with certain entities.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Condition for entities prevented from interaction |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:prevent_entity_use",
    "bientity_action": {
        "type": "origins:actor_action",
        "action": {
            "type": "origins:execute_command",
            "command": "title @s actionbar {\"text\": \"Cannot interact with pigs!\", \"color\": \"red\"}"
        }
    },
    "bientity_condition": {
        "type": "origins:target_condition",
        "condition": {
            "type": "origins:entity_type",
            "entity_type": "minecraft:pig"
        }
    }
}
```

This example will prevent the player that has the power from interacting with a Pig (also prevent powers that enables you to interact with a Pig) and executes an [Execute Command (Entity Action Type)](../entity_action_types/execute_command) to the entity that has attempted to interact with a Pig.

</details>

### `origins:prevent_game_event`

Prevents certain game events from being detected (e.g. sculk sensors).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `event` | Identifier or List | optional | Game event ID(s) to prevent |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:prevent_game_event",
    "event": "minecraft:hit_ground",
    "entity_action": {
        "type": "origins:execute_command",
        "command": "say donk"
    }
}
```

This example will prevent the entity that has the power to emit a `minecraft:hit_ground` game event, which is usually emitted by landing on the ground upon falling.

</details>

### `origins:prevent_item_pickup`

Prevents picking up certain items.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Condition for items prevented from pickup |
| `priority` | [Integer](../basic_concepts#integer) | `0` | Priority of the power, higher priority powers are executed first |

### `origins:prevent_item_use`

Prevents using certain items.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Condition for items prevented from use |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:prevent_item_use",
  "item_condition": {
    "type": "origins:ingredient",
    "ingredient": {
      "tag": "origins:meat"
    }
  }
}
```

This example will prevent other players from "using" (right-clicking) the entity that has the power and inform them that the 'entity cannot be interacted with'.

</details>

### `origins:prevent_sleep`

Prevents the player from sleeping in beds.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition for beds prevented from use |
| `message` | [Text Component](../minecraft_data_types#text-component) | optional | Custom message shown when sleep is blocked |
| `set_spawn` | [Boolean](../basic_concepts#boolean) | `true` | Whether the bed can still set the player's spawn point |
| `priority` | [Integer](../basic_concepts#integer) | `0` | Priority of the power, higher priority powers are executed first |

<details>
<summary>Example</summary>

```json
{
    "type": "origins:prevent_sleep",
	"message": "It's not hot enough for you to sleep",
    "condition": {
		"type": "origins:on_fire",
		"inverted": true
	}
}
```

This example will prevent the player from sleeping unless they are burning.

</details>

### `origins:prevent_sprinting`

Prevents the player from sprinting.

<details>
<summary>Example</summary>

```json
{
    "type": "origins:prevent_sprinting",
    "condition": {
        "type": "origins:food_level",
        "compare_to": 12,
        "comparison": "<="
    }
}
```

This example will prevent the player from sprinting if their food level is at, or below 6 hunger shanks

</details>

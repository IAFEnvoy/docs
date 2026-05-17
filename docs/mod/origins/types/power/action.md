---
sidebar_position: 1
---

# Action Powers

These powers execute actions in response to events.

---

### `origins:action_on_callback`

Executes entity actions at lifecycle events.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action_respawned` | [Entity Action](../action/entity_action_types) | optional | Action executed when the player respawns |
| `entity_action_removed` | [Entity Action](../action/entity_action_types) | optional | Action executed when the power is revoked |
| `entity_action_gained` | [Entity Action](../action/entity_action_types) | optional | Action executed when the power is granted |
| `entity_action_lost` | [Entity Action](../action/entity_action_types) | optional | Action executed when the power is lost (revoked) |
| `entity_action_added` | [Entity Action](../action/entity_action_types) | optional | Action executed when the power becomes active |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:action_on_callback",
  "entity_action_gained": {
    "type": "origins:execute_command",
    "command": "say I have gained this power!"
  },
  "entity_action_lost": {
    "type": "origins:execute_command",
    "command": "say I have lost this power!"
  }
}
```

This example will give the player the Luck I (30:00) status effect the moment the player has chosen the origin that has the power, unless the player used the Orb of Origin item to choose that origin.

</details>

### `origins:action_on_being_used`

Executes actions when another entity interacts with the player.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_action` | [Bi-entity Action](../action/bientity_action_types) | optional | Action executed (actor = other entity, target = player) |
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Condition that must be met for the action to execute |


<details>
<summary>Example</summary>

```json
{
    "type": "origins:action_on_being_used",
    "bientity_action": {
        "type": "origins:mount"
    },
    "bientity_condition": {
        "type": "origins:target_condition",
        "condition": {
            "type": "origins:passenger",
            "inverted": true
        }
    }
}
```

This example will grant the players the ability to mount the target entity that has the power upon "using" (right-clicking) the said entity, unless the entity that has the power already has a passenger.

</details>

### `origins:action_on_block_break`

Executes actions when the player breaks a block.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |
| `block_action` | [Block Action](../action/block_action_types) | optional | Action executed at the broken block's position |
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition the broken block must meet |
| `only_when_harvested` | [Boolean](../basic_concepts#boolean) | `false` | Only trigger if the block was successfully harvested |


<details>
<summary>Example</summary>

```json
{
    "type": "origins:action_on_block_break",
    "entity_action": {
        "type": "origins:damage",
        "amount": 2.0,
        "source": {
            "name": "onFire",
            "bypasses_armor": true,
            "fire": true
        }
    },
    "block_action": {
        "type": "origins:set_block",
        "block": "minecraft:lava"
    },
    "block_condition": {
        "type": "origins:block",
        "block": "minecraft:magma_block"
    },
    "only_when_harvested": false
}
```

This example will deal 1 heart of `onFire` damage to the player, and place a Lava fluid at where the Magma Block previously was if the player were to mine a Magma Block.

</details>

### `origins:action_on_block_place`

Executes actions when the player places a block.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |
| `block_action` | [Block Action](../action/block_action_types) | optional | Action executed at the placed block's position |
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition the placed block must meet |

### `origins:action_on_block_use`

Executes actions when the player right-clicks a block.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |
| `block_action` | [Block Action](../action/block_action_types) | optional | Action executed on the block |
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition the block must meet |


<details>
<summary>Example</summary>

```json
{
	"type": "origins:action_on_block_use",
	"block_action": {
		"type": "origins:set_block",
		"block": "minecraft:gold_block"
	},
	"block_condition": {
		"type": "origins:block",
		"block": "minecraft:iron_block"
	},
	"directions": [
		"up",
		"down"
	],
	"condition": {
		"type": "origins:sprinting"
	}
}
```

This example will replace any iron blocks with gold blocks if you right click the top or bottom of the block while sprinting.

</details>

### `origins:action_on_death`

Executes actions when the player dies.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the killing damage must meet |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:action_on_death",
  "entity_action": {
    "type": "origins:execute_command",
    "command": "say I died!"
  }
}
```

This example will grant the players the ability to mount the target entity that has the power upon "using" (right-clicking) the said entity, unless the entity that has the power already has a passenger.

</details>

### `origins:action_on_entity_use`

Executes actions when the player right-clicks an entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |
| `target_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the target entity |
| `bientity_action` | [Bi-entity Action](../action/bientity_action_types) | optional | Bi-entity action executed |
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Condition that must be met |


<details>
<summary>Example</summary>

```json
{
    "type": "origins:action_on_entity_use",
    "bientity_action": {
        "type": "origins:target_action",
        "action": {
            "type": "origins:and",
            "actions": [
                {
                    "type": "origins:heal",
                    "amount": 2
                },
                {
                    "type": "origins:execute_command",
                    "command": "particle heart ~ ~0.5 ~ 0.3 0.3 0.3 0.009 4 normal @a"
                }
            ]
        }
    },
    "bientity_condition": {
        "type": "origins:owner"
    },
    "item_condition": {
        "type": "origins:empty"
    },
    "hands": [
        "main_hand"
    ],
    "condition": {
        "type": "origins:sneaking"
    }
}
```

This example will heal and display the heart particle effects at the tamed mob if the mob in question is owned by the player that has the power.

</details>

### `origins:action_on_hit`

Executes actions when the player hits an entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |
| `target_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the target |
| `bientity_action` | [Bi-entity Action](../action/bientity_action_types) | optional | Bi-entity action executed |
| `bientity_condition` | [Bi-entity Condition](../condition/bientity_condition_types) | optional | Condition that must be met |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the damage must meet |


<details>
<summary>Example</summary>

```json
{
    "type": "origins:action_on_hit",
    "bientity_action": {
        "type": "origins:add_velocity",
        "z": 2
    }
}
```

This example will add positive-Z axis velocity to the entity that's been hit by the entity that has the power, essentially granting the entity with this power extra knockback.

</details>

### `origins:action_on_item_pickup`

Executes actions when the player picks up an item.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |
| `item_action` | [Item Action](../action/item_action_types) | optional | Action executed on the picked-up item |
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Condition the item must meet |

### `origins:action_on_item_use`

Executes actions when the player uses an item.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |
| `item_action` | [Item Action](../action/item_action_types) | optional | Action executed on the item |
| `item_condition` | [Item Condition](../condition/item_condition_types) | optional | Condition the item must meet |


<details>
<summary>Example</summary>

```json
{
    "type": "origins:action_on_item_use",
    "entity_action": {
        "type": "origins:feed",
        "food": 1.0,
        "saturation": 1.0
    },
    "item_condition": {
        "type": "origins:ingredient",
        "ingredient": {
            "item": "minecraft:potion"
        }
    }
}
```

This example will give half a shank of hunger, and 1 saturation point if the player drinks any kind of potion.

</details>

### `origins:action_on_land`

Executes actions when the player lands on the ground.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |


<details>
<summary>Example</summary>

```json
{
    "type": "origins:action_on_land",
    "entity_action": {
        "type": "origins:execute_command",
        "command": "fill ~1 ~-1 ~1 ~-1 ~-1 ~-1 minecraft:air replace minecraft:grass_block"
    },
    "condition": {
        "type": "origins:fall_distance",
        "comparison": ">",
        "compare_to": 4
    }
}
```

This example will execute an [Execute Command](../action/entity_action_types) that will then execute a `/fill` command that will replace a 3x3 area of Grass Blocks with Air underneath the entity's feet if the entity in question has been falling for 4 or more blocks.

</details>

### `origins:action_on_wake_up`

Executes actions when the player wakes up from sleeping.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |
| `block_action` | [Block Action](../action/block_action_types) | optional | Action at the bed position |
| `block_condition` | [Block Condition](../condition/block_condition_types) | optional | Condition the bed/hit block must meet |


<details>
<summary>Example</summary>

```json
{
    "type": "origins:action_on_wake_up",
    "entity_action": {
        "type": "origins:and",
        "actions": [
            {
                "type": "origins:execute_command",
                "command": "title @s actionbar {\"translate\": \"You feel %1$s but %2$s\", \"color\": \"yellow\", \"with\": [{\"text\": \"rejuvenated\", \"color\": \"green\"}, {\"text\": \"hungry...\", \"color\": \"red\"}]}"
            },
            {
                "type": "origins:apply_effect",
                "effects": [
                    {
                        "effect": "minecraft:regeneration",
                        "duration": 100,
                        "amplifier": 1,
                        "is_ambient": true,
                        "show_particles": true,
                        "show_icon": true
                    },
                    {
                        "effect": "minecraft:hunger",
                        "duration": 100,
                        "amplifier": 2,
                        "is_ambient": true,
                        "show_particles": true,
                        "show_icon": true
                    }
                ]
            }
        ]
    },
    "block_condition": {
        "type": "origins:block",
        "block": "minecraft:red_bed"
    }
}
```

This example will apply a Regeneration II and Hunger III status effect that both lasts for 5 seconds, and execute a `/title` command that will display a "`You feel rejuvenated but hungry...`" message in the actionbar if the player has woken up from sleeping in a Red Bed.

</details>

### `origins:action_over_time`

Executes an entity action at regular intervals.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed each interval |
| `active_action` | [Entity Action](../action/entity_action_types) | optional | Action executed when the condition becomes true |
| `inactive_action` | [Entity Action](../action/entity_action_types) | optional | Action executed when the condition becomes false |
| `interval` | [Integer](../basic_concepts#integer) | `20` | Interval in ticks between actions |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:action_over_time",
  "entity_action": {
    "type": "origins:feed",
    "food": 1,
    "saturation": 1
  },
  "interval": 30,
  "condition": {
    "type": "origins:food_level",
    "comparison": "<",
    "compare_to": 20
  }
}
```

This example will deal 1 heart of `onFire` damage to the player, and place a Lava fluid at where the Magma Block previously was if the player were to mine a Magma Block.

</details>

### `origins:action_when_damage_taken`

Executes actions when the player takes damage.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the damage must meet |
| `bientity_action` | [Bi-entity Action](../action/bientity_action_types) | optional | Bi-entity action (attacker鈫抪layer) |


<details>
<summary>Example</summary>

```json
{
    "type": "origins:action_when_damage_taken",
    "entity_action": {
        "type": "origins:execute_command",
        "command": "say ow! i'm burning!"
    },
    "damage_condition": {
        "type": "origins:in_tag",
        "tag": "minecraft:is_fire"
    },
    "cooldown": 1
}
```

This example will execute an [Execute Command](../action/entity_action_types) that will execute a `/say` command that will display a "`[ENTITYNAME] ow! i'm burning!`" in chat if the entity has taken fire-related damage type.

</details>

### `origins:action_when_hit`

Executes actions when the player is hit.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the player |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the damage must meet |


<details>
<summary>Example</summary>

```json
{
    "type": "origins:action_when_hit",
    "bientity_action": {
        "type": "origins:invert",
        "action": {
            "type": "origins:damage",
            "amount": 2,
            "damage_type": "minecraft:thorns"
        }
    }
}
```

This example will deal 1 heart of damage to any entities that attacks the entity that has the power, quite similar to having an armor item that has the Thorns enchantment. Bear in mind that the '**actor**' is the entity that dealt the hit, so an invert is needed.

</details>

### `origins:active_self`

An active ability that executes an entity action on key press, with cooldown.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | **required** | Action to execute when activated |
| `cooldown` | [Integer](../basic_concepts#integer) | `1` | Cooldown in ticks |
| `hud_render` | [Hud Render] | optional | HUD display settings for the cooldown |
| `key` | [Key] | optional | Key binding settings |

<details>
<summary>Example</summary>

```json
{
  "type": "origins:active_self",
  "entity_action": {
    "type": "origins:execute_command",
    "command": "say Hello world!"
  },
  "cooldown": 100,
  "hud_render": {
    "bar_index": 0
  },
  "key": {
    "key": "key.origins.primary_active"
  }
}
```

This example will replace any iron blocks with gold blocks if you right click the top or bottom of the block while sprinting.

</details>

### `origins:attacker_action_when_hit`

Executes actions on the attacker when the player is hit.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | optional | Action executed on the attacker |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the damage must meet |
| `cooldown` | [Integer](../basic_concepts#integer) | `1` | Cooldown in ticks |
| `hud_render` | [Hud Render] | optional | HUD display settings |


<details>
<summary>Example</summary>

```json
{
  "type": "origins:attacker_action_when_hit",
  "entity_action": {
    "type": "origins:add_velocity",
    "y": 2
  },
  "cooldown": 20
}
```

This example will add positive-Y axis velocity to the attacker of the entity that has the power, essentially launching them up into the air.

</details>

### `origins:self_action_on_hit`

Executes an action on the player when they hit someone.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | **required** | Action executed on the player |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the damage must meet |
| `target_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition the target must meet |
| `cooldown` | [Integer](../basic_concepts#integer) | `1` | Cooldown in ticks |
| `hud_render` | [Hud Render] | optional | HUD display settings |


<details>
<summary>Example</summary>

```json
{
  	"type": "origins:self_action_on_hit",
  	"entity_action": {
    	"type": "origins:heal",
    	"amount": 8.0
  	},
  	"damage_condition": {
    	"type": "origins:amount",
    	"comparison": ">=",
    	"compare_to": 10.0
  	},
  	"cooldown": 20
}
```

This example will restore 4 hearts of health of the entity that has the power if the entity manages to deal 5 or more hearts of damage.

</details>

### `origins:self_action_on_kill`

Executes an action on the player when they kill an entity.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | **required** | Action executed on the player |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the killing damage must meet |
| `target_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition the killed entity must meet |
| `cooldown` | [Integer](../basic_concepts#integer) | `1` | Cooldown in ticks |
| `hud_render` | [Hud Render] | optional | HUD display settings |


<details>
<summary>Example</summary>

```json
{
    "type": "origins:self_action_on_kill",
    "entity_action": {
        "type": "origins:heal",
        "amount": 4.0
    },
    "cooldown": 100,
    "hud_render": {
        "should_render": true,
        "sprite_location": "origins:textures/gui/community/spiderkolo/resource_bar_01.png",
        "bar_index": 5
    },
    "condition": {
        "type": "origins:equipped_item",
        "equipment_slot": "mainhand",
        "item_condition": {
            "type": "origins:ingredient",
            "ingredient": {
                "item": "minecraft:iron_sword"
            }
        }
    }
}
```

This example will restore 2 hearts to the entity that has the power if the entity has killed a mob with an Iron Sword.

</details>

### `origins:self_action_when_hit`

Executes an action on the player when they are hit.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | **required** | Action executed on the player |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the damage must meet |
| `cooldown` | [Integer](../basic_concepts#integer) | `1` | Cooldown in ticks |
| `hud_render` | [Hud Render] | optional | HUD display settings |


<details>
<summary>Example</summary>

```json
{
	"type": "origins:self_action_when_hit",
	"entity_action": {
		"type": "origins:apply_effect",
		"effect": {
		    "effect": "minecraft:regeneration",
      		"amplifier": 1,
      		"duration": 200
    	}
  	},
  	"damage_condition": {
    	"type": "origins:amount",
    	"comparison": ">=",
    	"compare_to": 6.0
  	},
  	"cooldown": 1200
}
```

When a player with this power is damaged by 3 hearts or more damage in a single hit, they gain a Regeneration II effect for 10 seconds. This has a cooldown of one minute.

</details>

### `origins:target_action_on_hit`

Executes an action on the target when the player hits them.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](../action/entity_action_types) | **required** | Action executed on the target |
| `damage_condition` | [Damage Condition](../condition/damage_condition_types) | optional | Condition the damage must meet |
| `target_condition` | [Entity Condition](../condition/entity_condition_types) | optional | Condition the target must meet |
| `cooldown` | [Integer](../basic_concepts#integer) | `1` | Cooldown in ticks |
| `hud_render` | [Hud Render] | optional | HUD display settings |


<details>
<summary>Example</summary>

```json
{
  	"type": "origins:target_action_on_hit",
  	"entity_action": {
    	"type": "origins:apply_effect",
    	"effect": {
      		"effect": "minecraft:slowness",
      		"amplifier": 3,
      		"duration": 100
    	}
  	},
  	"cooldown": 200,
  	"hud_render": {
    	"should_render": true,
    	"bar_index": 5
  	}
}
```

This example will apply a Slowness IV status effect on the target entity that would last for 5 seconds for every 10 seconds of usage.

</details>

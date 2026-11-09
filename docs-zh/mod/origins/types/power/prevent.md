---
sidebar_position: 3
---

# 阻止能力 {#prevent-powers}

这些能力会阻止特定行为。

---

### `origins:prevent_being_used` {#originsprevent_being_used}

阻止其他实体与玩家互动。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 互动被阻止时执行的动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 必须满足才会阻止该互动的条件 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:prevent_being_used",
    "bientity_action": {
        "type": "origins:source_action",
        "action": {
            "type": "origins:execute_command",
            "command": "title @s actionbar {\"text\": \"Entity cannot be interacted with!\", \"color\": \"red\"}"
        }
    }
}
```

此示例将阻止其他玩家“使用”（右键点击）拥有该能力的实体，并提示他们“无法与该实体互动”。

</details>

### `origins:prevent_block_place` {#originsprevent_block_place}

阻止放置特定方块。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 被阻止放置的方块的条件 |

### `origins:prevent_block_selection` {#originsprevent_block_selection}

阻止选中（挖掘轮廓）特定方块。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 被阻止选中的方块的条件 |

<details>
<summary>示例</summary>

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

此示例将阻止选中蜘蛛网（包括蛛形纲能力中的临时蜘蛛网方块），使玩家可以直接打穿它们，除非玩家正在潜行。

</details>

### `origins:prevent_block_use` {#originsprevent_block_use}

阻止使用（右键点击）特定方块。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 被阻止使用的方块的条件 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:prevent_block_use",
    "block_condition": {
      "type": "origins:block_id",
      "block": "minecraft:crafting_table"
    }
}
```

此示例将阻止玩家使用工作台。

</details>

### `origins:prevent_breeding` {#originsprevent_breeding}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

阻止能力持有者让匹配的动物繁殖。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 以玩家为执行者、以父母为目标的条件 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 阻止繁殖时执行的动作 |
| `prevent_follow` | [布尔值](../basic_concepts#boolean) | `false` | 保留的跟随行为选项 |

### `origins:prevent_death` {#originsprevent_death}

阻止玩家死亡。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 被阻止致死的伤害类型条件 |
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 阻止死亡时执行的动作 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:prevent_death",
    "entity_action": {
		"type": "origins:and",
		"actions": [
			{
				"type": "origins:remove_effect"
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

此示例将始终阻止实体死亡，然后施加与不死图腾相同的效果，例如：清除实体身上的所有状态效果，然后施加生命恢复 II、抗火 I 和伤害吸收 I。

</details>

### `origins:prevent_elytra_flight` {#originsprevent_elytra_flight}

阻止激活鞘翅飞行。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 鞘翅飞行被阻止时执行的动作 |

<details>
<summary>示例</summary>

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

此示例将在拥有该能力的实体位于 Y=64 或更低时显示警告，并阻止其使用鞘翅飞行。

</details>

### `origins:prevent_entity_collision` {#originsprevent_entity_collision}

阻止与特定实体发生碰撞。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 被阻止碰撞的实体的条件 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:prevent_entity_collision"
}
```

此示例将阻止拥有该能力的实体与其他实体发生碰撞。

</details>

### `origins:prevent_entity_render` {#originsprevent_entity_render}

阻止渲染特定实体。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `entity_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 被隐藏渲染的实体的条件 |

<details>
<summary>示例</summary>

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

此示例将使苦力怕在白天对拥有该能力的玩家不可见。

</details>

### `origins:prevent_entity_use` {#originsprevent_entity_use}

阻止与特定实体互动。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 互动被阻止时执行的动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 被阻止互动的实体的条件 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:prevent_entity_use",
    "bientity_action": {
        "type": "origins:source_action",
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

此示例将阻止拥有该能力的玩家与猪互动（同时也会阻止那些允许你与猪互动的能力），并对尝试与猪互动的实体执行一个 [Execute Command（实体动作类型）](../action/entity_action_types#originsexecute_command)。

</details>

### `origins:prevent_feature_render` {#originsprevent_feature_render}

配置是否在拥有该能力的实体上渲染指定的实体特征。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `armor` | [布尔值](../basic_concepts#boolean) | `true` | 若为 `true`，则渲染穿着的盔甲；若为 `false`，则隐藏。 |
| `cape` | [布尔值](../basic_concepts#boolean) | `true` | 若为 `true`，则渲染披风；若为 `false`，则隐藏。 |
| `elytra` | [布尔值](../basic_concepts#boolean) | `true` | 若为 `true`，则渲染穿着的鞘翅；若为 `false`，则隐藏。 |
| `held_item` | [布尔值](../basic_concepts#boolean) | `true` | 若为 `true`，则渲染手持物品；若为 `false`，则隐藏。 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:prevent_feature_render",
    "armor": false,
    "cape": false,
    "elytra": false,
    "held_item": false
}
```

此示例将隐藏拥有该能力的实体所穿着的盔甲、披风、鞘翅以及手持物品。

</details>

### `origins:prevent_game_event` {#originsprevent_game_event}

阻止检测到特定游戏事件（例如幽匿感测体）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `event` | [标识符](../basic_concepts#identifier) 或 List | 可选 | 要阻止的游戏事件 ID |
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 事件被阻止时执行的动作 |

<details>
<summary>示例</summary>

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

此示例将阻止拥有该能力的实体发出 `minecraft:hit_ground` 游戏事件，该事件通常在坠落着地时发出。

</details>

### `origins:prevent_item_pickup` {#originsprevent_item_pickup}

阻止拾取特定物品。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 被阻止拾取的物品的条件 |
| `priority` | [整数](../basic_concepts#integer) | `0` | 该能力的优先级，优先级更高的能力先执行 |

### `origins:prevent_item_use` {#originsprevent_item_use}

阻止使用特定物品。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 被阻止使用的物品的条件 |

<details>
<summary>示例</summary>

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

此示例会阻止玩家使用任何属于 `origins:meat` 物品标签的物品。

</details>

### `origins:prevent_sleep` {#originsprevent_sleep}

阻止玩家在床上睡觉。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 被阻止使用的床的条件 |
| `message` | [文本组件](../minecraft_data_types#text-component) | 可选 | 阻止睡觉时显示的自定义消息 |
| `set_spawn` | [布尔值](../basic_concepts#boolean) | `true` | 该床是否仍能设置玩家的出生点 |
| `priority` | [整数](../basic_concepts#integer) | `0` | 该能力的优先级，优先级更高的能力先执行 |

<details>
<summary>示例</summary>

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

此示例将阻止玩家睡觉，除非玩家正在燃烧。

</details>

### `origins:prevent_sprinting` {#originsprevent_sprinting}

阻止玩家疾跑。

<details>
<summary>示例</summary>

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

此示例将在玩家的饥饿值等于或低于 6 个鸡腿时阻止其疾跑。

</details>

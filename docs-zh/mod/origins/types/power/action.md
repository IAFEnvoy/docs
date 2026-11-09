---
sidebar_position: 1
---

# 动作能力 {#action-powers}

这些能力会响应事件来执行动作。

---

### `origins:action_on_attacker_hurt` {#originsaction_on_attacker_hurt}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

当持有者受到伤害时，在能力持有者与其最近一次的攻击者之间执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 此能力再次触发前所需的 tick 数 |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | 冷却的 HUD 显示 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | **必填** | 以能力持有者为执行者、以其最近一次的攻击者为目标的动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 能力持有者与其最近一次的攻击者之间的条件 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 受到的伤害必须满足的条件 |

### `origins:action_on_being_used` {#originsaction_on_being_used}

当其他实体与玩家交互时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 执行的动作（执行者 = 其他实体，目标 = 玩家） |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 动作执行必须满足的条件 |
| `priority` | [整数](../basic_concepts#integer) | `0` | 能力的优先级，优先级更高的能力先执行 |

<details>
<summary>示例</summary>

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

此示例会赋予玩家在“使用”（右键点击）拥有该能力的实体时骑乘该实体的能力，除非该拥有能力的实体已经载有乘客。

</details>

### `origins:action_on_block_break` {#originsaction_on_block_break}

当玩家破坏方块时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在玩家身上执行的动作 |
| `block_action` | [方块动作](../action/block_action_types) | 可选 | 在被破坏方块的位置执行的动作 |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 被破坏的方块必须满足的条件 |
| `only_when_success` | [布尔值](../basic_concepts#boolean) | `true` | 仅当方块破坏未被取消时触发 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:action_on_block_break",
    "entity_action": {
        "type": "origins:damage",
        "amount": 2.0,
        "damage_type": "minecraft:on_fire"
    },
    "block_action": {
        "type": "origins:set_block",
        "block": "minecraft:lava"
    },
    "block_condition": {
        "type": "origins:block_id",
        "block": "minecraft:magma_block"
    },
    "only_when_success": true
}
```

此示例会在玩家破坏岩浆块时，对玩家造成 1 颗心的火焰伤害，并把该方块所在的位置变为熔岩。
</details>

### `origins:action_on_block_place` {#originsaction_on_block_place}

当玩家放置方块时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在玩家身上执行的动作 |
| `block_action` | [方块动作](../action/block_action_types) | 可选 | 在被放置方块的位置执行的动作 |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 被放置的方块必须满足的条件 |

### `origins:action_on_block_use` {#originsaction_on_block_use}

当玩家右键点击方块时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在玩家身上执行的动作 |
| `block_action` | [方块动作](../action/block_action_types) | 可选 | 在方块上执行的动作 |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 方块必须满足的条件 |

<details>
<summary>示例</summary>

```json
{
	"type": "origins:action_on_block_use",
	"block_action": {
		"type": "origins:set_block",
		"block": "minecraft:gold_block"
	},
	"block_condition": {
		"type": "origins:block_id",
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

此示例会在你疾跑时右键点击铁块的顶面或底面时，把该铁块替换为金块。

</details>

### `origins:action_on_bonemeal` {#originsaction_on_bonemeal}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

当能力持有者对符合条件的方块使用骨粉时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `block_action` | [方块动作](../action/block_action_types) | 可选 | 在目标方块处执行的动作 |
| `self_action` | [实体动作](../action/entity_action_types) | 可选 | 在能力持有者身上执行的动作 |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 方块必须满足的条件 |

### `origins:action_on_callback` {#originsaction_on_callback}

在生命周期事件发生时执行实体动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action_respawned` | [实体动作](../action/entity_action_types) | 可选 | 玩家重生时执行的动作 |
| `entity_action_removed` | [实体动作](../action/entity_action_types) | 可选 | 能力被移除时执行的动作 |
| `entity_action_gained` | [实体动作](../action/entity_action_types) | 可选 | 能力被授予时执行的动作 |
| `entity_action_lost` | [实体动作](../action/entity_action_types) | 可选 | 能力丢失（被移除）时执行的动作 |
| `entity_action_added` | [实体动作](../action/entity_action_types) | 可选 | 能力变为激活状态时执行的动作 |

<details>
<summary>示例</summary>

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

此示例会在玩家选择了拥有该能力的起源时立即给予玩家幸运 I（30:00）状态效果，除非玩家使用了起源之球物品来选择该起源。

</details>

### `origins:action_on_death` {#originsaction_on_death}

当玩家死亡时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 在玩家身上执行的动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 濒死玩家与击杀者之间的条件 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 致命伤害必须满足的条件 |

<details>
<summary>示例</summary>

```json
{
  "type": "origins:action_on_death",
  "bientity_action": {
    "type": "origins:source_action",
    "action": {
      "type": "origins:execute_command",
      "command": "say I died!"
    }
  }
}
```

此示例会在玩家死亡时在聊天栏发送 `I died!`。

</details>

### `origins:action_on_entity_use` {#originsaction_on_entity_use}

当玩家右键点击实体时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 执行的双实体动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 必须满足的条件 |
| `interaction_result` | [字符串](../basic_concepts#string) | 可选 | 返回的交互结果 |
| `priority` | [整数](../basic_concepts#integer) | `0` | 能力的优先级，优先级更高的能力先执行 |

<details>
<summary>示例</summary>

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
    "condition": {
        "type": "origins:sneaking"
    }
}
```

此示例会在该生物为拥有该能力的玩家所有时，治疗该已驯服的生物并在其位置显示爱心粒子效果。

</details>

### `origins:action_on_equip` {#originsaction_on_equip}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

当能力持有者装备符合条件的盔甲或副手物品时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `head` | [物品条件](../condition/item_condition_types) | 可选 | 头盔槽位的条件 |
| `chest` | [物品条件](../condition/item_condition_types) | 可选 | 胸甲槽位的条件 |
| `legs` | [物品条件](../condition/item_condition_types) | 可选 | 护腿槽位的条件 |
| `feet` | [物品条件](../condition/item_condition_types) | 可选 | 靴子槽位的条件 |
| `offhand` | [物品条件](../condition/item_condition_types) | 可选 | 副手槽位的条件 |
| `action` | [实体动作](../action/entity_action_types) | **必填** | 已配置的槽位变为符合条件的物品后执行的动作 |

### `origins:action_on_hit` {#originsaction_on_hit}

当玩家击中实体时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在玩家身上执行的动作 |
| `target_action` | [实体动作](../action/entity_action_types) | 可选 | 在目标身上执行的动作 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 执行的双实体动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 必须满足的条件 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 伤害必须满足的条件 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:action_on_hit",
    "bientity_action": {
        "type": "origins:add_velocity",
        "z": 2
    }
}
```

此示例会给被拥有该能力的实体击中的实体增加 Z 轴正方向速度，实际上就是赋予拥有该能力的实体额外的击退。

</details>

### `origins:action_on_item_pickup` {#originsaction_on_item_pickup}

当玩家拾取物品时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在玩家身上执行的动作 |
| `item_action` | [物品动作](../action/item_action_types) | 可选 | 在被拾取的物品上执行的动作 |
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 物品必须满足的条件 |
| `priority` | [整数](../basic_concepts#integer) | `0` | 能力的优先级，优先级更高的能力先执行 |

### `origins:action_on_item_use` {#originsaction_on_item_use}

当玩家使用物品时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在玩家身上执行的动作 |
| `item_action` | [物品动作](../action/item_action_types) | 可选 | 在物品上执行的动作 |
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 物品必须满足的条件 |
| `trigger` | Trigger | `finish` | 动作执行必须满足的触发器 |
| `priority` | [整数](../basic_concepts#integer) | `0` | 能力的优先级，优先级更高的能力先执行 |

#### 触发器（Trigger） {#trigger}

| 名称 | 说明 |
|-------|------|
| `finish` | 该动作会在实体完成（即用尽）具有使用时间的物品时执行，例如进食。 |
| `start` | 该动作会在实体开始使用具有使用时间的物品时执行。 |
| `stop` | 该动作会在实体停止使用具有使用时间的物品、且尚未达到最大使用时间时执行。与 `finish` 相比，这可用于检测射箭等情况。 |
| `during` | 该动作会在实体使用具有使用时间的物品期间每个 tick 被调用。 |
| `instant` | 该动作不会对具有使用时间的物品触发，而是在使用会立即触发效果的物品时触发，例如末影珍珠或喷溅药水。 |

<details>
<summary>示例</summary>

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

此示例会在玩家饮用任意种类的药水时给予半格饥饿值和 1 点饱和度。

</details>

### `origins:action_on_jump` {#originsaction_on_jump}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

当能力持有者跳跃时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在能力持有者身上执行的动作 |

### `origins:action_on_land` {#originsaction_on_land}

当玩家落到地面时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在玩家身上执行的动作 |

<details>
<summary>示例</summary>

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

此示例会执行一个[执行命令](../action/entity_action_types)动作，该动作随后执行 `/fill` 命令：如果该实体已下落 4 格或更多，则将其脚下 3x3 区域的草方块替换为空气。

</details>

### `origins:action_on_projectile_hit` {#originsaction_on_projectile_hit}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

当能力持有者拥有的投掷物击中实体时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 以投掷物为执行者、被击中的实体为目标的动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | `bientity_action` 的条件 |
| `owner_bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 以所有者为执行者、被击中的实体为目标的动作 |
| `owner_bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | `owner_bientity_action` 的条件 |
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 两次执行之间的最少 tick 数 |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | 冷却 HUD 设置 |

### `origins:action_on_tame_hit` {#originsaction_on_tame_hit}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

当能力持有者拥有的已驯服生物对实体造成伤害时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 此能力再次触发前所需的 tick 数 |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | 冷却的 HUD 显示 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 造成的伤害必须满足的条件 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 以该已驯服生物为执行者、受伤实体为目标的动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 该已驯服生物与受伤实体之间的条件 |
| `owner_bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 以能力持有者为执行者、受伤实体为目标的动作 |
| `owner_bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 能力持有者与受伤实体之间的条件 |

### `origins:action_on_target_death` {#originsaction_on_target_death}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

在能力持有者与其击杀的实体之间执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `bientity_action` | [双实体动作](../action/bientity_action_types) | **必填** | 以持有者为执行者、以死亡实体为目标的动作 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 致命伤害的条件 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 持有者与死亡实体之间的条件 |
| `includes_prime_adversary` | [布尔值](../basic_concepts#boolean) | `true` | 击杀“主要对手”（prime adversary）是否也会触发此能力 |
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 两次执行之间的最少 tick 数 |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | 冷却 HUD 设置 |

### `origins:action_on_wake_up` {#originsaction_on_wake_up}

当玩家从睡眠中醒来时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在玩家身上执行的动作 |
| `block_action` | [方块动作](../action/block_action_types) | 可选 | 在床所在位置执行的动作 |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 床/被击中的方块必须满足的条件 |

<details>
<summary>示例</summary>

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
        "type": "origins:block_id",
        "block": "minecraft:red_bed"
    }
}
```

此示例会在玩家从红色床中睡醒后，施加持续 5 秒的生命恢复 II 和饥饿 III 状态效果，并执行 `/title` 命令，在动作栏显示“`You feel rejuvenated but hungry...`”消息。

</details>

### `origins:action_over_time` {#originsaction_over_time}

按固定间隔执行实体动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 每个间隔执行的动作 |
| `active_action` | [实体动作](../action/entity_action_types) | 可选 | 条件变为 true 时执行的动作 |
| `inactive_action` | [实体动作](../action/entity_action_types) | 可选 | 条件变为 false 时执行的动作 |
| `interval` | [整数](../basic_concepts#integer) | `20` | 动作之间的间隔（以 tick 计） |

<details>
<summary>示例</summary>

```json
{
  "type": "origins:action_over_time",
  "entity_action": {
    "type": "origins:feed",
    "food": 1,
    "saturation": 1
  },
  "interval": 30
}
```

每 30 tick，此示例会为玩家恢复 1 点食物和 1 点饱和度。

</details>

### `origins:action_when_damage_taken` {#originsaction_when_damage_taken}

当玩家受到伤害时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在玩家身上执行的动作 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 伤害必须满足的条件 |

<details>
<summary>示例</summary>

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
    }
}
```

此示例会执行一个[执行命令](../action/entity_action_types)动作，该动作随后执行 `/say` 命令：如果该实体受到与火焰相关的伤害类型，则在聊天栏显示“`[ENTITYNAME] ow! i'm burning!`”。

</details>

### `origins:action_when_hit` {#originsaction_when_hit}

当玩家被击中时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 在攻击者与玩家之间执行的动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 攻击者与玩家之间的条件 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 伤害必须满足的条件 |

<details>
<summary>示例</summary>

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

此示例会对任何攻击拥有该能力的实体的实体造成 1 颗心的伤害，效果类似于装备带有荆棘附魔的盔甲物品。请注意，“**执行者**”是造成这次击中的实体，因此需要进行反转。

</details>

### `origins:action_when_lightning_struck` {#originsaction_when_lightning_struck}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

当能力持有者被闪电击中时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 以持有者为执行者、闪电为目标的条件 |
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在能力持有者身上执行的动作 |
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 两次执行之间的最少 tick 数 |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | 冷却 HUD 设置 |

### `origins:action_when_tame_hit` {#originsaction_when_tame_hit}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

当能力持有者拥有的已驯服生物受到其他生物伤害时执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 此能力再次触发前所需的 tick 数 |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | 冷却的 HUD 显示 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 受到的伤害必须满足的条件 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 以攻击者为执行者、以已驯服生物为目标的动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 攻击者与该已驯服生物之间的条件 |
| `owner_bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 以攻击者为执行者、以能力持有者为目标的动作 |
| `owner_bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 攻击者与能力持有者之间的条件 |

### `origins:active_self` {#originsactive_self}

按下按键时执行实体动作的主动能力，带有冷却。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | **必填** | 激活时执行的动作 |
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 冷却（以 tick 计） |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | 冷却的 HUD 显示设置 |
| `key` | [按键](../shared_data_types#key) | 可选 | 按键绑定设置 |

<details>
<summary>示例</summary>

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

此示例会在按下主要主动按键时在聊天栏发送 `Hello world!`，冷却为 100 tick（5 秒）。

</details>

### `origins:attacker_action_when_hit` {#originsattacker_action_when_hit}

当玩家被击中时对攻击者执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 在攻击者身上执行的动作 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 伤害必须满足的条件 |
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 冷却（以 tick 计） |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | HUD 显示设置 |

<details>
<summary>示例</summary>

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

此示例会给拥有该能力的实体的攻击者增加 Y 轴正方向速度，实际上就是将其击飞至空中。

</details>

### `origins:hold_action` {#originshold_action}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

在按住其主动按键 `hold_duration` tick 后执行 `charged_action`。按住期间，它会每隔 `interval` tick 执行一次可选的 `entity_action`，`max_actions: 0` 表示不限制次数。该按键始终被视为连续按住。

---

### `origins:self_action_on_hit` {#originsself_action_on_hit}

当玩家击中他人时对玩家执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | **必填** | 在玩家身上执行的动作 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 伤害必须满足的条件 |
| `target_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 目标必须满足的条件 |
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 冷却（以 tick 计） |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | HUD 显示设置 |

<details>
<summary>示例</summary>

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

此示例会在拥有该能力的实体成功造成 5 颗心或更多伤害时，为其恢复 4 颗心的生命值。

</details>

### `origins:self_action_on_kill` {#originsself_action_on_kill}

当玩家击杀实体时对玩家执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | **必填** | 在玩家身上执行的动作 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 致命伤害必须满足的条件 |
| `target_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 被击杀实体必须满足的条件 |
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 冷却（以 tick 计） |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | HUD 显示设置 |

<details>
<summary>示例</summary>

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

此示例会在拥有该能力的实体用铁剑击杀生物时，为其恢复 2 颗心的生命值。

</details>

### `origins:self_action_when_hit` {#originsself_action_when_hit}

当玩家被击中时对玩家执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | **必填** | 在玩家身上执行的动作 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 伤害必须满足的条件 |
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 冷却（以 tick 计） |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | HUD 显示设置 |

<details>
<summary>示例</summary>

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

当拥有该能力的玩家在单次攻击中受到 3 颗心或更多伤害时，会获得持续 10 秒的生命恢复 II 效果。此效果有一分钟的冷却。

</details>

### `origins:target_action_on_hit` {#originstarget_action_on_hit}

当玩家击中目标时对目标执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | **必填** | 在目标身上执行的动作 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 伤害必须满足的条件 |
| `target_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 目标必须满足的条件 |
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 冷却（以 tick 计） |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | HUD 显示设置 |

<details>
<summary>示例</summary>

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

此示例会对目标实体施加缓慢 IV 状态效果，持续 5 秒，每 10 秒可使用一次。

</details>

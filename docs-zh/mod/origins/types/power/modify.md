---
sidebar_position: 2
---

# 修改能力 {#modify-powers}

这些能力会修改各种游戏机制。

---

### `origins:modify_air_speed` {#originsmodify_air_speed}

修改玩家的空中速度（在创造模式/鞘翅飞行中水平飞行）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于空中速度的修饰器 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:modify_air_speed",
    "modifier": {
        "operation": "multiply_total",
        "value": 1.5
    }
}
```

此示例将使实体的空中速度提高 150%。

</details>

### `origins:modify_attribute` {#originsmodify_attribute}

激活时施加属性修饰器。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `attribute` | [标识符](../basic_concepts#identifier) | **必填** | Minecraft 属性 ID（例如 `minecraft:generic.max_health`） |
| `modifier` | [Attribute Modifier](../shared_data_types#attributeentry) 或 List | **必填** | 要施加的属性修饰器 |

<details>
<summary>示例</summary>

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

此示例会为实体增加 10 点最大生命值。

</details>

### `origins:modify_attribute_like_resource` {#originsmodify_attribute_like_resource}

修改 `attribute_like_resource` 的当前值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `resource` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 资源能力 ID |
| `modifier` | [修饰器](../shared_data_types#modifier) | 可选 | 在 `modifiers` 之前应用 |
| `modifiers` | [修饰器](../shared_data_types#modifier) 的列表 | 可选 | 数值修饰器 |

### `origins:modify_block_render` {#originsmodify_block_render}

修改方块的渲染距离/形状。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 要应用该修改的方块的条件 |
| `block` | [标识符](../basic_concepts#identifier) | **必填** | 替换后的方块 ID |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:modify_block_render",
    "block_condition": {
        "type": "origins:block_id",
        "block": "minecraft:diamond_ore"
    },
    "block": "minecraft:diamond_block"
}
```

此示例将使钻石矿石方块看起来像钻石块。

</details>

### `origins:modify_break_speed` {#originsmodify_break_speed}

修改方块破坏速度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于破坏速度的修饰器 |
| `hardness_modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于方块硬度的修饰器 |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 受影响方块的条件 |

<details>
<summary>示例</summary>

```json
{
	"type": "origins:modify_break_speed",
	"block_condition": {
		"type": "origins:block_id",
		"block": "minecraft:netherrack"
	},
	"modifier": {
		"operation": "multiply_base",
		"value": 0.5
	}
}
```

此示例将使玩家破坏下界岩的速度比平常快 50%。

</details>

### `origins:modify_camera_submersion` {#originsmodify_camera_submersion}

修改浸入流体时的相机效果。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `from` | [标识符](../basic_concepts#identifier) | **必填** | 原始相机浸没类型 |
| `to` | [标识符](../basic_concepts#identifier) | **必填** | 替换后的相机浸没类型 |

<details>
<summary>示例</summary>

```json
{
  "type": "origins:modify_camera_submersion",
  "from": "none",
  "to": "water"
}
```

此示例将使玩家在未浸入任何流体时看起来像是浸没在水中。

</details>

### `origins:modify_crafting` {#originsmodify_crafting}

修改合成结果。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `recipe` | [标识符](../basic_concepts#identifier) | **必填** | 要修改的配方 ID |
| `result` | [物品堆叠](../minecraft_data_types#item-stack) | 可选 | 替换后的结果物品 |
| `result_action` | [物品动作](../action/item_action_types) | 可选 | 应用于合成结果的动作 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:modify_crafting",
    "recipe": "minecraft:wooden_sword",
    "result": {
        "item": "minecraft:diamond_sword"
    }
}
```

此示例将仅对拥有该能力的玩家，把 `minecraft:wooden_sword`（`data/minecraft/recipes/wooden_sword.json`）原版配方的结果物品堆叠替换为钻石剑。

</details>

### `origins:modify_damage_dealt` {#originsmodify_damage_dealt}

修改玩家造成的伤害。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于造成伤害的修饰器 |
| `target_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 目标必须满足的条件 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 伤害必须满足的条件 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 攻击者与目标之间的双实体条件 |
| `self_action` | [实体动作](../action/entity_action_types) | 可选 | 对攻击者执行的动作 |
| `target_action` | [实体动作](../action/entity_action_types) | 可选 | 对目标执行的动作 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 攻击者与目标之间的双实体动作 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:modify_damage_dealt",
    "condition": {
        "type": "origins:in_block_anywhere",
        "block_condition": {
            "type": "origins:block_id",
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

此示例将使拥有该能力的实体在处于水中时额外造成 2.5 颗心的伤害，无论其流体高度如何。

</details>

### `origins:modify_damage_taken` {#originsmodify_damage_taken}

修改玩家承受的伤害。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于承受伤害的修饰器 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 伤害必须满足的条件 |
| `attacker_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 攻击者必须满足的条件 |

<details>
<summary>示例</summary>

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

此示例将使拥有该能力的实体在攻击者手持带有绑定诅咒或消失诅咒附魔的物品时，额外承受 2.5 颗心的伤害。

</details>

### `origins:modify_death_sound` {#originsmodify_death_sound}

:::caution 不稳定

此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。

:::

修改玩家死亡时播放的音效。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `muted` | [布尔值](../basic_concepts#boolean) | `false` | 是否静音死亡音效 |
| `sound` | [带权重的音效条目](../shared_data_types#weighted-sound-entry) 或 List | **必填** | 死亡时播放的替换音效 |
| `volume` | [浮点数](../basic_concepts#float) | `1.0` | 音效的音量 |
| `pitch` | [浮点数](../basic_concepts#float) | `1.0` | 音效的音高 |

### `origins:modify_effect_amplifier` {#originsmodify_effect_amplifier}

修改施加到玩家身上的效果的放大器。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `effect` | [标识符](../basic_concepts#identifier) 或 List | `[]` | 要修改的效果 ID |
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | **必填** | 应用于效果放大器的修饰器 |

### `origins:modify_effect_duration` {#originsmodify_effect_duration}

修改施加到玩家身上的效果的持续时间。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `effect` | [标识符](../basic_concepts#identifier) 或 List | `[]` | 要修改的效果 ID |
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | **必填** | 应用于效果持续时间的修饰器 |

### `origins:modify_effect_type` {#originsmodify_effect_type}

修改施加到玩家身上的效果的类型。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `effect` | [标识符](../basic_concepts#identifier) 或 List | `[]` | 要修改的效果 ID |
| `new_effect` | [标识符](../basic_concepts#identifier) | **必填** | 要施加的新效果类型 |

### `origins:modify_enchantment_damage_dealt` {#originsmodify_enchantment_damage_dealt}

:::caution 不稳定

此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。

:::

根据能力持有者主手物品上指定附魔的等级增加伤害。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `enchantment` | [标识符](../basic_concepts#identifier) | **必填** | 主手物品上所需的附魔 |
| `base_value` | [浮点数](../basic_concepts#float) | **必填** | 第一级附魔时的额外伤害 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 造成的伤害必须满足的条件 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 攻击者与目标之间的条件 |
| `target_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 被伤害的目标必须满足的条件 |
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 对第一级之后每一级的额外伤害重复应用的修饰器 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 该能力生效时在攻击者与目标之间执行的动作 |

### `origins:modify_enchantment_damage_taken` {#originsmodify_enchantment_damage_taken}

:::caution 不稳定

此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。

:::

根据攻击者主手物品上指定附魔的等级增加伤害。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `enchantment` | [标识符](../basic_concepts#identifier) | **必填** | 攻击者主手物品上所需的附魔 |
| `base_value` | [浮点数](../basic_concepts#float) | **必填** | 第一级附魔时的额外伤害 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 受到的伤害必须满足的条件 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 攻击者与能力持有者之间的条件 |
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 对第一级之后每一级的额外伤害重复应用的修饰器 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 该能力生效时在攻击者与能力持有者之间执行的动作 |

### `origins:modify_enchantment_level` {#originsmodify_enchantment_level}

:::caution 不稳定

此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。

:::

修改附魔等级。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `enchantment` | [标识符](../basic_concepts#identifier) | **必填** | 要修改的附魔 ID |
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 物品必须满足的条件 |
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于附魔等级的修饰器 |

<details>
<summary>示例</summary>

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

此示例将赋予玩家使用精准采集的能力，无论玩家手持任何物品或未手持物品。

</details>

### `origins:modify_exhaustion` {#originsmodify_exhaustion}

修改饥饿消耗的积累。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于饥饿消耗的修饰器 |

<details>
<summary>示例</summary>

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

此示例将使玩家的饥饿消耗速率变为三倍。

</details>

### `origins:modify_falling` {#originsmodify_falling}

修改坠落伤害和速度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `take_fall_damage` | [布尔值](../basic_concepts#boolean) | `true` | 玩家是否承受坠落伤害 |
| `velocity` | [浮点数](../basic_concepts#float) | 可选 | 覆盖坠落速度 |

<details>
<summary>示例</summary>

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

此示例将使玩家下落得更快，且若正在潜行则不承受坠落伤害。

</details>

### `origins:modify_fluid_render` {#originsmodify_fluid_render}

修改玩家周围流体的渲染方式。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `fluid` | [标识符](../basic_concepts#identifier) | **必填** | 流体 ID |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 流体所在位置的条件 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:modify_fluid_render",
    "block_condition": {
        "type": "origins:block_id",
        "block": "minecraft:water"
    },
    "fluid": "minecraft:lava"
}
```

此示例将使水看起来像岩浆。

</details>

### `origins:modify_food` {#originsmodify_food}

修改进食时的食物值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `food_modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于恢复饥饿值的修饰器 |
| `saturation_modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于恢复饱和度的修饰器 |
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 食物物品必须满足的条件 |

<details>
<summary>示例</summary>

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

此示例将使玩家食用海带时增加 1.5 个鸡腿的饥饿值和 1 点饱和度，合计 2 个鸡腿的饥饿值和 6.4 点饱和度。

</details>

### `origins:modify_grindstone` {#originsmodify_grindstone}

修改砂轮结果。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `result_action` | [物品动作](../action/item_action_types) | 可选 | 应用于砂轮结果的动作 |
| `result` | [物品堆叠](../minecraft_data_types#item-stack) | 可选 | 替换后的结果物品 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:modify_grindstone",
    "xp_modifier": {
        "operation": "multiply_total_multiplicative",
        "value": 0.5
    }
}
```

此示例将使从附魔物品上移除附魔所获得的经验提高到 50%。

</details>

### `origins:modify_harvest` {#originsmodify_harvest}

修改收获行为（掉落物、精准采集、时运）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 受影响方块的条件 |
| `allow` | [布尔值](../basic_concepts#boolean) | `true` | 是否允许收获 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:modify_harvest",
    "block_condition": {
        "type": "origins:block_id",
        "block": "minecraft:diamond_block"
    },
    "allow": true
}
```

此示例将允许玩家收获钻石块，无论是否使用了正确的工具。

</details>

### `origins:modify_healing` {#originsmodify_healing}

修改自然生命恢复。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于治疗效果的修饰器 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:modify_healing",
    "modifier": {
        "operation": "multiply_total",
        "value": 1
    }
}
```

此示例将使施加于你的所有治疗效果翻倍。

</details>

### `origins:modify_hurt_sound` {#originsmodify_hurt_sound}

:::caution 不稳定

此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。

:::

修改玩家受伤时播放的音效。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `muted` | [布尔值](../basic_concepts#boolean) | `false` | 是否静音受伤音效 |
| `sound` | [带权重的音效条目](../shared_data_types#weighted-sound-entry) 或 List | **必填** | 受伤时播放的替换音效 |
| `volume` | [浮点数](../basic_concepts#float) | `1.0` | 音效的音量 |
| `pitch` | [浮点数](../basic_concepts#float) | `1.0` | 音效的音高 |

### `origins:modify_insomnia_ticks` {#originsmodify_insomnia_ticks}

修改幻翼的失眠 tick。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于失眠 tick 的修饰器 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:modify_insomnia_ticks",
    "modifier": {
        "operation": "set_total",
        "value": 0
    }
}
```

此示例将把用于计算玩家何时生成幻翼的值设为 0，实质上为拥有该能力的玩家禁用了幻翼生成。

</details>

### `origins:modify_jump` {#originsmodify_jump}

修改跳跃高度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于跳跃速度的修饰器 |
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 实体跳跃时执行的动作 |

<details>
<summary>示例</summary>

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

此示例将把拥有该能力的实体的跳跃高度提高到 4 格，并在跳跃时在其脚下显示云粒子效果。

</details>

### `origins:modify_knockback` {#originsmodify_knockback}

分别修改各轴上的击退。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `x` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | X 轴修饰器 |
| `y` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | Y 轴修饰器 |
| `z` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | Z 轴修饰器 |

### `origins:modify_player_spawn` {#originsmodify_player_spawn}

修改玩家出生/重生的位置。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `dimension` | [标识符](../basic_concepts#identifier) | **必填** | 用于出生的维度 ID |
| `dimension_distance_multiplier` | [浮点数](../basic_concepts#float) | `1.0` | 在该维度中距出生点的距离倍率 |
| `spawn_strategy` | [字符串](../basic_concepts#string) | `default` | 出生策略：`default` 或 `center` |
| `biome` | [标识符](../basic_concepts#identifier) | 可选 | 用于出生的生物群系 ID |
| `structure` | [标识符](../basic_concepts#identifier) | 可选 | 用于出生的结构 ID |

<details>
<summary>示例</summary>

```json
{
  "type": "origins:modify_player_spawn",
  "dimension": "minecraft:the_end",
  "structure": "minecraft:end_city",
  "spawn_strategy": "center"
}
```

此示例将让玩家在末地维度的末地城中出生。

</details>

### `origins:modify_projectile_damage` {#originsmodify_projectile_damage}

修改弹射物伤害。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于弹射物伤害的修饰器 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 伤害必须满足的条件 |

<details>
<summary>示例</summary>

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

此示例将修改拥有该能力的实体射出的光灵箭弹射物实体的伤害，使其额外造成 4 颗心的伤害。

</details>

### `origins:modify_resource_maximum` {#originsmodify_resource_maximum}

修改 `modifiable_resource` 的有效最大值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `resource` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 资源能力 ID |
| `modifier` | [修饰器](../shared_data_types#modifier) | 可选 | 在 `modifiers` 之前应用 |
| `modifiers` | [修饰器](../shared_data_types#modifier) 的列表 | 可选 | 绑定修饰器 |

### `origins:modify_resource_minimum` {#originsmodify_resource_minimum}

修改 `modifiable_resource` 的有效最小值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `resource` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 资源能力 ID |
| `modifier` | [修饰器](../shared_data_types#modifier) | 可选 | 在 `modifiers` 之前应用 |
| `modifiers` | [修饰器](../shared_data_types#modifier) 的列表 | 可选 | 绑定修饰器 |

### `origins:modify_simple` {#originsmodify_simple}

供集成使用的通用修饰器容器。除非有集成查询它，否则没有任何效果。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) | 可选 | 在 `modifiers` 之前应用 |
| `modifiers` | [修饰器](../shared_data_types#modifier) 的列表 | 可选 | 数值修饰器 |

### `origins:modify_slipperiness` {#originsmodify_slipperiness}

修改方块对玩家的滑度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于方块滑度的修饰器 |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 受影响方块的条件 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:modify_slipperiness",
    "modifier": {
        "operation": "multiply_total",
        "value": 0.5
    },
    "block_condition": {
        "type": "origins:block_id",
        "block": "minecraft:dirt"
    }
}
```

此示例将使实体站在泥土方块上时的摩擦力增加 50%。

</details>

### `origins:modify_velocity` {#originsmodify_velocity}

修改玩家因击退、爆炸等产生的速度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于速度变化的修饰器 |
| `axis` | 字符串列表 | 全部轴 | 要修改的轴：`x`、`y`、`z` |

<details>
<summary>示例</summary>

```json
{
  "type": "origins:modify_velocity",
  "modifier": {
    "value": -2,
    "operation": "multiply_total"
  },
  "axis": [
    "x",
    "y",
    "z"
  ]
}
```

此示例将使玩家的所有速度反向。你会向上坠落，移动按键会反转，等等。

</details>

### `origins:modify_xp_gain` {#originsmodify_xp_gain}

修改获得的经验。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于经验获取的修饰器 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:modify_xp_gain",
    "modifier": {
        "operation": "multiply_base",
        "value": 2.0
    }
}
```

此示例将使从经验球获得的经验变为三倍。

</details>

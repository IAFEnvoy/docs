---
sidebar_position: 0
---

# 常规能力 {#regular-powers}

具有独特功能的独立能力。

---

### `origins:attribute` {#originsattribute}

在能力激活时应用属性修饰器，即使没有条件也可以生效。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `modifier` | [属性条目](../shared_data_types#attributeentry) or List | `[]` | 属性修饰器条目 |
| `update_health` | [布尔值](../basic_concepts#boolean) | `true` | 应用后是否更新最大生命值 |

### `origins:attribute_like_resource` {#originsattribute_like_resource}

提供一个小数资源。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `min` | Number | **必填** | 最小值 |
| `max` | Number | **必填** | 最大值 |
| `start_value` | Number | `min` | 初始值 |

### `origins:attribute_linked_resource` {#originsattribute_linked_resource}

将持有者的属性值作为只读资源提供。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `attribute` | [标识符](../basic_concepts#identifier) | **必填** | 属性 ID |
| `value` | [字符串](../basic_concepts#string) | `total` | 属性取值：`total` 或 `base` |

### `origins:attribute_modify_transfer` {#originsattribute_modify_transfer}

在实体之间转移属性修饰器。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `target` | 能力引用 | **必填** | 要转移属性修饰器的能力 |
| `attribute` | [标识符](../basic_concepts#identifier) | **必填** | 读取修饰器的属性 |
| `multiplier` | [浮点数](../basic_concepts#float) | `1.0` | 应用于转移数值的乘数 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:attribute_modify_transfer",
    "target": "origins:modify_break_speed",
    "attribute": "minecraft:generic.movement_speed",
    "multiplier": 1.25
}
```

此示例会把 `minecraft:generic.movement_speed` 属性的属性修饰器数值转移到 `origins:modify_break_speed` 能力上，实际上就是在玩家的移动速度较高时给予其挖掘速度加成。

</details>

### `origins:burn` {#originsburn}

按固定间隔点燃实体。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `interval` | [整数](../basic_concepts#integer) | **必填** | 两次点燃之间的间隔（以 tick 计） |
| `burn_duration` | [整数](../basic_concepts#integer) | **必填** | 每次点燃的燃烧时长（以 tick 计） |

<details>
<summary>示例</summary>

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

此示例会每 20 tick 在实体暴露于阳光下时将其点燃 120 tick（6 秒）。

</details>

### `origins:climbing` {#originsclimbing}

允许玩家像蜘蛛一样攀爬墙壁。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `allow_holding` | [布尔值](../basic_concepts#boolean) | `true` | 玩家是否可以在墙上保持位置 |
| `hold_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 保持位置所需的条件 |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 可攀爬方块的条件（默认为固体方块） |

<details>
<summary>示例</summary>

```json
{
  "type": "origins:climbing",
  "allow_holding": true,
  "condition": {
    "type": "origins:collided_horizontally"
  }
}
```

此示例会在玩家与墙壁发生碰撞时允许其攀爬，并且即使不朝墙壁移动也能在墙上保持位置。

</details>

### `origins:conditioned_attribute` {#originsconditioned_attribute}

在激活时应用属性修饰器（取决于条件）。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `modifier` | [属性条目](../shared_data_types#attributeentry) or List | `[]` | 属性修饰器条目 |
| `update_health` | [布尔值](../basic_concepts#boolean) | `true` | 应用后是否更新最大生命值 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:conditioned_attribute",
    "modifier": {
        "attribute": "minecraft:generic.movement_speed",
        "operation": "addition",
        "value": 0.4,
        "name": "Increased sprinting speed"
    },
    "condition": {
        "type": "origins:sprinting"
    }
}
```

此示例能力会在实体疾跑时为其 `minecraft:generic.movement_speed` 属性增加 0.4。

</details>

### `origins:conditioned_restrict_armor` {#originsconditioned_restrict_armor}

根据条件限制盔甲，并丢弃不符合条件的部件。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `head` | [物品条件](../condition/item_condition_types) | 可选 | 允许保留头盔的条件 |
| `chest` | [物品条件](../condition/item_condition_types) | 可选 | 允许保留胸甲的条件 |
| `legs` | [物品条件](../condition/item_condition_types) | 可选 | 允许保留护腿的条件 |
| `feet` | [物品条件](../condition/item_condition_types) | 可选 | 允许保留靴子的条件 |
| `tick_rate` | [整数](../basic_concepts#integer) | `20` | 检查装备的间隔（以 tick 计） |

<details>
<summary>示例</summary>

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

此示例会阻止该实体装备任何比锁链盔甲更强的盔甲，除非该实体处于黑暗处（光照等级低于 7）。

</details>

### `origins:conduit_power_on_land` {#originsconduit_power_on_land}

在陆地上时给予潮涌能量效果。

### `origins:cooldown` {#originscooldown}

一个仅提供冷却的能力（可供其他机制使用）。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 冷却时长（以 tick 计） |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | HUD 显示设置 |

<details>
<summary>示例</summary>

```json
{
  "type": "origins:cooldown",
  "cooldown": 200,
  "hud_render": {
    "bar_index": 3
  }
}
```

此示例提供 200 tick（10 秒）的冷却，并为其显示 HUD 进度条。

</details>

### `origins:creative_flight` {#originscreative_flight}

在激活时给予创造模式飞行。

### `origins:current_biome_linked_resource` {#originscurrent_biome_linked_resource}

将当前生物群系的一个值作为只读资源提供。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `property` | [字符串](../basic_concepts#string) | **必填** | `temperature` 或 `humidity` |

### `origins:damage_dealt_linked_resource` {#originsdamage_dealt_linked_resource}

将持有者最近一次符合条件的造成伤害作为只读资源提供。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `duration` | [整数](../basic_concepts#integer) | `2147483647` | 保留该事件值的 tick 数 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 用于筛选匹配伤害的条件 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 值更新时执行的动作 |
| `modifier` | [修饰器](../shared_data_types#modifier) | 可选 | 在 `modifiers` 之前应用 |
| `modifiers` | List of [修饰器](../shared_data_types#modifier) | 可选 | 用于记录的伤害的修饰器 |

### `origins:damage_over_time` {#originsdamage_over_time}

按固定间隔对玩家造成伤害。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `interval` | [整数](../basic_concepts#integer) | `20` | 两次伤害之间的间隔（以 tick 计） |
| `damage` | [浮点数](../basic_concepts#float) | `1.0` | 每 tick 的伤害量 |
| `damage_type` | [标识符](../basic_concepts#identifier) | **必填** | 自定义伤害类型 |
| `damage_easy` | [浮点数](../basic_concepts#float) | 可选 | 简单难度下的伤害 |

<details>
<summary>示例</summary>

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

此示例会在该实体处于水中时对其造成伤害。

</details>

### `origins:damage_taken_linked_resource` {#originsdamage_taken_linked_resource}

将持有者最近一次符合条件的受到伤害作为只读资源提供。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `duration` | [整数](../basic_concepts#integer) | `2147483647` | 保留该事件值的 tick 数 |
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 用于筛选匹配伤害的条件 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 值更新时执行的动作 |
| `modifier` | [修饰器](../shared_data_types#modifier) | 可选 | 在 `modifiers` 之前应用 |
| `modifiers` | List of [修饰器](../shared_data_types#modifier) | 可选 | 用于记录的伤害的修饰器 |

### `origins:disable_regen` {#originsdisable_regen}

禁用自然生命恢复。

### `origins:edible_item` {#originsedible_item}

:::caution 不稳定

此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。

:::

使某些物品可供玩家食用。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 此动作会在玩家消耗物品时于玩家身上执行。 |
| `item_action` | [物品动作](../action/item_action_types) | 可选 | 此动作会在玩家消耗的物品上执行。 |
| `result_item_action` | [物品动作](../action/item_action_types) | 可选 | 此动作会在消耗物品后作为结果给予玩家的物品上执行。 |
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 只有物品满足此条件时，才会使该物品可食用，并且只会执行指定的动作。 |
| `food_properties` | [Food Properties](#food-properties) | **必填** | 物品被食用时提供的食物组件。 |
| `consume_animation` | [字符串](../basic_concepts#string) | `eat` | 决定消耗物品的动画效果应为 `eating`（`eat`，根据物品显示粒子效果）还是 `drinking`（`drink`，无粒子效果）。 |
| `consume_sound` | [标识符](../basic_concepts#identifier) | `minecraft:entity.generic.eat` | 物品被食用时会播放具有该命名空间和 ID 的音效事件。 |
| `consuming_time_modifier` | [修饰器](../shared_data_types#modifier) or List | 可选 | 此修饰器会应用到物品被消耗的最长时间（以 tick 计）。 |
| `priority` | [整数](../basic_concepts#integer) | `0` | 决定此能力对物品应用修改的优先级。如果物品本身已经可食用，则必须大于 0。 |

#### 食物属性（Food Properties） {#food-properties}

:::tip
实际的食物饱和度由 `nutrition * saturation * 2` 公式决定。
:::

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `nutrition` | [整数](../basic_concepts#integer) | **必填** | 该食物组件在消耗时恢复的饥饿值。 |
| `saturation` | [浮点数](../basic_concepts#float) | **必填** | 消耗时给予玩家的饱和度量。 |
| `can_always_eat` | [布尔值](../basic_concepts#boolean) | `false` | 该食物组件在饥饿值满时是否仍可食用。 |
| `eat_seconds` | [浮点数](../basic_concepts#float) | `1.6F` | 食用该食物组件所需的时间（以秒计）。 |
| `using_converts_to` | [ItemStack](../minecraft_data_types.md#item-stack) | 可选 | 若指定，将给予玩家该物品堆叠。 |
| `effects` | List of [PossibleEffect](#possibleeffect) | 可选 | 使用带有该食物组件的物品时触发的一种状态效果及其触发概率。 |

#### 可能效果（PossibleEffect） {#possibleeffect}

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `effect` | [MobEffectInstance](../minecraft_data_types#mobeffectinstance) | **必填** | 要施加的状态效果。 |
| `probability` | [浮点数](../basic_concepts#float) | `1.0F` | 消耗时触发该效果的概率。 |

<details>
<summary>示例</summary>

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
    }
}
```

此示例会赋予玩家食用桶装美西螈的能力。它提供 4 点饥饿值和 8 点饱和度（4 * 1 * 2），被视为肉类，并在消耗后返回一个水桶。

</details>

### `origins:effect_immunity` {#originseffect_immunity}

给予对特定状态效果的免疫。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `effect` | [标识符](../basic_concepts#identifier) or List | **必填** | 要免疫的效果 ID |
| `inverted` | [布尔值](../basic_concepts#boolean) | `false` | 若为 `true`，则只有列出的效果会生效 |

<details>
<summary>示例</summary>

```json
{
	"type": "origins:effect_immunity",
	"effect": [
		"minecraft:weakness",
		"minecraft:strength"
	]
}
```

此示例会使该实体对虚弱和力量状态效果免疫。

</details>

### `origins:elytra_flight` {#originselytra_flight}

无需鞘翅物品即可给予鞘翅飞行能力。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `render_elytra` | [布尔值](../basic_concepts#boolean) | `true` | 是否在玩家身上渲染鞘翅 |
| `texture_location` | [标识符](../basic_concepts#identifier) | 可选 | 自定义鞘翅纹理位置 |

<details>
<summary>示例</summary>

```json
{
  "type": "origins:elytra_flight",
  "render_elytra": true
}
```

此示例能力会赋予玩家像鞘翅一样飞行的能力，并会在玩家身上渲染默认的鞘翅。

</details>

### `origins:empty` {#originsempty}

一个不产生任何行为的占位能力。它可以在任何需要能力引用的位置使用，且不会做任何事。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:entity_glow` {#originsentity_glow}

使其他实体对玩家发光（描边）。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 发光实体的条件 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 双实体关系条件 |
| `use_teams` | [布尔值](../basic_concepts#boolean) | `true` | 是否使用队伍颜色 |
| `color` | [整数](../basic_concepts#integer) | `0xFFFFFFFF` | 发光描边的 ARGB 颜色 |

<details>
<summary>示例</summary>

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
			"type": "origins:in_tag",
			"tag": "minecraft:arthropods",
			"inverted": true
		}
      	]
    }
}
```

此示例会使所有不在节肢动物实体类型标签内的实体在处于蜘蛛网中时发光。发光颜色与该实体的队伍颜色相同。

</details>

### `origins:entity_group` {#originsentity_group}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

将持有者分配到某个战斗组，而不改变其实际的实体类型。在 1.21.1 中，`undead` 会使持有者受到来自亡灵杀手的正常额外伤害，`arthropod` 对节肢杀手同理。其余取值保留了数据兼容性，但不会改变原版行为，因为 Minecraft 不再提供通用的实体组 API。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `group` | `undead`, `arthropod`, `illager`, `aquatic`, or `default` | **必填** | 要应用的逻辑战斗组 |

---

### `origins:entity_set` {#originsentity_set}

为这个能力创建一个实体集合。该集合对能力持有者和此能力 ID 而言是唯一的。将此能力 ID 用作[实体集合动作](../action/bientity_action_types#originsadd_to_set)和条件的 `set` 字段，以添加、移除和查询成员。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action_on_add` | [双实体动作](../action/bientity_action_types) | 可选 | 添加实体时执行的动作；持有者为执行者，被添加的实体为目标 |
| `action_on_remove` | [双实体动作](../action/bientity_action_types) | 可选 | 移除实体时执行的动作；持有者为执行者，被移除的实体为目标 |

### `origins:exhaust` {#originsexhaust}

按固定间隔为玩家增加消耗度。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `interval` | [整数](../basic_concepts#integer) | `20` | 间隔（以 tick 计） |
| `exhaustion` | [浮点数](../basic_concepts#float) | `1.0` | 每个间隔的消耗度量 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:exhaust",
    "exhaustion": 0.4
}
```

此示例会为玩家增加 0.4 消耗度，其效果类似于跳跃 8 次（不疾跑）。

</details>

### `origins:fire_immunity` {#originsfire_immunity}

给予对火焰伤害的免疫。

<details>
<summary>示例</summary>

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

此示例会在该实体主手持有岩浆块时给予其火焰免疫。

</details>

### `origins:fire_projectile` {#originsfire_projectile}

按下按键时发射投掷物，带有冷却。

:::warning
更推荐使用[实体动作版本](../action/entity_action_types#originsfire_projectile)
:::

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_type` | [标识符](../basic_concepts#identifier) | **必填** | 投掷物的实体类型 ID |
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 冷却（以 tick 计） |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | HUD 显示设置 |
| `count` | [整数](../basic_concepts#integer) | `1` | 发射的投掷物数量 |
| `interval` | [整数](../basic_concepts#integer) | `0` | 发射多个投掷物时它们之间的间隔 |
| `start_delay` | [整数](../basic_concepts#integer) | `0` | 首个投掷物之前的延迟 |
| `speed` | [浮点数](../basic_concepts#float) | `1.5` | 投掷物速度 |
| `divergence` | [浮点数](../basic_concepts#float) | `1.0` | 随机散布角度 |
| `sound` | [标识符](../basic_concepts#identifier) | 可选 | 发射时播放的音效事件 ID |
| `tag` | NBT | 可选 | 应用到投掷物的 NBT 数据 |
| `key` | [按键](../shared_data_types#key) | 可选 | 按键绑定设置 |
| `projectile_action` | [实体动作](../action/entity_action_types) | 可选 | 在投掷物上执行的动作 |
| `shooter_action` | [实体动作](../action/entity_action_types) | 可选 | 在发射者身上执行的动作 |

### `origins:freeze` {#originsfreeze}

使玩家冻结（类似陷入细雪）。

<details>
<summary>示例</summary>

```json
{
    "type": "origins:freeze"
}
```

此示例会使拥有该能力的实体冻结。

</details>

### `origins:grounded` {#originsgrounded}

阻止玩家飞行（鞘翅、创造模式飞行等）。

<details>
<summary>示例</summary>

```json
{
    "type": "origins:grounded"
}
```

最基础的示例——始终将玩家视为位于地面上，使其即使在空中也能跳跃。

</details>

### `origins:hover` {#originshover}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

使能力持有者保持当前的垂直速度，从而可以悬停在空中。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `step_assist` | [浮点数](../basic_concepts#float) | `0` | 预留的台阶辅助距离 |

### `origins:healing_linked_resource` {#originshealing_linked_resource}

将持有者最近一次的治疗量作为只读资源提供。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `duration` | [整数](../basic_concepts#integer) | `2147483647` | 保留该事件值的 tick 数 |
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 值更新时执行的动作 |

### `origins:ignore_water` {#originsignore_water}

使玩家在移动时忽略水（可以正常地穿过水行走）。

<details>
<summary>示例</summary>

```json
{
  	"type": "origins:ignore_water"
}
```

此示例使拥有该能力的实体忽略水。:)

</details>

### `origins:inventory` {#originsinventory}

提供一个可通过按键访问的额外物品栏。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `title` | [文本组件](../minecraft_data_types#text-component) | `container.inventory` | 容器标题 |
| `container_type` | [字符串](../basic_concepts#string) | `dispenser` | 容器类型：`chest_1x9` `chest_2x9` `chest_3x9` `chest_4x9` `chest_5x9` `chest_6x9` `hopper` `dispenser` |
| `drop_on_death` | [布尔值](../basic_concepts#boolean) | `false` | 死亡时内容物是否掉落 |
| `drop_on_death_filter` | [物品条件](../condition/item_condition_types) | 可选 | 死亡时应掉落的物品筛选条件 |
| `recoverable` | [布尔值](../basic_concepts#boolean) | `true` | 重新获得该能力时是否恢复物品 |
| `key` | [Key] | 可选 | 按键绑定设置 |

### `origins:living_entity_linked_resource` {#originsliving_entity_linked_resource}

将生物实体的某个属性作为只读资源提供；对非生物实体返回 `0`。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `property` | [字符串](../basic_concepts#string) | **必填** | 要读取的生物实体属性 |

玩家属性包括 `food_level`、`saturation`、`health`、`relative_health`、`absorption`、`breathing`、`fire_ticks`、`frozen_ticks`、`freezing_scale`、`exp_level`、`exp_points`、`exp_score`、`sleep_timer`、`stuck_arrows`、`fall_distance`、`time_of_day`、`time`、`lunar_time`、`light_level`、`block_light_level`、`sky_light_level`、`age`、`x`、`y`、`z`、`velocity_x`、`velocity_y`、`velocity_z`、`pitch`、`yaw` 和 `roll`。生物实体资源支持相同的列表，但不包括经验与睡眠相关属性。在 Minecraft 1.21.1 中，`roll` 的取值为 `0`。

### `origins:invisibility` {#originsinvisibility}

使玩家隐形。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `render_armor` | [布尔值](../basic_concepts#boolean) | `false` | 隐形时是否渲染盔甲 |
| `render_outline` | [布尔值](../basic_concepts#boolean) | `false` | 是否渲染玩家描边 |

<details>
<summary>示例</summary>

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

此示例会在拥有该能力的实体未燃烧时使其隐形，甚至隐藏盔甲。

</details>

### `origins:invulnerability` {#originsinvulnerability}

给予伤害免疫。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `damage_condition` | [伤害条件](../condition/damage_condition_types) | 可选 | 玩家易受伤害的伤害类型条件（除非使用 `inverted`） |

<details>
<summary>示例</summary>

```json
{
  	"type": "origins:invulnerability",
	"damage_condition": {
		"type": "origins:id",
		"value": "minecraft:fall"
	}
}
```

此示例会使该实体免疫摔落伤害。

</details>

### `origins:item_on_item` {#originsitem_on_item}

右键点击时将两个物品组合。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `using_item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 手中物品的条件 |
| `on_item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 目标物品的条件 |
| `result` | [物品堆叠](../minecraft_data_types#item-stack) | 可选 | 结果物品 |
| `result_action` | [物品动作](../action/item_action_types) | 可选 | 应用到结果上的动作 |
| `using_item_stack_amount` | [整数](../basic_concepts#integer) | `1` | 从使用物品中消耗的数量 |

<details>
<summary>示例</summary>

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

此示例会通过对可熔炼物品使用煤炭物品来熔炼它。

</details>

### `origins:keep_inventory` {#originskeep_inventory}

玩家死亡时保留物品栏。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `slots` | List of [整数](../basic_concepts#integer) | 可选 | 要保留的特定物品栏槽位索引 |
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 要保留物品的条件 |

<details>
<summary>示例</summary>

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

此示例会使快捷栏槽位中的物品保留下来。

</details>

### `origins:launch` {#originslaunch}

按下按键时将玩家发射到空中。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `speed` | [浮点数](../basic_concepts#float) | **必填** | 向上发射速度 |
| `cooldown` | [整数](../basic_concepts#integer) | `1` | 冷却（以 tick 计） |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | HUD 显示设置 |
| `sound` | [标识符](../basic_concepts#identifier) | 可选 | 发射时播放的音效事件 ID |
| `key` | [按键](../shared_data_types#key) | 可选 | 按键绑定设置 |

<details>
<summary>示例</summary>

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

此示例会将玩家发射到空中，冷却为 30 秒。

</details>

### `origins:like_water` {#originslike_water}

使玩家在各种检查中被视为处于水中。

### `origins:model_color` {#originsmodel_color}

改变玩家模型的渲染颜色。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `red` | [浮点数](../basic_concepts#float) | 可选 | 红色通道（0-1） |
| `green` | [浮点数](../basic_concepts#float) | 可选 | 绿色通道（0-1） |
| `blue` | [浮点数](../basic_concepts#float) | 可选 | 蓝色通道（0-1） |
| `alpha` | [浮点数](../basic_concepts#float) | 可选 | Alpha 通道（0-1） |
| `color` | [整数](../basic_concepts#integer) | 可选 | 以单个整数表示的 ARGB 颜色 |

<details>
<summary>示例</summary>

```json
{
  	"type": "origins:model_color",
  	"red": 0.5,
  	"green": 0.5,
  	"alpha": 0.7
}
```

此示例会给该实体的纹理添加偏蓝色的色调，并使其略微透明。

</details>

### `origins:math_resource` {#originsmath_resource}

将表达式结果作为只读资源提供。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `expression` | [字符串](../basic_concepts#string) | **必填** | 使用 exp4j 求值的表达式 |
| `variables` | [变量](../shared_data_types#variables) | 可选 | 表达式中可用的资源值 |

### `origins:modifiable_resource` {#originsmodifiable_resource}

提供一个带上下限的整数资源，修饰器能力可以改变这些上下限。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `min` | [整数](../basic_concepts#integer) | **必填** | 基础最小值 |
| `max` | [整数](../basic_concepts#integer) | **必填** | 基础最大值 |
| `start_value` | [整数](../basic_concepts#integer) | `min` | 初始值 |
| `enforce_limits` | [布尔值](../basic_concepts#boolean) | `true` | 将读写值限制在生效的上下限内 |
| `retain_value` | [布尔值](../basic_concepts#boolean) | `false` | 在上下限变化时保留超出范围的已存储值 |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | HUD 显示设置 |
| `min_action` | [实体动作](../action/entity_action_types) | 可选 | 写入达到当前最小值时执行的动作 |
| `max_action` | [实体动作](../action/entity_action_types) | 可选 | 写入达到当前最大值时执行的动作 |

### `origins:modify_target_range` {#originsmodify_target_range}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

改变针对持有者的、符合条件的生物的最大目标搜索范围。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `mob_condition` | Entity Condition | 可选 | 针对发起索敌的生物测试的条件 |
| `modifier` | Modifier | **必填** | 应用到该生物基础跟随范围上的修饰器 |

### `origins:multiple` {#originsmultiple}

允许在单个文件中定义多个能力。

除 `type`、`name`、`description`、`condition`、`hidden`、`loading_priority` 和 `badges` 之外的任何“键”都会被视为子能力，其值是一个完整定义的能力类型。

<details>
<summary>示例</summary>

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

这个示例超级能力有两个“键”，它们被视为子能力：`toggle` 和 `invisibility`。只有当 `toggle` 子能力被切换为开启时，`invisibility` 子能力才会处于激活状态（例如使实体隐形）。

</details>

:::warning
不建议在多重能力中使用多个能力。
:::

### `origins:night_vision` {#originsnight_vision}

给予夜视。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `strength` | [浮点数](../basic_concepts#float) | `1.0` | 夜视强度（0-1） |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:night_vision"
}
```

此示例会给予玩家普通的夜视。

</details>

### `origins:nbt_linked_resource` {#originsnbt_linked_resource}

将实体 NBT 路径上的第一个数值作为只读资源提供。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `path` | [字符串](../basic_concepts#string) | **必填** | 实体 NBT 路径 |

### `origins:overlay` {#originsoverlay}

在屏幕上渲染叠加纹理。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `texture` | [标识符](../basic_concepts#identifier) | **必填** | 叠加纹理位置 |
| `strength` | [浮点数](../basic_concepts#float) | `1.0` | 叠加不透明度（0-1） |
| `draw_mode` | [字符串](../basic_concepts#string) | 可选 | 绘制模式（例如 `nausea`） |
| `draw_phase` | [字符串](../basic_concepts#string) | 可选 | 绘制阶段 |
| `hide_with_hud` | [布尔值](../basic_concepts#boolean) | `true` | HUD 隐藏时是否一并隐藏 |
| `visible_in_third_person` | [布尔值](../basic_concepts#boolean) | `false` | 第三人称视角中是否可见 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:overlay",
    "texture": "minecraft:textures/block/ice.png",
    "strength": 1.0,
    "draw_mode": "texture",
    "draw_phase": "below_hud",
    "hide_with_hud": false,
    "visible_in_third_person": false
}
```

此示例会使用冰块的纹理渲染一个叠加层，它位于 HUD 之下，并且在第三人称视角中不可见。

</details>

### `origins:particle` {#originsparticle}

在玩家周围生成粒子。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `particle` | [粒子选项](../minecraft_data_types#particle-option) | **必填** | 粒子类型与参数 |
| `frequency` | [整数](../basic_concepts#integer) | `4` | 生成粒子的频率（两次生成之间相隔的 tick 数） |

<details>
<summary>示例</summary>

```json
{
  	"type": "origins:particle",
  	"particle": "minecraft:portal",
  	"frequency": 4
}
```

此示例会持续在拥有该能力的实体身上生成传送门粒子。

</details>

### `origins:permanent_effect` {#originspermanent_effect}

:::caution 不稳定

此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。

:::

对玩家施加永久效果。无法通过牛奶或其他方式移除。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `effect` | [效果条目](../shared_data_types#effectentry) or List | **必填** | 要施加的状态效果 |
| `allow_higher_level` | [布尔值](../basic_concepts#boolean) | `false` | 是否允许更高等级的效果覆盖此效果 |

<details>
<summary>示例</summary>

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

此示例会给予玩家力量 II，且不显示粒子和图标。

</details>

### `origins:phasing` {#originsphasing}

允许玩家穿过方块。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `blacklist` | [布尔值](../basic_concepts#boolean) | `false` | 若为 `true`，方块条件将变为黑名单而非白名单 |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 可穿过的方块条件（若启用黑名单，则为阻止穿过的方块条件） |
| `render_type` | [字符串](../basic_concepts#string) | `blindness` | 视觉效果：`blindness` 或 `remove_blocks` |
| `view_distance` | [浮点数](../basic_concepts#float) | `10.0` | 穿墙时玩家的可视距离 |
| `phase_down_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 向下穿越的条件（默认为需要潜行） |

<details>
<summary>示例</summary>

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

此示例会允许玩家穿过除 `origins:unphasable`（`data/origins/tags/blocks/unphasable.json`）方块标签中的方块之外的所有方块。他们还可以在潜行时向下穿越，但会在每个方块处短暂停留，以免受到摔落伤害。

</details>

### `origins:player_linked_resource` {#originsplayer_linked_resource}

将玩家属性作为只读资源提供；对非玩家实体返回 `0`。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `property` | [字符串](../basic_concepts#string) | **必填** | 要读取的玩家属性 |

### `origins:prevent_targeting` {#originsprevent_targeting}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

阻止符合条件的生物将持有者设为攻击目标。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `mob_condition` | Entity Condition | 可选 | 针对发起索敌的生物测试的条件 |

### `origins:protect` {#originsprotect}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

召唤附近符合条件的生物去攻击伤害过持有者或被持有者伤害的实体。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `protector_condition` | Entity Condition | 可选 | 针对附近潜在保护者测试的条件 |
| `radius` | Double | `16.0` | 搜索保护者的半径 |

---

### `origins:recipe` {#originsrecipe}

为玩家提供额外的合成配方。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `recipe` | [标识符](../basic_concepts#identifier) | **必填** | 要提供的配方 ID |
| `replace` | [布尔值](../basic_concepts#boolean) | 可选 | 若为 true，则替换已有配方 |
| `priority` | [整数](../basic_concepts#integer) | `0` | 能力的优先级，优先级更高的能力先执行 |

<details>
<summary>示例</summary>

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

此示例会允许拥有该能力的玩家在工作台中无序地组合两根线来合成蜘蛛网。

</details>

### `origins:replace_loot_table` {#originsreplace_loot_table}

替换战利品表。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `replace` | Object | **必填** | 原战利品表 -> 替换用战利品表 ID 的映射 |
| `priority` | [整数](../basic_concepts#integer) | `0` | 能力的优先级，优先级更高的能力先执行 |

### `origins:resource` {#originsresource}

提供一个可被动作修改的数值资源。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `min` | [整数](../basic_concepts#integer) | **必填** | 最小资源值 |
| `max` | [整数](../basic_concepts#integer) | **必填** | 最大资源值 |
| `hud_render` | [HUD 渲染](../shared_data_types#hudrender) | 可选 | HUD 显示设置 |
| `start_value` | [整数](../basic_concepts#integer) | 可选 | 初始资源值（默认为 min） |
| `min_action` | [实体动作](../action/entity_action_types) | 可选 | 资源达到最小值时执行的动作 |
| `max_action` | [实体动作](../action/entity_action_types) | 可选 | 资源达到最大值时执行的动作 |

### `origins:restrict_armor` {#originsrestrict_armor}

阻止装备不符合条件的盔甲。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `head` | [物品条件](../condition/item_condition_types) | 可选 | 允许的头盔条件 |
| `chest` | [物品条件](../condition/item_condition_types) | 可选 | 允许的胸甲条件 |
| `legs` | [物品条件](../condition/item_condition_types) | 可选 | 允许的护腿条件 |
| `feet` | [物品条件](../condition/item_condition_types) | 可选 | 允许的靴子条件 |
| `tick_rate` | [整数](../basic_concepts#integer) | `20` | 检查装备的间隔 |

<details>
<summary>示例</summary>

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

此示例会阻止该实体装备任何防御力高于锁链盔甲的盔甲。

</details>

### `origins:riptide` {#originsriptide}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

只要此能力的基础 `condition` 处于激活状态，就允许持有者使用激流附魔，即使不在水中或雨中也是如此。无需额外字段。

---

### `origins:scoreboard_linked_resource` {#originsscoreboard_linked_resource}

将持有者当前的计分板值作为只读资源提供。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `objective` | [字符串](../basic_concepts#string) | **必填** | 计分板目标名称 |

### `origins:scare_creepers` {#originsscare_creepers}

使附近的苦力怕逃离玩家。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `radius` | [浮点数](../basic_concepts#float) | 可选 | 效果半径 |
| `speed` | [浮点数](../basic_concepts#float) | 可选 | 惊吓效果强度 |

### `origins:self_glow` {#originsself_glow}

使玩家发光。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `use_teams` | [布尔值](../basic_concepts#boolean) | `true` | 是否使用队伍颜色 |
| `color` | [整数](../basic_concepts#integer) | 可选 | 发光的 ARGB 颜色 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:self_glow",
    "use_teams": false,
    "color": 4287751078,
    "condition": {
        "type": "origins:in_rain"
    }
}
```

此示例会在该实体处于雨中时，使拥有该能力的实体对所有人发光。

</details>

### `origins:shader` {#originsshader}

对玩家的视野应用后处理着色器。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `shader` | [标识符](../basic_concepts#identifier) | **必填** | 着色器资源位置 |
| `toggleable` | [布尔值](../basic_concepts#boolean) | 可选 | 着色器是否可切换 |

<details>
<summary>示例</summary>

```json
{
  	"type": "origins:shader",
  	"shader": "minecraft:shaders/post/pencil.json"
}
```

此示例会让玩家以铅笔素描的风格观察世界！

</details>

### `origins:shaking` {#originsshaking}

使玩家的镜头摇晃。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `shake_intensity` | [浮点数](../basic_concepts#float) | 可选 | 摇晃强度 |
| `shake_frequency` | [浮点数](../basic_concepts#float) | 可选 | 摇晃频率 |

<details>
<summary>示例</summary>

```json
{
  	"type": "origins:shaking",
  	"condition": {
    	"type": "origins:on_fire",
      "inverted": true
  	}
}
```

此示例会在该实体未燃烧时使其摇晃。

</details>

### `origins:sprinting` {#originssprinting}

:::caution 不稳定
此能力目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

在能力激活时使能力持有者疾跑。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `requires_input` | [布尔值](../basic_concepts#boolean) | `false` | 仅在玩家已经在疾跑时才强制疾跑 |

### `origins:stacking_effect` {#originsstacking_effect}

根据条件施加可叠加的状态效果。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `effect` | [效果条目](../shared_data_types#effectentry) or List | **必填** | 要施加的效果 |
| `min_stacks` | [整数](../basic_concepts#integer) | `0` | 最小效果等级叠加层数 |
| `max_stacks` | [整数](../basic_concepts#integer) | `10` | 最大效果等级叠加层数 |
| `duration_per_stack` | [整数](../basic_concepts#integer) | `10` | 每层效果的持续时间（以秒计） |

### `origins:starting_equipment` {#originsstarting_equipment}

获得能力时给予物品。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `stack` | [带位置的物品堆叠](../shared_data_types#positioneditemstack) or List | **必填** | 要给予的物品，可选择附带槽位位置 |
| `recurrent` | [布尔值](../basic_concepts#boolean) | `false` | 若为 `true`，重生时也会给予物品 |

<details>
<summary>示例</summary>

```json
{
  	"type": "origins:starting_equipment",
  	"stack": [
    	{
      		"id": "minecraft:compass"
    	},
    	{
      		"id": "minecraft:clock"
    	},
    	{
      		"id": "minecraft:map",
	    	"count": 9
    	}
  	]
}
```

此示例会给予玩家 Origins: Classes 中已知的“探险家套装”，其中包含一个指南针、一个时钟和 9 张空地图。

</details>

### `origins:status_effect_linked_resource` {#originsstatus_effect_linked_resource}

将状态效果的某个值作为只读资源提供。缺失的效果其等级为 `-1`、持续时间为 `0`。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `effect` | [标识符](../basic_concepts#identifier) | **必填** | 状态效果 ID |
| `property` | [字符串](../basic_concepts#string) | **必填** | `amplifier` 或 `duration` |

### `origins:status_bar_texture` {#originsstatus_bar_texture}

更改玩家的状态栏纹理（心形、饥饿等）。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `texture` | [标识符](../basic_concepts#identifier) | **必填** | 纹理位置 |
| `draw_mode` | [字符串](../basic_concepts#string) | 可选 | 绘制模式 |
| `priority` | [整数](../basic_concepts#integer) | `0` | 绘制优先级 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:status_bar_texture",
    "texture": "example:textures/gui/custom_thing.png"
}
```

此示例会将状态栏纹理替换为 `example:textures/gui/custom_thing.png`（`assets/example/textures/gui/custom_thing.png`）精灵表。

</details>

### `origins:toggle` {#originstoggle}

可通过按键开启/关闭的可切换能力。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `active_by_default` | [布尔值](../basic_concepts#boolean) | `true` | 能力是否初始为激活状态 |
| `retain_state` | [布尔值](../basic_concepts#boolean) | `true` | 状态是否在死亡/维度切换后保留 |
| `key` | [按键](../shared_data_types#key) | 可选 | 按键绑定设置 |

### `origins:tooltip` {#originstooltip}

在玩家的物品上添加一行提示文本。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `text` | [文本组件](../minecraft_data_types#text-component) | **必填** | 提示文本 |
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 获得该提示的物品需满足的条件 |
| `order` | [整数](../basic_concepts#integer) | `0` | 提示行的排序 |

<details>
<summary>示例</summary>

```json
{
    "type": "origins:tooltip",
    "text": "A gold star!"
}
```

此示例会为玩家的物品添加一行“`A gold star!`”提示。

</details>

### `origins:walk_on_fluid` {#originswalk_on_fluid}

允许玩家在特定流体上行走。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `fluid` | [标识符](../basic_concepts#identifier) | **必填** | 可在其上行走的流体 ID（例如 `minecraft:water`） |

<details>
<summary>示例</summary>

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

此示例会允许拥有该能力的实体像炽足兽一样在熔岩上行走。添加建议的条件是为了让实体在下沉后能在熔岩中游泳，这种情况可能发生在它们走进熔岩瀑布时。

</details>

### `origins:water_breathing` {#originswater_breathing}

给予水下呼吸（防止溺水）。

### `origins:water_vision` {#originswater_vision}

改善水下能见度。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `strength` | [浮点数](../basic_concepts#float) | `1.0` | 视野清晰度强度（0-1） |

### `origins:variable_nbt_linked_resource` {#originsvariable_nbt_linked_resource}

将插值后的实体 NBT 路径上的第一个数值作为只读资源提供。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `path` | [字符串](../basic_concepts#string) | **必填** | 带变量插值的实体 NBT 路径 |
| `variables` | [变量](../shared_data_types#variables) | 可选 | 路径中可用的资源值 |

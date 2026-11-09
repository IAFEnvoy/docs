# 实体动作类型 {#entity-action-types}

实体动作对单个实体执行操作。可在能力类型和其他动作中使用它们。

### `origins:action_on_set`

对实体集合中的每个实体执行一个双实体动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `set` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 实体集合 ID |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | **必填** | 源与每个集合成员之间的动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 集合成员的过滤器 |
| `limit` | [整数](../basic_concepts#integer) | `0` | 最多目标的实体数（0 = 不限） |
| `reverse` | [布尔值](../basic_concepts#boolean) | `false` | 若为 `true`，则按相反顺序遍历 |

### `origins:add_velocity`

为实体增加速度。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `x` | [浮点数](../basic_concepts#float) | `0.0` | X 轴速度 |
| `y` | [浮点数](../basic_concepts#float) | `0.0` | Y 轴速度 |
| `z` | [浮点数](../basic_concepts#float) | `0.0` | Z 轴速度 |
| `space` | [坐标空间](../shared_data_types#space) | `world` | 速度使用的坐标空间 |
| `set` | [布尔值](../basic_concepts#boolean) | `false` | 若为 `true`，则直接设置速度而非累加 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:add_velocity",
    "y": 2
}
```

此示例会为实体添加上升速度，将其抛向空中。

</details>

### `origins:add_xp`

增加经验值或经验等级。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `points` | [整数](../basic_concepts#integer) | **必填** | 要增加的经验点数 |
| `levels` | [整数](../basic_concepts#integer) | **必填** | 要增加的经验等级数 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:add_xp",
  "levels": 2
}
```

此示例会为玩家增加 2 个等级。

</details>

### `origins:apply_effect`

施加状态效果（与 add_effect 的内部行为不同）。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `effect` | [值或列表](../basic_concepts#valueorlist) 形式的 [MobEffectInstance](../minecraft_data_types#mobeffectinstance) | **必填** | 要施加的效果 |

<details>
<summary>示例</summary>

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

此示例会对实体施加持续 20 秒的速度 I 状态效果。

</details>

### `origins:area_of_effect`

在指定半径内执行双实体动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `radius` | [浮点数](../basic_concepts#float) | `16.0` | 决定该区域的半径。 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | **必填** | 对执行者和半径内实体执行的双实体动作。 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 若指定，则仅当满足该条件时才执行动作。 |
| `include_target` | [布尔值](../basic_concepts#boolean) | `false` | 若为 `true`，则执行者自身也会作为目标包含在内。 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:area_of_effect",
    "radius": 32,
    "bientity_action": {
        "type": "origins:target_action",
        "action": {
            "type": "origins:set_on_fire",
            "tick": 100
        }
    },
    "bientity_condition": {
        "type": "origins:can_see"
    }
}
```

此示例会将 32 格半径内的实体点燃 5 秒，前提是半径内的实体能被调用该动作的实体“看到”。

</details>

### `origins:award_stat`

增加一项或多项 Minecraft 统计。仅在服务端有效。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `stat`  | [统计引用](../shared_data_types#stat-reference) 或 List | **必填** | 要增加的统计 |
| `amount` | [整数](../basic_concepts#integer) | `1` | 增加的数量 |

<details>
<summary>示例 1</summary>

```json
{
  "type": "origins:award_stat",
  "stat": [
    "minecraft:jump",
    "minecraft:sprint_one_cm"
  ]
}
```

此示例会将 `minecraft:jump` 和 `minecraft:sprint_one_cm` 两项统计各增加 1。

</details>

<details>
<summary>示例 2</summary>

```json
{
  "type": "origins:award_stat",
  "stat": {
    "stat_type": "minecraft:mined",
    "id": "minecraft:diamond_ore"
  },
  "amount": 20
}
```

此示例会将 `minecraft:mined:minecraft:diamond_ore` 统计增加 20。

</details>

### `origins:block_action`

在实体位置执行方块动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `block_action` | [方块动作](../action/block_action_types) | **必填** | 要执行的动作 |

### `origins:block_action_at`

在距实体特定偏移处执行方块动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `block_action` | [方块动作](../action/block_action_types) | 可选 | 要执行的动作 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:block_action_at",
    "block_action": {
        "type": "origins:set_block",
        "block": "minecraft:sand"
    }
}
```

此示例会执行一个 [放置方块](../action/block_action_types)，在实体脚下设置一个沙子方块。

</details>

### `origins:change_resource`

按指定数量更改资源值。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `resource` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 资源能力 ID |
| `change` | 整数或 [资源引用](../shared_data_types#resource-reference) | **必填** | 更改的数量（可为负值） |
| `operation` | [字符串](../basic_concepts#string) | `add` | 操作：`add` 或 `set` |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:change_resource",
    "resource": "namespace:example",
    "change": 1
}
```

此示例会为使用 [资源（能力类型）](../power/regular) 的 `namespace:example`（`data/namespace/powers/example.json`）能力增加 1。

</details>

### `origins:variable_change_resource`

按表达式结果更改资源。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `resource` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 资源能力 ID |
| `expression` | [字符串](../basic_concepts#string) | **必填** | 使用 exp4j 求值的表达式 |
| `variables` | [变量](../shared_data_types#variables) | 可选 | 可供表达式使用的资源值 |
| `operation` | [字符串](../basic_concepts#string) | `add` | `add` 或 `set` |

### `origins:clear_set`

清空实体集合。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `set` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 实体集合 ID |

### `origins:crafting_table`

为实体打开工作台界面。

### `origins:damage`

对实体造成伤害。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `damage_type` | [标识符](../basic_concepts#identifier) | **必填** | 伤害类型 ID |
| `amount` | [浮点数](../basic_concepts#float) | **必填** | 伤害数值 |
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于该伤害的修饰器 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:damage",
  "amount": 4,
  "damage_type": "minecraft:on_fire"
}
```

此示例会对实体造成 4 点（2 颗心）火焰伤害。

</details>

### `origins:dismount`

强制实体从当前骑乘的任何载具上下来。

### `origins:drop_inventory`

掉落实体的物品栏。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `power` | [标识符](../basic_concepts#identifier) | 可选 | 要掉落其物品栏的能力 |
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 对掉落物品执行的动作 |
| `item_action` | [物品动作](../action/item_action_types) | 可选 | 应用于每个掉落物品的动作 |
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 要掉落物品的过滤器 |
| `slot` | 整数列表 | 可选 | 要掉落的特定槽位 |
| `throw_randomly` | [布尔值](../basic_concepts#boolean) | `false` | 物品是否随机散落 |
| `retain_ownership` | [布尔值](../basic_concepts#boolean) | `true` | 掉落的物品是否保留归属 |
| `amount` | [整数](../basic_concepts#integer) | `0` | 最多掉落的物品数（0 = 全部） |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:drop_inventory"
}
```

此示例会掉落实体物品栏中的所有物品。

</details>

### `origins:emit_game_event`

在实体所在位置发出游戏事件。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | [标识符](../basic_concepts#identifier) | **必填** | 游戏事件 ID |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:emit_game_event",
    "action": "minecraft:ring_bell"
}
```

此示例会发出 `minecraft:ring_bell` 游戏事件，其红石信号输出为 6。

</details>

### `origins:ender_chest`

为实体打开末影箱界面。

### `origins:equipped_item_action`

对实体已装备的物品执行物品动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `slot` | [装备槽位组](../minecraft_data_types#equipment-slot-group) | **必填** | 哪个装备槽位 |
| `action` | [物品动作](../action/item_action_types) | **必填** | 要执行的动作 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  	"type": "origins:equipped_item_action",
  	"slot": "mainhand",
  	"action": {
	  	"type": "origins:consume",
	  	"amount": 1
  	}
}
```

此示例会从主手装备槽位的物品堆叠中“消耗”（移除）1 个物品。

</details>

### `origins:execute_command`

以实体身份执行命令。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `command` | [字符串](../basic_concepts#string) | **必填** | 要执行的命令 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:execute_command",
  "command": "tellraw @a {\"text\": \"Hello world!\", \"color\": \"green\"}"
}
```

此示例会执行一个 [放置方块](../action/block_action_types)，在实体脚下设置一个沙子方块。

</details>

### `origins:variable_execute_command`

以实体身份执行命令，并对资源变量进行插值。插值形式见 [变量](../shared_data_types#variables)。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `command` | [字符串](../basic_concepts#string) | **必填** | 要执行的命令 |
| `variables` | [变量](../shared_data_types#variables) | 可选 | 可供命令使用的资源值 |

### `origins:exhaust`

为玩家增加消耗度。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `amount` | [浮点数](../basic_concepts#float) | **必填** | 消耗度数值 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:exhaust",
  "amount": 0.4
}
```

此示例会为使用 [资源（能力类型）](../power/regular) 的 `namespace:example`（`data/namespace/powers/example.json`）能力增加 1。

</details>

### `origins:explode`

在实体所在位置创建爆炸。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `power` | [浮点数](../basic_concepts#float) | **必填** | 爆炸威力 |
| `destruction_type` | [字符串](../basic_concepts#string) | `break` | 方块破坏方式：`break`、`destroy`、`none` |
| `indestructible` | [方块条件](../condition/block_condition_types) | 可选 | 免疫该爆炸的方块 |
| `create_fire` | [布尔值](../basic_concepts#boolean) | `false` | 是否生成火焰 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:explode",
  "power": 5,
  "create_fire": false
}
```

此示例会在实体所在位置产生威力为 5 的爆炸，且不会生成火焰。

</details>

### `origins:extinguish`

熄灭实体身上的火焰。

### `origins:feed`

恢复饥饿值和饱和度。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `food` | [整数](../basic_concepts#integer) | **必填** | 要恢复的饥饿值点数 |
| `saturation` | [浮点数](../basic_concepts#float) | **必填** | 要恢复的饱和度 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:feed",
  "food": 4,
  "saturation": 2
}
```

此示例会发出 `minecraft:ring_bell` 游戏事件，其红石信号输出为 6。

</details>

### `origins:fire_projectile`

从实体发射弹射物。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_type` | [标识符](../basic_concepts#identifier) | **必填** | 弹射物实体类型 ID |
| `divergence` | [浮点数](../basic_concepts#float) | `1.0` | 弹射物扩散/偏移 |
| `speed` | [浮点数](../basic_concepts#float) | `1.0` | 弹射物速度倍率 |
| `count` | [整数](../basic_concepts#integer) | `1` | 要发射的弹射物数量 |
| `tag` | [NBT 复合标签](../minecraft_data_types#nbt-compound) | 可选 | 弹射物实体的 NBT 数据标签 |
| `projectile_action` | 实体动作 | 可选 | 对每个已发射弹射物执行的动作 |

### `origins:gain_air`

补充实体的空气（氧气）。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `value` | [整数](../basic_concepts#integer) | **必填** | 要增加的空气 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:gain_air",
  "value": 20
}
```

此示例会从主手装备槽位的物品堆叠中“消耗”（移除）1 个物品。

</details>

### `origins:give_item`

给予实体一个物品。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `stack` | [物品堆叠](../minecraft_data_types#item-stack) | **必填** | 要给予的物品 |
| `item_action` | [物品动作](../action/item_action_types) | 可选 | 给予前应用于该物品的动作 |
| `preferred_slot` | [装备槽位组](../minecraft_data_types#equipment-slot-group) | 可选 | 首选物品栏槽位 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:give_item",
  "stack": {
    "item": "minecraft:egg",
    "amount": 3
  }
}
```

此示例会为实体恢复约 1 秒的呼吸时间。

</details>

### `origins:grant_advancement`

授予玩家一个进度。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `advancement` | [标识符](../basic_concepts#identifier) | **必填** | 进度 ID |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:grant_advancement",
    "advancement": "minecraft:adventure/arbalistic"
}
```

此示例会授予玩家 Arbalistic 进度。

</details>

### `origins:grant_power`

为实体授予能力。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `power` | [标识符](../basic_concepts#identifier) | **必填** | 能力 ID |
| `source` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 该能力的来源标识符 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:grant_power",
    "power": "origins:burn_in_daylight",
    "source": "example:power_source"
}
```

此示例会从 `example:power_source` 来源为实体授予 `origins:burn_in_daylight` 能力。

</details>

### `origins:heal`

治疗实体。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `amount` | [浮点数](../basic_concepts#float) | **必填** | 要恢复的生命值 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:heal",
  "amount": 6
}
```

此示例会为实体恢复 6 点生命值（3 颗心）。

</details>

### `origins:modify_attack_cooldown`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

通过 [修饰器](../shared_data_types#modifier) 更改玩家当前的攻击强度冷却计时器。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `modifier` | 修饰器 | **必填** | 应用于当前冷却计时器的修饰器 |

### `origins:modify_death_ticks`

修改实体的死亡 tick 计数器。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `modifier` | [修饰器] | **必填** | 应用于死亡 tick 的修饰器 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:modify_death_ticks",
    "modifier": {
        "operation": "set_total",
        "value": 0
    }
}
```

此示例会使实体的尸体永久留在世界中。

</details>

### `origins:modify_inventory`

修改实体物品栏中的物品。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `power` | [标识符](../basic_concepts#identifier) | 可选 | 要修改其物品栏的能力 |
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 对实体执行的动作 |
| `item_action` | [物品动作](../action/item_action_types) | **必填** | 要应用的动作 |
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 要修改物品的过滤器 |
| `slot` | 整数列表 | 可选 | 要修改的特定槽位 |
| `process_mode` | [字符串](../basic_concepts#string) | `STACKS` | `STACKS` 或 `ITEMS` |
| `limit` | [整数](../basic_concepts#integer) | `0` | 最多处理的物品数（0 = 不限） |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:modify_inventory",
    "power": "origins:extra_inventory",
    "item_action": {
        "type": "origins:consume"
    }
}
```

此示例会消耗 `origins:extra_inventory` 能力物品栏中的每个物品，将其数量减少 1。

</details>

### `origins:modify_resource`

修改资源值。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `resource` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 资源能力 ID |
| `modifier` | [修饰器] | **必填** | 应用的修饰器 |

<details>
<summary>示例</summary>

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

此示例会为 `example:1st_resource` *(`data/example/powers/1st_resource.json`)* 能力增加 1。

</details>

### `origins:passenger_action`

对实体的乘客执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | [实体动作](../action/entity_action_types) | **必填** | 要执行的动作 |
| `recursive` | [布尔值](../basic_concepts#boolean) | 可选 | 是否递归应用 |

<details>
<summary>示例</summary>

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

此示例会治疗当前骑乘在执行该实体动作类型的实体上的所有实体。

</details>

### `origins:play_sound`

播放声音。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `sound` | [标识符](../basic_concepts#identifier) | **必填** | 声音事件 ID |
| `category` | [字符串](../basic_concepts#string) | 可选 | 声音分类（例如 `neutral`、`player`、`hostile`、`ambient`） |
| `volume` | [浮点数](../basic_concepts#float) | `1.0` | 声音音量 |
| `pitch` | [浮点数](../basic_concepts#float) | `1.0` | 声音音调 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:play_sound",
    "sound": "minecraft:entity.chicken.egg"
}
```

此示例会播放 `minecraft:entity.chicken.egg` 声音事件，可在 16 格距离内听到。（`16 * 1.0 = 16`）

</details>

### `origins:random_teleport`

将实体传送到附近的随机位置。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `area_width` | [浮点数](../basic_concepts#float) | `8.0` | 搜索区域的宽度/水平半径 |
| `area_height` | [浮点数](../basic_concepts#float) | `8.0` | 搜索区域的高度/垂直半径 |
| `heightmap` | [字符串](../basic_concepts#string) | 可选 | 用于地面放置的高度图类型（`MOTION_BLOCKING`、`WORLD_SURFACE` 等） |
| `attempts` | [整数](../basic_concepts#integer) | 可选 | 最大传送尝试次数 |
| `landing_block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 落点方块必须满足的条件 |
| `landing_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 落点位置的条件 |
| `landing_offset` | Object | `{0,0,0}` | 相对落点位置的偏移（`x`/`y`/`z`） |
| `loaded_chunks_only` | [布尔值](../basic_concepts#boolean) | `true` | 仅传送到已加载的区块 |
| `success_action` | [实体动作](../action/entity_action_types) | 可选 | 传送成功时执行的动作 |
| `fail_action` | [实体动作](../action/entity_action_types) | 可选 | 传送失败时执行的动作 |

### `origins:raycast`

执行一次射线检测，并对命中的实体/方块执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `distance` | [浮点数](../basic_concepts#float) | **必填** | 射线检测距离 |
| `block` | [布尔值](../basic_concepts#boolean) | `true` | 是否检测方块 |
| `entity` | [布尔值](../basic_concepts#boolean) | `true` | 是否检测实体 |
| `shape_type` | [字符串](../basic_concepts#string) | `visual` | `visual` 或 `collider` |
| `fluid_handling` | [字符串](../basic_concepts#string) | `none` | `none`、`source_only`、`any` 或 `water` |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 命中实体的过滤器 |
| `before_action` | [实体动作](../action/entity_action_types) | 可选 | 射线检测前执行的动作 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 对命中实体执行的动作 |
| `block_action` | [方块动作](../action/block_action_types) | 可选 | 对命中方块执行的动作 |
| `hit_action` | [实体动作](../action/entity_action_types) | 可选 | 命中（实体或方块）时执行的动作 |
| `miss_action` | [实体动作](../action/entity_action_types) | 可选 | 未命中任何目标时执行的动作 |
| `command_at_hit` | [字符串](../basic_concepts#string) | 可选 | 在命中位置执行的命令 |
| `command_along_ray` | [字符串](../basic_concepts#string) | 可选 | 沿射线路径执行的命令 |
| `command_step` | [浮点数](../basic_concepts#float) | `1.0` | 沿射线执行命令的步长 |
| `command_hit_offset` | [浮点数](../basic_concepts#float) | 可选 | 执行命令时相对命中点的偏移 |
| `command_along_ray_only_on_hit` | [布尔值](../basic_concepts#boolean) | `true` | 仅在命中时显示沿射线的粒子 |

<details>
<summary>示例</summary>

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

此示例会投射一条可以穿过玻璃方块（或任何透明、可透视的方块）的射线，只有当射线命中方块/实体时才会显示灵魂火焰粒子。

</details>

### `origins:remove_effect`

移除状态效果。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `effect` | [标识符](../basic_concepts#identifier) 列表 | 可选 | 要移除的效果 ID（未指定时移除全部） |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:remove_effect",
    "effect": "minecraft:poison"
}
```

此示例会点燃实体 100 tick（5 秒）。

</details>

### `origins:replace_entity`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

用配置的实体类型之一替换非玩家实体，同时保留其序列化数据、位置和旋转角度。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_types` | 实体类型列表 | **必填** | 替换列表 |
| `random` | 布尔值 | `false` | 随机选择，而非使用列表中的第一项 |
| `tag` | NBT 复合标签 | 可选 | 合并到替换后实体中的数据 |
### `origins:replace_inventory`

替换实体的物品栏内容。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 对实体执行的动作 |
| `power` | [标识符](../basic_concepts#identifier) | 可选 | 要替换其物品栏的能力 |
| `item_action` | [物品动作](../action/item_action_types) | **必填** | 要应用于每个物品的动作 |
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 物品的过滤器 |
| `slot` | 整数列表 | 可选 | 要替换的特定槽位 |
| `merge_component` | [布尔值](../basic_concepts#boolean) | `true` | 是否合并数据组件 |
| `stack` | [物品堆叠](../minecraft_data_types#item-stack) | **必填** | 替换用的物品 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:replace_inventory",
    "slot": "weapon.offhand",
    "stack": {
        "item": "minecraft:barrier"
    }
}
```

此示例会将实体副手的物品替换为屏障方块。

</details>

### `origins:reset_stat`

将实体的一项或多项 Minecraft 统计重置（设为 0）。仅
在服务端有效。

`stat` 字段接受单个
[统计引用](https://docs.iafenvoy.com/docs/mod/origins/types/util/stat_reference) 或其列表。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `stat`  | [统计引用](../shared_data_types#stat-reference) 或 List | **必填** | 要重置的统计 |

<details>
<summary>示例 1</summary>

```json
{
  "type": "origins:reset_stat",
  "stat": [
    "minecraft:deaths",
    "minecraft:jump",
    "minecraft:walk_one_cm"
  ]
}
```

此示例会将实体的 `minecraft:deaths`、`minecraft:jump` 和 `minecraft:walk_one_cm` 统计重置为 0。

</details>

<details>
<summary>示例 2</summary>

```json
{
  "type": "origins:reset_stat",
  "stat": {
    "stat_type": "minecraft:mined",
    "id": "minecraft:diamond_ore"
  }
}
```

此示例会将实体的 `minecraft:mined:minecraft:diamond_ore` 统计重置为 0。

</details>

### `origins:revoke_advancement`

撤销一个进度。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `advancement` | [标识符](../basic_concepts#identifier) | **必填** | 进度 ID |
| `criterion` | 字符串列表 | `[]` | 要撤销的特定准则 |
| `selection` | [字符串](../basic_concepts#string) | `ONLY` | 选择模式：`ONLY`、`SKIP`、`EVERYTHING` |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:revoke_advancement",
    "advancement": "minecraft:adventure/arbalistic"
}
```

此示例会撤销玩家的 Arbalistic 进度（如果玩家拥有该进度）。

</details>

### `origins:revoke_power`

从实体身上撤销能力。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `power` | [标识符](../basic_concepts#identifier) | 可选 | 要撤销其能力来源的能力 |
| `source` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 要撤销的来源标识符 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:revoke_power",
    "power": "origins:elytra",
    "source": "origins:elytrian"
}
```

此示例会从实体身上撤销来自 `origins:elytrian` 来源的 `origins:elytra` 能力。

</details>

### `origins:riding_action`

对被骑乘的实体执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | [实体动作](../action/entity_action_types) | **必填** | 要执行的动作 |
| `recursive` | [布尔值](../basic_concepts#boolean) | 可选 | 是否递归应用 |

<details>
<summary>示例</summary>

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

此示例会对当前被该实体动作类型的执行者骑乘的实体施加速度 II 状态效果。

</details>

### `origins:selector_action`

对选择器选中的实体执行动作。可配合条件筛选选中的实体。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `selector` | [字符串](../basic_concepts#string) | **必填** | 实体选择器（例如 `@p`、`@e[type=minecraft:zombie]` 等） |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | **必填** | 要执行的动作 |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 选中实体的过滤器 |

### `origins:self_bientity_action`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

以同一实体同时作为执行者和目标执行双实体动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | [双实体动作](../action/bientity_action_types) | **必填** | 以该实体同时担任两种角色执行的动作 |

### `origins:set_fall_distance`

设置实体的下落距离（影响下落伤害）。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `fall_distance` | [浮点数](../basic_concepts#float) | **必填** | 新的下落距离 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:set_fall_distance",
    "fall_distance": 0
}
```

此示例会重置实体的下落距离，使下落伤害从该点开始计算。

</details>

### `origins:set_no_gravity`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

设置实体是否受重力影响。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `no_gravity` | [布尔值](../basic_concepts#boolean) | `true` | 是否禁用重力 |

### `origins:set_on_fire`

点燃实体。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `tick` | [整数](../basic_concepts#integer) | **必填** | 燃烧持续时间（以 tick 计） |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:set_on_fire",
  "tick": 100
}
```

此示例会点燃实体 100 tick（5 秒）。

</details>

### `origins:set_origin`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

设置实体在某一层中的起源。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `layer` | 层 | **必填** | 要更改其起源的层 |
| `origin` | 起源 | **必填** | 要分配的起源 |

### `origins:spawn_effect_cloud`

在实体位置生成效果云。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `effect` | [MobEffectInstance](../minecraft_data_types#mobeffectinstance) 列表 | 可选 | 效果云中的效果 |
| `radius` | [浮点数](../basic_concepts#float) | `3.0` | 效果云半径 |
| `radius_on_use` | [浮点数](../basic_concepts#float) | `0.5` | 使用时增加的半径 |
| `wait_time` | [整数](../basic_concepts#integer) | 可选 | 效果云持续时间 |

<details>
<summary>示例</summary>

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

此示例会在实体位置生成一片大型区域效果云，提供持续 5 秒的抗性提升 IV 状态效果。

</details>

### `origins:spawn_entity`

在实体位置生成一个实体。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_type` | [标识符](../basic_concepts#identifier) | **必填** | 实体类型 ID |
| `tag` | NBT | 可选 | 初始 NBT 数据 |
| `entity_action` | [实体动作](../action/entity_action_types) | 可选 | 对生成的实体执行的动作 |
| `bientity_action` | [双实体动作](../action/bientity_action_types) | 可选 | 生成者与生成实体之间的动作 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:spawn_entity",
  "entity_type": "minecraft:zombie",
  "tag": "{NoAI:1b,IsBaby:1}"
}
```

此示例会授予玩家 Arbalistic 进度。

</details>

### `origins:spawn_particles`

在实体位置生成粒子。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `particle` | [粒子选项](../minecraft_data_types#particle-option) | **必填** | 粒子类型及参数 |
| `count` | [整数](../basic_concepts#integer) | **必填** | 粒子数量 |
| `speed` | [浮点数](../basic_concepts#float) | `0.0` | 粒子速度 |
| `spread` | Object | 可选 | 扩散范围（`x`/`y`/`z`，默认 `0.5`） |
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 仅向符合条件的观察者显示 |
| `force` | [布尔值](../basic_concepts#boolean) | 可选 | 强制显示粒子 |
| `offset_x` | [浮点数](../basic_concepts#float) | `0.0` | X 偏移 |
| `offset_y` | [浮点数](../basic_concepts#float) | `0.0` | Y 偏移 |
| `offset_z` | [浮点数](../basic_concepts#float) | `0.0` | Z 偏移 |

<details>
<summary>示例</summary>

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

此示例会生成一个约 5x0x5 大小的粒子长方体，使用红石块纹理。

</details>

Spread 字段：`x`、`y`、`z`（Float，默认 `0.0`）。

### `origins:swing_hand`

让实体挥动手臂。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `hand` | [字符串](../basic_concepts#string) | **必填** | `MAIN_HAND` 或 `OFF_HAND` |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:swing_hand",
    "hand": "OFF_HAND"
}
```

此示例会挥动实体的副手。

</details>

### `origins:toggle`

开启/关闭另一个能力。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `power` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 要切换的能力 ID |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:toggle",
  "power": "origins:phantomize"
}
```

此示例会从 `example:power_source` 来源为实体授予 `origins:burn_in_daylight` 能力。

</details>

### `origins:trigger_cooldown`

触发另一个能力的冷却。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `power` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 要触发其冷却的能力 ID |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:trigger_cooldown",
  "power": "origins:launch_into_air"
}
```

此示例会为实体恢复约 3 颗心。

</details>

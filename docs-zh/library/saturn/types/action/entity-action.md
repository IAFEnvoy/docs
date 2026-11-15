---
title: "实体动作"
sidebar_label: "实体动作 (EntityAction)"
sidebar_position: 1
---

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## 类型

### `saturn:add_experience` {#saturnadd_experience}

为玩家增加经验点数、等级，或同时增加二者。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:add_experience` |
| `points` | 整数 | 否 | 省略 | 原版经验点数；省略时不修改点数。 |
| `levels` | 整数 | 否 | 省略 | 原版经验等级；省略时不修改等级。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:add_experience",
  "points": 100
}
```

</details>

### `saturn:add_resource` {#saturnadd_resource}

增加指定 Saturn 资源的当前值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:add_resource` |
| `resource` | 资源 ID | 是 | — | 已注册的 Saturn 资源 ID。 |
| `amount` | [数值提供器](../number.md) | 是 | — | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:add_resource",
  "resource": "example:mana",
  "amount": 1
}
```

</details>

### `saturn:add_velocity` {#saturnadd_velocity}

增加速度，或以给定向量替换速度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:add_velocity` |
| `x` | 数值 | 否 | `0.0` | X 坐标、偏移或向量分量，取决于本页行为。 |
| `y` | 数值 | 否 | `0.0` | Y 坐标、偏移或向量分量，取决于本页行为。 |
| `z` | 数值 | 否 | `0.0` | Z 坐标、偏移或向量分量，取决于本页行为。 |
| `space` | 枚举字符串 | 否 | `"world"` | 向量坐标空间。 可用值：`world`、`local`、`local_horizontal`、`local_horizontal_normalized`、`velocity`、`velocity_normalized`、`velocity_horizontal`、`velocity_horizontal_normalized`。 |
| `set` | 布尔值 | 否 | `false` | true 用给定向量替换速度，false 累加。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:add_velocity"
}
```

</details>

### `saturn:apply_effect` {#saturnapply_effect}

给实体施加指定时长和等级的状态效果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:apply_effect` |
| `effect` | 资源 ID | 是 | — | 状态效果 ID。 |
| `duration_ticks` | [数值提供器](../number.md) | 是 | — | 效果持续时长，单位为游戏 tick。 |
| `amplifier` | [数值提供器](../number.md) | 否 | `0.0` | 效果等级索引，0 表示 I 级。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:apply_effect",
  "effect": "minecraft:speed",
  "duration_ticks": 200,
  "amplifier": 0
}
```

</details>

### `saturn:area_of_effect` {#saturnarea_of_effect}

球形范围动作，复用 region_apply 的区域查询

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:area_of_effect` |
| `radius` | [数值提供器](../number.md) | 否 | `16` | 范围半径，单位为方块。 |
| `bientity_action` | [双实体动作](./bientity-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `bientity_condition` | [双实体条件](../condition/bientity-condition.md) | 否 | `saturn:always` | 筛选条件；类型由字段声明确定。 |
| `include_target` | 布尔值 | 否 | `false` | 是否包含激活实体自身，与 region_apply 的 include_actor 等价。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:area_of_effect",
  "radius": 8,
  "bientity_action": {
    "type": "saturn:heal_target",
    "amount": 2
  }
}
```

</details>

所有距离相对查询中心计算；实体使用位置坐标并排除旁观者。方块半径向下取整为非负整数，区域按需遍历。负数或非有限半径返回空区域。

### `saturn:award_stat` {#saturnaward_stat}

增加玩家的一项或多项原版统计值

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:award_stat` |
| `stat` | 资源 ID / 对象 / 数组 | 是 | — | 自定义统计 ID，或 `{stat_type, id}` 对象。 |
| `amount` | [数值提供器](../number.md) | 否 | `1` | 本次操作的数量。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:award_stat",
  "stat": "minecraft:jump",
  "amount": 1
}
```

</details>

字符串写法用于 `minecraft:custom` 统计，例如 `"minecraft:jump"`。有类型统计写成 `{"stat_type":"minecraft:mined","id":"minecraft:stone"}`；未知类型或条目不匹配/不执行。

### `saturn:block_action` {#saturnblock_action}

对实体所在位置的方块执行方块动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:block_action` |
| `action` | [方块动作](./block-action.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:block_action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:crafting_table` {#saturncrafting_table}

为服务端玩家打开不依赖实体工作台的合成界面

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:crafting_table` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:crafting_table"
}
```

</details>

### `saturn:damage` {#saturndamage}

使用指定伤害类型对实体造成伤害，金额可用数值提供器

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:damage` |
| `damage_type` | 资源 ID | 是 | — | 原版伤害类型注册表引用。 |
| `amount` | [数值提供器](../number.md) | 是 | — | 本次操作的数量。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:damage",
  "damage_type": "minecraft:magic",
  "amount": 2
}
```

</details>

非正数或非有限数值不产生伤害。

### `saturn:dismount` {#saturndismount}

让实体退出当前坐骑。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:dismount` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:dismount"
}
```

</details>

### `saturn:emit_game_event` {#saturnemit_game_event}

发布可供幽匿感测体等接收的原版游戏事件。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:emit_game_event` |
| `event` | 资源 ID | 是 | — | 原版 GameEvent ID。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:emit_game_event",
  "event": "minecraft:step"
}
```

</details>

### `saturn:ender_chest` {#saturnender_chest}

为服务端玩家打开其末影箱

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ender_chest` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ender_chest"
}
```

</details>

### `saturn:equipped_item_action` {#saturnequipped_item_action}

对指定装备槽的物品堆执行物品动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:equipped_item_action` |
| `slot` | 枚举字符串 | 是 | — | 装备槽。 可用值：`mainhand`、`offhand`、`feet`、`legs`、`chest`、`head`、`body`、`saddle`。 |
| `action` | [物品动作](./item-action.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:equipped_item_action",
  "slot": "mainhand",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:execute_command` {#saturnexecute_command}

以实体身份在激活位置执行原版命令，权限等级为 2

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:execute_command` |
| `command` | 字符串 | 是 | — | 原版命令，开头的 / 可省略。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:execute_command",
  "command": "effect give @s minecraft:speed 10"
}
```

</details>

仅服务端执行，不输出命令反馈。实体动作以该实体为 `@s`，位置使用激活位置；方块动作位于方块中心，没有 `@s` 实体。

### `saturn:exhaust` {#saturnexhaust}

增加玩家的饥饿消耗度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:exhaust` |
| `amount` | 数值 | 是 | — | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:exhaust",
  "amount": 1
}
```

</details>

### `saturn:extinguish` {#saturnextinguish}

清除实体当前的着火状态。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:extinguish` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:extinguish"
}
```

</details>

### `saturn:feed` {#saturnfeed}

为玩家增加饥饿值和饱和度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:feed` |
| `food` | 整数 | 是 | — | 恢复的饥饿值。 |
| `saturation` | 数值 | 是 | — | 恢复的饱和度参数。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:feed",
  "food": 1,
  "saturation": 1
}
```

</details>

### `saturn:gain_air` {#saturngain_air}

修改实体剩余空气值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:gain_air` |
| `value` | 整数 | 是 | — | 本类型使用的值或表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:gain_air",
  "value": 1
}
```

</details>

### `saturn:give_item` {#saturngive_item}

创建物品堆并交给实体，可指定优先装备槽。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:give_item` |
| `stack` | 物品堆模板 | 是 | — | 待创建的原版 ItemStackTemplate。 |
| `item_action` | [物品动作](./item-action.md) | 否 | `{"type":"saturn:no_op"}` | 对物品堆执行的物品动作。 |
| `preferred_slot` | 枚举字符串 | 否 | 省略 | 优先装备槽；不能放入时按实现继续交付。 可用值：`mainhand`、`offhand`、`feet`、`legs`、`chest`、`head`、`body`、`saddle`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:give_item",
  "stack": {
    "id": "minecraft:diamond",
    "count": 1
  }
}
```

</details>

### `saturn:grant_ability` {#saturngrant_ability}

按来源 ID 为实体授予一个技能。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:grant_ability` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `source` | 资源 ID | 是 | — | 输入集合、资源路径或上下文参数，详见本页用途。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:grant_ability",
  "ability": "example:heal",
  "source": "example:manual"
}
```

</details>

### `saturn:grant_advancement` {#saturngrant_advancement}

授予原版进度或指定判据

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:grant_advancement` |
| `advancement` | 资源 ID | 是 | — | 进度 ID；selection 为 everything 时忽略该 ID。 |
| `criterion` | 字符串 / 字符串数组 | 否 | `[]` | 判据名或数组；省略或空数组时处理整个进度。 |
| `selection` | 枚举字符串 | 否 | `"only"` | only 本身、through 祖先及后代、from 后代、until 祖先、everything 全部；均包含指定进度。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:grant_advancement",
  "advancement": "minecraft:story/root"
}
```

</details>

仅对服务端玩家生效。`everything` 选择整个进度注册表，其他选项从给定 ID 开始选择；缺失 ID 不执行。判据名会应用到每个被选中的进度。

### `saturn:heal` {#saturnheal}

恢复实体的生命值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:heal` |
| `amount` | [数值提供器](../number.md) | 是 | — | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:heal",
  "amount": 1
}
```

</details>

### `saturn:knockback` {#saturnknockback}

按给定向量对实体施加速度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:knockback` |
| `x` | [数值提供器](../number.md) | 是 | — | X 坐标、偏移或向量分量，取决于本页行为。 |
| `y` | [数值提供器](../number.md) | 是 | — | Y 坐标、偏移或向量分量，取决于本页行为。 |
| `z` | [数值提供器](../number.md) | 是 | — | Z 坐标、偏移或向量分量，取决于本页行为。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:knockback",
  "x": 1,
  "y": 1,
  "z": 1
}
```

</details>

### `saturn:modify_ability_storage` {#saturnmodify_ability_storage}

把指定类型的状态写入目标技能的存储。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:modify_ability_storage` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `value` | [状态存储](../storage.md) | 是 | — | 本类型使用的值或表达式。 |

只修改技能已经声明的存储类型，未声明时记录警告并跳过。技能常规冷却与充能由激活流程维护，不需要每次手动覆写。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:modify_ability_storage",
  "ability": "example:heal",
  "value": {
    "type": "saturn:cooldown",
    "duration": 40
  }
}
```

</details>

### `saturn:modify_inventory` {#saturnmodify_inventory}

对筛选出的非空原版槽位各执行一次物品动作与可选实体动作；limit 为零或负数时处理全部匹配槽位

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:modify_inventory` |
| `item_condition` | [物品条件](../condition/item-condition.md) | 否 | `saturn:always` | 筛选条件；类型由字段声明确定。 |
| `item_action` | [物品动作](./item-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `entity_action` | [实体动作](./entity-action.md) | 否 | `saturn:no_op` | 要执行的嵌套动作；类型由字段声明确定。 |
| `slot` | 整数 / 字符串 / 混合数组 | 否 | `[]` | 原版命令槽位整数或名称/范围，支持混合数组；空数组使用默认槽位集。 |
| `limit` | 整数 | 否 | `0` | 最多处理多少个匹配槽位；0 或负数表示全部。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:modify_inventory",
  "slot": "weapon.mainhand",
  "item_action": {
    "type": "saturn:consume_item",
    "count": 1
  }
}
```

</details>

默认扫描 `hotbar.*`、`inventory.*`、`weapon.*`、`armor.*`、`saddle` 和 `mob.inventory.*`。仅访问实体实际提供的原版槽位；玩家选中快捷栏与主手别名去重，不读取 Origins Power 背包。

每个匹配槽位执行一次，先运行 `entity_action` 再运行 `item_action`；`limit` 统计槽位，不是物品数量。

### `saturn:passenger_action` {#saturnpassenger_action}

对实体的乘客执行动作，可递归处理多层乘客。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:passenger_action` |
| `action` | [实体动作](./entity-action.md) | 否 | `{"type":"saturn:no_op"}` | 要执行的子动作；动作种类必须与当前字段要求一致。 |
| `bientity_action` | [双实体动作](./bientity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在上下文双方之间执行的动作。 |
| `bientity_condition` | [双实体条件](../condition/bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |
| `recursive` | 布尔值 | 否 | `false` | 是否递归遍历坐骑或乘客链。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:passenger_action"
}
```

</details>

### `saturn:play_sound` {#saturnplay_sound}

在实体处播放指定音效。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:play_sound` |
| `sound` | 资源 ID | 是 | — | SoundEvent ID。 |
| `category` | 枚举字符串 | 否 | 省略 | 声音分类。 可用值：`master`、`music`、`records`、`weather`、`blocks`、`hostile`、`neutral`、`players`、`ambient`、`voice`、`ui`。 |
| `volume` | 数值 | 否 | `1.0` | 音量倍率。 |
| `pitch` | 数值 | 否 | `1.0` | 不跟随鼠标时的俯仰角，单位为度。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:play_sound",
  "sound": "minecraft:entity.experience_orb.pickup",
  "category": "players"
}
```

</details>

### `saturn:region_apply` {#saturnregion_apply}

对激活位置周围实体执行双实体动作，可选立方体、曼哈顿距离或球体

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:region_apply` |
| `radius` | [数值提供器](../number.md) | 否 | `16` | 范围半径，单位为方块。 |
| `shape` | 枚举字符串 | 否 | `"cube"` | cube 使用最大轴距离，star 使用曼哈顿距离，sphere 使用欧氏距离。 |
| `bientity_action` | [双实体动作](./bientity-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `bientity_condition` | [双实体条件](../condition/bientity-condition.md) | 否 | `saturn:always` | 筛选条件；类型由字段声明确定。 |
| `include_actor` | 布尔值 | 否 | `false` | 是否将激活实体自身作为目标。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:region_apply",
  "radius": 8,
  "shape": "sphere",
  "bientity_action": {
    "type": "saturn:heal_target",
    "amount": 2
  }
}
```

</details>

所有距离相对查询中心计算；实体使用位置坐标并排除旁观者。方块半径向下取整为非负整数，区域按需遍历。负数或非有限半径返回空区域。

查询中心为激活位置，双实体动作中 actor 为激活实体，target 为每个匹配实体。

### `saturn:remove_ability` {#saturnremove_ability}

移除指定来源授予的技能，不影响其他来源。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:remove_ability` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `source` | 资源 ID | 是 | — | 输入集合、资源路径或上下文参数，详见本页用途。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:remove_ability",
  "ability": "example:heal",
  "source": "example:manual"
}
```

</details>

### `saturn:remove_effect` {#saturnremove_effect}

移除实体的指定状态效果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:remove_effect` |
| `effect` | 资源 ID | 是 | — | 状态效果 ID。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:remove_effect",
  "effect": "minecraft:speed"
}
```

</details>

### `saturn:replace_inventory` {#saturnreplace_inventory}

将筛选出的槽位替换为独立创建的物品模板，允许显式匹配空槽

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:replace_inventory` |
| `stack` | 物品 ID / 物品模板对象 | 是 | — | 每个匹配槽位独立创建一份物品模板。 |
| `item_condition` | [物品条件](../condition/item-condition.md) | 否 | `saturn:always` | 筛选条件；类型由字段声明确定。 |
| `slot` | 整数 / 字符串 / 混合数组 | 否 | `[]` | 原版命令槽位整数或名称/范围，支持混合数组；空数组使用默认槽位集。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:replace_inventory",
  "slot": "weapon.mainhand",
  "stack": "minecraft:stick"
}
```

</details>

默认扫描 `hotbar.*`、`inventory.*`、`weapon.*`、`armor.*`、`saddle` 和 `mob.inventory.*`。仅访问实体实际提供的原版槽位；玩家选中快捷栏与主手别名去重，不读取 Origins Power 背包。

省略 `item_condition` 会匹配所有被选槽位，包括空槽。只替换已有物品时，请显式排除 `saturn:empty`。

### `saturn:reset_stat` {#saturnreset_stat}

将玩家的一项或多项原版统计值重置为零

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:reset_stat` |
| `stat` | 资源 ID / 对象 / 数组 | 是 | — | 自定义统计 ID，或 `{stat_type, id}` 对象。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:reset_stat",
  "stat": "minecraft:jump"
}
```

</details>

字符串写法用于 `minecraft:custom` 统计，例如 `"minecraft:jump"`。有类型统计写成 `{"stat_type":"minecraft:mined","id":"minecraft:stone"}`；未知类型或条目不匹配/不执行。

### `saturn:revoke_advancement` {#saturnrevoke_advancement}

撤销原版进度或指定判据

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:revoke_advancement` |
| `advancement` | 资源 ID | 是 | — | 进度 ID；selection 为 everything 时忽略该 ID。 |
| `criterion` | 字符串 / 字符串数组 | 否 | `[]` | 判据名或数组；省略或空数组时处理整个进度。 |
| `selection` | 枚举字符串 | 否 | `"only"` | only 本身、through 祖先及后代、from 后代、until 祖先、everything 全部；均包含指定进度。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:revoke_advancement",
  "advancement": "minecraft:story/root"
}
```

</details>

仅对服务端玩家生效。`everything` 选择整个进度注册表，其他选项从给定 ID 开始选择；缺失 ID 不执行。判据名会应用到每个被选中的进度。

### `saturn:riding_action` {#saturnriding_action}

对实体乘坐的对象执行动作，可递归处理坐骑链。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:riding_action` |
| `action` | [实体动作](./entity-action.md) | 否 | `{"type":"saturn:no_op"}` | 要执行的子动作；动作种类必须与当前字段要求一致。 |
| `bientity_action` | [双实体动作](./bientity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在上下文双方之间执行的动作。 |
| `bientity_condition` | [双实体条件](../condition/bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |
| `recursive` | 布尔值 | 否 | `false` | 是否递归遍历坐骑或乘客链。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:riding_action"
}
```

</details>

### `saturn:selector_action` {#saturnselector_action}

用原版实体选择器选择目标，再筛选并执行双实体动作，仅服务端有效

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:selector_action` |
| `selector` | 字符串 | 是 | — | 原版实体选择器，以当前实体和激活位置为命令上下文。 |
| `bientity_action` | [双实体动作](./bientity-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `bientity_condition` | [双实体条件](../condition/bientity-condition.md) | 否 | `saturn:always` | 筛选条件；类型由字段声明确定。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:selector_action",
  "selector": "@e[type=minecraft:zombie,distance=..8]",
  "bientity_action": {
    "type": "saturn:damage_target",
    "damage_type": "minecraft:magic",
    "amount": 2
  }
}
```

</details>

### `saturn:self_bientity_action` {#saturnself_bientity_action}

把同一实体作为 actor 和 target 执行双实体动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:self_bientity_action` |
| `action` | [双实体动作](./bientity-action.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:self_bientity_action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:send_message` {#saturnsend_message}

把文本组件发给符合接收条件的玩家，可选择聊天栏或动作栏。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:send_message` |
| `message` | 文本组件 | 是 | — | 发给玩家的文本组件；字符串按翻译键处理。 |
| `channel` | 枚举字符串 | 否 | `"chat"` | 消息通道，可用值见下文枚举说明。 可用值：`chat`、`action_bar`。 |
| `target` | 枚举字符串 | 否 | `"self"` | 动作目标、目标 ID 或目标选择，具体见本页类型说明。 可用值：`self`、`other`、`all`。 |
| `recipients` | [实体条件](../condition/entity-condition.md) | 否 | `{"type":"saturn:always"}` | 对每个候选接收玩家检查的实体条件。 |

channel 可用 chat、action_bar。target=self 选择 actor / 物品持有者，other 选择双实体 target，all 选择当前服务端维度的玩家。方块动作没有自身收件人，通常使用 all。recipients 对每位候选玩家单独检查。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:send_message",
  "message": {
    "text": "操作完成"
  }
}
```

</details>

### `saturn:set_fall_distance` {#saturnset_fall_distance}

改变实体累计的下落距离。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:set_fall_distance` |
| `distance` | 数值 | 是 | — | 距离或原版距离谓词。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:set_fall_distance",
  "distance": 1
}
```

</details>

### `saturn:set_no_gravity` {#saturnset_no_gravity}

控制实体是否忽略重力。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:set_no_gravity` |
| `no_gravity` | 布尔值 | 否 | `true` | 是否启用无重力。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:set_no_gravity"
}
```

</details>

### `saturn:set_on_fire` {#saturnset_on_fire}

让实体着火指定 tick 数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:set_on_fire` |
| `ticks` | 整数 | 是 | — | 游戏 tick 数，20 tick 通常为一秒。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:set_on_fire",
  "ticks": 1
}
```

</details>

### `saturn:spawn_effect_cloud` {#saturnspawn_effect_cloud}

在实体附近生成带状态效果的区域效果云。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:spawn_effect_cloud` |
| `radius` | 数值 | 否 | `3.0` | 半径，以方块计；资源条中以像素计。 |
| `radius_on_use` | 数值 | 否 | `-0.5` | 效果云每次作用后的半径变化。 |
| `wait_time` | 整数 | 否 | `10` | 效果云开始作用前等待的 tick 数。 |
| `effects` | 枚举字符串数组 | 否 | `[]` | 状态效果列表或原版效果谓词。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:spawn_effect_cloud"
}
```

</details>

### `saturn:spawn_entity` {#saturnspawn_entity}

在上下文提供的位置或指定坐标生成实体。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:spawn_entity` |
| `entity_type` | 资源 ID | 是 | — | 实体类型 ID。 |
| `x` | [数值提供器](../number.md) | 是 | — | X 坐标、偏移或向量分量，取决于本页行为。 |
| `y` | [数值提供器](../number.md) | 是 | — | Y 坐标、偏移或向量分量，取决于本页行为。 |
| `z` | [数值提供器](../number.md) | 是 | — | Z 坐标、偏移或向量分量，取决于本页行为。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:spawn_entity",
  "entity_type": "minecraft:arrow",
  "x": 1,
  "y": 1,
  "z": 1
}
```

</details>

### `saturn:spawn_particles` {#saturnspawn_particles}

在实体附近按偏移和散布参数生成粒子。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:spawn_particles` |
| `particle` | 枚举字符串 | 是 | — | 原版粒子参数。 |
| `bientity_condition` | [双实体条件](../condition/bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |
| `count` | 整数 | 是 | — | 数量或数量匹配模式。 Codec 范围：`0, 2147483647`。 |
| `speed` | 数值 | 否 | `0.0` | 粒子速度。 |
| `force` | 布尔值 | 否 | `false` | 是否强制发送粒子。 |
| `spread` | 三个数值的数组 | 否 | `[0.5,0.5,0.5]` | 三个轴上的散布范围。 |
| `offset_x` | 数值 | 否 | `0.0` | X 方向偏移。 |
| `offset_y` | 数值 | 否 | `0.5` | Y 方向偏移。 |
| `offset_z` | 数值 | 否 | `0.0` | Z 方向偏移。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:spawn_particles",
  "particle": {
    "type": "minecraft:cloud"
  },
  "count": 1
}
```

</details>

### `saturn:spawn_projectile` {#saturnspawn_projectile}

生成实体并赋予指定初速度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:spawn_projectile` |
| `entity_type` | 资源 ID | 是 | — | 实体类型 ID。 |
| `velocity_x` | [数值提供器](../number.md) | 是 | — | 初速度的 X 分量。 |
| `velocity_y` | [数值提供器](../number.md) | 是 | — | 初速度的 Y 分量。 |
| `velocity_z` | [数值提供器](../number.md) | 是 | — | 初速度的 Z 分量。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:spawn_projectile",
  "entity_type": "minecraft:arrow",
  "velocity_x": 1,
  "velocity_y": 1,
  "velocity_z": 1
}
```

</details>

### `saturn:swing_hand` {#saturnswing_hand}

触发指定手的挥动动画。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:swing_hand` |
| `hand` | 枚举字符串 | 是 | — | 使用的手。 可用值：`main_hand`、`off_hand`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:swing_hand",
  "hand": "main_hand"
}
```

</details>

### `saturn:teleport` {#saturnteleport}

改变实体的位置。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:teleport` |
| `x` | [数值提供器](../number.md) | 是 | — | X 坐标、偏移或向量分量，取决于本页行为。 |
| `y` | [数值提供器](../number.md) | 是 | — | Y 坐标、偏移或向量分量，取决于本页行为。 |
| `z` | [数值提供器](../number.md) | 是 | — | Z 坐标、偏移或向量分量，取决于本页行为。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:teleport",
  "x": 1,
  "y": 1,
  "z": 1
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:chance` {#saturnchance}

按指定概率决定是否命中。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:chance` |
| `action` | [实体动作](./entity-action.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |
| `chance` | 数值 | 是 | — | 命中概率，0 表示不命中，1 表示必定命中。 Codec 范围：`0.0F, 1.0F`。 |
| `fail_action` | [实体动作](./entity-action.md) | 否 | `{"type":"saturn:no_op"}` | 概率未命中时执行的动作。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:chance",
  "action": {
    "type": "saturn:no_op"
  },
  "chance": 1
}
```

</details>

### `saturn:choice` {#saturnchoice}

按权重随机选择一项动作执行。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:choice` |
| `actions` | 加权条目数组（value、weight） | 是 | — | 子动作数组；顺序类型依次执行，加权类型按 value 和 weight 选择。 |

每项包含 value 与 weight，见[加权条目](../../data/common.md#加权条目)。负权重按 0 处理；总权重为 0 时从非空动作列表均匀选择。空动作列表不执行。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:choice",
  "actions": [
    {
      "value": {
        "type": "saturn:no_op"
      },
      "weight": 1
    }
  ]
}
```

</details>

### `saturn:for_range` {#saturnfor_range}

将动作重复执行指定次数，负数为零次，次数不超过 max_iterations

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:for_range` |
| `range` | [数值提供器](../number.md) | 是 | — | 执行次数，求值后向零截断；负数不执行。 |
| `action` | [实体动作](./entity-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `max_iterations` | 整数 | 否 | `1024` | 每次调用的最大迭代次数，至少为 1。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:for_range",
  "range": 3,
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

次数在进入循环时求值一次，超过 `max_iterations` 时截断到上限。

### `saturn:if_else` {#saturnif_else}

条件成立时执行 if_action，否则执行 else_action。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:if_else` |
| `condition` | [实体条件](../condition/entity-condition.md) | 是 | — | 要检查的条件。 |
| `if_action` | [实体动作](./entity-action.md) | 是 | — | 条件成立时执行的动作。 |
| `else_action` | [实体动作](./entity-action.md) | 否 | `{"type":"saturn:no_op"}` | 条件不成立时执行的动作。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:if_else",
  "condition": {
    "type": "saturn:always"
  },
  "if_action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:if_else_list` {#saturnif_else_list}

按顺序检查条件，只执行第一个命中分支

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:if_else_list` |
| `actions` | 分支数组 | 是 | — | 按顺序检查的分支，每项含 condition 和 action。 |

每个 `actions` 条目：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `condition` | `EntityCondition` | 是 | 该分支的匹配条件。 |
| `action` | `EntityAction` | 是 | 匹配后执行；后续分支不再检查。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:if_else_list",
  "actions": [
    {
      "condition": {
        "type": "saturn:always"
      },
      "action": {
        "type": "saturn:no_op"
      }
    }
  ]
}
```

</details>

### `saturn:js` {#saturnjs}

调用由 KubeJS 注册的回调，并传入 params 参数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:js` |
| `id` | 字符串 | 是 | — | 回调、选项或条目的标识符。 |
| `params` | 对象 | 否 | `{}` | 传给脚本或公式的参数对象。 |

仅在安装 KubeJS 时注册。JSON 只选择已有回调，不会直接执行 JSON 内的 JavaScript 字符串。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

</details>

### `saturn:no_op` {#saturnno_op}

不执行操作，可作为动作的占位值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:no_op` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:no_op"
}
```

</details>

### `saturn:sequence` {#saturnsequence}

按数组顺序依次执行多个同类动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:sequence` |
| `actions` | 同类动作数组 | 是 | — | 子动作数组；顺序类型依次执行，加权类型按 value 和 weight 选择。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:sequence",
  "actions": []
}
```

</details>

### `saturn:side` {#saturnside}

仅在指定逻辑端执行，不以客户端或服务端进程判断

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:side` |
| `action` | [实体动作](./entity-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `side` | 枚举字符串 | 是 | — | 逻辑端，可选 client 或 server。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:side",
  "side": "server",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

判断 `Level` 的逻辑端。单人游戏的内置服务器属于 `server`，不会因为运行在客户端进程就当成 `client`；该动作不会主动发包或跨端执行。

### `saturn:while` {#saturnwhile}

条件成立时重复执行，超过 max_iterations 则终止并报告异常

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:while` |
| `condition` | [实体条件](../condition/entity-condition.md) | 是 | — | 筛选条件；类型由字段声明确定。 |
| `action` | [实体动作](./entity-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `max_iterations` | 整数 | 否 | `1024` | 每次调用的最大迭代次数，至少为 1。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:while",
  "max_iterations": 64,
  "condition": {
    "type": "saturn:never"
  },
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

每轮重新检查条件。达到 `max_iterations` 后若仍满足条件，则抛出异常停止本次动作，防止错误数据包无限循环；已执行的动作不回滚。

---
title: "实体动作"
sidebar_label: "实体动作 (EntityAction)"
sidebar_position: 1
---

# 实体动作

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

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

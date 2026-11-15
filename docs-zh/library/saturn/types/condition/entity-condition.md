---
title: "实体条件"
sidebar_label: "实体条件 (EntityCondition)"
sidebar_position: 1
---

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## 类型

### `saturn:ability_storage_charges` {#saturnability_storage_charges}

检查技能剩余充能数量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ability_storage_charges` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `remaining` | 数值或范围对象 | 否 | 省略 | 剩余量的范围或运行时剩余值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ability_storage_charges",
  "ability": "example:heal"
}
```

</details>

### `saturn:ability_storage_cooldown` {#saturnability_storage_cooldown}

检查技能当前剩余冷却时长。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ability_storage_cooldown` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `remaining` | 数值或范围对象 | 否 | 省略 | 剩余量的范围或运行时剩余值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ability_storage_cooldown",
  "ability": "example:heal"
}
```

</details>

### `saturn:ability_storage_resource` {#saturnability_storage_resource}

检查技能存储中的资源值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ability_storage_resource` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `amount` | 数值或范围对象 | 否 | 省略 | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ability_storage_resource",
  "ability": "example:heal"
}
```

</details>

### `saturn:ability_storage_target` {#saturnability_storage_target}

检查技能是否存在符合距离条件的锁定目标。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ability_storage_target` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `locked` | 布尔值 | 否 | `true` | 是否要求存在已锁定目标。 |
| `max_distance` | [数值提供器](../number.md) | 否 | 省略 | 允许的最大目标距离。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ability_storage_target",
  "ability": "example:heal"
}
```

</details>

### `saturn:ability_storage_timer` {#saturnability_storage_timer}

检查技能计时器的剩余时长。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ability_storage_timer` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `remaining` | 数值或范围对象 | 否 | 省略 | 剩余量的范围或运行时剩余值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ability_storage_timer",
  "ability": "example:heal"
}
```

</details>

### `saturn:ability_storage_toggle` {#saturnability_storage_toggle}

检查指定技能存储的开关值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ability_storage_toggle` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `expected` | 布尔值 | 否 | `true` | 期望的开关值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ability_storage_toggle",
  "ability": "example:heal"
}
```

</details>

### `saturn:advancement` {#saturnadvancement}

检查玩家是否完成指定原版进度，仅服务端有效

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:advancement` |
| `advancement` | 资源 ID | 是 | — | 进度 ID；selection 为 everything 时忽略该 ID。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:advancement",
  "advancement": "minecraft:story/root"
}
```

</details>

### `saturn:air` {#saturnair}

读取或比较实体的剩余空气值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:air` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:air",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:attack_cooldown` {#saturnattack_cooldown}

比较玩家的攻击蓄力进度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:attack_cooldown` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:attack_cooldown",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:attack_target_condition` {#saturnattack_target_condition}

生物当前有攻击目标

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:attack_target_condition` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:attack_target_condition"
}
```

</details>

### `saturn:attacker_condition` {#saturnattacker_condition}

实体最近受到过生物攻击

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:attacker_condition` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:attacker_condition"
}
```

</details>

### `saturn:attribute` {#saturnattribute}

读取或比较实体的指定属性值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:attribute` |
| `attribute` | 资源 ID | 是 | — | 属性 ID。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:attribute",
  "attribute": "minecraft:max_health",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:block_collision` {#saturnblock_collision}

检查偏移后的实体边界是否与方块碰撞。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:block_collision` |
| `offset_x` | 数值 | 否 | `0.0` | X 方向偏移。 |
| `offset_y` | 数值 | 否 | `0.0` | Y 方向偏移。 |
| `offset_z` | 数值 | 否 | `0.0` | Z 方向偏移。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:block_collision"
}
```

</details>

### `saturn:block_in_radius` {#saturnblock_in_radius}

统计实体周围符合条件的方块，位置按需遍历而不预先创建整个区域列表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:block_in_radius` |
| `block_condition` | [方块条件](./block-condition.md) | 否 | `saturn:always` | 筛选条件；类型由字段声明确定。 |
| `radius` | [数值提供器](../number.md) | 是 | — | 范围半径，单位为方块。 |
| `shape` | 枚举字符串 | 否 | `"cube"` | cube 使用最大轴距离，star 使用曼哈顿距离，sphere 使用欧氏距离。 |
| `comparison` | 枚举字符串 | 是 | — | 比较运算符：`==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 比较目标数值，与 comparison 配合使用。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:block_in_radius",
  "radius": 3,
  "block_condition": {
    "type": "saturn:block_id",
    "block": "minecraft:diamond_ore"
  },
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

所有距离相对查询中心计算；实体使用位置坐标并排除旁观者。方块半径向下取整为非负整数，区域按需遍历。负数或非有限半径返回空区域。

### `saturn:brightness` {#saturnbrightness}

比较实体所在位置的亮度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:brightness` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:brightness",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:can_have_effect` {#saturncan_have_effect}

检查实体是否能接受指定状态效果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:can_have_effect` |
| `effect` | 资源 ID | 是 | — | 状态效果 ID。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:can_have_effect",
  "effect": "minecraft:speed"
}
```

</details>

### `saturn:climbing` {#saturnclimbing}

实体正在攀爬

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:climbing` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:climbing"
}
```

</details>

### `saturn:collided_horizontally` {#saturncollided_horizontally}

实体与方块发生水平碰撞

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:collided_horizontally` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:collided_horizontally"
}
```

</details>

### `saturn:command` {#saturncommand}

执行命令并比较其返回值，仅服务端有效；命令自身可能产生副作用

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:command` |
| `command` | 字符串 | 是 | — | 原版命令，开头的 / 可省略。 |
| `comparison` | 枚举字符串 | 是 | — | 比较运算符：`==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 比较目标数值，与 comparison 配合使用。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:command",
  "command": "data get entity @s Health",
  "comparison": ">",
  "compare_to": 10
}
```

</details>

执行身份为当前实体，位置为实体自身位置，权限等级为 2；不要用于需要保持只读的条件。

### `saturn:creative_flying` {#saturncreative_flying}

玩家正在使用创造飞行

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:creative_flying` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:creative_flying"
}
```

</details>

### `saturn:daytime` {#saturndaytime}

当前为白天

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:daytime` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:daytime"
}
```

</details>

### `saturn:dimension` {#saturndimension}

检查实体所在维度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:dimension` |
| `dimension` | 资源 ID | 是 | — | 维度 ID。 |
| `inverted` | 布尔值 | 否 | `false` | 是否反转判断或显示方向。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:dimension",
  "dimension": "minecraft:overworld"
}
```

</details>

### `saturn:enchantment` {#saturnenchantment}

将全部装备槽的指定附魔等级求和或取最大值，再执行比较

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:enchantment` |
| `enchantment` | 资源 ID | 是 | — | 指定附魔的注册表引用。 |
| `calculation` | 枚举字符串 | 否 | `"sum"` | sum 求和或 max 取所有装备槽中的最大等级。 |
| `comparison` | 枚举字符串 | 是 | — | 比较运算符：`==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 比较目标数值，与 comparison 配合使用。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:enchantment",
  "enchantment": "minecraft:protection",
  "calculation": "sum",
  "comparison": ">=",
  "compare_to": 4
}
```

</details>

非生物返回 false；检查所有 `EquipmentSlot`，不只检查护甲。

### `saturn:entity_in_radius` {#saturnentity_in_radius}

统计指定范围内满足条件的非旁观实体，包含自身；形状按相对查询中心的距离计算

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:entity_in_radius` |
| `entity_condition` | [实体条件](./entity-condition.md) | 否 | `saturn:always` | 筛选条件；类型由字段声明确定。 |
| `radius` | [数值提供器](../number.md) | 是 | — | 范围半径，单位为方块。 |
| `shape` | 枚举字符串 | 否 | `"cube"` | cube 使用最大轴距离，star 使用曼哈顿距离，sphere 使用欧氏距离。 |
| `comparison` | 枚举字符串 | 是 | — | 比较运算符：`==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 比较目标数值，与 comparison 配合使用。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:entity_in_radius",
  "radius": 8,
  "shape": "sphere",
  "entity_condition": {
    "type": "saturn:hostile"
  },
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

所有距离相对查询中心计算；实体使用位置坐标并排除旁观者。方块半径向下取整为非负整数，区域按需遍历。负数或非有限半径返回空区域。

### `saturn:entity_tag` {#saturnentity_tag}

检查实体类型是否属于指定标签。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:entity_tag` |
| `tag` | 标签 ID（带 #） | 是 | — | 注册表标签，或本页声明的 NBT 数据。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:entity_tag",
  "tag": "#example:tag"
}
```

</details>

### `saturn:entity_type` {#saturnentity_type}

检查实体是否为指定类型。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:entity_type` |
| `entity_type` | 资源 ID | 是 | — | 实体类型 ID。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:entity_type",
  "entity_type": "minecraft:arrow"
}
```

</details>

### `saturn:equipped_item` {#saturnequipped_item}

检查指定装备槽的物品是否满足物品条件。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:equipped_item` |
| `equipment_slot` | 枚举字符串 | 是 | — | 装备槽。 可用值：`mainhand`、`offhand`、`feet`、`legs`、`chest`、`head`、`body`、`saddle`。 |
| `item_condition` | [物品条件](./item-condition.md) | 否 | `{"type":"saturn:always"}` | 检查物品堆的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:equipped_item",
  "equipment_slot": "mainhand"
}
```

</details>

### `saturn:exists` {#saturnexists}

实体尚未被移除

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:exists` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:exists"
}
```

</details>

### `saturn:experience_level` {#saturnexperience_level}

比较玩家的经验等级。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:experience_level` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:experience_level",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:experience_points` {#saturnexperience_points}

比较玩家的总经验点数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:experience_points` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:experience_points",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:exposed_to_sky` {#saturnexposed_to_sky}

检查实体所在位置能否看到天空。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:exposed_to_sky` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:exposed_to_sky"
}
```

</details>

### `saturn:exposed_to_sun` {#saturnexposed_to_sun}

检查实体是否受到阳光照射。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:exposed_to_sun` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:exposed_to_sun"
}
```

</details>

### `saturn:fall_distance` {#saturnfall_distance}

比较实体累计的下落距离。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:fall_distance` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:fall_distance",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:fall_flying` {#saturnfall_flying}

实体正在滑翔

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:fall_flying` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:fall_flying"
}
```

</details>

### `saturn:fluid_height` {#saturnfluid_height}

比较实体浸入指定流体类型的高度

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:fluid_height` |
| `fluid` | 资源 ID | 是 | — | NeoForge fluid_type 注册表中的 ID，例如 minecraft:water；不是方块流体注册表。 |
| `comparison` | 枚举字符串 | 是 | — | 比较运算符：`==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 比较目标数值，与 comparison 配合使用。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:fluid_height",
  "fluid": "minecraft:water",
  "comparison": ">",
  "compare_to": 0
}
```

</details>

### `saturn:food_level` {#saturnfood_level}

比较玩家的饥饿值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:food_level` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:food_level",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:gamemode` {#saturngamemode}

检查玩家的游戏模式。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:gamemode` |
| `gamemode` | 枚举字符串 | 是 | — | 玩家游戏模式。 可用值：`survival`、`creative`、`adventure`、`spectator`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:gamemode",
  "gamemode": "survival"
}
```

</details>

### `saturn:glowing` {#saturnglowing}

检查实体是否处于发光状态。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:glowing` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:glowing"
}
```

</details>

### `saturn:grounded` {#saturngrounded}

实体接触地面

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:grounded` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:grounded"
}
```

</details>

### `saturn:has_ability` {#saturnhas_ability}

检查实体是否持有指定技能。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:has_ability` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:has_ability",
  "ability": "example:heal"
}
```

</details>

### `saturn:health` {#saturnhealth}

读取或比较实体当前生命值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:health` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:health",
  "comparison": "<",
  "compare_to": 10
}
```

</details>

### `saturn:hostile` {#saturnhostile}

实体属于敌对生物

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:hostile` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:hostile"
}
```

</details>

### `saturn:in_block` {#saturnin_block}

检查实体所在方块是否满足条件。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:in_block` |
| `block_condition` | [方块条件](./block-condition.md) | 是 | — | 检查目标方块的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:in_block",
  "block_condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:in_block_anywhere` {#saturnin_block_anywhere}

检查实体边界内满足条件的方块数量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:in_block_anywhere` |
| `block_condition` | [方块条件](./block-condition.md) | 是 | — | 检查目标方块的条件。 |
| `comparison` | 比较对象 | 是 | — | 比较运算符；比较对象字段另见公共数据类型。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:in_block_anywhere",
  "block_condition": {
    "type": "saturn:always"
  },
  "comparison": {
    "comparison": ">=",
    "compare_to": 1
  }
}
```

</details>

### `saturn:in_rain` {#saturnin_rain}

实体当前淋雨

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:in_rain` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:in_rain"
}
```

</details>

### `saturn:in_snow` {#saturnin_snow}

目标位置正在降雪

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:in_snow` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:in_snow"
}
```

</details>

检查实体脚下与眼睛位置是否存在原版降雪；遮挡天空或未下雨时为 false。

### `saturn:in_thunderstorm` {#saturnin_thunderstorm}

目标位置暴露于雷雨中

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:in_thunderstorm` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:in_thunderstorm"
}
```

</details>

### `saturn:inventory` {#saturninventory}

统计实体原版背包与装备中满足条件的物品数量或堆数，玩家主手不会重复计数

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:inventory` |
| `process_mode` | 枚举字符串 | 否 | `"items"` | items 统计物品数，stacks 统计非空物品堆数。 |
| `item_condition` | [物品条件](./item-condition.md) | 否 | `saturn:always` | 筛选条件；类型由字段声明确定。 |
| `slot` | 整数 / 字符串 / 混合数组 | 否 | `[]` | 原版命令槽位整数或名称/范围，支持混合数组；空数组使用默认槽位集。 |
| `comparison` | 枚举字符串 | 是 | — | 比较运算符：`==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 比较目标数值，与 comparison 配合使用。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:inventory",
  "item_condition": {
    "type": "saturn:item_id",
    "item": "minecraft:diamond"
  },
  "comparison": ">=",
  "compare_to": 3
}
```

</details>

默认扫描 `hotbar.*`、`inventory.*`、`weapon.*`、`armor.*`、`saddle` 和 `mob.inventory.*`。仅访问实体实际提供的原版槽位；玩家选中快捷栏与主手别名去重，不读取 Origins Power 背包。

### `saturn:invisible` {#saturninvisible}

实体处于隐身状态

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:invisible` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:invisible"
}
```

</details>

### `saturn:living` {#saturnliving}

实体是生物

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:living` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:living"
}
```

</details>

### `saturn:main_hand_item` {#saturnmain_hand_item}

检查实体主手物品是否满足物品条件。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:main_hand_item` |
| `item_condition` | [物品条件](./item-condition.md) | 否 | `{"type":"saturn:always"}` | 检查物品堆的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:main_hand_item"
}
```

</details>

### `saturn:mob_effect` {#saturnmob_effect}

检查实体是否具有指定状态效果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:mob_effect` |
| `effect` | 资源 ID | 是 | — | 状态效果 ID。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:mob_effect",
  "effect": "minecraft:speed"
}
```

</details>

### `saturn:nbt` {#saturnnbt}

按 NBT 子集匹配实体保存数据，列表使用子集匹配

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:nbt` |
| `nbt` | NBT 对象 | 是 | — | 要匹配的 NBT 子集，用 JSON 对象表示。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:nbt",
  "nbt": {
    "Tags": [
      "example"
    ]
  }
}
```

</details>

按原版 `NbtUtils.compareNbt` 进行子集匹配；以当前版本实际保存的字段为准。方块条件只读取方块实体，不存在时返回 false。

### `saturn:on_block` {#saturnon_block}

检查实体脚下方块是否满足方块条件。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:on_block` |
| `condition` | [方块条件](./block-condition.md) | 是 | — | 要检查的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:on_block",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:on_fire` {#saturnon_fire}

实体正在燃烧

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:on_fire` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:on_fire"
}
```

</details>

### `saturn:partner` {#saturnpartner}

按范围和双实体条件检查附近实体。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:partner` |
| `range` | 数值 | 否 | `5.0` | 检查范围，以方块计。 Codec 范围：`0.5D, 32.0D`。 |
| `count` | 数量范围对象（min、max） | 否 | `{"min":1}` | 邻近活体数量范围：min 默认 1，max 可省略；要求 0 ≤ min ≤ max。 |
| `bientity_condition` | [双实体条件](./bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:partner"
}
```

</details>

### `saturn:passenger` {#saturnpassenger}

统计满足双实体条件的直接乘客并比较数量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:passenger` |
| `bientity_condition` | [双实体条件](./bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:passenger",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:passenger_recursive` {#saturnpassenger_recursive}

递归统计满足条件的乘客。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:passenger_recursive` |
| `bientity_condition` | [双实体条件](./bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:passenger_recursive",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:player_ability` {#saturnplayer_ability}

检查原版玩家能力标记，包括飞行、无限物品、无敌和建造权限；与 Saturn Ability 技能不同

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:player_ability` |
| `ability` | 枚举字符串 | 是 | — | 原版玩家能力：flying、instabuild、invulnerable、may_build、mayfly。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:player_ability",
  "ability": "mayfly"
}
```

</details>

### `saturn:predicate` {#saturnpredicate}

引用原版数据包 predicate，缺失或在客户端检查时为 false

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:predicate` |
| `predicate` | 资源 ID | 是 | — | 原版 predicate ID，对应 `data/<namespace>/predicate/<path>.json`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:predicate",
  "predicate": "example:allowed"
}
```

</details>

提供原版 `COMMAND` loot context，包含 `ORIGIN` 和 `THIS_ENTITY`。缺失定义或客户端调用返回 false。

### `saturn:raining` {#saturnraining}

当前维度正在下雨

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:raining` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:raining"
}
```

</details>

### `saturn:relative_health` {#saturnrelative_health}

比较实体当前生命值与最大生命值的比例。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:relative_health` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:relative_health",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:resource_compare` {#saturnresource_compare}

检查指定资源的当前值是否至少达到 min。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:resource_compare` |
| `resource` | 资源 ID | 是 | — | 已注册的 Saturn 资源 ID。 |
| `min` | [数值提供器](../number.md) | 是 | — | 下限。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:resource_compare",
  "resource": "example:mana",
  "min": 1
}
```

</details>

### `saturn:riding` {#saturnriding}

检查实体的坐骑是否满足双实体条件。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:riding` |
| `bientity_condition` | [双实体条件](./bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:riding"
}
```

</details>

### `saturn:riding_recursive` {#saturnriding_recursive}

检查多层骑乘关系。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:riding_recursive` |
| `bientity_condition` | [双实体条件](./bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:riding_recursive",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:riding_root` {#saturnriding_root}

检查骑乘链的根实体。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:riding_root` |
| `bientity_condition` | [双实体条件](./bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:riding_root"
}
```

</details>

### `saturn:saturation_level` {#saturnsaturation_level}

比较玩家的食物饱和度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:saturation_level` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:saturation_level",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:scoreboard` {#saturnscoreboard}

比较指定记分项下的分数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:scoreboard` |
| `name` | 字符串 | 否 | 省略 | 局部变量名、计分板持有者名或配置名称。 |
| `objective` | 字符串 | 是 | — | 计分板记分项名称。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:scoreboard",
  "objective": "kills",
  "comparison": ">=",
  "compare_to": 5,
  "name": "Steve"
}
```

</details>

### `saturn:sneaking` {#saturnsneaking}

检查实体是否处于潜行状态。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:sneaking` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:sneaking"
}
```

</details>

### `saturn:sprinting` {#saturnsprinting}

实体正在疾跑

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:sprinting` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:sprinting"
}
```

</details>

### `saturn:stat` {#saturnstat}

比较玩家原版统计值，支持自定义统计 ID 或带 stat_type/id 的类型统计

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:stat` |
| `stat` | 资源 ID / 对象 | 是 | — | 自定义统计 ID，或 `{stat_type, id}` 对象。 |
| `comparison` | 枚举字符串 | 是 | — | 比较运算符：`==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 比较目标数值，与 comparison 配合使用。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:stat",
  "stat": "minecraft:jump",
  "comparison": ">=",
  "compare_to": 10
}
```

</details>

字符串写法用于 `minecraft:custom` 统计，例如 `"minecraft:jump"`。有类型统计写成 `{"stat_type":"minecraft:mined","id":"minecraft:stone"}`；未知类型或条目不匹配/不执行。

### `saturn:submerged_in` {#saturnsubmerged_in}

检查实体眼睛是否浸没在指定流体类型中

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:submerged_in` |
| `fluid` | 资源 ID | 是 | — | 注册的流体 ID。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:submerged_in",
  "fluid": "minecraft:water"
}
```

</details>

配置写流体 ID，但眼睛检测按该流体的 NeoForge FluidType 判断；同类型的静止和流动流体会一起匹配。

### `saturn:swimming` {#saturnswimming}

实体正在游泳

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:swimming` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:swimming"
}
```

</details>

### `saturn:tamed` {#saturntamed}

实体已经拥有主人

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:tamed` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:tamed"
}
```

</details>

### `saturn:team` {#saturnteam}

读取或检查实体的计分板队伍。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:team` |
| `team` | 字符串 | 否 | 省略 | 计分板队伍名称。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:team"
}
```

</details>

### `saturn:thundering` {#saturnthundering}

当前维度处于雷暴

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:thundering` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:thundering"
}
```

</details>

### `saturn:time_of_day` {#saturntime_of_day}

比较上下文世界的昼夜时间。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:time_of_day` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:time_of_day",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:using_item` {#saturnusing_item}

检查实体是否正在使用物品。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:using_item` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:using_item"
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:always` {#saturnalways}

条件始终为真。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:always` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:always"
}
```

</details>

### `saturn:and` {#saturnand}

所有子条件都成立时才匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:and` |
| `conditions` | 同类条件数组 | 是 | — | 同类子条件列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:and",
  "conditions": []
}
```

</details>

### `saturn:chance` {#saturnchance}

按指定概率决定是否命中。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:chance` |
| `chance` | 数值 | 是 | — | 命中概率，0 表示不命中，1 表示必定命中。 Codec 范围：`0.0D, 1.0D`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:chance",
  "chance": 1
}
```

</details>

### `saturn:constant` {#saturnconstant}

返回配置的固定布尔值

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:constant` |
| `value` | 布尔值 | 是 | — | 固定布尔值；用于方块属性时，匹配或设置布尔属性。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:constant",
  "value": true
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

### `saturn:never` {#saturnnever}

条件始终为假。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:never` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:never"
}
```

</details>

### `saturn:not` {#saturnnot}

反转子条件的匹配结果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:not` |
| `condition` | 同类条件 | 是 | — | 要检查的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:not",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:or` {#saturnor}

任一子条件成立即匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:or` |
| `conditions` | 同类条件数组 | 是 | — | 同类子条件列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:or",
  "conditions": []
}
```

</details>

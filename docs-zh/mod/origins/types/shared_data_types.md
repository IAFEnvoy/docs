---
sidebar_position: 2
---

# 共享数据类型 {#shared-data-types}

这些复杂数据类型被 Origins 中多个能力类型、动作和条件引用。

---

## HudRender {#hudrender}

供能力在 HUD 中显示冷却/资源栏使用。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `should_render_inactive` | [布尔值](./basic_concepts#boolean) | `true` | 资源已满/为空时是否渲染；`should_render` 可作为兼容性别名使用 |
| `sprite_location` | [标识符](./basic_concepts#identifier) | `origins:textures/gui/resource_bar.png` | 该栏使用的纹理 |
| `bar_index` | Integer 或 [资源引用](#resource-reference) | `0` | 该栏在精灵图中的索引 |
| `icon_index` | Integer 或 [资源引用](#resource-reference) | `0` | 图标在精灵图中的索引 |
| `condition` | [实体条件](./condition/entity_condition_types) | 可选 | 渲染该 HUD 元素的条件 |
| `inverted` | [布尔值](./basic_concepts#boolean) | `false` | 若为 `true`，则反转栏的填充方向 |
| `order` | Integer 或 [资源引用](#resource-reference) | `0` | 多个 HUD 元素之间的渲染顺序 |

出于数据兼容性，也接受 Origins: Math 的父子列表表示形式。

---

## 资源引用（Resource Reference） {#resource-reference}

资源引用既可以是字面数值，也可以是执行实体上某个资源能力的标识符。标注为此类型的字段在使用时会求值得到该资源的值。

```json
5
```

```json
"example:charge"
```

缺失的资源以及非有限值都会解析为 `0`。

---

## 变量（Variables） {#variables}

支持表达式的类型接受一个可选的 `variables` 对象，它将表达式变量名映射到资源能力的标识符。

```json
{
  "expression": "charge * 0.25 + bonus",
  "variables": {
    "charge": "example:charge",
    "bonus": "example:bonus"
  }
}
```

变量名必须以字母或 `_` 开头，其后只能包含字母、数字或 `_`。表达式使用 exp4j 语法；无效或非有限的结果会解析为 `0`。

`variable_execute_command` 和 `variable_nbt_linked_resource` 可以在字符串中插值变量：

| 形式 | 结果 |
|------|--------|
| `$:name` | `name` 的整数值 |
| `${name}` | `name` 的整数值 |
| `${name:%d}` | `name` 的整数值 |
| `${name:%.2f}` | 精度为 `0` 到 `17` 的十进制值 |

---

## 按键（Key） {#key}

按键绑定设置。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `key` | [字符串](./basic_concepts#string) | `key.origins.primary_active` | 按键绑定 ID |
| `continuous` | [布尔值](./basic_concepts#boolean) | `false` | 该按键是否被视作持续按住 |

---

## 修饰器（Modifier） {#modifier}

应用于数值的数学修饰器。

:::warning

不要与 [属性条目](#attributeentry) 混淆，后者用于修改实体属性。本类型是更通用的修饰器，可应用于任意数值。

:::

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `value` | [浮点数](./basic_concepts#float) | **必填** | 修饰器数值 |
| `operation` | [字符串](./basic_concepts#string) | `add_base_early` | 运算方式：`add_base_early`、`multiply_base_additive`、`multiply_base_multiplicative`、`multiply_total_additive`、`multiply_total_multiplicative` |
| `resource` | [标识符](./basic_concepts#identifier) | 可选 | 用作修饰器数值的资源 |
| `modifier` | [修饰器](#modifier) | 可选 | 应用于资源值的子修饰器 |

---

## 属性条目（AttributeEntry） {#attributeentry}

属性修饰器条目。

:::warning

不要与 [修饰器](#modifier) 混淆，后者是可应用于任意数值的更通用修饰器。本类型专门用于修改实体属性。

:::

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `attribute` | [标识符](./basic_concepts#identifier) | **必填** | 属性 ID（例如 `minecraft:generic.max_health`） |
| `operation` | [字符串](./basic_concepts#string) | **必填** | 运算方式：`add_value`、`add_multiplied_base`、`add_multiplied_total` |
| `value` | [浮点数](./basic_concepts#float) | **必填** | 修饰器数值 |
| `name` | [字符串](./basic_concepts#string) | 可选 | 该修饰器的自定义名称 |

---

## 带位置的物品堆叠（PositionedItemStack） {#positioneditemstack}

带有可选物品栏槽位位置的物品堆叠。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `stack` | [物品堆叠](./minecraft_data_types#item-stack) | **必填** | 物品堆叠 |
| `slot` | [整数](./basic_concepts#integer) | 可选 | 放置该物品的物品栏槽位索引 |

---

## 颜色设置（ColorSettings） {#colorsettings}

RGBA 颜色配置。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `red` | [浮点数](./basic_concepts#float) | 可选 | 红色通道（0-1） |
| `green` | [浮点数](./basic_concepts#float) | 可选 | 绿色通道（0-1） |
| `blue` | [浮点数](./basic_concepts#float) | 可选 | 蓝色通道（0-1） |
| `alpha` | [浮点数](./basic_concepts#float) | 可选 | Alpha 通道（0-1） |
| `color` | [整数](./basic_concepts#integer) | 可选 | 以单个十六进制整数表示的 ARGB 颜色（0xAARRGGBB） |

## 效果条目（EffectEntry） {#effectentry}

供施加效果的能力使用的效果配置。

:::tip 提示

如果不需要自定义效果，可以直接使用资源位置字符串（例如 `minecraft:strength`），而不必使用 EffectEntry 对象。

:::

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `effect` | [标识符](./basic_concepts#identifier) | **必填** | 效果 ID |
| `amplifier` | [整数](./basic_concepts#integer) | `0` | 基础等级 |
| `show_particles` | [布尔值](./basic_concepts#boolean) | `true` | 是否显示粒子 |
| `show_icon` | [布尔值](./basic_concepts#boolean) | `true` | 是否显示图标 |

## 形状（Shape） {#shape}

指示如何选取区域内的方块/实体。应与 `distance` 搭配使用。

| 值 |	公式 |
|-------|---------|
| `cube` | `max(x,y,z)` |
| `star` | `|x| + |y| + |z|` |
| `sphere` | `x^2 + y^2 + z^2` |

## 坐标空间（Space） {#space}

基于位置的能力与条件所用的坐标空间定义。目前仅用于 `origins:add_velocity`。

| 值 |	说明 |
|-------|-------------|
| `world` |	坐标为全局坐标：x 指向西（负）或东（正），y 指向下（负）或上（正），z 指向北（负）或南（正）。 |
| `local` |	坐标为实体本地坐标：x 指向实体左侧且始终水平，y 指向实体头顶方向，z 指向实体面朝的方向。 |
| `local_horizontal` |	与 local 相同，但会将实体面朝方向的垂直长度视为 0，导致 z 被投影（压平）到水平面上而变短。x 和 y 也会缩短同样的量，且 y 始终朝上。当实体面朝方向偏离水平时，各轴会缩短。（例如：若实体正仰视或俯视，各轴长度将为 0，相当于强制 x、y、z 为 0） |
| `local_horizontal_normalized` |	与 local_horizontal 相同，但各轴会被归一化。（例如：若轴长度非零，则将其恢复为原来的长度 1） |
| `velocity` |	坐标为实体速度的本地坐标，与 local 类似。若速度纯粹垂直，则改用实体的朝向来确定 x 和 y 的方向，而不使用速度。各轴会根据实体移动速度进行缩放。（例如：若实体未移动，各轴长度将为 0，相当于强制 x、y、z 为 0） |
| `velocity_normalized` |	与 velocity 相同，但各轴会被归一化。（例如：若轴长度非零，则将其恢复为原来的长度 1，使其不依赖实体的移动速度，只要实体在移动即可） |
| `velocity_horizontal` |	与 velocity 相同，但垂直速度被视为 0。 |
| `velocity_horizontal_normalized` |	与 velocity_horizontal 相同，但各轴会被归一化。（例如：若轴长度非零，则将其恢复为原来的长度 1） |

## 统计引用（Stat Reference） {#stat-reference}

`Stat Reference` 是一种值类型，供与统计相关的动作和条件指定要针对的 Minecraft 统计项。它接受两种形式：用于自定义统计的**简单形式**，以及用于带变体（例如方块/物品/实体类型）的统计的**类型化形式**。

### 简单形式（Simple Form） {#simple-form}

对于注册在 `minecraft:custom` StatType 下的统计（例如跳跃、死亡、移动距离），直接使用 `ResourceLocation` 即可：

```json
"minecraft:jump"
```

```json
"minecraft:deaths"
```

### 类型化形式（Typed Form） {#typed-form}

对于带变体值的统计，使用包含 `stat_type` 和 `id` 的对象：

| 字段       | 类型       | 默认值  | 说明                                                  |
|-------------|------------|----------|--------------------------------------------------------------|
| `stat_type` | Identifier | 必填 | 统计类型（Stat Type）的 ID。                                            |
| `id`        | Identifier | 必填 | 具体方块、物品或实体类型的注册表 ID。 |

```json
{
  "stat_type": "minecraft:mined",
  "id": "minecraft:diamond_ore"
}
```

### 原版统计类型（Vanilla Stat Types） {#vanilla-stat-types}

| StatType ID           | 值注册表 | 说明                                     |
|-----------------------|----------------|-------------------------------------------------|
| `minecraft:mined`     | Block          | 破坏的方块数                                   |
| `minecraft:crafted`   | Item           | 合成的物品数                                   |
| `minecraft:used`      | Item           | 使用的物品数                                   |
| `minecraft:broken`    | Item           | 损坏的物品数（耐久耗尽）             |
| `minecraft:picked_up` | Item           | 拾取的物品数                                 |
| `minecraft:dropped`   | Item           | 丢弃的物品数                                   |
| `minecraft:killed`    | EntityType     | 击杀的实体数                                 |
| `minecraft:killed_by` | EntityType     | 被实体击杀的死亡数                                |
| `minecraft:custom`    | CustomStat     | 通用统计（jump、deaths、walk_one_cm 等） |

对于 `minecraft:custom` 统计类型，请使用**简单形式**（普通的 `ResourceLocation`），而不是类型化形式。

### 带权重的音效条目（Weighted Sound Entry） {#weighted-sound-entry}

`Weighted Sound Entry` 是一种值类型，用于定义带权重的音效，供与音效相关的动作和条件使用。它接受包含 `sound` 和 `weight` 字段的对象：

| 字段   | 类型       | 默认值  | 说明                                      |
|---------|------------|----------|--------------------------------------------------|
| `sound` | [标识符](./basic_concepts#identifier) 或 List | 必填 | 音效 ID。                                    |
| `weight`| [浮点数](./basic_concepts#float) | 必填 | 该音效的权重（越高越可能播放）。 |

```json
{
  "sound": "minecraft:entity.player.death",
  "weight": 1.0
}
```

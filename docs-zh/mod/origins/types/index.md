---
sidebar_position: 3
---

# 类型参考 {#types-reference}

本节记录 Origins 中所有可在数据包 JSON 文件里使用的类型。

## 基本概念 {#basic-concepts}

在阅读本节之前，请先熟悉 **[基本概念](./basic_concepts)** 页面。该页面定义了 **Identifier**、**String**、**Integer**、**Boolean**、**Float** 和 **List** 等基础数据类型，它们贯穿于所有类型定义之中。

## 能力类型 {#power-types}

能力类型按类别划分：

| 类别 | 说明 | 页面 |
|----------|-------------|------|
| 动作 | 响应事件执行动作 | [动作能力](./power/action) |
| 修改 | 修改属性、伤害、速度等游戏机制 | [修改能力](./power/modify) |
| 阻止 | 阻止使用物品、睡觉等特定行为 | [阻止能力](./power/prevent) |
| 常规 | 飞行、隐身、穿墙等独立能力 | [常规能力](./power/regular) |

总体概览与共享数据类型见 [能力类型索引](./power)。

## 条件类型 {#condition-types}

条件类型用于筛选能力何时激活、动作何时执行：

| 条件类别 | 参考 |
|---------------------|-----------|
| 双实体条件 | [双实体条件类型](./condition/bientity_condition_types) |
| 生物群系条件 | [生物群系条件类型](./condition/biome_condition_types) |
| 方块条件 | [方块条件类型](./condition/block_condition_types) |
| 伤害条件 | [伤害条件类型](./condition/damage_condition_types) |
| 实体条件 | [实体条件类型](./condition/entity_condition_types) |
| 流体条件 | [流体条件类型](./condition/fluid_condition_types) |
| 物品条件 | [物品条件类型](./condition/item_condition_types) |
| 元条件 | [元条件类型](./condition/meta_condition_types) |

所有条件类别都支持 **元条件**（`and`、`or`、`not`、`chance`、`constant`），详见各类型页面。

## 动作类型 {#action-types}

动作类型对实体、方块或物品产生效果：

| 动作类别 | 参考 |
|-----------------|-----------|
| 双实体动作 | [双实体动作类型](./action/bientity_action_types) |
| 方块动作 | [方块动作类型](./action/block_action_types) |
| 实体动作 | [实体动作类型](./action/entity_action_types) |
| 物品动作 | [物品动作类型](./action/item_action_types) |
| 元动作 | [元动作类型](./action/meta_action_types) |

所有动作类别都支持 **元动作**（`and`、`chance`、`choice`、`delay`、`if_else`、`if_else_list`、`side`），详见各类型页面。

## 共享数据类型 {#shared-data-types}

多个能力、动作和条件类型共用的复杂数据类型。完整说明见 **[共享数据类型](./shared_data_types)**：

- **HudRender** — HUD 栏显示设置
- **Key** — 按键绑定设置
- **Modifier** — 数值修饰器
- **AttributeEntry** — 属性修饰器条目
- **PositionedItemStack** — 带可选槽位位置信息的物品
- **ColorSettings** — RGBA 颜色配置
- **Space** — 坐标空间定义
- **Resource Reference** — 字面数值或由资源提供支持的数值
- **Variables** — 暴露给表达式与插值字符串的资源值

## Minecraft 数据类型 {#minecraft-data-types}

Origins JSON 中使用的 Minecraft 内置数据类型。完整说明见 **[Minecraft 数据类型](./minecraft_data_types)**：

- **Item Stack** — 物品的 JSON 表示
- **Damage Type** — 基于注册表的伤害类型标识符
- **Equipment Slot Group** — 装备槽位类别
- **Text Component** — 用于消息的富文本格式
- **MobEffectInstance** — 状态效果配置
- **EffectEntry** — 简化后的状态效果定义
- **NBT Compound** — 简化后的状态效果定义
- **Particle Option** — 生成粒子所用的粒子参数

---
id: overview
title: 数据驱动概览
slug: /mod/mite/data-driven/overview
sidebar_position: 1
description: MITE 数据包规则、外部多文件规则、标签与配置之间的职责边界。
---

MITE 把对象关系与平衡数值分开。数据驱动规则适合决定哪些物品、方块、实体或标签参与某条规则。全服务器范围的概率、倍率与持续时间应放在 `mite-common.json` 中。

## 三个扩展点

| 入口 | 路径 | 适用内容 | 生效方式 |
|---|---|---|---|
| 数据包 codec | `data/<namespace>/mite/...` | 配方规则、营养、采集、生成、溶解 | `/reload` |
| 实例多文件规则 | `config/mite/<rule_type>/...` | 传送门路线、材料家族、实体替换、修理关系 | `/reload` |
| Minecraft 标签/动态注册表 | `data/<namespace>/tags/...`、注册表 JSON | 跨模组对象集合、附魔、维度、世界生成 | 数据包重载；部分需要重启或新建世界 |

## 选择合适的系统

- “银箭对亡灵造成多少额外伤害？”属于平衡数值：使用 `production.silverArrowUndeadDamageMultiplier`。
- “哪些物品算作银箭？”属于对象关系：使用 `config/mite/arrows/*.json` 或标签。
- “这种食物提供哪些营养素？”属于逐物品内容：使用一个 `food_nutrition` JSON。
- “适用于所有营养获取的全局倍率是多少？”属于平衡数值：使用 `survival.nutrientGainPerFoodPoint`。
- “哪些方块需要镐？”属于可扩展的对象关系：使用 `harvest_rules` 与物品标签。

:::info 每个文件一个对象或标签

随附数据采用多文件设计，而不是把所有定义放在一个 `entries` 数组里。选择器字段接受一个 ID、一个 `#tag`，或同时混合两者的数组。

:::

## 选择器格式

以下三种写法都有效：

```json
{ "items": "minecraft:apple" }
```

```json
{ "items": "#c:foods/raw_meat" }
```

```json
{
  "items": [
    "minecraft:apple",
    "example:pear",
    "#example:orchard_fruit"
  ]
}
```

视规则而定，字段可能名为 `items`、`blocks`、`entities`、`spawn_blocks` 或 `corner_blocks`；选择器的语义是相同的。标签始终以 `#` 开头。

## 矿石世界生成

MITE 的矿石使用 Minecraft 标准的世界生成注册表。在优先级更高的数据包中覆盖相同的 `mite` 资源 ID 即可修改它们：

```text
data/mite/worldgen/configured_feature/<ore>.json
data/mite/worldgen/placed_feature/<ore>.json
data/mite/neoforge/biome_modifier/<ore>.json
```

Configured feature 选择替换的方块与矿脉大小。Placed feature 控制数量与高度分布。NeoForge 生物群系修改器决定哪些维度与生物群系获得每个 placed feature。世界生成的更改只影响新生成的区块。

## 优先级与错误

- 多文件规则可以使用整数 `priority`；数值越大越先匹配。
- 相同优先级按资源 ID 或相对路径稳定排序，与文件系统的遍历顺序无关。
- 相同的数据包资源 ID 遵循 Minecraft 的数据包优先级。
- 当某个文件解析失败时，日志会包含其路径与 codec 错误，而其他有效文件会继续加载。

接下来请阅读[数据包规则](./datapack-rules.md)、[实例多文件规则](./misc-rules.md)与[标签约定](./tags.md)。

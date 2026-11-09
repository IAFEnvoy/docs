---
sidebar_position: 2
---

# JSON 数据格式

本节介绍 Origins 中每种数据类型对应的 JSON 格式。

## 数据类型 {#data-types}

在开始之前，先了解 Origins 使用的基本数据类型：

| 类型 | 描述 | 示例 |
|------|-------------|---------|
| `String` | 文本字符串 | `"minecraft:zombie"` |
| `Boolean` | 真或假 | `true` / `false` |
| `Integer` | 整数 | `20` |
| `Float` | 小数 | `1.5` |
| `Identifier` | 带命名空间的资源 ID | `"origins:avian"` |
| `[List]` | 一组值的列表 | `["a", "b"]` |
| `{Object}` | 键值映射 | `{"key": "value"}` |
| `Text Component` | Minecraft 文本组件 | `"Hello"` 或 `{"text": "Hello"}` |
| `Item Stack` | Minecraft 物品堆叠 | `{"id": "minecraft:diamond"}` |

## 条件系统 {#condition-system}

Origins 使用**条件**来判断能力是否生效、动作是否应当执行等。条件有多种类型：

- **实体条件**：检查某个实体的状态
- **双实体条件**：检查两个实体之间的关系
- **方块条件**：检查某个方块的状态
- **物品条件**：检查某个物品的状态
- **生物群系条件**：检查生物群系的属性
- **伤害条件**：检查伤害的属性
- **流体条件**：检查流体的属性

所有条件都支持**元条件**，例如 `and`、`or`、`not`、`chance` 等。

## 动作系统 {#action-system}

Origins 使用**动作**来产生各种效果：

- **实体动作**：对某个实体执行操作
- **双实体动作**：执行涉及两个实体的操作
- **方块动作**：对某个方块执行操作
- **物品动作**：对某个物品执行操作

所有动作都支持**元动作**，例如 `and`、`chance`、`delay`、`if_else` 等。

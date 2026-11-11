---
title: "类型参考"
sidebar_position: 0
---

每个类型族一页：页内按类型 ID 分节，给出 JSON 字段表、默认值与示例；元类型单独列在每页末尾。

## 动作类型

| 分类 | 类型数 |
| --- | --- |
| [实体动作](./action/entity-action.md) | 39 |
| [双实体动作](./action/bientity-action.md) | 14 |
| [方块动作](./action/block-action.md) | 15 |
| [物品动作](./action/item-action.md) | 14 |

## 条件类型

| 分类 | 类型数 |
| --- | --- |
| [实体条件](./condition/entity-condition.md) | 52 |
| [双实体条件](./condition/bientity-condition.md) | 20 |
| [方块条件](./condition/block-condition.md) | 18 |
| [物品条件](./condition/item-condition.md) | 22 |
| [伤害条件](./condition/damage-condition.md) | 14 |

## 其他类型

| 分类 | 类型数 |
| --- | --- |
| [技能类型](./ability.md) | 9 |
| [费用](./cost.md) | 3 |
| [数值提供器](./number.md) | 9 |
| [目标选择器](./target.md) | 5 |
| [资源取值](./resource-value.md) | 5 |
| [时间轴节点](./timeline.md) | 4 |
| [状态存储](./storage.md) | 14 |
| [资源条渲染](./bar-renderer.md) | 6 |
| [资源条显示条件](./bar-visibility.md) | 8 |
| [资源条上下文](./bar-context.md) | 3 |
| [物品匹配器](./item-matcher.md) | 5 |
| [信息表达式](./expression.md) | 19 |
| [实体取值器](./getter.md) | 26 |
| [触发器](./trigger.md) | 41 |

这些条目大多是嵌入字段的 type 对象，不要直接按类型名创建数据文件。独立文件的目录与结构见[数据定义](../data/index.md)。

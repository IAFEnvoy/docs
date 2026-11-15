---
title: "类型参考"
sidebar_position: 0
---

按功能查找对应的类型族。动作与条件的字段表、默认值、JSON 示例和行为说明统一列在各类型族页面，不区分加入版本。

## 动作类型

| 分类 | 类型数 |
| --- | --- |
| [实体动作](./action/entity-action.md) | 56 |
| [双实体动作](./action/bientity-action.md) | 22 |
| [方块动作](./action/block-action.md) | 23 |
| [物品动作](./action/item-action.md) | 19 |

## 条件类型

| 分类 | 类型数 |
| --- | --- |
| [实体条件](./condition/entity-condition.md) | 86 |
| [双实体条件](./condition/bientity-condition.md) | 28 |
| [方块条件](./condition/block-condition.md) | 34 |
| [物品条件](./condition/item-condition.md) | 29 |
| [伤害条件](./condition/damage-condition.md) | 17 |

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

Origins 数据转换见[类型对应与适配差异](../development/origins-ports.md)。计数包含可选的 `js` 类型；仅安装 KubeJS 时才注册它。

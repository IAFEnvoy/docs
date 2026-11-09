---
title: "技能类型"
sidebar_position: 0
---

技能类型写在技能定义的顶层，与 costs、condition 等公共字段并列；不要再嵌套一个 type 对象。技能文件的公共字段见[技能定义](../../data/ability.md)。

| 类型 | 用途 |
| --- | --- |
| [`saturn:active`](./active.md) | 由玩家主动使用，经过施法、费用和冷却流程后执行动作。 |
| [`saturn:triggered`](./triggered.md) | 订阅指定游戏信号，在条件成立时执行技能动作。 |
| [`saturn:modifier`](./modifier.md) | 技能生效期间为实体提供属性修饰器。 |
| [`saturn:aura`](./aura.md) | 按间隔查找范围内的目标并执行动作。 |
| [`saturn:interval`](./interval.md) | 技能生效期间按指定 tick 间隔执行动作。 |
| [`saturn:channelled`](./channelled.md) | 持续使用技能，按节拍支付维持费用并执行动作。 |
| [`saturn:targeted`](./targeted.md) | 选择目标后对目标施放所引用的技能。 |
| [`saturn:empty`](./empty.md) | 提供一个不执行额外行为的实现。 |
| [`saturn:upkeep`](./upkeep.md) | 按间隔检查持有物品的维持费用，支付失败时执行物品动作。 |

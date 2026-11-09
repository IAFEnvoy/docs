---
title: "信息表达式"
sidebar_position: 0
---

信息表达式只读传入的 PlayerView。原始数字、字符串、布尔值可直接作为常量；操作对象必须有 type。见[玩家信息](../../guides/information.md)。

| 类型 | 用途 |
| --- | --- |
| [`saturn:constant`](./constant.md) | 返回定义中的固定值。 |
| [`saturn:getter`](./getter.md) | 从传入 PlayerView 读取参数化 getter 的结果。 |
| [`saturn:local`](./local.md) | 读取列表或表格当前元素的局部绑定。 |
| [`saturn:number`](./number.md) | 把表达式结果转换成信息行数字。 |
| [`saturn:text`](./text.md) | 显示文字、翻译组件或已有格式文本。 |
| [`saturn:boolean`](./boolean.md) | 把表达式结果转换成布尔展示值。 |
| [`saturn:items`](./items.md) | 把表达式结果转换为物品集合展示。 |
| [`saturn:meter`](./meter.md) | 根据当前值、最小值和最大值生成进度展示。 |
| [`saturn:translate`](./translate.md) | 生成保留翻译键和参数的文本组件。 |
| [`saturn:registry_name`](./registry_name.md) | 根据注册表 ID 与条目 ID 取得显示名称。 |
| [`saturn:format`](./format.md) | 使用格式字符串与参数生成文字。 |
| [`saturn:arithmetic`](./arithmetic.md) | 对两个表达式执行数值运算。 |
| [`saturn:compare`](./compare.md) | 比较两个表达式，返回布尔结果。 |
| [`saturn:logic`](./logic.md) | 对布尔表达式执行逻辑运算。 |
| [`saturn:is_known`](./is_known.md) | 检查表达式是否取得已知值。 |
| [`saturn:if`](./if.md) | 根据条件选择 then 或 else 表达式。 |
| [`saturn:coalesce`](./coalesce.md) | 依次取第一个可用的表达式结果。 |
| [`saturn:list`](./list.md) | 遍历输入集合，为每个元素生成展示值。 |
| [`saturn:table`](./table.md) | 遍历输入集合，按列定义生成表格。 |

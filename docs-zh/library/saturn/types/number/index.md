---
title: "数值提供器"
sidebar_position: 0
---

NumberProvider 可写为数字、公式字符串，或本目录的带 type 对象。游戏时间字段默认使用 tick，20 tick 通常为一秒。

| 类型 | 用途 |
| --- | --- |
| [`saturn:constant`](./constant.md) | 返回定义中的固定值。 |
| [`saturn:expression`](./expression.md) | 计算 exp4j 表达式，params 可覆盖表达式参数。 |
| [`saturn:context_variable`](./context_variable.md) | 读取上下文或已注册的公式变量，未知变量可使用回退值。 |
| [`saturn:sum`](./sum.md) | 求多个数值提供器之和。 |
| [`saturn:uniform`](./uniform.md) | 在给定最小值和最大值之间均匀取样。 |
| [`saturn:binomial`](./binomial.md) | 按 n 次试验和单次概率 p 生成二项分布随机值。 |
| [`saturn:weighted_list`](./weighted_list.md) | 按权重从分布条目选择数值。 |
| [`saturn:conditional`](./conditional.md) | 依次检查实体条件，使用首个命中分支的数值。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |

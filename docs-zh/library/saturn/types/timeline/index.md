---
title: "时间轴节点"
sidebar_position: 0
---

时间轴节点只描述本步行为。节点 ID、后继和整个时间轴由使用方组装，不是独立动态注册表。

| 类型 | 用途 |
| --- | --- |
| [`saturn:action`](./action.md) | 在时间轴中执行一个实体动作。 |
| [`saturn:branch`](./branch.md) | 在时间轴中按条件选择后续路径。 |
| [`saturn:idle`](./idle.md) | 在时间轴中等待指定 tick 数。 |
| [`saturn:wait_for`](./wait_for.md) | 等待实体条件成立，可指定超时和超时结果。 |

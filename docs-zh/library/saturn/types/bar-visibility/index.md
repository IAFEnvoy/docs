---
title: "资源条显示条件"
sidebar_position: 0
---

用于 ResourceBar.visibility，在资源条上下文中决定是否显示。

| 类型 | 用途 |
| --- | --- |
| [`saturn:always`](./always.md) | 条件始终为真。 |
| [`saturn:non_full`](./non_full.md) | 当前资源未达到最大值时显示。 |
| [`saturn:non_zero`](./non_zero.md) | 当前资源不为零时显示。 |
| [`saturn:recently_changed`](./recently_changed.md) | 资源变化后保留显示指定 tick 数。 |
| [`saturn:resource_range`](./resource_range.md) | 当前资源处于给定区间时显示。 |
| [`saturn:and`](./and.md) | 所有子条件都成立时才匹配。 |
| [`saturn:or`](./or.md) | 任一子条件成立即匹配。 |
| [`saturn:not`](./not.md) | 反转子条件的匹配结果。 |

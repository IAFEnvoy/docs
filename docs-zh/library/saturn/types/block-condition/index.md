---
title: "方块条件"
sidebar_position: 0
---

检查上下文位置的方块或环境。嵌入 BlockCondition 字段。

| 类型 | 用途 |
| --- | --- |
| [`saturn:always`](./always.md) | 条件始终为真。 |
| [`saturn:never`](./never.md) | 条件始终为假。 |
| [`saturn:and`](./and.md) | 所有子条件都成立时才匹配。 |
| [`saturn:or`](./or.md) | 任一子条件成立即匹配。 |
| [`saturn:not`](./not.md) | 反转子条件的匹配结果。 |
| [`saturn:chance`](./chance.md) | 按指定概率决定是否命中。 |
| [`saturn:offset`](./offset.md) | 将方块上下文移动指定偏移后检查或执行子项。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |
| [`saturn:block_id`](./block_id.md) | 检查当前位置的方块是否为指定类型。 |
| [`saturn:block_tag`](./block_tag.md) | 检查方块是否属于指定标签。 |
| [`saturn:biome_tag`](./biome_tag.md) | 检查当前位置的群系是否属于指定标签。 |
| [`saturn:hardness`](./hardness.md) | 比较上下文方块的硬度。 |
| [`saturn:height`](./height.md) | 比较方块位置的 Y 坐标。 |
| [`saturn:light_level`](./light_level.md) | 比较指定光照层的光照等级。 |
| [`saturn:slipperiness`](./slipperiness.md) | 比较方块的滑度。 |
| [`saturn:blast_resistance`](./blast_resistance.md) | 比较方块的爆炸抗性。 |
| [`saturn:movement_blocking`](./movement_blocking.md) | 检查方块是否阻挡移动。 |
| [`saturn:adjacent`](./adjacent.md) | 统计相邻位置中满足方块条件的数量。 |

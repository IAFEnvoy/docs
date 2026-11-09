---
title: "伤害条件"
sidebar_position: 0
---

检查伤害来源、伤害量和相关实体。嵌入 DamageCondition 字段。

| 类型 | 用途 |
| --- | --- |
| [`saturn:always`](./always.md) | 条件始终为真。 |
| [`saturn:never`](./never.md) | 条件始终为假。 |
| [`saturn:and`](./and.md) | 所有子条件都成立时才匹配。 |
| [`saturn:or`](./or.md) | 任一子条件成立即匹配。 |
| [`saturn:not`](./not.md) | 反转子条件的匹配结果。 |
| [`saturn:chance`](./chance.md) | 按指定概率决定是否命中。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |
| [`saturn:amount_range`](./amount_range.md) | 检查伤害量是否在 min 与 max 之间，包含端点。 |
| [`saturn:directness`](./directness.md) | 检查伤害是否为直接伤害。 |
| [`saturn:damage_type`](./damage_type.md) | 检查伤害源的类型。 |
| [`saturn:damage_type_tag`](./damage_type_tag.md) | 检查伤害类型是否属于指定标签。 |
| [`saturn:fire`](./fire.md) | 检查伤害源是否属于火焰伤害。 |
| [`saturn:magic`](./magic.md) | 检查伤害源是否属于魔法伤害。 |
| [`saturn:projectile`](./projectile.md) | 检查伤害是否来自符合类型或条件的投射物。 |

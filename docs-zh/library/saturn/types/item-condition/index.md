---
title: "物品条件"
sidebar_position: 0
---

检查一个 ItemStack。不能将物品 ID 字符串直接当成任意 ItemCondition。

| 类型 | 用途 |
| --- | --- |
| [`saturn:always`](./always.md) | 条件始终为真。 |
| [`saturn:never`](./never.md) | 条件始终为假。 |
| [`saturn:and`](./and.md) | 所有子条件都成立时才匹配。 |
| [`saturn:or`](./or.md) | 任一子条件成立即匹配。 |
| [`saturn:not`](./not.md) | 反转子条件的匹配结果。 |
| [`saturn:chance`](./chance.md) | 按指定概率决定是否命中。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |
| [`saturn:item_id`](./item_id.md) | 检查物品堆是否为指定物品。 |
| [`saturn:item_tag`](./item_tag.md) | 检查物品是否属于指定标签。 |
| [`saturn:item_matcher`](./item_matcher.md) | 按多个物品匹配条目检查物品堆。 |
| [`saturn:amount`](./amount.md) | 比较物品堆的数量。 |
| [`saturn:fuel`](./fuel.md) | 比较物品作为燃料的燃烧时间。 |
| [`saturn:is_equipable`](./is_equipable.md) | 检查物品是否可装备到指定槽位。 |
| [`saturn:relative_durability`](./relative_durability.md) | 比较物品剩余耐久占最大耐久的比例。 |
| [`saturn:armor_value`](./armor_value.md) | 比较装备提供的护甲值。 |
| [`saturn:durability`](./durability.md) | 比较物品剩余耐久。 |
| [`saturn:on_cooldown`](./on_cooldown.md) | 检查上下文物品是否处于冷却中。 |
| [`saturn:ingredient`](./ingredient.md) | 使用 Minecraft Ingredient 匹配物品。 |
| [`saturn:tool_ability`](./tool_ability.md) | 检查物品是否支持指定 NeoForge ItemAbility。 |
| [`saturn:base_enchantment`](./base_enchantment.md) | 比较物品指定基础附魔的等级。 |
| [`saturn:has_component`](./has_component.md) | 检查物品堆是否有指定数据组件。 |
| [`saturn:component`](./component.md) | 检查物品堆指定组件的数据。 |

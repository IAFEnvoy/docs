---
title: "实体条件"
sidebar_position: 0
---

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

| 类型 | 用途 |
| --- | --- |
| [`saturn:always`](./always.md) | 条件始终为真。 |
| [`saturn:never`](./never.md) | 条件始终为假。 |
| [`saturn:and`](./and.md) | 所有子条件都成立时才匹配。 |
| [`saturn:or`](./or.md) | 任一子条件成立即匹配。 |
| [`saturn:not`](./not.md) | 反转子条件的匹配结果。 |
| [`saturn:chance`](./chance.md) | 按指定概率决定是否命中。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |
| [`saturn:sneaking`](./sneaking.md) | 检查实体是否处于潜行状态。 |
| [`saturn:has_ability`](./has_ability.md) | 检查实体是否持有指定技能。 |
| [`saturn:partner`](./partner.md) | 按范围和双实体条件检查附近实体。 |
| [`saturn:resource_compare`](./resource_compare.md) | 检查指定资源的当前值是否至少达到 min。 |
| [`saturn:entity_tag`](./entity_tag.md) | 检查实体类型是否属于指定标签。 |
| [`saturn:air`](./air.md) | 读取或比较实体的剩余空气值。 |
| [`saturn:dimension`](./dimension.md) | 检查实体所在维度。 |
| [`saturn:entity_type`](./entity_type.md) | 检查实体是否为指定类型。 |
| [`saturn:fall_distance`](./fall_distance.md) | 比较实体累计的下落距离。 |
| [`saturn:glowing`](./glowing.md) | 检查实体是否处于发光状态。 |
| [`saturn:health`](./health.md) | 读取或比较实体当前生命值。 |
| [`saturn:exposed_to_sky`](./exposed_to_sky.md) | 检查实体所在位置能否看到天空。 |
| [`saturn:food_level`](./food_level.md) | 比较玩家的饥饿值。 |
| [`saturn:mob_effect`](./mob_effect.md) | 检查实体是否具有指定状态效果。 |
| [`saturn:on_block`](./on_block.md) | 检查实体脚下方块是否满足方块条件。 |
| [`saturn:time_of_day`](./time_of_day.md) | 比较上下文世界的昼夜时间。 |
| [`saturn:using_item`](./using_item.md) | 检查实体是否正在使用物品。 |
| [`saturn:brightness`](./brightness.md) | 比较实体所在位置的亮度。 |
| [`saturn:exposed_to_sun`](./exposed_to_sun.md) | 检查实体是否受到阳光照射。 |
| [`saturn:experience_level`](./experience_level.md) | 比较玩家的经验等级。 |
| [`saturn:experience_points`](./experience_points.md) | 比较玩家的总经验点数。 |
| [`saturn:relative_health`](./relative_health.md) | 比较实体当前生命值与最大生命值的比例。 |
| [`saturn:saturation_level`](./saturation_level.md) | 比较玩家的食物饱和度。 |
| [`saturn:team`](./team.md) | 读取或检查实体的计分板队伍。 |
| [`saturn:attribute`](./attribute.md) | 读取或比较实体的指定属性值。 |
| [`saturn:block_collision`](./block_collision.md) | 检查偏移后的实体边界是否与方块碰撞。 |
| [`saturn:can_have_effect`](./can_have_effect.md) | 检查实体是否能接受指定状态效果。 |
| [`saturn:gamemode`](./gamemode.md) | 检查玩家的游戏模式。 |
| [`saturn:passenger`](./passenger.md) | 统计满足双实体条件的直接乘客并比较数量。 |
| [`saturn:attack_cooldown`](./attack_cooldown.md) | 比较玩家的攻击蓄力进度。 |
| [`saturn:equipped_item`](./equipped_item.md) | 检查指定装备槽的物品是否满足物品条件。 |
| [`saturn:main_hand_item`](./main_hand_item.md) | 检查实体主手物品是否满足物品条件。 |
| [`saturn:in_block`](./in_block.md) | 检查实体所在方块是否满足条件。 |
| [`saturn:in_block_anywhere`](./in_block_anywhere.md) | 检查实体边界内满足条件的方块数量。 |
| [`saturn:scoreboard`](./scoreboard.md) | 比较指定记分项下的分数。 |
| [`saturn:riding`](./riding.md) | 检查实体的坐骑是否满足双实体条件。 |
| [`saturn:riding_recursive`](./riding_recursive.md) | 检查多层骑乘关系。 |
| [`saturn:passenger_recursive`](./passenger_recursive.md) | 递归统计满足条件的乘客。 |
| [`saturn:riding_root`](./riding_root.md) | 检查骑乘链的根实体。 |
| [`saturn:ability_storage_toggle`](./ability_storage_toggle.md) | 检查指定技能存储的开关值。 |
| [`saturn:ability_storage_timer`](./ability_storage_timer.md) | 检查技能计时器的剩余时长。 |
| [`saturn:ability_storage_resource`](./ability_storage_resource.md) | 检查技能存储中的资源值。 |
| [`saturn:ability_storage_target`](./ability_storage_target.md) | 检查技能是否存在符合距离条件的锁定目标。 |
| [`saturn:ability_storage_charges`](./ability_storage_charges.md) | 检查技能剩余充能数量。 |
| [`saturn:ability_storage_cooldown`](./ability_storage_cooldown.md) | 检查技能当前剩余冷却时长。 |

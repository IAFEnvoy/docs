---
title: "触发器"
sidebar_position: 0
---

触发器匹配已发布的服务端信号。它可以用于触发规则或触发型技能；注册本身不执行动作。见[触发器生命周期](../../guides/triggers.md)。

| 类型 | 用途 |
| --- | --- |
| [`saturn:tick`](./tick.md) | 在服务端实体 tick 时发布信号。 |
| [`saturn:attack`](./attack.md) | 实体攻击目标时发布信号。 |
| [`saturn:hurt`](./hurt.md) | 实体受到伤害时发布信号。 |
| [`saturn:kill`](./kill.md) | 实体击杀其他实体时发布信号。 |
| [`saturn:block_break`](./block_break.md) | 玩家破坏方块时发布信号。 |
| [`saturn:block_use`](./block_use.md) | 玩家与方块交互时发布信号。 |
| [`saturn:item_use`](./item_use.md) | 实体完成一次物品使用时发布信号。 |
| [`saturn:equip`](./equip.md) | 实体装备发生变化时发布信号。 |
| [`saturn:death`](./death.md) | 实体死亡时发布信号。 |
| [`saturn:consume_item`](./consume_item.md) | 减少上下文物品堆的数量。 |
| [`saturn:brewed_potion`](./brewed_potion.md) | 玩家酿造药水时匹配原版酿造准则参数。 |
| [`saturn:tame_animal`](./tame_animal.md) | 玩家成功驯服动物时发布信号。 |
| [`saturn:bred_animals`](./bred_animals.md) | 动物成功繁殖时向相关玩家发布信号。 |
| [`saturn:villager_trade`](./villager_trade.md) | 玩家完成与村民的交易时发布信号。 |
| [`saturn:used_totem`](./used_totem.md) | 玩家消耗图腾避免死亡时发布信号。 |
| [`saturn:started_riding`](./started_riding.md) | 玩家开始骑乘时发布信号。 |
| [`saturn:changed_dimension`](./changed_dimension.md) | 玩家发生维度切换时发布信号。 |
| [`saturn:effects_changed`](./effects_changed.md) | 玩家的状态效果发生变化时发布信号。 |
| [`saturn:lightning_strike`](./lightning_strike.md) | 发生闪电事件时匹配相关玩家、闪电和附近实体。 |
| [`saturn:player_hurt_entity`](./player_hurt_entity.md) | 玩家对实体造成伤害时发布信号。 |
| [`saturn:entity_hurt_player`](./entity_hurt_player.md) | 玩家受到实体伤害时发布信号。 |
| [`saturn:player_killed_entity`](./player_killed_entity.md) | 玩家击杀实体时发布信号。 |
| [`saturn:entity_killed_player`](./entity_killed_player.md) | 玩家被实体击杀时发布信号。 |
| [`saturn:shot_crossbow`](./shot_crossbow.md) | 玩家用弩射击时发布信号。 |
| [`saturn:player_interacted_with_entity`](./player_interacted_with_entity.md) | 玩家与实体交互时发布信号。 |
| [`saturn:fishing_rod_hooked`](./fishing_rod_hooked.md) | 钓鱼完成时匹配钓竿、实体和渔获参数。 |
| [`saturn:thrown_item_picked_up_by_player`](./thrown_item_picked_up_by_player.md) | 玩家拾取有投掷者信息的物品时发布信号。 |
| [`saturn:enter_block`](./enter_block.md) | 轮询玩家进入的方块并匹配方块状态。 |
| [`saturn:location`](./location.md) | 读取实体位置和维度。 |
| [`saturn:slept_in_bed`](./slept_in_bed.md) | 玩家在床上睡眠时发布信号。 |
| [`saturn:levitation`](./levitation.md) | 轮询玩家漂浮过程中的距离和持续时间。 |
| [`saturn:fall_from_height`](./fall_from_height.md) | 根据记录的下落起点与距离匹配信号。 |
| [`saturn:fall_after_explosion`](./fall_after_explosion.md) | 匹配爆炸造成的移动和后续下落。 |
| [`saturn:ride_entity_in_lava`](./ride_entity_in_lava.md) | 匹配玩家在熔岩中骑乘的移动距离。 |
| [`saturn:nether_travel`](./nether_travel.md) | 匹配下界旅行的起点与距离。 |
| [`saturn:inventory_changed`](./inventory_changed.md) | 根据背包快照变化匹配原版物品和槽位谓词。 |
| [`saturn:using_item`](./using_item.md) | 检查实体是否正在使用物品。 |
| [`saturn:filled_bucket`](./filled_bucket.md) | 玩家完成装桶行为时匹配结果物品。 |
| [`saturn:item_durability_changed`](./item_durability_changed.md) | 匹配物品耐久与耐久变化量。 |
| [`saturn:advancement_completed`](./advancement_completed.md) | 在整个 Minecraft 成就完成时发布信号，可按成就 ID 筛选。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |

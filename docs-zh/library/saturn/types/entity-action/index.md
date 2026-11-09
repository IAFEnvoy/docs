---
title: "实体动作"
sidebar_position: 0
---

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

| 类型 | 用途 |
| --- | --- |
| [`saturn:no_op`](./no_op.md) | 不执行操作，可作为动作的占位值。 |
| [`saturn:sequence`](./sequence.md) | 按数组顺序依次执行多个同类动作。 |
| [`saturn:chance`](./chance.md) | 按指定概率决定是否命中。 |
| [`saturn:if_else`](./if_else.md) | 条件成立时执行 if_action，否则执行 else_action。 |
| [`saturn:choice`](./choice.md) | 按权重随机选择一项动作执行。 |
| [`saturn:send_message`](./send_message.md) | 把文本组件发给符合接收条件的玩家，可选择聊天栏或动作栏。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |
| [`saturn:dismount`](./dismount.md) | 让实体退出当前坐骑。 |
| [`saturn:extinguish`](./extinguish.md) | 清除实体当前的着火状态。 |
| [`saturn:heal`](./heal.md) | 恢复实体的生命值。 |
| [`saturn:add_resource`](./add_resource.md) | 增加指定 Saturn 资源的当前值。 |
| [`saturn:grant_ability`](./grant_ability.md) | 按来源 ID 为实体授予一个技能。 |
| [`saturn:remove_ability`](./remove_ability.md) | 移除指定来源授予的技能，不影响其他来源。 |
| [`saturn:apply_effect`](./apply_effect.md) | 给实体施加指定时长和等级的状态效果。 |
| [`saturn:teleport`](./teleport.md) | 改变实体的位置。 |
| [`saturn:knockback`](./knockback.md) | 按给定向量对实体施加速度。 |
| [`saturn:modify_ability_storage`](./modify_ability_storage.md) | 把指定类型的状态写入目标技能的存储。 |
| [`saturn:spawn_entity`](./spawn_entity.md) | 在上下文提供的位置或指定坐标生成实体。 |
| [`saturn:spawn_projectile`](./spawn_projectile.md) | 生成实体并赋予指定初速度。 |
| [`saturn:add_experience`](./add_experience.md) | 为玩家增加经验点数、等级，或同时增加二者。 |
| [`saturn:add_velocity`](./add_velocity.md) | 增加速度，或以给定向量替换速度。 |
| [`saturn:exhaust`](./exhaust.md) | 增加玩家的饥饿消耗度。 |
| [`saturn:feed`](./feed.md) | 为玩家增加饥饿值和饱和度。 |
| [`saturn:gain_air`](./gain_air.md) | 修改实体剩余空气值。 |
| [`saturn:give_item`](./give_item.md) | 创建物品堆并交给实体，可指定优先装备槽。 |
| [`saturn:play_sound`](./play_sound.md) | 在实体处播放指定音效。 |
| [`saturn:remove_effect`](./remove_effect.md) | 移除实体的指定状态效果。 |
| [`saturn:set_fall_distance`](./set_fall_distance.md) | 改变实体累计的下落距离。 |
| [`saturn:set_no_gravity`](./set_no_gravity.md) | 控制实体是否忽略重力。 |
| [`saturn:set_on_fire`](./set_on_fire.md) | 让实体着火指定 tick 数。 |
| [`saturn:swing_hand`](./swing_hand.md) | 触发指定手的挥动动画。 |
| [`saturn:emit_game_event`](./emit_game_event.md) | 发布可供幽匿感测体等接收的原版游戏事件。 |
| [`saturn:passenger_action`](./passenger_action.md) | 对实体的乘客执行动作，可递归处理多层乘客。 |
| [`saturn:block_action`](./block_action.md) | 对实体所在位置的方块执行方块动作。 |
| [`saturn:self_bientity_action`](./self_bientity_action.md) | 把同一实体作为 actor 和 target 执行双实体动作。 |
| [`saturn:equipped_item_action`](./equipped_item_action.md) | 对指定装备槽的物品堆执行物品动作。 |
| [`saturn:riding_action`](./riding_action.md) | 对实体乘坐的对象执行动作，可递归处理坐骑链。 |
| [`saturn:spawn_particles`](./spawn_particles.md) | 在实体附近按偏移和散布参数生成粒子。 |
| [`saturn:spawn_effect_cloud`](./spawn_effect_cloud.md) | 在实体附近生成带状态效果的区域效果云。 |

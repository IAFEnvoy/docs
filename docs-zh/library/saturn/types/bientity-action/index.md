---
title: "双实体动作"
sidebar_position: 0
---

上下文包含 actor（发起者）与 target（目标）。同一个 ID 在实体动作和双实体动作注册表中可能有不同字段，不能跨种类替换。

| 类型 | 用途 |
| --- | --- |
| [`saturn:no_op`](./no_op.md) | 不执行操作，可作为动作的占位值。 |
| [`saturn:sequence`](./sequence.md) | 按数组顺序依次执行多个同类动作。 |
| [`saturn:chance`](./chance.md) | 按指定概率决定是否命中。 |
| [`saturn:if_else`](./if_else.md) | 条件成立时执行 if_action，否则执行 else_action。 |
| [`saturn:choice`](./choice.md) | 按权重随机选择一项动作执行。 |
| [`saturn:actor_action`](./actor_action.md) | 把双实体上下文的 actor 交给实体动作。 |
| [`saturn:target_action`](./target_action.md) | 把双实体上下文的 target 交给实体动作。 |
| [`saturn:send_message`](./send_message.md) | 把文本组件发给符合接收条件的玩家，可选择聊天栏或动作栏。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |
| [`saturn:mount`](./mount.md) | 让 actor 骑上 target。 |
| [`saturn:heal_target`](./heal_target.md) | 恢复双实体上下文中目标实体的生命值。 |
| [`saturn:transfer_resource`](./transfer_resource.md) | 在 actor 与 target 之间转移指定 Saturn 资源。 |
| [`saturn:add_velocity`](./add_velocity.md) | 增加速度，或以给定向量替换速度。 |
| [`saturn:teleport`](./teleport.md) | 改变实体的位置。 |

---
title: "方块动作"
sidebar_position: 0
---

操作上下文给出的世界与方块位置。它不是独立数据包文件，应嵌入要求 BlockAction 的字段。

| 类型 | 用途 |
| --- | --- |
| [`saturn:no_op`](./no_op.md) | 不执行操作，可作为动作的占位值。 |
| [`saturn:sequence`](./sequence.md) | 按数组顺序依次执行多个同类动作。 |
| [`saturn:chance`](./chance.md) | 按指定概率决定是否命中。 |
| [`saturn:if_else`](./if_else.md) | 条件成立时执行 if_action，否则执行 else_action。 |
| [`saturn:choice`](./choice.md) | 按权重随机选择一项动作执行。 |
| [`saturn:offset`](./offset.md) | 将方块上下文移动指定偏移后检查或执行子项。 |
| [`saturn:send_message`](./send_message.md) | 把文本组件发给符合接收条件的玩家，可选择聊天栏或动作栏。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |
| [`saturn:set_block`](./set_block.md) | 把当前位置设置为指定方块。 |
| [`saturn:break_block`](./break_block.md) | 破坏上下文位置的方块，可控制是否掉落物品。 |
| [`saturn:schedule_tick`](./schedule_tick.md) | 为上下文位置的方块安排延迟 tick。 |
| [`saturn:bonemeal`](./bonemeal.md) | 对上下文方块尝试应用骨粉效果。 |
| [`saturn:light_up`](./light_up.md) | 尝试点燃上下文位置。 |
| [`saturn:explode`](./explode.md) | 在上下文位置创建爆炸，可配置破坏行为和保护条件。 |
| [`saturn:spawn_entity`](./spawn_entity.md) | 在上下文提供的位置或指定坐标生成实体。 |

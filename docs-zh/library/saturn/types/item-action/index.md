---
title: "物品动作"
sidebar_position: 0
---

操作上下文中的物品堆以及持有者。它不是物品定义文件，应嵌入要求 ItemAction 的字段。

| 类型 | 用途 |
| --- | --- |
| [`saturn:no_op`](./no_op.md) | 不执行操作，可作为动作的占位值。 |
| [`saturn:sequence`](./sequence.md) | 按数组顺序依次执行多个同类动作。 |
| [`saturn:chance`](./chance.md) | 按指定概率决定是否命中。 |
| [`saturn:if_else`](./if_else.md) | 条件成立时执行 if_action，否则执行 else_action。 |
| [`saturn:choice`](./choice.md) | 按权重随机选择一项动作执行。 |
| [`saturn:send_message`](./send_message.md) | 把文本组件发给符合接收条件的玩家，可选择聊天栏或动作栏。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |
| [`saturn:damage_item`](./damage_item.md) | 对物品堆施加指定耐久损耗。 |
| [`saturn:consume_item`](./consume_item.md) | 减少上下文物品堆的数量。 |
| [`saturn:consume_health`](./consume_health.md) | 消耗物品持有者的生命值。 |
| [`saturn:cooldown`](./cooldown.md) | 读取或设置冷却状态。 |
| [`saturn:remove_enchantment`](./remove_enchantment.md) | 从物品移除选定附魔，可重置修复费用。 |
| [`saturn:add_enchantment`](./add_enchantment.md) | 按映射为物品增加或覆盖附魔等级。 |
| [`saturn:merge_components`](./merge_components.md) | 把数据组件补丁合并到物品堆。 |

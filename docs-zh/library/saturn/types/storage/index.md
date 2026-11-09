---
title: "状态存储"
sidebar_position: 0
---

DataStorage 是运行时状态的 Codec，不是独立数据包注册表。技能类型声明所需状态；宿主负责创建、tick、持久化以及修改后的 markDirty。

| 类型 | 用途 |
| --- | --- |
| [`saturn:empty`](./empty.md) | 提供一个不执行额外行为的实现。 |
| [`saturn:cooldown`](./cooldown.md) | 保存冷却开始时刻和持续时长。 |
| [`saturn:charges`](./charges.md) | 保存最大充能、恢复间隔和当前剩余充能。 |
| [`saturn:toggle`](./toggle.md) | 保存一个可变的开关状态。 |
| [`saturn:timer`](./timer.md) | 保存持续时长和计时结束 tick。 |
| [`saturn:resource`](./resource.md) | 保存资源引用和对应数量；未填值的对象只声明存储类型。 |
| [`saturn:target_lock`](./target_lock.md) | 保存锁定目标和可用距离。 |
| [`saturn:container`](./container.md) | 保存运行时物品槽内容。 |
| [`saturn:cast_deadline`](./cast_deadline.md) | 保存施法结束时刻。 |
| [`saturn:channel_pulse`](./channel_pulse.md) | 保存下一次引导执行时刻。 |
| [`saturn:active_state`](./active_state.md) | 保存运行时激活标记。 |
| [`saturn:entry_began`](./entry_began.md) | 保存时间轴节点是否已经开始。 |
| [`saturn:idle_countdown`](./idle_countdown.md) | 保存等待节点剩余 tick 数。 |
| [`saturn:wait_countdown`](./wait_countdown.md) | 保存条件等待节点剩余 tick 数。 |

---
title: 指令
description: 查询世代档案、开启新的一世和管理寿元。
sidebar_position: 1
---

## 转生指令 {#reincarnation}

玩家可以查询自己的记录。查询其他账号或执行转生需要 2 级管理员权限。查询参数支持玩家名称和 UUID，已有记录的离线玩家也可查询。名称有歧义时使用 UUID。世数与页码均从 `1` 开始。

| 指令 | 作用 |
| --- | --- |
| `/reincarnation` 或 `/reincarnation status [player]` | 显示当前世数，以及正在处理的转生。 |
| `/reincarnation history [player] [page]` | 在聊天栏列出前世。默认第 `1` 页。指定页码时须先写玩家参数。 |
| `/reincarnation info <player> <life>` | 在聊天栏显示指定一世的摘要。 |
| `/reincarnation view [player] [life] [page]` | 打开档案界面。默认查看当前世，并定位到包含该记录的一页。须由游戏内玩家执行。 |
| `/reincarnation rebirth [target] [reason]` | 立即让一名在线玩家完整换世，省略目标时作用于指令执行者。自定义原因需要指定目标，最长 256 个字符。 |

例如，`/reincarnation view Alex 1` 打开 Alex 的第 1 世。`/reincarnation rebirth @s 重新开始` 为自己开启下一世，并将给定文字记入档案。

## 寿元指令 {#lifespan}

所有 `/lifespan` 指令均需要 2 级管理员权限，包括查询自身。写入指令作用于存活实体，统一使用游戏刻。

| 指令 | 作用 |
| --- | --- |
| `/lifespan` 或 `/lifespan get [targets]` | 查看年龄与总寿元，默认查询执行者。 |
| `/lifespan set <targets> <ticks>` | 将剩余与总寿元一起设为指定的非负值。 |
| `/lifespan add <targets> <ticks>` | 正值同时增加剩余与总寿元。负值扣减剩余寿元，最低为零。 |
| `/lifespan unlimited <targets>` | 关闭寿元账本。 |
| `/lifespan reincarnate <targets>` | 按玩家转生模式排队执行。其他生物原地重置。 |

关闭自然老化后仍可显式写入寿元。最后一条指令返回的是排队结果，执行结果可通过[转生事件](./kubejs.md#events)查看。

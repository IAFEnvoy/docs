---
title: /lifespan
---

# `/lifespan`

<span id="lifespan" />

`/lifespan` 由可选的 Reincarnation 模组提供。全部节点（含查询自己）都需要管理员权限，即原版等级 2。

| 指令 | 行为 |
| --- | --- |
| `/lifespan` 或 `/lifespan get` | 查询自己 |
| `/lifespan get <targets>` | 查询指定实体 |
| `/lifespan set <targets> <ticks>` | 同时改写剩余与总额，刻数非负 |
| `/lifespan add <targets> <ticks>` | 正数同增两项，负数只扣剩余 |
| `/lifespan unlimited <targets>` | 关闭账本，直到显式授予有限寿元 |
| `/lifespan reincarnate <targets>` | 按 Reincarnation 配置提交转世请求 |

写入作用于活体目标，单位为游戏刻；自然老化关闭时仍可用。转世反馈表示已接受，由 `lifespanRebirth` 的 Post 或 Failed 报告最终结果。完整换世替换玩家，原地重置保持实体和世代。

安装 Reincarnation 时才有此指令，由它管理权限和执行。

查询显示「当前年龄 / 总寿元」，年龄随时间正向增加；set/add 的参数仍是授予的寿元刻数。

见[寿元](../lifespan.md)与 [ReincarnationEvents](../../kubejs/api/reincarnation_events.md)。

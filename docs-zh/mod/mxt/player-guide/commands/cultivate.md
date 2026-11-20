---
title: /cultivate
---

# `/cultivate`

<span id="cultivate" />

`/cultivate` 管的是**正在运行的那一套修炼**：看自己此刻在修什么，或者点名一条[法门](../../datapack/json/cultivation.md)**立刻开练**。

<div className="cmd-tree">

- `/cultivate ...`

  - `... status`

    读出当前修炼状态：正在运行的法门、按灵气分开记的修为进度、下一次结算的 tick。

  - `... select <action>`

    点名一条法门（`mxt:cultivation` 的条目）立刻开练。

</div>

`select` 需要 gamemaster 权限；`status` 不需要，但它要求由玩家执行（读的是执行者自己的修炼记录）。

## status {#status}

输出当前修炼行为、修为进度与下次结算 tick；未修炼时行为显示为「无」。修为按灵气分别记录，各项格式为 `灵气=数值`，可同时查看多条链的进度。

查询显示当前实际运行的修炼记录。`priority` 仅在开始修炼时用于选择法门，选择规则见[修炼方式](../../datapack/json/cultivation.md)。

## select {#select}

指定法门并尝试切换当前修炼。该操作跳过 `priority` 选择，但仍检查 `start_condition`、`cultivate_condition` 与灵气的 `start_cultivate_conditions`。校验通过后停止原法门并启动指定法门；校验失败时保留当前修炼。

它只管这一次。**不落盘、也不改变下次按键时的挑选顺序**：之后再按修炼键，仍然按"适用 + `priority`"重新挑，见[修炼方式](../../datapack/json/cultivation.md)。所以它是管理员调数据用的入口，不是"锁定某一条修炼"的开关。

被拒绝时聊天栏报的是这条法门自己的失败原因（与界面上那句同一套文案），所以"为什么开不起来"直接就有了。

## 顶层别名 {#顶层别名}

`/cultivate` 由服务端配置的**「命令别名」标签页**控制（条目名 `cultivate`，默认开启）；关闭后 `/mxt cultivate` 照旧可用。

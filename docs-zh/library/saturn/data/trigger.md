---
title: "触发规则"
sidebar_position: 5
---

文件：`data/<namespace>/saturn/trigger/<path>.json`。本文件是规则定义；内层 `trigger` 才是匹配游戏信号的类型对象。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `trigger` | [触发器](../types/trigger/index.md) | 是 | — | 订阅和匹配的游戏信号。 |
| `condition` | [实体条件](../types/entity-condition/index.md) | 否 | 始终成立 | 信号命中后检查 actor。 |
| `action` | [实体动作](../types/entity-action/index.md) | 否 | 空动作 | 条件与概率通过后执行。 |
| `chance` | [数值提供器](../types/number/index.md) | 否 | `1` | 命中概率，0～1。 |
| `cooldown` | 数值提供器 | 否 | `0` | 同一 actor 的规则冷却，单位 tick。 |

## 示例：完成指定成就时提示

以下触发器是当前源码新增能力，发布构建中使用前需确认已经包含该类型。

```json title="data/example/saturn/trigger/first_diamond.json"
{
  "trigger": {
    "type": "saturn:advancement_completed",
    "advancement": "minecraft:story/mine_diamond"
  },
  "action": {
    "type": "saturn:send_message",
    "message": {
      "text": "已获得第一颗钻石。"
    }
  },
  "chance": 1,
  "cooldown": 20
}
```

规则不是持久化的一次性成就记录。撤销成就后再次完成仍可能触发，跨重启去重由业务宿主存储。信号、订阅、载入恢复和 Java 接口见[触发器生命周期](../guides/triggers.md)。系统当前仍用自身成就监听配置，尚未改为此触发器。

---
title: 扩展指南
description: 配置伙伴、Task、渲染，以及 Java 和 KubeJS 动作。
sidebar_position: 3
---

## 定义伙伴和 Task

伙伴定义放在 `data/<命名空间>/psychic/spirit/<名称>.json`，Task 定义放在 `data/<命名空间>/psychic/behavior/<名称>.json`。命名空间和文件名组成资源 ID。例如 `data/example/psychic/behavior/greet.json` 对应 `example:greet`。

伙伴定义用 `item_tag` 或 `block_entity_tag` 指定一种目标，`condition` 决定唤醒条件，`tasks` 列出可用 Task。多个定义匹配时优先选伙伴 `priority` 最大的定义，同优先级按 ID 排序。`address_aliases` 添加呼叫名。`material_search_range` 设置容器搜索半径，单位为格，范围 0–16，默认 0。内置工具和熔炉使用 8。

下例为斧添加问候 Task，新定义的优先级比内置斧更高。可把需要保留的内置 Task ID 加入 `tasks`。

```json title="data/example/psychic/spirit/greeting_axe.json"
{
  "item_tag": "psychic:axe",
  "priority": 10,
  "condition": { "type": "psychic:always" },
  "render": "psychic:axe",
  "tasks": ["example:greet"]
}
```

```json title="data/example/psychic/behavior/greet.json"
{
  "type": "instant",
  "target_types": ["carried"],
  "commands": ["打个招呼"],
  "action": {
    "type": "psychic:say",
    "text": { "text": "你好！" }
  }
}
```

重新进入世界或重启服务端以加载伙伴和 Task 注册表。用新定义唤醒一把斧，选中后发送 `!打个招呼`。

| Task 字段 | 用途 |
| --- | --- |
| `type` | `active` 主动委托、`passive` 被动行为、`triggered` 事件触发、`instant` 瞬时操作。 |
| `target_types` | `carried` 用于物品伙伴，`fixed` 用于方块实体。动作本身也必须支持该目标和 Task 类型。 |
| `priority` | Task 争用控制权时，数值越小越优先。 |
| `requires` | 所需的能力 ID，例如 `psychic:flight`。 |
| `commands`、`examples` | 显式口令和按 `zh`、`en` 等语种键组织的例句。本地例句匹配用于无参数 Task。 |
| `arguments` | 允许文本参数，默认 `false`。 |
| `trigger` | 触发式 Task 使用的事件 ID。 |
| `tool_description` | 向模型说明可调用 Task 的效果、参数和格式。 |
| `interruptible`、`resume`、`timeout_ticks`、`cooldown_ticks` | 持续任务的调度选项。 |

## 配置物品渲染

在 `assets/<命名空间>/psychic/spirit_render/<名称>.json` 编写渲染定义，再通过伙伴定义的 `render` 引用。可配置 `back`、`hover` 和 `free`。可选 `work` 姿态缺省时沿用 `free`。每个姿态可设置 `offset`、`rotation`、`pivot` 和 `scale`，旋转单位为度。用 `item_model` 选择资源包中的物品模型，用 `align_attack` 让攻击姿态随飞行方向转动。重载客户端资源后应用修改。

## Java 扩展

给 `SpiritAction` 或 `AttunementCondition` 实现 `MapCodec`，通过自己模组的 `DeferredRegister` 注册到 `PsychicResourceKeys.ACTION_TYPE` 或 `PsychicResourceKeys.CONDITION_TYPE`。数据包在 `action.type` 或 `condition.type` 中填写注册 ID。用 `SpiritContext.target()` 访问 `SpiritTarget.Carried` 或 `SpiritTarget.Fixed`。

使用 `SpiritTasks.submit(context, execution)` 提交持续工作。`TaskExecution.tick()` 返回 `true` 时结束，`started(resuming)`、`paused()`、`stopped(reason)` 处理任务状态切换。通过 `SpiritTasks.registerRequirement` 注册能力检查，通过 `SpiritTasks.trigger` 分发事件。领地模组可取消 `SpiritAccessEvent`，包括带来源容器的 `psychic:extract_material` 操作。

## KubeJS 扩展

把回调放在 `kubejs/server_scripts/`，在 JSON 中引用相应的回调 ID。

```js title="kubejs/server_scripts/psychic.js"
PsychicEvents.condition('example:ready', event => {
  if (event.player.experienceLevel >= 5) event.success()
})

PsychicEvents.action('example:greet', event => {
  event.setReply('在，随时可以开始。')
  event.success()
})
```

条件可写 `{"type":"psychic:script","callback":"example:ready"}`，动作可写 `{"type":"psychic:script","callback":"example:greet"}`。持续工作用 `psychic:script_task` 和 `PsychicEvents.task`，从 `event.tick` 获取运行 Tick 数，调用 `event.success()` 结束。回调可根据目标读取 `event.item` 或 `event.blockEntity`，也可以访问 `event.arguments`、`event.entity` 和 `event.origin`。

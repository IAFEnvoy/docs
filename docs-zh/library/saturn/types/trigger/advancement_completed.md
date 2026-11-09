---
title: "成就完成"
sidebar_position: 10
---

`saturn:advancement_completed`

在整个 Minecraft 成就完成时发布信号，可按成就 ID 筛选。

触发器匹配已发布的服务端信号。它可以用于触发规则或触发型技能；注册本身不执行动作。见[触发器生命周期](../../guides/triggers.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:advancement_completed` |
| `advancement` | 资源 ID | 否 | 省略 | Minecraft 成就 ID；省略则接受任意成就完成。 |

当前源码新增：信号为 `TriggerSignals.ADVANCEMENT_COMPLETED`，`TriggerPayload.ADVANCEMENT` 保存完成成就的 `Identifier`。包含隐藏成就与配方解锁；登录不补发，撤销后再次完成会再次触发。订阅者负责持久化去重。系统尚未接入，现有 `system-advancements.json` 保持原行为。

## JSON 示例

```json
{
  "type": "saturn:advancement_completed",
  "advancement": "minecraft:story/mine_diamond"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.trigger.builtin.AdvancementCompletedTrigger`。本页按当前 26.1.2 源码的 Codec 整理。

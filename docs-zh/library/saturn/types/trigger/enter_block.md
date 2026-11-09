---
title: "进入方块"
sidebar_position: 10
---

`saturn:enter_block`

轮询玩家进入的方块并匹配方块状态。

触发器匹配已发布的服务端信号。它可以用于触发规则或触发型技能；注册本身不执行动作。见[触发器生命周期](../../guides/triggers.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:enter_block` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `block` | 资源 ID | 否 | 省略 | 方块 ID 或方块参数。 |
| `state` | 原版谓词 | 否 | 省略 | 方块状态属性谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

## JSON 示例

```json
{
  "type": "saturn:enter_block"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`net.minecraft.advancements.criterion.EnterBlockTrigger.TriggerInstance`。本页按当前 26.1.2 源码的 Codec 整理。

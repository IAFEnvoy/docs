---
title: "触发器与订阅"
sidebar_position: 1
---

触发器由“游戏事件发布信号”和“规则或订阅匹配信号”两部分组成。`Trigger` 只保存匹配参数，`TriggerRule` 把匹配与条件、概率、冷却、实体动作组合。

## 用数据包响应事件

```json title="data/example/saturn/trigger/first_diamond.json"
{
  "trigger": {
    "type": "saturn:advancement_completed",
    "advancement": "minecraft:story/mine_diamond"
  },
  "action": {
    "type": "saturn:send_message",
    "message": { "text": "钻石成就已完成" }
  }
}
```

结构见[触发规则](../data/trigger.md)，所有匹配类型见[触发器目录](../types/trigger/index.md)。原版准则移植类型复用对应准则的 JSON 参数，由 Saturn 桥接事件或轮询状态，不创建成就。

## Java 订阅

```java
TriggerDispatcher.register(new TriggerSubscription(
        player.getUUID(), "example:module", "first_diamond",
        new AdvancementCompletedTrigger(
                Optional.of(Identifier.parse("minecraft:story/mine_diamond"))),
        signal -> true,
        signal -> handleCompletion(player, signal),
        false
));
```

`owner` 是玩家或实体 UUID；`module` 与 `identity` 只需在此 owner 内唯一。gate 额外过滤匹配结果；listener 在服务端同步执行，耗时请求应交给使用方的工作线程。`oneShot=true` 在回调成功返回后消耗本次内存订阅，不等于持久化业务已经完成。

通过 `clearModule(owner, module)` 清理自己的订阅。订阅不存盘，实体加入、服务端启动和数据包重载后，通过 `TriggerRehydrateEvent.rehydrate(module, rebuild)` 从宿主保存的状态重建；实体离开和服务端结束由 Saturn 清理索引。

## 发布自定义信号

`TriggerPublishing.publish(type, actor, FormulaContext, enrich)` 先检查监听者，再构建上下文。`TriggerContext` 包含 actor、target、level、position、item、block、damageSource 与公式值；额外对象使用带命名空间的 payload 键。`TriggerDispatcher.publish` 先处理数据包规则，再处理 actor 的订阅，过滤 FakePlayer。

## 成就事件的边界

`saturn:advancement_completed` 在整个 advancement 完成时发布。payload 的 `TriggerPayload.ADVANCEMENT` 是 `Identifier`。省略筛选 ID 会包括隐藏成就和配方解锁。登录不补发；成就撤销后重新完成会再次发布。

系统当前仍使用自己的成就规则、绑定基线及事件账本；本入口已在 Saturn 当前源码预留，尚未替换系统的监听。若业务要求奖励只领一次，应由业务存储记录幂等键，而不是只依赖 oneShot。

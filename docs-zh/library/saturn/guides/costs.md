---
title: "费用与支付"
sidebar_position: 2
---

`Cost` 描述一项支付要求。技能、商店和抽奖复用同一格式；调用方用 `CostContext` 指定付款实体、公式上下文、资源账户与可选容器。

```json
[
  { "type": "saturn:item", "items": ["minecraft:emerald"], "amount": 3 },
  { "type": "saturn:resource", "resource": "example:mana", "amount": 10 }
]
```

`example:mana` 须先定义并由宿主向付款实体提供。[物品费用](../types/cost/item.md)按匹配条目寻找物品并对数量向上取整；无可用容器或数量无效会返回失败。资源费用见[资源费用](../types/cost/resource.md)。

## 三个阶段

1. `prepare(context)` 定价并返回 `Transaction`，不扣款。
2. `execute(true)` 只读试算，所有费用都满足后才进入提交。
3. `execute(false)` 真正扣款，返回可记录的支付凭据。

`CostPayment.pay` 组织以上步骤。它不替调用方保存订单或回滚已经发生的外部支付；多通道实扣期间发生的异常需要业务自己的账本与恢复流程。系统另有持久化订单和奖励交付逻辑，不能用重复调用 pay 处理未知订单。

扩展费用实现 `Cost`，注册到 `SaturnResourceKeys.COST_TYPE`，返回自己的 `MapCodec`。失败使用 `Result.failure(Failure)`，不要用成功空值假装扣款完成。

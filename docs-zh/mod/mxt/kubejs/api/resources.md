---
title: MxtResources：整份消耗
description: 统一模拟 Cost 数组，再按顺序实扣；模拟失败整笔不扣，实扣失败只 WARN 并继续。
---

# `MxtResources`：整份消耗

<span id="mxtresources-整份消耗" />

`MxtResources` 只有一个方法，但它管的是**多项目一起付**这件事：整份 `Cost` 数组先按顺序统一模拟，全部通过后再逐条实扣。实扣失败只输出 WARN，后续费用与业务继续，不回滚、不取消。单个 `Cost` 用 [MxtCosts](./costs.md)。

## 方法 {#方法}

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `consume(entity, costs)` | 活着的实体、`Cost[]` | `Result<Map<Identifier, Double>>` | 重复目标诊断后按数组原序模拟和实扣，不合并、不重排。模拟失败不扣，实扣失败只 WARN 并继续。 |

`costs` 就是统一的 `Cost` 数组：五种写法都能直接写，旧的 `{"id": ..., "amount": ...}` 简写仍然有效（读作 `saturn:resource`）。付款者必须是**活着的实体**（不需要是玩家，但需要玩家背包的 `mxt:item` 与需要玩家的 `mxt:js` 对非玩家付款者就是付不出）。无法解码的条目使本次调用失败，不会被静默丢掉。

```js
const result = MxtResources.consume(player, [
  { id: 'mxt:spirit_power', amount: 10 },
  { type: 'mxt:aura', aura: 'mxt:fire_aura', amount: 'level + 2' }
])

if (result.getFailure().isEmpty()) {
  console.info(`已扣除: ${result.getData().orElse({})}`)
} else {
  const failure = result.getFailure().get()
  console.warn(`付不出: ${failure.resource().orElse(failure.name())}`)
}
```

返回值是 `Result<Map<Identifier, Double>>`：`getData()` 是实际扣到的数值表（成功时才非空），`getFailure()` 是拒绝的原因，原因上的 `resource()` 指出缺的是哪一门。客户端、非法公式或模拟失败时 `getFailure()` 非空。模拟通过且实扣尝试结束即返回成功，不保证全额收齐；`getData()` 只汇总已知实际数值支出，不包含物品、池灵气或脚本内部未知扣量。

## 相关 {#相关}

- 单个 `Cost` 与它的五种写法：[MxtCosts](./costs.md)、[共享数据类型](../../datapack/types/shared_data_types.md#cost)。
- 扣在哪个通道上（付款者、脚下灵气池、方块库存）：[共享数据类型](../../datapack/types/shared_data_types.md#cost)。
- 数值本身：[MxtValues](./values.md)、[数值 `resource`](../../datapack/json/resource.md)。
- [KubeJS API 参考](../api-reference.md)。

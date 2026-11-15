---
title: "货币费用"
sidebar_position: 10
---

`system:currency` 注册到 Saturn 的 `COST_TYPE`，从[经济模块](../module/economy.md)的钱包扣款。可用于商城、抽奖与维修，沿用报价、确认和支付防重入流程。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:currency`。 |
| `currency` | 币种注册表引用 | 是 | — | [币种定义](../../data/currency.md)的 ID。 |
| `amount` | [Saturn NumberProvider](../../../../library/saturn/types/number.md) | 是 | — | 费用，定价时求值一次。 |

## 示例

```json
{
  "type": "system:currency",
  "currency": "system:coin",
  "amount": 10
}
```

放入目标的 `costs` 数组即可，不需要为费用另建数据文件。玩家须已绑定系统并启用经济模块。单项费用必须是有限、非负整数，最多 `9007199254740991`，不对小数自动取整；钱包本身仍可保存完整 long 范围的非负余额。

报价与当前玩家连接和存储代次绑定，重连、撤销或 reset 后不能使用旧报价修改新钱包。余额不足拒绝扣款，同一事务重复支付复用原回执。多项费用之间不提供整体回滚，应合并对同一币种的需求。

## Java 入口

`com.iafenvoy.system.data.cost.CurrencyCost`，通过 `SystemCosts.CURRENCY` 注册，支付事务继承 Saturn `CostTransaction`。

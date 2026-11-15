---
title: "增减货币"
sidebar_position: 20
---

`system:add_currency` 注册到 Saturn 的实体动作注册表，修改服务端玩家的钱包余额。玩家须已绑定系统、启用[经济模块](../module/economy.md)，且运行时已就绪。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:add_currency`。 |
| `currency` | 币种注册表引用 | 是 | — | [币种定义](../../data/currency.md)的 ID。 |
| `amount` | long 整数 | 是 | — | 正数增加、负数扣除，0 不改变金额。 |

## 示例

```json
{
  "type": "system:add_currency",
  "currency": "system:coin",
  "amount": 100
}
```

这是可嵌入 EntityAction 字段的对象，不是单独的数据文件。扣款不足或余额溢出时拒绝整个操作。动作每次调用都会执行，不对触发事件去重；一次性奖励由所属玩法保存领取状态。

存储暂时忙碌时，修改会排入持久化工作线程。后续条件须在事务完成后才能观察到该次修改；不要假定排队动作同步完成。

## Java 入口

`com.iafenvoy.system.data.action.AddCurrencyAction`，通过 `SystemEntityActions.ADD_CURRENCY` 注册。

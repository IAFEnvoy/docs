---
title: "经济模块"
sidebar_position: 10
---

`system:economy` 为已绑定玩家提供多币种钱包、余额查询和管理员经济指令。它属于可选玩法模块，已加入默认模块 tag。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:economy`。 |

没有币种筛选参数；币种来自[币种注册表](../../data/currency.md)。同类型模块共用钱包，不因配置 ID 不同创建第二份余额。

## 完整模块示例

```json title="data/example/system/system_module/wallet.json"
{
  "order": 55,
  "server": { "type": "system:economy" },
  "client": "system:economy"
}
```

在系统 `modules` 或模块 tag 中引用 `example:wallet`。公共字段见[模块定义](../../data/module.md)。

玩家可使用 `/balance` 或 `/wallet`，以及游戏指令 `/system balance`。查询不调用 AI；AI 的 `economy.balance` 工具也只能读取自己的余额。管理指令、数据驱动发币和扣款见[系统币与钱包](../../guides/economy.md)。

## Java 入口

`com.iafenvoy.system.module.builtin.EconomySystemModule`；存储为相邻 storage 包中的 `WalletDataStorage`。

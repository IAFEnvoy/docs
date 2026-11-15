---
title: "系统币与钱包"
sidebar_position: 14
---

经济模块为已绑定玩家提供独立的多币种钱包，不需要 AI 或外部支付 API。模块 ID 为 `system:economy`，已加入默认模块 tag。内置币种 `system:coin` 为系统币，初始余额为 0。

## 查询余额

在系统输入框执行 `/balance`、`/wallet`、`/余额` 或 `/钱包`，也可点击侧栏“钱包”。游戏聊天栏使用 `/system balance`。普通查询只返回自己的余额；AI 工具 `economy.balance` 也是只读查询，不开放铸币或管理他人钱包。

余额使用非负 `long` 整数，不支持小数、透支、转账、充值或自动兑换。新币种直接添加[币种定义](../data/currency.md)，不需要增加 Java 类型。

## 管理指令

以下游戏指令需要管理员权限。目标玩家须在线、已绑定系统且启用了经济模块；玩家和币种均支持补全。

| 指令 | 用途 |
| --- | --- |
| `/system economy currencies` | 列出当前定义的币种 ID。 |
| `/system economy get <玩家> <币种>` | 查询余额。 |
| `/system economy add <玩家> <币种> <数量>` | 增加余额。 |
| `/system economy remove <玩家> <币种> <数量>` | 扣除余额，余额不足则整个操作失败。 |
| `/system economy set <玩家> <币种> <数量>` | 设置余额。 |

数量为非负整数，例如 `/system economy add Steve system:coin 100`。保存成功后反馈新余额，溢出或扣款不足不会截断数额。

## 数据驱动接入

| 目的 | 类型 | 用法 |
| --- | --- | --- |
| 启用钱包 | [经济模块](../types/module/economy.md) | 在系统的模块列表或 tag 中加入相应模块配置。 |
| 新增货币 | [币种定义](../data/currency.md) | 定义名称、介绍、图标和排序。 |
| 发放或扣除货币 | [实体动作 `system:add_currency`](../types/entity-action/add_currency.md) | 正数增加，负数扣除。 |
| 判断余额 | [实体条件 `system:currency`](../types/entity-condition/currency.md) | 使用 `comparison` 和 `compare_to`，不扣款。 |
| 为商品定价 | [费用 `system:currency`](../types/cost/currency.md) | 可用于商城、抽奖和维修的 `costs`。 |

这些类型共用经济模块的钱包。费用、动作、条件分别注册到 Saturn 对应的类型注册表；它们与币种数据注册表虽然都有 `system:currency`，含义不同。

现有内置价格继续使用原物品费用。需要系统币结算时替换 `costs`，例如：

```json
[
  { "type": "system:currency", "currency": "system:coin", "amount": 10 }
]
```

修改动态注册表定义后重开世界或正常重启服务器；普通 `/reload` 不热替换定义对象。

## 持久化规则

钱包按存档和玩家保存于 `system/players/<UUID>.dat` 的压缩 NBT 模块数据中，同类经济模块配置共用一份钱包。停用模块保留余额；`revoke` / `reset` 按既有语义清空业务数据。暂时移除币种定义只隐藏对应余额，恢复相同 ID 后可继续使用。

余额保存和增减使用精确的 long 运算。Saturn 费用与数值比较经过 double：单项费用最多 `9007199254740991`，超过 `2^53` 的相邻余额可能无法通过比较条件区分。多项费用、背包和其他模组效果之间不提供整体回滚，应合并同一币种的费用需求。

---
title: "费用"
sidebar_position: 0
---

费用定义可用于技能、系统商城和抽奖。准备及试算不扣款，实际支付由调用方统一提交；见[费用与支付](../../guides/costs.md)。

| 类型 | 用途 |
| --- | --- |
| [`saturn:resource`](./resource.md) | 按数量扣除指定 Saturn 资源。 |
| [`saturn:item`](./item.md) | 按物品匹配条目选择可支付的背包物品并消耗数量。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |

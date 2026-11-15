---
title: "币种定义"
sidebar_position: 7
---

注册表：`system:currency`。每个条目定义一种货币的名称、介绍、图标和排序；玩家余额保存在各自的钱包中，不放入注册表。内置 `system:coin` 为系统币，初始余额为 0。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | 翻译键字符串或文本组件 | 是 | — | 币种名称，字符串直接作为翻译键。 |
| `description` | 翻译键字符串或文本组件 | 否 | 空文本 | 币种介绍。 |
| `icon` | ItemStackTemplate | 是 | — | 展示图标，不是实体货币，不消耗该物品。 |
| `order` | 整数 | 否 | `0` | 越大越靠前，同值按 ID 排序。 |

## 示例

```json title="data/example/system/currency/contribution.json"
{
  "name": "example.currency.contribution",
  "description": "example.currency.contribution.description",
  "icon": "minecraft:emerald",
  "order": 50
}
```

文件定义币种 `example:contribution`。翻译由客户端资源包提供：

```json title="assets/example/lang/zh_cn.json"
{
  "example.currency.contribution": "贡献点",
  "example.currency.contribution.description": "完成委托获得的贡献。"
}
```

英文资源包使用相同键，见[文本与翻译](./index.md#translated-text)。

## 生效与存储

币种元数据在连接时同步客户端，玩家余额不随注册表广播。修改定义需重开世界或正常重启服务端。暂时删除定义只隐藏该币种，保留已有余额；恢复相同 ID 后继续使用原余额。

货币使用非负 `long` 整数单位，最多 `9223372036854775807`；不提供小数、透支或自动兑换。查询、管理员指令与存储规则见[系统币与钱包](../guides/economy.md)，付款见[货币费用](../types/cost/currency.md)。

## Java 入口

`com.iafenvoy.system.data.catalog.CurrencyDefinition`，注册键为 `SystemResourceKeys.CURRENCY`。

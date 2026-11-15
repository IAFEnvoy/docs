---
title: "货币余额比较"
sidebar_position: 20
---

`system:currency` 注册到 Saturn 的实体条件注册表，只比较玩家余额，不扣款。它与[货币费用](../cost/currency.md)同名，但属于不同的类型注册表。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:currency`。 |
| `currency` | 币种注册表引用 | 是 | — | [币种定义](../../data/currency.md)的 ID。 |
| `comparison` | 字符串 | 是 | — | `<`、`<=`、`>`、`>=`、`==` 或 `!=`。 |
| `compare_to` | double | 是 | — | 与余额比较的目标值。 |

`comparison` 与 `compare_to` 直接平铺在条件对象中，复用 Saturn `Comparison`；旧的 `min` 字段不再使用。

## 示例

```json
{
  "type": "system:currency",
  "currency": "system:coin",
  "comparison": ">=",
  "compare_to": 20
}
```

检查系统币余额是否至少为 20。判断余额为零可使用 `"comparison": "=="` 和 `"compare_to": 0`。

目标不是服务端玩家、未绑定、经济模块停用或数据尚未就绪时返回 false。不要用此条件作为经济模块自身首次启用的前提。读取使用已发布的内存快照，不等待文件锁；排队中的动作需完成后才可见。

比较沿用 double 精度，超过 `2^53` 的相邻整数可能无法区分；余额存储和增减仍使用精确 long 运算。

## Java 入口

`com.iafenvoy.system.data.condition.CurrencyCondition`，通过 `SystemEntityConditions.CURRENCY` 注册。

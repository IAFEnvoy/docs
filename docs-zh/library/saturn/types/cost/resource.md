---
title: "资源费用"
sidebar_position: 10
---

`saturn:resource`

按数量扣除指定 Saturn 资源。

费用定义可用于技能、系统商城和抽奖。准备及试算不扣款，实际支付由调用方统一提交；见[费用与支付](../../guides/costs.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:resource` |
| `resource` | 资源 ID | 是 | — | 已注册的 Saturn 资源 ID。 |
| `amount` | [数值提供器](../number/index.md) | 是 | — | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

## JSON 示例

```json
{
  "type": "saturn:resource",
  "resource": "example:mana",
  "amount": 10
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.cost.builtin.ResourceCost`。本页按当前 26.1.2 源码的 Codec 整理。

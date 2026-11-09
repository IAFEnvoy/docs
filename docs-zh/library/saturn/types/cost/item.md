---
title: "物品费用"
sidebar_position: 10
---

`saturn:item`

按物品匹配条目选择可支付的背包物品并消耗数量。

费用定义可用于技能、系统商城和抽奖。准备及试算不扣款，实际支付由调用方统一提交；见[费用与支付](../../guides/costs.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:item` |
| `items` | [物品匹配条目](../item-matcher/index.md)数组 | 是 | — | 物品匹配条目、物品谓词或物品列表。 |
| `amount` | [数值提供器](../number/index.md) | 是 | — | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

## JSON 示例

```json
{
  "type": "saturn:item",
  "items": [
    "minecraft:emerald"
  ],
  "amount": 2
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.cost.builtin.ItemCost`。本页按当前 26.1.2 源码的 Codec 整理。

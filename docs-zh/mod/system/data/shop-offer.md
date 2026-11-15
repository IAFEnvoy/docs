---
title: "商城商品"
sidebar_position: 4
---

注册表：`system:shop_offer`。价格在服务端按 Saturn Cost 处理，客户端只显示报价；购买需要确认，AI 不能自行生成价格或扣款。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `label` | 翻译键字符串或文本组件 | 否 | 空组件 | 启用条目必须有非空名称；字符串直接作为翻译键。 |
| `items` | ItemStackTemplate 数组 | 否 | `[]` | 启用时至少 1 项，最多 36 项。 |
| `costs` | [Saturn 费用](../../../library/saturn/types/cost.md)数组 | 否 | `[]` | 启用商品必须至少一种费用。 |
| `enabled` | 布尔值 | 否 | `true` | false 可用来禁用覆盖的旧条目。 |

## 示例

```json title="data/example/system/shop_offer/torches.json"
{
  "label": "example.offer.torches",
  "items": [
    {
      "id": "minecraft:torch",
      "count": 16
    }
  ],
  "costs": [
    {
      "type": "saturn:item",
      "items": [
        "minecraft:emerald"
      ],
      "amount": 1
    }
  ]
}
```

加入 `data/system/tags/system/shop_offer/default.json` 的 values，或由[商城模块](../types/module/shop.md)的 offers 引用自定义 ID / tag。与奖池不同，启用商城商品不能省略 costs 做免费商品；禁用覆盖可只写 `{"enabled": false}`。报价过期、模块权限变化或材料不足时，服务端拒绝最终购买。

名称的字符串格式直接引用翻译键，客户端资源包需提供对应语言文件；字面文字可用 `{"text":"火把补给"}`。见[文本与翻译](./index.md#translated-text)。

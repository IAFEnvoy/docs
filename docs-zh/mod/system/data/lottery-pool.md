---
title: "抽奖奖池"
sidebar_position: 5
---

注册表：`system:lottery_pool`。一次确认抽取一个完整奖品包，服务端按整数权重采样，模型不选择奖品。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `label` | 翻译键字符串或文本组件 | 否 | 空组件 | 启用时必须非空。 |
| `costs` | [Saturn 费用](../../../library/saturn/types/cost.md)数组 | 否 | `[]` | 空列表表示免费抽取。 |
| `entries` | 奖品条目数组 | 否 | `[]` | 启用时至少一项。 |
| `enabled` | 布尔值 | 否 | `true` | 可禁用覆盖。 |

## 奖品条目

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `reward` | 奖励快照对象 | 是 | — | 包含 id、label、items；不是另一个奖励表的字符串引用。 |
| `weight` | 正整数 | 否 | `1` | 概率为本项权重 / 全部权重之和。 |
| `reward.id` | 资源 ID | 是 | — | 奖品快照的标识符。 |
| `reward.label` | 翻译键字符串或文本组件 | 是 | — | 奖品名称。 |
| `reward.items` | 物品堆模板数组 | 是 | — | 1～36 项。 |

## 示例

```json title="data/example/system/lottery_pool/supplies.json"
{
  "label": "example.pool.supplies",
  "costs": [
    {
      "type": "saturn:item",
      "items": [
        "minecraft:emerald"
      ],
      "amount": 2
    }
  ],
  "entries": [
    {
      "weight": 3,
      "reward": {
        "id": "example:food",
        "label": "example.reward.food",
        "items": [
          {
            "id": "minecraft:bread",
            "count": 8
          }
        ]
      }
    },
    {
      "weight": 1,
      "reward": {
        "id": "example:diamond",
        "label": "example.reward.diamond",
        "items": [
          {
            "id": "minecraft:diamond"
          }
        ]
      }
    }
  ]
}
```

两个奖品的概率分别为 75% 与 25%。加入 `data/system/tags/system/lottery_pool/default.json` 的 values，或由[抽奖模块](../types/module/lottery.md)的 pools 选择。空 costs 允许重复免费抽取，请按玩法设计费用；entries 和奖品包内容不由客户端决定。

名称的字符串格式直接引用翻译键，客户端资源包需提供对应语言文件；字面文字可用 `{"text":"火把补给"}`。见[文本与翻译](./index.md#translated-text)。

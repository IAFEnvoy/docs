---
title: "抽奖奖池"
sidebar_position: 5
---

注册表：`system:lottery_pools`。一次确认抽取一个完整奖品包，服务端按整数权重采样，模型不选择奖品。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `label` | 文本组件 | 否 | 空组件 | 启用时必须非空。 |
| `costs` | [Saturn 费用](../../../library/saturn/types/cost.md)数组 | 否 | `[]` | 空列表表示免费抽取。 |
| `entries` | 奖品条目数组 | 否 | `[]` | 启用时至少一项。 |
| `enabled` | 布尔值 | 否 | `true` | 可禁用覆盖。 |

## 奖品条目

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `reward` | 奖励快照对象 | 是 | — | 包含 id、label、items；不是另一个奖励表的字符串引用。 |
| `weight` | 正整数 | 否 | `1` | 概率为本项权重 / 全部权重之和。 |
| `reward.id` | 资源 ID | 是 | — | 奖品快照的标识符。 |
| `reward.label` | 文本组件 | 是 | — | 奖品名称。 |
| `reward.items` | 物品堆模板数组 | 是 | — | 1～36 项。 |

## 示例

```json title="data/example/system/lottery_pools/supplies.json"
{
  "label": {
    "text": "日常补给"
  },
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
        "label": {
          "text": "口粮"
        },
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
        "label": {
          "text": "钻石"
        },
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

两个奖品的概率分别为 75% 与 25%。加入 `data/system/tags/system/lottery_pools/default.json` 的 values，或由[抽奖模块](../types/module/lottery.md)的 pools 选择。空 costs 允许重复免费抽取，请按玩法设计费用；entries 和奖品包内容不由客户端决定。

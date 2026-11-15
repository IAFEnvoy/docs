---
title: "签到奖励"
sidebar_position: 3
---

注册表：`system:signin_reward`。条目定义可供签到模型选择的完整物品包，模型只能选 ID，不能修改数量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `label` | 翻译键字符串或文本组件 | 否 | 空组件 | 启用条目必须有非空名称；字符串直接作为翻译键。 |
| `items` | ItemStackTemplate 数组 | 否 | `[]` | 启用时至少 1 项，最多 36 项。 |
| `enabled` | 布尔值 | 否 | `true` | false 可用来禁用覆盖的旧条目。 |

## 示例

```json title="data/example/system/signin_reward/mining.json"
{
  "label": "example.reward.mining",
  "items": [
    {
      "id": "minecraft:torch",
      "count": 16
    },
    {
      "id": "minecraft:bread",
      "count": 4
    }
  ]
}
```

## 加入默认目录

```json title="data/system/tags/system/signin_reward/default.json"
{
  "replace": false,
  "values": [
    "example:mining"
  ]
}
```

也可创建自己的 tag，在[签到模块](../types/module/signin.md)的 rewards 中引用。仅新增奖励文件不会自动进入默认系统的候选集。启用时标签和物品列表必须有效；禁用可用 `{"enabled": false}`。正常签到需要模型完成奖励选择；已入账奖励保留当时的完整快照。

名称的字符串格式直接引用翻译键，客户端资源包需提供对应语言文件；字面文字可用 `{"text":"火把补给"}`。见[文本与翻译](./index.md#translated-text)。

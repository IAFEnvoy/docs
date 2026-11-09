---
title: "签到奖励"
sidebar_position: 3
---

注册表：`system:signin_rewards`。条目定义可供签到模型选择的完整物品包，模型只能选 ID，不能修改数量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `label` | 文本组件 | 否 | 空组件 | 启用条目必须有非空名称；裸字符串是字面文字。 |
| `items` | ItemStackTemplate 数组 | 否 | `[]` | 启用时至少 1 项，最多 36 项。 |
| `enabled` | 布尔值 | 否 | `true` | false 可用来禁用覆盖的旧条目。 |

## 示例

```json title="data/example/system/signin_rewards/mining.json"
{
  "label": {
    "text": "采矿补给"
  },
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

```json title="data/system/tags/system/signin_rewards/default.json"
{
  "replace": false,
  "values": [
    "example:mining"
  ]
}
```

也可创建自己的 tag，在[签到模块](../types/module/signin.md)的 rewards 中引用。仅新增奖励文件不会自动进入默认系统的候选集。启用时标签和物品列表必须有效；禁用可用 `{"enabled": false}`。正常签到需要模型完成奖励选择；已入账奖励保留当时的完整快照。

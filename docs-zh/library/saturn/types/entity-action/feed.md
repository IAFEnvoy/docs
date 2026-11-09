---
title: "恢复饥饿"
sidebar_position: 10
---

`saturn:feed`

为玩家增加饥饿值和饱和度。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:feed` |
| `food` | 整数 | 是 | — | 恢复的饥饿值。 |
| `saturation` | 数值 | 是 | — | 恢复的饱和度参数。 |

## JSON 示例

```json
{
  "type": "saturn:feed",
  "food": 1,
  "saturation": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.FeedAction`。本页按当前 26.1.2 源码的 Codec 整理。

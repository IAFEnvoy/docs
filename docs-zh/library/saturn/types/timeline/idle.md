---
title: "等待时长"
sidebar_position: 10
---

`saturn:idle`

在时间轴中等待指定 tick 数。

时间轴节点只描述本步行为。节点 ID、后继和整个时间轴由使用方组装，不是独立动态注册表。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:idle` |
| `duration` | [数值提供器](../number/index.md) | 是 | — | 持续时长，通常以游戏 tick 计。 |

## JSON 示例

```json
{
  "type": "saturn:idle",
  "duration": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.timeline.builtin.IdleEntry`。本页按当前 26.1.2 源码的 Codec 整理。

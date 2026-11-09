---
title: "距离"
sidebar_position: 10
---

`saturn:distance`

检查 actor 与 target 的距离是否在上限内。

检查 actor 和 target 的关系。交换双方会改变部分条件的含义。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:distance` |
| `maximum` | [数值提供器](../number/index.md) | 是 | — | 最大值或上限。 |

## JSON 示例

```json
{
  "type": "saturn:distance",
  "maximum": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.bientity.DistanceBiEntityCondition`。本页按当前 26.1.2 源码的 Codec 整理。

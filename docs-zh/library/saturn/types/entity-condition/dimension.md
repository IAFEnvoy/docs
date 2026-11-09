---
title: "维度"
sidebar_position: 10
---

`saturn:dimension`

检查实体所在维度。

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:dimension` |
| `dimension` | 资源 ID | 是 | — | 维度 ID。 |
| `inverted` | 布尔值 | 否 | `false` | 是否反转判断或显示方向。 |

## JSON 示例

```json
{
  "type": "saturn:dimension",
  "dimension": "minecraft:overworld"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.entity.DimensionCondition`。本页按当前 26.1.2 源码的 Codec 整理。

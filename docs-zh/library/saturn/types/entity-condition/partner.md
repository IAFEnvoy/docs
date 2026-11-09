---
title: "附近实体"
sidebar_position: 10
---

`saturn:partner`

按范围和双实体条件检查附近实体。

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:partner` |
| `range` | 数值 | 否 | `5.0` | 检查范围，以方块计。 Codec 范围：`0.5D, 32.0D`。 |
| `count` | 数量范围对象（min、max） | 否 | `{"min":1}` | 邻近活体数量范围：min 默认 1，max 可省略；要求 0 ≤ min ≤ max。 |
| `bientity_condition` | [双实体条件](../bientity-condition/index.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |

## JSON 示例

```json
{
  "type": "saturn:partner"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.entity.PartnerEntityCondition`。本页按当前 26.1.2 源码的 Codec 整理。

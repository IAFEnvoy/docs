---
title: "视线可达"
sidebar_position: 10
---

`saturn:can_see`

通过方块和流体射线检查双方之间的视线。

检查 actor 和 target 的关系。交换双方会改变部分条件的含义。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:can_see` |
| `shape_type` | 对象 | 否 | `"visual"` | 视线射线使用的方块形状模式。 可用值：`collider`、`outline`、`visual`、`falldamage_resetting`。 |
| `fluid_handling` | 对象 | 否 | `"none"` | 视线射线对流体的处理模式。 可用值：`none`、`source_only`、`any`、`water`。 |

## JSON 示例

```json
{
  "type": "saturn:can_see"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.bientity.CanSeeCondition`。本页按当前 26.1.2 源码的 Codec 整理。

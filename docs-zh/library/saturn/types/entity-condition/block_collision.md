---
title: "方块碰撞"
sidebar_position: 10
---

`saturn:block_collision`

检查偏移后的实体边界是否与方块碰撞。

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:block_collision` |
| `offset_x` | 数值 | 否 | `0.0` | X 方向偏移。 |
| `offset_y` | 数值 | 否 | `0.0` | Y 方向偏移。 |
| `offset_z` | 数值 | 否 | `0.0` | Z 方向偏移。 |

## JSON 示例

```json
{
  "type": "saturn:block_collision"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.entity.BlockCollisionCondition`。本页按当前 26.1.2 源码的 Codec 整理。

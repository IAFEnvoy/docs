---
title: "偏移位置"
sidebar_position: 10
---

`saturn:offset`

将方块上下文移动指定偏移后检查或执行子项。

检查上下文位置的方块或环境。嵌入 BlockCondition 字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:offset` |
| `condition` | [方块条件](index.md) | 是 | — | 要检查的条件。 |
| `x` | 整数 | 否 | `0` | X 坐标、偏移或向量分量，取决于本页行为。 |
| `y` | 整数 | 否 | `0` | Y 坐标、偏移或向量分量，取决于本页行为。 |
| `z` | 整数 | 否 | `0` | Z 坐标、偏移或向量分量，取决于本页行为。 |

## JSON 示例

```json
{
  "type": "saturn:offset",
  "condition": {
    "type": "saturn:always"
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.block.meta.OffsetCondition`。本页按当前 26.1.2 源码的 Codec 整理。

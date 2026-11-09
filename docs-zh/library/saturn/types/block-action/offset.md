---
title: "偏移位置"
sidebar_position: 10
---

`saturn:offset`

将方块上下文移动指定偏移后检查或执行子项。

操作上下文给出的世界与方块位置。它不是独立数据包文件，应嵌入要求 BlockAction 的字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:offset` |
| `action` | [方块动作](index.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |
| `x` | 整数 | 否 | `0` | X 坐标、偏移或向量分量，取决于本页行为。 |
| `y` | 整数 | 否 | `0` | Y 坐标、偏移或向量分量，取决于本页行为。 |
| `z` | 整数 | 否 | `0` | Z 坐标、偏移或向量分量，取决于本页行为。 |

## JSON 示例

```json
{
  "type": "saturn:offset",
  "action": {
    "type": "saturn:no_op"
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.block.meta.OffsetAction`。本页按当前 26.1.2 源码的 Codec 整理。

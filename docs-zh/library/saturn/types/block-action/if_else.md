---
title: "条件分支"
sidebar_position: 10
---

`saturn:if_else`

条件成立时执行 if_action，否则执行 else_action。

操作上下文给出的世界与方块位置。它不是独立数据包文件，应嵌入要求 BlockAction 的字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:if_else` |
| `condition` | [方块条件](../block-condition/index.md) | 是 | — | 要检查的条件。 |
| `if_action` | [方块动作](index.md) | 是 | — | 条件成立时执行的动作。 |
| `else_action` | [方块动作](index.md) | 否 | `{"type":"saturn:no_op"}` | 条件不成立时执行的动作。 |

## JSON 示例

```json
{
  "type": "saturn:if_else",
  "condition": {
    "type": "saturn:always"
  },
  "if_action": {
    "type": "saturn:no_op"
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.block.meta.IfElseAction`。本页按当前 26.1.2 源码的 Codec 整理。

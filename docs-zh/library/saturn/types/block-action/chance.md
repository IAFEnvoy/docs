---
title: "概率"
sidebar_position: 10
---

`saturn:chance`

按指定概率决定是否命中。

操作上下文给出的世界与方块位置。它不是独立数据包文件，应嵌入要求 BlockAction 的字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:chance` |
| `action` | [方块动作](index.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |
| `chance` | 数值 | 是 | — | 命中概率，0 表示不命中，1 表示必定命中。 Codec 范围：`0.0F, 1.0F`。 |
| `fail_action` | [方块动作](index.md) | 否 | `{"type":"saturn:no_op"}` | 概率未命中时执行的动作。 |

## JSON 示例

```json
{
  "type": "saturn:chance",
  "action": {
    "type": "saturn:no_op"
  },
  "chance": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.block.meta.ChanceAction`。本页按当前 26.1.2 源码的 Codec 整理。

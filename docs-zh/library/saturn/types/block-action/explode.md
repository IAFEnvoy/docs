---
title: "爆炸"
sidebar_position: 10
---

`saturn:explode`

在上下文位置创建爆炸，可配置破坏行为和保护条件。

操作上下文给出的世界与方块位置。它不是独立数据包文件，应嵌入要求 BlockAction 的字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:explode` |
| `power` | 数值 | 是 | — | 爆炸强度。 |
| `interaction` | 枚举字符串 | 否 | `"mob"` | 爆炸与方块交互的方式。 可用值：`none`、`block`、`mob`、`tnt`、`trigger`。 |
| `indestructible` | [方块条件](../block-condition/index.md) | 否 | 省略 | 本次爆炸中受保护方块的条件。 |
| `create_fire` | 布尔值 | 否 | `false` | 爆炸是否尝试生成火焰。 |

## JSON 示例

```json
{
  "type": "saturn:explode",
  "power": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.block.ExplodeAction`。本页按当前 26.1.2 源码的 Codec 整理。

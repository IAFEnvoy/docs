---
title: "表达式分支"
sidebar_position: 10
---

`saturn:if`

根据条件选择 then 或 else 表达式。

信息表达式只读传入的 PlayerView。原始数字、字符串、布尔值可直接作为常量；操作对象必须有 type。见[玩家信息](../../guides/information.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:if` |
| `condition` | [表达式](index.md) | 是 | — | 要检查的条件。 |
| `then` | [表达式](index.md) | 是 | — | 条件成立时使用的表达式。 |
| `else` | [表达式](index.md) | 是 | — | 条件不成立时使用的表达式。 |

## JSON 示例

```json
{
  "type": "saturn:if",
  "condition": true,
  "then": "在线",
  "else": "离线"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.information.expression.builtin.ConditionalExpression`。本页按当前 26.1.2 源码的 Codec 整理。

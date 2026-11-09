---
title: "数值运算"
sidebar_position: 10
---

`saturn:arithmetic`

对两个表达式执行数值运算。

信息表达式只读传入的 PlayerView。原始数字、字符串、布尔值可直接作为常量；操作对象必须有 type。见[玩家信息](../../guides/information.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:arithmetic` |
| `operation` | 枚举字符串 | 是 | — | 运算名称，详见本页枚举说明。 可用值：`add`、`subtract`、`multiply`、`divide`、`min`、`max`。 |
| `left` | [表达式](index.md) | 是 | — | 左操作数表达式。 |
| `right` | [表达式](index.md) | 是 | — | 右操作数表达式。 |

## JSON 示例

```json
{
  "type": "saturn:arithmetic",
  "operation": "add",
  "left": 2,
  "right": 3
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.information.expression.builtin.ArithmeticExpression`。本页按当前 26.1.2 源码的 Codec 整理。

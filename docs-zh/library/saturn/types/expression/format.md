---
title: "格式文本"
sidebar_position: 10
---

`saturn:format`

使用格式字符串与参数生成文字。

信息表达式只读传入的 PlayerView。原始数字、字符串、布尔值可直接作为常量；操作对象必须有 type。见[玩家信息](../../guides/information.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:format` |
| `format` | 字符串 | 是 | — | 格式字符串。 |
| `arguments` | [表达式](index.md)数组 | 是 | — | 翻译或格式化参数列表。 |

## JSON 示例

```json
{
  "type": "saturn:format",
  "format": "%.1f / %.1f",
  "arguments": [
    10,
    20
  ]
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.information.expression.builtin.FormatExpression`。本页按当前 26.1.2 源码的 Codec 整理。

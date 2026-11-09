---
title: "翻译文本"
sidebar_position: 10
---

`saturn:translate`

生成保留翻译键和参数的文本组件。

信息表达式只读传入的 PlayerView。原始数字、字符串、布尔值可直接作为常量；操作对象必须有 type。见[玩家信息](../../guides/information.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:translate` |
| `key` | [表达式](index.md) | 是 | — | 翻译键表达式。 |
| `arguments` | [表达式](index.md)数组 | 否 | `[]` | 翻译或格式化参数列表。 |
| `fallback` | [表达式](index.md) | 否 | 省略 | 没有匹配或已知值时使用的回退值。 |

## JSON 示例

```json
{
  "type": "saturn:translate",
  "key": "info.example.level",
  "arguments": [
    3
  ]
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.information.expression.builtin.TranslateExpression`。本页按当前 26.1.2 源码的 Codec 整理。

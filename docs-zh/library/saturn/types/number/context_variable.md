---
title: "上下文变量"
sidebar_position: 10
---

`saturn:context_variable`

读取上下文或已注册的公式变量，未知变量可使用回退值。

NumberProvider 可写为数字、公式字符串，或本目录的带 type 对象。游戏时间字段默认使用 tick，20 tick 通常为一秒。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:context_variable` |
| `variable` | 字符串 | 是 | — | 注册或上下文中的公式变量名。 |
| `fallback` | 数值 | 否 | `0.0` | 没有匹配或已知值时使用的回退值。 |

## JSON 示例

```json
{
  "type": "saturn:context_variable",
  "variable": "health",
  "fallback": 0
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.util.formula.number.ContextVariable`。本页按当前 26.1.2 源码的 Codec 整理。

---
title: "公式"
sidebar_position: 10
---

`saturn:expression`

计算 exp4j 表达式，params 可覆盖表达式参数。

NumberProvider 可写为数字、公式字符串，或本目录的带 type 对象。游戏时间字段默认使用 tick，20 tick 通常为一秒。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:expression` |
| `expression` | 字符串 | 是 | — | exp4j 公式字符串。 |
| `params` | 字符串 | 否 | `{}` | 传给脚本或公式的参数对象。 |

## JSON 示例

```json
{
  "type": "saturn:expression",
  "expression": "base + 2",
  "params": {
    "base": 8
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.util.formula.number.Expression`。本页按当前 26.1.2 源码的 Codec 整理。

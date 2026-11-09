---
title: "求和"
sidebar_position: 10
---

`saturn:sum`

求多个数值提供器之和。

NumberProvider 可写为数字、公式字符串，或本目录的带 type 对象。游戏时间字段默认使用 tick，20 tick 通常为一秒。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:sum` |
| `summands` | 数值提供器数组 | 是 | — | 参与求和的数值提供器列表，至少一项。 |

## JSON 示例

```json
{
  "type": "saturn:sum",
  "summands": [
    2,
    3
  ]
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.util.formula.number.Sum`。本页按当前 26.1.2 源码的 Codec 整理。

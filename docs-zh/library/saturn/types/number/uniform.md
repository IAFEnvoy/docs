---
title: "均匀随机数"
sidebar_position: 10
---

`saturn:uniform`

在给定最小值和最大值之间均匀取样。

NumberProvider 可写为数字、公式字符串，或本目录的带 type 对象。游戏时间字段默认使用 tick，20 tick 通常为一秒。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:uniform` |
| `min` | 数值提供器 | 是 | — | 下限。 |
| `max` | 数值提供器 | 是 | — | 上限。 |

## JSON 示例

```json
{
  "type": "saturn:uniform",
  "min": 1,
  "max": 5
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.util.formula.number.Uniform`。本页按当前 26.1.2 源码的 Codec 整理。

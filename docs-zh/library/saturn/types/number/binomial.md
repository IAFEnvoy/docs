---
title: "二项分布"
sidebar_position: 10
---

`saturn:binomial`

按 n 次试验和单次概率 p 生成二项分布随机值。

NumberProvider 可写为数字、公式字符串，或本目录的带 type 对象。游戏时间字段默认使用 tick，20 tick 通常为一秒。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:binomial` |
| `n` | 数值提供器 | 是 | — | 二项分布的试验次数。 |
| `p` | 数值提供器 | 是 | — | 二项分布单次成功概率。 |

## JSON 示例

```json
{
  "type": "saturn:binomial",
  "n": 4,
  "p": 0.5
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.util.formula.number.Binomial`。本页按当前 26.1.2 源码的 Codec 整理。

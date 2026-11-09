---
title: "加权随机数"
sidebar_position: 10
---

`saturn:weighted_list`

按权重从分布条目选择数值。

NumberProvider 可写为数字、公式字符串，或本目录的带 type 对象。游戏时间字段默认使用 tick，20 tick 通常为一秒。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:weighted_list` |
| `distribution` | 加权条目数组（value、weight） | 是 | — | 加权条目数组，每项包含 value 与 weight。 |

每项包含数值提供器 value 与整数 weight，默认权重 1。列表至少一项，负权重按 0 处理；总权重非正时记录诊断并返回 0。

## JSON 示例

```json
{
  "type": "saturn:weighted_list",
  "distribution": [
    {
      "value": 1,
      "weight": 3
    },
    {
      "value": 5,
      "weight": 1
    }
  ]
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.util.formula.number.WeightedList`。本页按当前 26.1.2 源码的 Codec 整理。

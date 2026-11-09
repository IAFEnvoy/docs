---
title: "资源常量"
sidebar_position: 10
---

`saturn:constant`

忽略当前资源，返回定义的固定数值。

在资源上下文中读取数值，不负责增加或扣除资源。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:constant` |
| `value` | [数值提供器](../number/index.md) | 是 | — | 本类型使用的值或表达式。 |

## JSON 示例

```json
{
  "type": "saturn:constant",
  "value": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.resource.builtin.ConstantResourceValueProvider`。本页按当前 26.1.2 源码的 Codec 整理。

---
title: "读取实体值"
sidebar_position: 10
---

`saturn:getter`

从传入 PlayerView 读取参数化 getter 的结果。

信息表达式只读传入的 PlayerView。原始数字、字符串、布尔值可直接作为常量；操作对象必须有 type。见[玩家信息](../../guides/information.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:getter` |
| `getter` | [实体取值器](../getter/index.md) | 是 | — | 带 type 及参数的实体取值器。 |
| `path` | 字符串数组 | 否 | `[]` | 复合结果的成员路径，点号不拆分。 |

## JSON 示例

```json
{
  "type": "saturn:getter",
  "getter": {
    "type": "saturn:health"
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.information.expression.builtin.GetterExpression`。本页按当前 26.1.2 源码的 Codec 整理。

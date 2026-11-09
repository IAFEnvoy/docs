---
title: "取反"
sidebar_position: 10
---

`saturn:not`

反转子条件的匹配结果。

检查 actor 和 target 的关系。交换双方会改变部分条件的含义。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:not` |
| `condition` | [双实体条件](index.md) | 是 | — | 要检查的条件。 |

## JSON 示例

```json
{
  "type": "saturn:not",
  "condition": {
    "type": "saturn:always"
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.bientity.meta.NotCondition`。本页按当前 26.1.2 源码的 Codec 整理。

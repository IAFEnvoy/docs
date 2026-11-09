---
title: "任一方成立"
sidebar_position: 10
---

`saturn:either`

对 actor 与 target 检查同一实体条件，至少一方成立即匹配。

检查 actor 和 target 的关系。交换双方会改变部分条件的含义。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:either` |
| `condition` | [实体条件](../entity-condition/index.md) | 是 | — | 要检查的条件。 |

## JSON 示例

```json
{
  "type": "saturn:either",
  "condition": {
    "type": "saturn:always"
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.bientity.meta.EitherCondition`。本页按当前 26.1.2 源码的 Codec 整理。

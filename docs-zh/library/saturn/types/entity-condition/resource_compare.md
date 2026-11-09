---
title: "资源下限"
sidebar_position: 10
---

`saturn:resource_compare`

检查指定资源的当前值是否至少达到 min。

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:resource_compare` |
| `resource` | 资源 ID | 是 | — | 已注册的 Saturn 资源 ID。 |
| `min` | [数值提供器](../number/index.md) | 是 | — | 下限。 |

## JSON 示例

```json
{
  "type": "saturn:resource_compare",
  "resource": "example:mana",
  "min": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.entity.ResourceCompareEntityCondition`。本页按当前 26.1.2 源码的 Codec 整理。

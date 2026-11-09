---
title: "生命比例"
sidebar_position: 10
---

`saturn:relative_health`

比较实体当前生命值与最大生命值的比例。

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:relative_health` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

## JSON 示例

```json
{
  "type": "saturn:relative_health",
  "comparison": ">=",
  "compare_to": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.entity.RelativeHealthCondition`。本页按当前 26.1.2 源码的 Codec 整理。

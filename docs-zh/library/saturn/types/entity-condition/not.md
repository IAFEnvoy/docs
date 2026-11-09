---
title: "取反"
sidebar_position: 10
---

`saturn:not`

反转子条件的匹配结果。

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:not` |
| `condition` | 同类条件 | 是 | — | 要检查的条件。 |

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

`com.iafenvoy.saturn.data.condition.builtin.entity.meta.NotEntityCondition`。本页按当前 26.1.2 源码的 Codec 整理。

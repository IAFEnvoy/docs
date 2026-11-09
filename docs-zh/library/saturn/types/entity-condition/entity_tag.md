---
title: "实体类型标签"
sidebar_position: 10
---

`saturn:entity_tag`

检查实体类型是否属于指定标签。

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:entity_tag` |
| `tag` | 标签 ID（带 #） | 是 | — | 注册表标签，或本页声明的 NBT 数据。 |

## JSON 示例

```json
{
  "type": "saturn:entity_tag",
  "tag": "#example:tag"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.entity.EntityTypeTagCondition`。本页按当前 26.1.2 源码的 Codec 整理。

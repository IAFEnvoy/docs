---
title: "所在方块"
sidebar_position: 10
---

`saturn:in_block`

检查实体所在方块是否满足条件。

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:in_block` |
| `block_condition` | [方块条件](../block-condition/index.md) | 是 | — | 检查目标方块的条件。 |

## JSON 示例

```json
{
  "type": "saturn:in_block",
  "block_condition": {
    "type": "saturn:always"
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.entity.InBlockCondition`。本页按当前 26.1.2 源码的 Codec 整理。

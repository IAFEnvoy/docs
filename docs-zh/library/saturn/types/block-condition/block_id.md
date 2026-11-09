---
title: "方块类型"
sidebar_position: 10
---

`saturn:block_id`

检查当前位置的方块是否为指定类型。

检查上下文位置的方块或环境。嵌入 BlockCondition 字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:block_id` |
| `block` | 资源 ID | 是 | — | 方块 ID 或方块参数。 |

## JSON 示例

```json
{
  "type": "saturn:block_id",
  "block": "minecraft:stone"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.block.BlockIdCondition`。本页按当前 26.1.2 源码的 Codec 整理。

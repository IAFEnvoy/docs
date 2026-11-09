---
title: "阻挡移动"
sidebar_position: 10
---

`saturn:movement_blocking`

检查方块是否阻挡移动。

检查上下文位置的方块或环境。嵌入 BlockCondition 字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:movement_blocking` |

## JSON 示例

```json
{
  "type": "saturn:movement_blocking"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.block.MovementBlockingCondition`。本页按当前 26.1.2 源码的 Codec 整理。

---
title: "消耗物品"
sidebar_position: 10
---

`saturn:consume_item`

减少上下文物品堆的数量。

操作上下文中的物品堆以及持有者。它不是物品定义文件，应嵌入要求 ItemAction 的字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:consume_item` |
| `count` | [数值提供器](../number/index.md) | 是 | — | 数量或数量匹配模式。 |

## JSON 示例

```json
{
  "type": "saturn:consume_item",
  "count": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.item.ConsumeItemAction`。本页按当前 26.1.2 源码的 Codec 整理。

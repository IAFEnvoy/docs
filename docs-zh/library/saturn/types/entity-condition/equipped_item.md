---
title: "装备槽物品"
sidebar_position: 10
---

`saturn:equipped_item`

检查指定装备槽的物品是否满足物品条件。

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:equipped_item` |
| `equipment_slot` | 枚举字符串 | 是 | — | 装备槽。 可用值：`mainhand`、`offhand`、`feet`、`legs`、`chest`、`head`、`body`、`saddle`。 |
| `item_condition` | [物品条件](../item-condition/index.md) | 否 | `{"type":"saturn:always"}` | 检查物品堆的条件。 |

## JSON 示例

```json
{
  "type": "saturn:equipped_item",
  "equipment_slot": "mainhand"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.entity.EquippedItemCondition`。本页按当前 26.1.2 源码的 Codec 整理。

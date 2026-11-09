---
title: "给予物品"
sidebar_position: 10
---

`saturn:give_item`

创建物品堆并交给实体，可指定优先装备槽。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:give_item` |
| `stack` | 物品堆模板 | 是 | — | 待创建的原版 ItemStackTemplate。 |
| `item_action` | [物品动作](../item-action/index.md) | 否 | `{"type":"saturn:no_op"}` | 对物品堆执行的物品动作。 |
| `preferred_slot` | 枚举字符串 | 否 | 省略 | 优先装备槽；不能放入时按实现继续交付。 可用值：`mainhand`、`offhand`、`feet`、`legs`、`chest`、`head`、`body`、`saddle`。 |

## JSON 示例

```json
{
  "type": "saturn:give_item",
  "stack": {
    "id": "minecraft:diamond",
    "count": 1
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.GiveItemAction`。本页按当前 26.1.2 源码的 Codec 整理。

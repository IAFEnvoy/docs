---
title: "移除附魔"
sidebar_position: 10
---

`saturn:remove_enchantment`

从物品移除选定附魔，可重置修复费用。

操作上下文中的物品堆以及持有者。它不是物品定义文件，应嵌入要求 ItemAction 的字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:remove_enchantment` |
| `enchantment` | 资源 ID 数组 | 否 | `[]` | 附魔 ID 或附魔列表。 |
| `reset_repair_cost` | 布尔值 | 否 | `false` | 移除附魔时是否重置修复费用。 |
| `level` | 整数 | 否 | 省略 | 标题级别，1 至 4。 |

## JSON 示例

```json
{
  "type": "saturn:remove_enchantment"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.item.RemoveEnchantmentAction`。本页按当前 26.1.2 源码的 Codec 整理。

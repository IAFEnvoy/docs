---
title: "添加附魔"
sidebar_position: 10
---

`saturn:add_enchantment`

按映射为物品增加或覆盖附魔等级。

操作上下文中的物品堆以及持有者。它不是物品定义文件，应嵌入要求 ItemAction 的字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:add_enchantment` |
| `enchantments` | 资源 ID → 整数的映射 | 是 | — | 附魔 ID 到等级的映射。 |
| `override` | 布尔值 | 否 | `false` | 是否覆盖已有值。 |

## JSON 示例

```json
{
  "type": "saturn:add_enchantment",
  "enchantments": {
    "minecraft:unbreaking": 1
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.item.AddEnchantmentAction`。本页按当前 26.1.2 源码的 Codec 整理。

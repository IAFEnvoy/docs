---
title: "指定物品"
sidebar_position: 10
---

`saturn:item`

匹配一个物品注册 ID。

用于 items 等 ItemMatcher 条目字段。多个条目取并集；支持物品、标签、通配、正则和原版材料。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:item` |
| `item` | 资源 ID | 是 | — | 物品 ID、谓词或上下文中的物品参数键。 |

## JSON 示例

```json
{
  "type": "saturn:item",
  "item": "minecraft:diamond"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.util.matcher.builtin.ItemEntry`。本页按当前 26.1.2 源码的 Codec 整理。

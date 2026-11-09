---
title: "组件内容"
sidebar_position: 10
---

`saturn:component`

检查物品堆指定组件的数据。

检查一个 ItemStack。不能将物品 ID 字符串直接当成任意 ItemCondition。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:component` |
| `component` | 资源 ID | 是 | — | 数据组件 ID，或是否按文本组件读取的开关。 |
| `nbt` | 对象 | 是 | — | 原版 CompoundTag 数据。 |

## JSON 示例

```json
{
  "type": "saturn:component",
  "component": "minecraft:custom_data",
  "nbt": {}
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.item.ComponentCondition`。本页按当前 26.1.2 源码的 Codec 整理。

---
title: "工具能力"
sidebar_position: 10
---

`saturn:tool_ability`

检查物品是否支持指定 NeoForge ItemAbility。

检查一个 ItemStack。不能将物品 ID 字符串直接当成任意 ItemCondition。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:tool_ability` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |

## JSON 示例

```json
{
  "type": "saturn:tool_ability",
  "ability": "example:heal"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.item.ToolAbilityCondition`。本页按当前 26.1.2 源码的 Codec 整理。

---
title: "维持检查"
sidebar_position: 10
---

`saturn:upkeep`

按间隔检查持有物品的维持费用，支付失败时执行物品动作。

技能类型写在技能定义的顶层，与 costs、condition 等公共字段并列；不要再嵌套一个 type 对象。技能文件的公共字段见[技能定义](../../data/ability.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:upkeep` |
| `interval` | [数值提供器](../number/index.md) | 否 | `20` | 执行间隔，单位为游戏 tick。 |
| `on_fail` | [物品动作](../item-action/index.md) | 否 | `{"type":"saturn:no_op"}` | 维持失败后对持有物品执行的动作。 |
| `owner_only` | 布尔值 | 否 | `true` | 是否只允许物品所有者承担维持行为。 |

## JSON 示例

```json
{
  "type": "saturn:upkeep"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.ability.type.UpkeepAbilityType`。本页按当前 26.1.2 源码的 Codec 整理。

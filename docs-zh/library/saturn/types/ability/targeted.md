---
title: "定向技能"
sidebar_position: 10
---

`saturn:targeted`

选择目标后对目标施放所引用的技能。

技能类型写在技能定义的顶层，与 costs、condition 等公共字段并列；不要再嵌套一个 type 对象。技能文件的公共字段见[技能定义](../../data/ability.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:targeted` |
| `target_selector` | [目标选择器](../target/index.md) | 是 | — | 取得技能目标的选择器。 |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `cooldown` | [数值提供器](../number/index.md) | 否 | `0.0` | 冷却时长，单位为游戏 tick。 |

## JSON 示例

```json
{
  "type": "saturn:targeted",
  "target_selector": {
    "type": "saturn:self"
  },
  "ability": "example:heal"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.ability.type.TargetedAbilityType`。本页按当前 26.1.2 源码的 Codec 整理。

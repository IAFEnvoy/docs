---
title: "间隔执行"
sidebar_position: 10
---

`saturn:interval`

技能生效期间按指定 tick 间隔执行动作。

技能类型写在技能定义的顶层，与 costs、condition 等公共字段并列；不要再嵌套一个 type 对象。技能文件的公共字段见[技能定义](../../data/ability.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:interval` |
| `interval` | [数值提供器](../number/index.md) | 否 | `20` | 执行间隔，单位为游戏 tick。 |
| `entity_action` | [实体动作](../entity-action/index.md) | 否 | `{"type":"saturn:no_op"}` | 在技能持有者或上下文实体上执行的实体动作。 |
| `target_selector` | [目标选择器](../target/index.md) | 否 | `{"type":"saturn:self"}` | 取得技能目标的选择器。 |
| `target_condition` | [双实体条件](../bientity-condition/index.md) | 否 | `{"type":"saturn:always"}` | 筛选 actor 和候选目标的双实体条件。 |
| `bi_entity_action` | [双实体动作](../bientity-action/index.md) | 否 | `{"type":"saturn:no_op"}` | 在 actor、target 上执行的双实体动作。 |

## JSON 示例

```json
{
  "type": "saturn:interval"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.ability.type.IntervalAbilityType`。本页按当前 26.1.2 源码的 Codec 整理。

---
title: "触发技能"
sidebar_position: 10
---

`saturn:triggered`

订阅指定游戏信号，在条件成立时执行技能动作。

技能类型写在技能定义的顶层，与 costs、condition 等公共字段并列；不要再嵌套一个 type 对象。技能文件的公共字段见[技能定义](../../data/ability.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:triggered` |
| `triggers` | [触发器](../trigger/index.md)数组 | 否 | `[]` | 该技能订阅的触发器列表。 |
| `chance` | [数值提供器](../number/index.md) | 否 | `1.0` | 命中概率，0 表示不命中，1 表示必定命中。 |
| `damage_condition` | [伤害条件](../damage-condition/index.md) | 否 | `{"type":"saturn:always"}` | 过滤伤害上下文的条件。 |
| `entity_action` | [实体动作](../entity-action/index.md) | 否 | `{"type":"saturn:no_op"}` | 在技能持有者或上下文实体上执行的实体动作。 |
| `target_selector` | [目标选择器](../target/index.md) | 否 | `{"type":"saturn:self"}` | 取得技能目标的选择器。 |
| `target_condition` | [双实体条件](../bientity-condition/index.md) | 否 | `{"type":"saturn:always"}` | 筛选 actor 和候选目标的双实体条件。 |
| `bi_entity_action` | [双实体动作](../bientity-action/index.md) | 否 | `{"type":"saturn:no_op"}` | 在 actor、target 上执行的双实体动作。 |
| `cooldown` | [数值提供器](../number/index.md) | 否 | `0.0` | 冷却时长，单位为游戏 tick。 |

## JSON 示例

```json
{
  "type": "saturn:triggered"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.ability.type.TriggeredAbilityType`。本页按当前 26.1.2 源码的 Codec 整理。

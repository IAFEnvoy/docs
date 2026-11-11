---
title: "技能类型"
sidebar_label: "技能类型 (Ability)"
sidebar_position: 1
---

# 技能类型

技能类型写在技能定义的顶层，与 costs、condition 等公共字段并列；不要再嵌套一个 type 对象。技能文件的公共字段见[技能定义](../data/ability.md)。

### `saturn:active` {#saturnactive}

由玩家主动使用，经过施法、费用和冷却流程后执行动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:active` |
| `entity_action` | [实体动作](./action/entity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在技能持有者或上下文实体上执行的实体动作。 |
| `target_selector` | [目标选择器](./target.md) | 否 | `{"type":"saturn:self"}` | 取得技能目标的选择器。 |
| `target_condition` | [双实体条件](./condition/bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选 actor 和候选目标的双实体条件。 |
| `bi_entity_action` | [双实体动作](./action/bientity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在 actor、target 上执行的双实体动作。 |
| `cooldown` | [数值提供器](./number.md) | 否 | `0.0` | 冷却时长，单位为游戏 tick。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:active"
}
```

</details>

### `saturn:aura` {#saturnaura}

按间隔查找范围内的目标并执行动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:aura` |
| `interval` | [数值提供器](./number.md) | 否 | `20.0` | 执行间隔，单位为游戏 tick。 |
| `radius` | [数值提供器](./number.md) | 否 | `4.0` | 半径，以方块计；资源条中以像素计。 |
| `entity_action` | [实体动作](./action/entity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在技能持有者或上下文实体上执行的实体动作。 |
| `target_selector` | [目标选择器](./target.md) | 否 | `{"type":"saturn:self"}` | 取得技能目标的选择器。 |
| `target_condition` | [双实体条件](./condition/bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选 actor 和候选目标的双实体条件。 |
| `bi_entity_action` | [双实体动作](./action/bientity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在 actor、target 上执行的双实体动作。 |
| `cooldown` | [数值提供器](./number.md) | 否 | `0.0` | 冷却时长，单位为游戏 tick。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:aura"
}
```

</details>

### `saturn:channelled` {#saturnchannelled}

持续使用技能，按节拍支付维持费用并执行动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:channelled` |
| `tick_interval` | [数值提供器](./number.md) | 否 | `1.0` | 持续引导的节拍间隔，单位为游戏 tick。 |
| `upkeep_costs` | [费用](./cost.md)数组 | 否 | `[]` | 每次引导节拍需要支付的费用。 |
| `entity_action` | [实体动作](./action/entity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在技能持有者或上下文实体上执行的实体动作。 |
| `target_selector` | [目标选择器](./target.md) | 否 | `{"type":"saturn:self"}` | 取得技能目标的选择器。 |
| `target_condition` | [双实体条件](./condition/bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选 actor 和候选目标的双实体条件。 |
| `bi_entity_action` | [双实体动作](./action/bientity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在 actor、target 上执行的双实体动作。 |
| `cooldown` | [数值提供器](./number.md) | 否 | `0.0` | 冷却时长，单位为游戏 tick。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:channelled"
}
```

</details>

### `saturn:interval` {#saturninterval}

技能生效期间按指定 tick 间隔执行动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:interval` |
| `interval` | [数值提供器](./number.md) | 否 | `20` | 执行间隔，单位为游戏 tick。 |
| `entity_action` | [实体动作](./action/entity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在技能持有者或上下文实体上执行的实体动作。 |
| `target_selector` | [目标选择器](./target.md) | 否 | `{"type":"saturn:self"}` | 取得技能目标的选择器。 |
| `target_condition` | [双实体条件](./condition/bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选 actor 和候选目标的双实体条件。 |
| `bi_entity_action` | [双实体动作](./action/bientity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在 actor、target 上执行的双实体动作。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:interval"
}
```

</details>

### `saturn:modifier` {#saturnmodifier}

技能生效期间为实体提供属性修饰器。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:modifier` |
| `modifiers` | [属性修饰器](../data/common.md#属性修饰器)数组 | 否 | `[]` | 属性修饰器条目列表。 |

modifiers 的每一项是[属性修饰器](../data/common.md#属性修饰器)，不是属性 ID 到数值的简单映射。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:modifier"
}
```

</details>

### `saturn:targeted` {#saturntargeted}

选择目标后对目标施放所引用的技能。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:targeted` |
| `target_selector` | [目标选择器](./target.md) | 是 | — | 取得技能目标的选择器。 |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `cooldown` | [数值提供器](./number.md) | 否 | `0.0` | 冷却时长，单位为游戏 tick。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:targeted",
  "target_selector": {
    "type": "saturn:self"
  },
  "ability": "example:heal"
}
```

</details>

### `saturn:triggered` {#saturntriggered}

订阅指定游戏信号，在条件成立时执行技能动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:triggered` |
| `triggers` | [触发器](./trigger.md)数组 | 否 | `[]` | 该技能订阅的触发器列表。 |
| `chance` | [数值提供器](./number.md) | 否 | `1.0` | 命中概率，0 表示不命中，1 表示必定命中。 |
| `damage_condition` | [伤害条件](./condition/damage-condition.md) | 否 | `{"type":"saturn:always"}` | 过滤伤害上下文的条件。 |
| `entity_action` | [实体动作](./action/entity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在技能持有者或上下文实体上执行的实体动作。 |
| `target_selector` | [目标选择器](./target.md) | 否 | `{"type":"saturn:self"}` | 取得技能目标的选择器。 |
| `target_condition` | [双实体条件](./condition/bientity-condition.md) | 否 | `{"type":"saturn:always"}` | 筛选 actor 和候选目标的双实体条件。 |
| `bi_entity_action` | [双实体动作](./action/bientity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在 actor、target 上执行的双实体动作。 |
| `cooldown` | [数值提供器](./number.md) | 否 | `0.0` | 冷却时长，单位为游戏 tick。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:triggered"
}
```

</details>

### `saturn:upkeep` {#saturnupkeep}

按间隔检查持有物品的维持费用，支付失败时执行物品动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:upkeep` |
| `interval` | [数值提供器](./number.md) | 否 | `20` | 执行间隔，单位为游戏 tick。 |
| `on_fail` | [物品动作](./action/item-action.md) | 否 | `{"type":"saturn:no_op"}` | 维持失败后对持有物品执行的动作。 |
| `owner_only` | 布尔值 | 否 | `true` | 是否只允许物品所有者承担维持行为。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:upkeep"
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:empty` {#saturnempty}

提供一个不执行额外行为的实现。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:empty` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:empty"
}
```

</details>

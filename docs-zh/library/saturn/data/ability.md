---
title: "技能定义"
sidebar_label: "技能定义 (ability)"
sidebar_position: 4
---

文件：`data/<namespace>/saturn/ability/<path>.json`。`type` 与该类型的专属字段直接写在顶层，公共字段也在同一对象中。类型目录见[技能类型](../types/ability.md)。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 技能类型 ID | 是 | — | 选择已注册技能实现。 |
| `costs` | [费用](../types/cost.md)数组 | 否 | `[]` | 技能激活时的费用。 |
| `cast_time` | [数值提供器](../types/number.md) | 否 | `0` | 施法 tick 数。 |
| `icon` | [图标](./common.md#物品与图标) | 否 | 省略 | 贴图或物品模板。 |
| `charges` | 充能设置 | 否 | 省略 | 见下表。 |
| `condition` | [实体条件](../types/condition/entity-condition.md) | 否 | 始终成立 | 技能使用条件。 |
| `hidden` | 布尔值 | 否 | `false` | 从载体物品提示中隐藏；不等于禁止使用。 |

## 充能设置

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `maximum` | 数值提供器 | 是 | — | 最大充能次数。 |
| `recharge_ticks` | 数值提供器 | 是 | — | 恢复一次充能所需 tick 数。 |

## 示例：消耗魔力治疗

先创建[资源定义](./resource.md)中的 `example:mana`，再定义：

```json title="data/example/saturn/ability/heal.json"
{
  "type": "saturn:active",
  "costs": [
    {
      "type": "saturn:resource",
      "resource": "example:mana",
      "amount": 10
    }
  ],
  "cast_time": 10,
  "cooldown": 40,
  "icon": {
    "id": "minecraft:golden_apple"
  },
  "entity_action": {
    "type": "saturn:heal",
    "amount": 4
  }
}
```

创建定义不会自动授予技能。通过宿主模组或 [grant_ability 动作](../types/action/entity-action.md#saturngrant_ability)授予；来源 ID 决定移除哪一来源提供的技能。类型自动声明冷却、充能等必要存储，数据包通常无需手写运行时存储快照。

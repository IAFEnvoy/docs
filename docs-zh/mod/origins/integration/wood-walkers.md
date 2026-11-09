# Wood Walkers

:::caution 不稳定
本兼容功能是新实现的，目前尚不稳定。
:::

安装 [Wood Walkers](https://www.curseforge.com/minecraft/mc-mods/woodwalkers) 时启用。

## `origins_integration:switch_shape`

[实体动作类型](../types/action/entity_action_types)

把玩家切换为指定的生物形态。省略 `shape` 会清除当前形态。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `shape` | Entity Type Identifier | 可选 | 用作下一个形态的生物实体类型 |

## `origins_integration:shape_action`

[实体动作类型](../types/action/entity_action_types)

对玩家当前形态执行另一个实体动作。对于非玩家实体，则对该实体本身执行。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `action` | Entity Action | **必填** | 要对形态执行的动作 |

## `origins_integration:use_shape_ability`

[实体动作类型](../types/action/entity_action_types)

激活玩家当前形态的能力。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `force` | Boolean | `false` | 忽略 Wood Walkers 正常的能力使用检查 |
| `apply_cooldown` | Boolean | `true` | 使用后应用能力冷却 |

## `origins_integration:change_shape_ability_cooldown`

[实体动作类型](../types/action/entity_action_types)

设置玩家剩余的形态能力冷却。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `cooldown` | Integer | **必填** | 冷却时间（刻）；负值会变成 `0` |

## `origins_integration:can_use_shape_ability`

[实体条件类型](../types/condition/entity_condition_types)

检查玩家当前是否可以使用其形态能力。

## `origins_integration:has_shape_ability`

[实体条件类型](../types/condition/entity_condition_types)

检查当前形态是否有能力。

## `origins_integration:shape_ability_cooldown`

[实体条件类型](../types/condition/entity_condition_types)

比较玩家剩余的形态能力冷却。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `comparison` | Comparison | **必填** | 应用于冷却时间的比较 |

## `origins_integration:shape_condition`

[实体条件类型](../types/condition/entity_condition_types)

以玩家为动作执行者、以其当前形态为目标，测试一个双实体条件。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `bientity_condition` | Bi-entity Condition | **必填** | 要针对玩家与形态测试的条件 |

# Curios

:::caution 不稳定
本兼容功能是新实现的，目前尚不稳定。
:::

安装 [Curios](https://www.curseforge.com/minecraft/mc-mods/curios) 时启用。

## `origins_integration:modify_curios`

[实体动作类型](../types/action/entity_action_types)

对已装备的 Curios 物品堆执行物品动作。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `slot` | String | 可选 | 要处理的 Curio 槽位类型；省略时处理所有槽位类型 |
| `item_action` | Item Action | **必填** | 对每个被处理的物品堆执行的动作 |
| `limit` | Integer | `0` | 最多处理的物品堆数量；`0` 表示不限制 |

## `origins_integration:equipped_curio_count`

[实体条件类型](../types/condition/entity_condition_types)

比较已装备且非空的 Curio 物品堆数量。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `slot` | String | 可选 | 要计数的 Curio 槽位类型；省略时统计所有类型 |
| `comparison` | Comparison | **必填** | 应用于该数量的比较 |

## `origins_integration:curio_slot_count`

[实体条件类型](../types/condition/entity_condition_types)

比较可用 Curio 槽位的数量。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `slot` | String | 可选 | 要计数的 Curio 槽位类型；省略时统计所有类型 |
| `comparison` | Comparison | **必填** | 应用于该槽位数量的比较 |

## `origins_integration:is_curio`

[物品条件类型](../types/condition/item_condition_types)

检查某个物品堆是否可作为 Curio 被接受。

# 铁魔法

:::caution 不稳定
本兼容功能是新实现的，目前尚不稳定。
:::

安装铁魔法（Iron's Spells 'n Spellbooks）时启用。

## `origins_integration:modify_mana`

[实体动作类型](../types/action/entity_action_types)

通过起源 `modifier` 修改当前法力。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modifier` | 修饰器 | **必填** | 应用于当前法力的修饰器 |

## `origins_integration:cast_iron_spell`

[实体动作类型](../types/action/entity_action_types)

开始一次正常的铁魔法法术施法。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `spell` | Resource Location | **必填** | 法术注册 id |
| `level` | Integer | `1` | 请求的法术等级，会被限制在法术支持的范围内 |

## `origins_integration:mana`

[实体条件类型](../types/condition/entity_condition_types)

比较铁魔法的当前法力。把 `percentage` 设为 `true` 可按最大法力的比例来比较法力。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `comparison` | 字符串 | **必填** | 比较运算符 |
| `compare_to` | 浮点数 | **必填** | 用于比较的法力值 |
| `percentage` | 布尔值 | `false` | 以最大法力的比例比较法力 |

## `origins_integration:casting`

[实体条件类型](../types/condition/entity_condition_types)

检查该实体当前是否正在施放铁魔法法术。

## `origins_integration:iron_mana_regeneration`

[能力类型](../types/power)

按间隔恢复或抽取铁魔法法力。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `amount` | Float | **必填** | 每次间隔增加的法力；负值会抽取法力 |
| `percentage` | Boolean | `false` | 把 amount 解释为最大法力的比例 |
| `interval` | Integer | `20` | 两次更新之间的刻数 |

## `origins_integration:mastered_iron_spells`

[能力类型](../types/power)

在 `spells` 中为持有者声明一份额外的铁魔法法术 id 列表。存放在任意生效中的起源 `inventory` 能力里的法术容器同样视为已掌握。

## `origins_integration:cast_mastered_iron_spell`

[实体动作类型](../types/action/entity_action_types)

仅当 `spell` 被生效中的 `mastered_iron_spells` 能力列出时才施放它。`level` 默认为 `1`。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `spell` | Resource Location | **必填** | 法术注册 id |
| `level` | Integer | `1` | 请求的法术等级，会被限制在法术支持的范围内 |

## `origins_integration:action_on_iron_spell`

[能力类型](../types/power)

在铁魔法法术施法的 `phase: "start"` 或 `"end"` 阶段执行 `entity_action`。可选的 `spell` 将其限制为单个法术 id。

## `origins_integration:action_on_iron_mana_change`

[能力类型](../types/power)

当法力变化时执行 `entity_action`。可选的顶层 `comparison` 与 `compare_to` 用于筛选带符号的法力增减量。

## `origins_integration:modify_iron_cast_time`

[能力类型](../types/power)

对持有者施放的每个铁魔法法术的持续时间应用起源 `modifier`。

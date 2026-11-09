# 新生魔艺

:::caution 不稳定
本兼容功能是新实现的，目前尚不稳定。
:::

安装新生魔艺（Ars Nouveau）时启用。

## `origins_integration:cast_ars_spell`

[实体动作类型](../types/action/entity_action_types)

以该实体为施法者，施放序列化的新生魔艺 `spell`。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `spell` | 法术 | **必填** | 要施放的序列化新生魔艺法术 |

## `origins_integration:modify_ars_mana`

[实体动作类型](../types/action/entity_action_types)

通过起源 `modifier` 修改玩家的新生魔艺法力。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modifier` | 修饰器 | **必填** | 应用于当前法力的修饰器 |

## `origins_integration:ars_mana`

[实体条件类型](../types/condition/entity_condition_types)

比较新生魔艺法力。把 `percentage` 设为 `true` 可与最大法力比较。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `comparison` | 字符串 | **必填** | 比较运算符 |
| `compare_to` | 浮点数 | **必填** | 用于比较的法力值 |
| `percentage` | 布尔值 | `false` | 以最大法力的比例比较法力 |

## `origins_integration:record_ars_spell`

[能力类型](../types/power)

持续记录持有者最近一次施放的新生魔艺法术。

## `origins_integration:cast_recorded_ars_spell`

[实体动作类型](../types/action/entity_action_types)

施放由生效中的 `record_ars_spell` 能力所记录的法术。

## `origins_integration:modify_ars_spell`

[能力类型](../types/power)

在当前施法中插入 Glyph id。`begin`、`after_cast` 和 `end` 是可选的 Glyph 资源位置列表。

## `origins_integration:modify_ars_spell_condition`

[能力类型](../types/power)

让选定的条件符文改用起源 `target_condition` 作为其触发条件。`glyphs` 是必填的 Glyph id 列表。当前 1.21.1 实现支持新生魔艺的 Flare 与 Cold Snap 条件伤害检查。

## `origins_integration:action_on_ars_mana_change`

[能力类型](../types/power)

当持有者的新生魔艺法力变化时执行 `entity_action`。可选的 `comparison` 与 `compare_to` 用于筛选带符号的法力增减量。

## `origins_integration:ars_glyphs`

[能力类型](../types/power)

生效期间把持有者视为已知其列出的 `glyphs`，但不会在新生魔艺玩家数据中永久解锁它们。存放在任意生效中的起源 `inventory` 能力里的 Glyph 物品同样被视为已知。

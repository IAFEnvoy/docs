# Eidolon RePraised

:::caution 不稳定
本兼容功能是新实现的，目前尚不稳定。
:::

安装 Eidolon RePraised 时启用。

## `origins_integration:modify_eidolon_mana`

[实体动作类型](../types/action/entity_action_types)

通过起源 `modifier` 修改 Eidolon 魔力。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modifier` | 修饰器 | **必填** | 应用于当前魔力的修饰器 |

## `origins_integration:enthrall`

[双实体动作类型](../types/action/bientity_action_types)

把目标生物转化为动作执行者的 Eidolon 仆从。

## `origins_integration:action_on_eidolon_spell`

[能力类型](../types/power)

在 Eidolon 法术的 `phase: "start"` 或 `"end"` 阶段执行 `entity_action`。可选的 `spell` 将其限制为某个法术 id。

# 暮色森林

:::caution 不稳定
本兼容功能是新实现的，目前尚不稳定。
:::

安装暮色森林（The Twilight Forest）时启用。

## `origins_integration:modify_fortification_shields`

[实体动作类型](../types/action/entity_action_types)

修改暮色森林的坚固化护盾。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `amount` | Integer | **必填** | 要添加或设置的护盾数量 |
| `permanent` | Boolean | `false` | 使用永久护盾而非限时护盾 |
| `operation` | `add` 或 `set` | `add` | 添加到现有护盾，或替换护盾数量 |

## `origins_integration:spawn_ice_queen_shield`

[实体动作类型](../types/action/entity_action_types)

在玩家位置创建一个隐形的、非敌对的 Snow Queen 控制器。它的 Ice Queen 护盾部件会跟随玩家；玩家退出游戏或 `duration` 结束时，控制器会被移除。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `duration` | Integer | `0` | 存在时长（刻）；`0` 表示保留至退出登录或被替换 |

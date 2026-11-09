# 物品动作类型 {#item-action-types}

物品动作对物品堆叠执行操作。

### `origins:add_enchantment`

为物品添加附魔。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `enchantment` | Enchantment->int Map | **必填** | 要添加的附魔 ID |
| `override` | [布尔值](../basic_concepts#boolean) | `false` | 是否强制覆盖已有的附魔 |

<details>
<summary>示例</summary>

```json
"item_action": {
    "type": "origins:add_enchantment",
    "enchantment": {
        "minecraft:sharpness": 5
    }
}
```

此示例会为物品添加等级为 5 的锋利附魔。

</details>

### `origins:consume`

从堆叠中消耗一个或多个物品。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `amount` | [整数](../basic_concepts#integer) | `1` | 消耗数量 |

<details>
<summary>示例</summary>

```json
"item_action": {
    "type": "origins:consume",
    "amount": 1
}
```

此示例会从物品堆叠中“消耗”（移除）1 个物品。

</details>

### `origins:cooldown`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

对持有该物品堆叠的玩家施加物品冷却。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `ticks` | [整数](../basic_concepts#integer) | **必填** | 以 tick 计的冷却时长 |

### `origins:damage`

损坏物品堆叠。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `amount` | [整数](../basic_concepts#integer) | `1` | 损坏数值 |
| `ignore_unbreaking` | [布尔值](../basic_concepts#boolean) | `false` | 是否忽略耐久附魔 |

### `origins:holder_action`

对物品的持有者执行实体动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | [实体动作](../action/entity_action_types) | **必填** | 要执行的动作 |

### `origins:merge_component`

将数据组件合并到物品堆叠中。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `component` | NBT | **必填** | 要合并的数据组件 |

### `origins:modify`

修改物品堆叠。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `modifier` | [Modifier] | **必填** | 数值修饰器 |
| `item_action` | [物品动作](../action/item_action_types) | 可选 | 嵌套的动作 |

<details>
<summary>示例</summary>

```json
"item_action": {
    "type": "origins:modify",
    "modifier": "example:stuff"
}
```

此示例会将 `example:stuff`（`data/example/item_modifiers/stuff.json`）物品修饰器应用于该物品堆叠。

</details>

### `origins:remove_enchantment`

移除物品上的附魔。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `enchantment` | [标识符](../basic_concepts#identifier) | 可选 | 要移除的附魔 ID（未指定时移除全部） |

<details>
<summary>示例</summary>

```json
"item_action": {
    "type": "origins:remove_enchantment",
    "enchantment": "minecraft:mending",
    "reset_repair_cost": true
}
```

此示例会移除物品上的经验修补附魔，同时重置其“修复成本”。

</details>

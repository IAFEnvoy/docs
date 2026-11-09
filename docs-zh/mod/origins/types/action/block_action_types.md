# 方块动作类型 {#block-action-types}

方块动作在特定位置对方块执行操作。

### `origins:add_block`

在该位置添加一个方块。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `block` | [标识符](../basic_concepts#identifier) | **必填** | 要添加的方块 ID |

<details>
<summary>示例</summary>

```json
"block_action": {
    "type": "origins:add_block",
    "block": "minecraft:coal_ore"
}
```

此示例会在方块动作类型所在的位置添加一个煤矿石方块。

</details>

### `origins:bonemeal`

对方块施加骨粉效果。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `effect` | [布尔值](../basic_concepts#boolean) | `true` | 是否显示生长粒子并播放生长音效 |

<details>
<summary>示例</summary>

```json
"block_action": {
    "type": "origins:bonemeal",
    "effect": false
}
```

此示例会对该方块动作的目标方块施加骨粉效果，但不显示视觉效果。

</details>

### `origins:destroy`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

破坏目标方块。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `drop` | [布尔值](../basic_concepts#boolean) | `true` | 该方块是否掉落战利品 |

### `origins:execute_command`

在方块位置执行命令。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `command` | [字符串](../basic_concepts#string) | **必填** | 要执行的命令 |

<details>
<summary>示例</summary>

```json
"block_action": {
    "type": "origins:execute_command",
    "command": "summon minecraft:item ~ ~ ~ {Item:{id:\"minecraft:wheat\",Count:1}}"
}
```

此示例会在方块动作类型所在的位置生成一个小麦物品实体。

</details>

### `origins:explode`

在方块位置制造爆炸。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `power` | [浮点数](../basic_concepts#float) | **必填** | 爆炸威力 |
| `destruction_type` | [字符串](../basic_concepts#string) | `break` | 方块破坏方式：`break`、`destroy`、`none` |
| `indestructible` | [方块条件](../condition/block_condition_types) | 可选 | 免疫该爆炸的方块 |
| `create_fire` | [布尔值](../basic_concepts#boolean) | `false` | 是否产生火焰 |

<details>
<summary>示例</summary>

```json
"block_action": {
    "type": "origins:explode",
    "power": 5,
    "destruction_type": "none",
    "create_fire": false
}
```

此示例会在调用该方块动作的位置制造一次爆炸，既不破坏地形也不蔓延火焰。

</details>

### `origins:light_up`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

当方块存在 `lit` 状态属性时，将其设为 `true`。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| None | - | - | - |

### `origins:modify_block_state`

修改方块的状态属性。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `property` | [字符串](../basic_concepts#string) | **必填** | 方块状态属性名 |
| `value` | [字符串](../basic_concepts#string) | 可选 | 新的属性值 |
| `operation` | [字符串](../basic_concepts#string) | 可选 | 要执行的操作 |
| `enum_values` | List of String | 可选 | 在多个值之间循环 |
| `cycle` | [布尔值](../basic_concepts#boolean) | `true` | 是否在枚举值之间循环 |

<details>
<summary>示例</summary>

```json
"block_action": {
	"type": "origins:modify_block_state",
	"property": "facing",
	"cycle": true
}
```

此示例会在 `facing` 属性存在时循环切换其取值。

</details>

### `origins:schedule_tick`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

为目标方块安排一次 tick。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `delay` | [整数](../basic_concepts#integer) | **必填** | 安排 tick 之前的延迟 |

### `origins:set_block`

在该位置设置方块。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `block` | [标识符](../basic_concepts#identifier) | **必填** | 方块 ID |

<details>
<summary>示例</summary>

```json
"block_action": {
    "type": "origins:set_block",
    "block": "minecraft:coal_ore"
}
```

此示例会在方块动作类型所在的位置设置一个煤矿石方块。

</details>

### `origins:spawn_entity`

在方块位置生成实体。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `entity_type` | [标识符](../basic_concepts#identifier) | **必填** | 实体类型 ID |
| `tag` | NBT | 可选 | 初始 NBT 数据 |
| `action` | [实体动作](../action/entity_action_types) | 可选 | 对生成实体执行的动作 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:spawn_entity",
    "entity_type": "minecraft:zombie",
    "tag": "{NoAI:1b,IsBaby:1,HandItems:[{id:\"minecraft:gold_block\",Count:1},{}]}"
}
```

此示例会在该实体所在的位置生成一个没有 AI、手持金块的幼年僵尸。

</details>

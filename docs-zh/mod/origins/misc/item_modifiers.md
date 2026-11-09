# 物品修饰器 {#item-modifiers}

物品修饰器是一种技术性 JSON 文件，可以在数据包内创建，用于通过 `/item` 命令或 [修改（物品动作类型）](../types/action/item_action_types#originsmodify) 将战利品表函数应用到已有的物品堆叠上。物品修饰器存放在 `data/<namespace>/item_modifier` 文件夹中。

### `origins:add_power` {#originsadd_power}

向物品堆叠添加一个能力，只有当物品被手持/装备在指定的装备槽位上时，该能力才会应用到玩家身上。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `power` | [标识符](../types/basic_concepts#identifier) | | 将添加到实体的能力的命名空间和 ID。 |
| `slot` | [装备槽位组](https://minecraft.wiki/w/Equipment_slot) | | 决定物品在指定槽位被手持/装备时是否将能力添加到实体。接受 `head`、`chest`、`legs`、`feet`、`mainhand`、`offhand`、`any`、`hand` 或 `armor`。 |
| `hidden` | [布尔值](../types/basic_concepts#boolean) | `false` | 决定是否隐藏该能力的工具提示。 |
| `negative` | [布尔值](../types/basic_concepts#boolean) | `false` | 决定工具提示的颜色为蓝色（false）还是红色（true）。 |

<details>
<summary>示例</summary>

```json
{
    "function": "origins:add_power",
    "power": "origins:arcane_skin",
    "slot": "chest",
    "negative": true
}
```

此示例中，如果实体将应用了该物品修饰器的物品穿戴在胸甲装备槽位上，就会为该实体添加 `origins:arcane_skin` 能力。

</details>

### `origins:remove_power` {#originsremove_power}

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `power` | [标识符](../types/basic_concepts#identifier) | | 将从物品上移除的能力的命名空间和 ID。 |
| `slot` | [装备槽位组](https://minecraft.wiki/w/Equipment_slot) | | 要从中移除能力的装备槽位。接受 `head`、`chest`、`legs`、`feet`、`mainhand`、`offhand`、`any`、`hand` 或 `armor`。 |

<details>
<summary>示例</summary>

```json
{
    "function": "origins:remove_power",
    "power": "origins:arcane_skin",
    "slot": "chest"
}
```

此示例会从物品上移除 `origins:arcane_skin` 能力，前提是该能力适用于 `chest` 装备槽位。

</details>

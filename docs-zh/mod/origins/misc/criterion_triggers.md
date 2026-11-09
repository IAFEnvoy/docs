# 进度触发器 {#criterion-triggers}

进度触发器（也称为 `Advancement Triggers`）顾名思义，用于在玩家执行某种动作时触发进度。

### `origins:chose_origin` {#originschose_origin}

当玩家选择指定的起源时触发。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `origin` | [标识符](../types/basic_concepts#identifier) | **必填** | 要检查的起源的命名空间和 ID。 |
| `layer` | [标识符](../types/basic_concepts#identifier) | 可选 | 要检查的起源层的命名空间和 ID。 |

<details>
<summary>示例 1</summary>

```json
{
    "criteria": {
        "chose_phantom": {
            "trigger": "origins:chose_origin",
            "conditions": {
                "origin": "origins:phantom"
            }
        }
    }
}
```

此示例会在玩家选择 `origins:phantom` 起源时授予该进度。

</details>

<details>
<summary>示例 2</summary>

```json
{
    "parent": "minecraft:story/root",
    "display": {
        "icon": {
            "item": "minecraft:player_head",
            "nbt": "{SkullOwner: \"Steve\"}"
        },
        "title": "I am Human!",
        "description": "You chose the Human origin.",
        "announce_to_chat": true,
        "frame": "task",
        "show_toast": true,
        "hidden": false
    },
    "criteria": {
        "chose_human": {
            "trigger": "origins:chose_origin",
            "conditions": {
                "origin": "origins:human"
            }
        }
    }
}
```

此示例展示了一个在玩家选择 `origins:human` 起源时授予的进度。

</details>

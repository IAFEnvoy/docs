# Criterion Triggers

Criterion triggers (or known as `Advancement Triggers`), as the name suggests, are for triggering advancements upon doing a certain action.

### `origins:chose_origin`

Triggers when a player chooses the specified origin.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `origin` | [Identifier](../types/basic_concepts#identifier) | **required** | The namespace and ID of the origin to check for. |
| `layer` | [Identifier](../types/basic_concepts#identifier) | optional | The namespace and ID of the layer to check for. |

<details>
<summary>Example1</summary>

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

This example will be granted to players who have chosen the `origins:phantom` origin.

</details>

<details>
<summary>Example2</summary>

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

This example shows an advancement that is granted when a player chooses the `origins:human` origin.

</details>

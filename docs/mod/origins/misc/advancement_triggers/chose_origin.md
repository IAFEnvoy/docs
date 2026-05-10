# Chose Origin

:::danger Not yet implemented

This advancement trigger is **not yet implemented** in the Origins (NeoForge). It will be available in a future update.

:::

**Type ID:** `origins:chose_origin`

Triggers when a player chooses the specified origin.

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `origin` | [Identifier](../../types/basic_concepts#identifier) | | The namespace and ID of the origin to check for. |

### Examples

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

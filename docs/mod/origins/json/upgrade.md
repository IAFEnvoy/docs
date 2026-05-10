---
sidebar_position: 5
---

# Upgrade Format

An Upgrade defines how an origin transforms into another origin upon achieving a specific advancement.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | Identifier | **required** | The advancement ID that triggers this upgrade |
| `origin` | Identifier | **required** | The target origin ID to upgrade to |
| `announcement` | String | optional | A chat notification shown when the upgrade occurs |

## Example

Used inside an Origin JSON's `upgrades` field:

```json
{
  "powers": [...],
  "icon": {"id": "minecraft:diamond"},
  "upgrades": [
    {
      "condition": "minecraft:end/kill_dragon",
      "origin": "origins:elytrian",
      "announcement": "You have slain the Ender Dragon! You have evolved into an Elytrian."
    },
    {
      "condition": "minecraft:nether/brew_potion",
      "origin": "origins:blazeborn"
    }
  ]
}
```

If `announcement` is omitted, no notification message will be displayed.

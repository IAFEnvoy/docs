---
sidebar_position: 3
---

# Power JSON Format

A Power is the core functional unit of an origin, granting various traits and effects to the player.

## File Location

Power JSON files go in `data/<namespace>/origins/power/` within your data pack.

For example, `data/origins/origins/power/climbing.json` has the ID `origins:climbing`.

## Common Fields

All power types share these base fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | Identifier | **required** | The power type ID, determines the power's functionality |
| `name` | Text Component | optional | Display name. Falls back to translation key if omitted |
| `description` | Text Component | optional | Description text. Falls back to translation key if omitted |
| `hidden` | Boolean | `false` | Whether to hide this power in the origin's power list |
| `condition` | Entity Condition | optional | Condition that must be met for the power to be active |
| `loading_priority` | Integer | `0` | Loading priority; higher numbers load later |
| `badges` | List of Badge | `[]` | Badges displayed next to the power name. Supports ID references or inline definitions |

## Translation Keys

Power names and descriptions default to language keys:

- Name: `power.<namespace>.<path>.name`
- Description: `power.<namespace>.<path>.description`

You can also specify them directly via the `name`/`description` fields.

## Badge References

The `badges` List can mix both formats:

```json
// Reference existing Badge by ID
"badges": [
  "origins:toggle",
  "origins:active"
]

// Inline Badge definition
"badges": [
  {
    "type": "origins:tooltip",
    "sprite": "origins:textures/gui/badge/star.png",
    "text": "A gold star!"
  }
]
```

## Examples

A basic climbing power:

```json
{
  "type": "origins:climbing",
  "condition": {
    "type": "origins:power_active",
    "power": "origins:primary_key"
  },
  "badges": [
    "origins:toggle"
  ]
}
```

A launch power with HUD cooldown display:

```json
{
  "type": "origins:launch",
  "cooldown": 600,
  "hud_render": {
    "sprite_location": "origins:textures/gui/resource_bar.png",
    "bar_index": 4
  },
  "sound": "minecraft:entity.parrot.fly",
  "speed": 2,
  "key": {
    "key": "key.origins.primary_active",
    "continuous": true
  }
}
```

:::note
Key differences from the old version:
- `name`/`description` are now optional Component types (supports plain string shorthand)
- `badges` supports both ID references and inline badge definitions
- Base namespace changed from `apoli` to `origins`
:::

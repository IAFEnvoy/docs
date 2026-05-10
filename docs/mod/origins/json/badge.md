---
sidebar_position: 4
---

# Badge JSON Format

A Badge displays an icon and optional tooltip next to a power's name in the Origins GUI.

## File Location

Badge JSON files go in `data/<namespace>/origins/badge/` within your data pack.

## Common Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | Identifier | **required** | The badge type ID |

## Badge Types

### `origins:keybind`

Shows a keybind hint badge.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sprite` | Identifier | **required** | Texture location of the badge icon |
| `text` | String | **required** | Translation key for the badge tooltip |

### `origins:sprite`

Shows only an icon badge.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sprite` | Identifier | **required** | Texture location of the badge icon |

### `origins:tooltip`

Shows an icon with a tooltip text badge.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sprite` | Identifier | **required** | Texture location of the badge icon |
| `text` | Text Component | **required** | Tooltip text shown on hover |

### `origins:crafting_recipe`

Shows a crafting recipe hint badge.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sprite` | Identifier | **required** | Texture location of the badge icon |
| `recipe` | Identifier | **required** | The crafting recipe ID to associate |

## Preset Badges

Origins provides two built-in preset badges. Reference them by ID in a power's `badges` List:

| ID | Description |
|----|-------------|
| `origins:active` | Indicates an "active use" power |
| `origins:toggle` | Indicates a "toggle" power |

## Examples

```json
{
  "type": "origins:tooltip",
  "sprite": "origins:textures/gui/badge/star.png",
  "text": "A gold star!"
}
```

```json
{
  "type": "origins:keybind",
  "sprite": "origins:textures/gui/badge/active.png",
  "text": "origins.gui.badge.active"
}
```

---
sidebar_position: 2
---

# Shared Data Types

These are complex data types that are referenced by multiple power types, actions, and conditions across Origins.

---

## HudRender

Used by powers to display cooldown/resource bars in the HUD.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `should_render_inactive` | [Boolean](./basic_concepts#boolean) | `true` | Whether to render when the resource is full/empty |
| `sprite_location` | [Identifier](./basic_concepts#identifier) | `origins:textures/gui/resource_bar.png` | Texture for the bar |
| `bar_index` | [Integer](./basic_concepts#integer) | `0` | Index of the bar in the sprite sheet |
| `icon_index` | [Integer](./basic_concepts#integer) | `0` | Index of the icon in the sprite sheet |
| `condition` | [Entity Condition](./condition/entity_condition_types) | optional | Condition for rendering the HUD element |
| `inverted` | [Boolean](./basic_concepts#boolean) | `false` | If `true`, inverts the bar direction |
| `order` | [Integer](./basic_concepts#integer) | `0` | Render order among multiple HUD elements |

---

## Key

Key binding settings.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `key` | [String](./basic_concepts#string) | `key.origins.primary_active` | Key binding ID |
| `continuous` | [Boolean](./basic_concepts#boolean) | `false` | Whether the key is treated as held continuously |

---

## Modifier

A mathematical modifier applied to numeric values.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | [Float](./basic_concepts#float) | **required** | Modifier value |
| `operation` | [String](./basic_concepts#string) | `add_base_early` | Operation: `add_base_early`, `multiply_base_additive`, `multiply_base_multiplicative`, `multiply_total_additive`, `multiply_total_multiplicative` |
| `resource` | [Identifier](./basic_concepts#identifier) | optional | Resource to use as the modifier value |
| `modifier` | Modifier | optional | Sub-modifier applied to the resource value |

---

## AttributeEntry

An attribute modifier entry.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `attribute` | [Identifier](./basic_concepts#identifier) | **required** | Attribute ID (e.g. `minecraft:generic.max_health`) |
| `operation` | [String](./basic_concepts#string) | **required** | Operation: `add_value`, `add_multiplied_base`, `add_multiplied_total` |
| `value` | [Float](./basic_concepts#float) | **required** | Modifier value |
| `name` | [String](./basic_concepts#string) | optional | Custom name for the modifier |

---

## PositionedItemStack

An item stack with an optional inventory slot position.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `stack` | Item Stack | **required** | The item stack |
| `slot` | [Integer](./basic_concepts#integer) | optional | Inventory slot index to place the item into |

---

## ColorSettings

RGBA color configuration.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `red` | [Float](./basic_concepts#float) | optional | Red channel (0-1) |
| `green` | [Float](./basic_concepts#float) | optional | Green channel (0-1) |
| `blue` | [Float](./basic_concepts#float) | optional | Blue channel (0-1) |
| `alpha` | [Float](./basic_concepts#float) | optional | Alpha channel (0-1) |
| `color` | [Integer](./basic_concepts#integer) | optional | ARGB color as a single hex integer (0xAARRGGBB) |

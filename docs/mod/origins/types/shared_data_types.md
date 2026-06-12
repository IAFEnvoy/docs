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

:::caution
`should_render` is no longer supported for HUD elements. You can just remove HudRender from power to hide the HUD element, or use the `condition` field to control its visibility instead.
:::

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

## Space

Coordinate space definition for position-based powers and conditions. Currently only for `origins:add_velocity`.

| Value |	Description |
|-------|-------------|
| `world` |	The axes are global: x points to west (negative) or east (positive), y points to bottom (negative) or top (positive) and z points to north (negative) or south (positive). |
| `local` |	The axes are local to the entity: x points to its left side and is always horizontal, y points to the top of the entity's head and z points to the direction the entity is facing. |
| `local_horizontal` |	Same as local, except it considers the vertical length of the direction of the entity is facing to be 0, resulting in z being projected (flattened out) onto the horizontal plane, making it shorter. x and y also become shorter by the same amount and y always points upwards. The axes shrink as the direction the entity is facing diverges from being horizontal. (e.g: if the entity is looking straight up or straight down, the axes will have a length of 0, akin to forcing x, y and z to be 0) |
| `local_horizontal_normalized` |	Same as local_horizontal, except the axes are normalized. (e.g: the axes' length are brought back to its previous length of 1 if it's of non-zero length) |
| `velocity` |	The axes are local to the entity's velocity, similar to local. If the velocity is purely vertical, the way the entity is pointing is used to determine the direction of x and y instead of the velocity. The axes scale based on how fast the entity is moving. (e.g: if the entity is not moving, the axes will have a length of 0, akin to forcing x, y and z to be 0) |
| `velocity_normalized` |	Same as velocity, except the axes are normalized. (e.g: the axes' length are brought back to its previous length of 1 if it's of non-zero length, making it not depend on the speed of the entity's movement, only as long as the entity is moving) |
| `velocity_horizontal` |	Same as velocity, except the vertical velocity is considered to be 0. |
| `velocity_horizontal_normalized` |	Same as velocity_horizontal, except the axes are normalized. (e.g: the axes' length are brought back to its previous length of 1 if it's of non-zero length) |

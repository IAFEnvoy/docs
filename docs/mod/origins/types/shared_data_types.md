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

:::warning

Don't be confused with [AttributeEntry](#attributeentry), which is used for modifying entity attributes. This is a more general-purpose modifier that can be applied to any numeric value.

:::

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | [Float](./basic_concepts#float) | **required** | Modifier value |
| `operation` | [String](./basic_concepts#string) | `add_base_early` | Operation: `add_base_early`, `multiply_base_additive`, `multiply_base_multiplicative`, `multiply_total_additive`, `multiply_total_multiplicative` |
| `resource` | [Identifier](./basic_concepts#identifier) | optional | Resource to use as the modifier value |
| `modifier` | [Modifier](#modifier) | optional | Sub-modifier applied to the resource value |

---

## AttributeEntry

An attribute modifier entry.

:::warning

Don't be confused with [Modifier](#modifier), which is a more general-purpose modifier that can be applied to any numeric value. This is specifically for modifying entity attributes.

:::

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
| `stack` | [Item Stack](./minecraft_data_types#item-stack) | **required** | The item stack |
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

## EffectEntry

Effect configuration for powers that apply effects.

:::tip Note

You can just use a resource location string (e.g. `minecraft:strength`) instead of an EffectEntry object if you don't need to customize the effect.

:::

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | [Identifier](./basic_concepts#identifier) | **required** | Effect ID |
| `amplifier` | [Integer](./basic_concepts#integer) | `0` | Base amplifier |
| `show_particles` | [Boolean](./basic_concepts#boolean) | `true` | Whether to show particles |
| `show_icon` | [Boolean](./basic_concepts#boolean) | `true` | Whether to show the icon |

## Shape

Indicate how to select blocks/entities in a region. Should be used with `distance`.

| Value |	Formula |
|-------|---------|
| `cube` | `max(x,y,z)` |
| `star` | `|x| + |y| + |z|` |
| `sphere` | `x^2 + y^2 + z^2` |

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

## Stat Reference

A `Stat Reference` is a value type used by stat-related actions and conditions to specify which Minecraft statistic to
target. It accepts two forms: a **simple form** for custom stats, and a **typed form** for stats that have a variant (
such as block/item/entity type).

### Simple Form

For stats registered under the `minecraft:custom` StatType (e.g. jumps, deaths, distance traveled), just use a
`ResourceLocation`:

```json
"minecraft:jump"
```

```json
"minecraft:deaths"
```

### Typed Form

For stats that have a variant value, use an object with `stat_type` and `id`:

| Field       | Type       | Default  | Description                                                  |
|-------------|------------|----------|--------------------------------------------------------------|
| `stat_type` | Identifier | required | The Stat Type ID.                                            |
| `id`        | Identifier | required | The registry ID of the specific block, item, or entity type. |

```json
{
  "stat_type": "minecraft:mined",
  "id": "minecraft:diamond_ore"
}
```

### Vanilla Stat Types

| StatType ID           | Value Registry | Description                                     |
|-----------------------|----------------|-------------------------------------------------|
| `minecraft:mined`     | Block          | Blocks broken                                   |
| `minecraft:crafted`   | Item           | Items crafted                                   |
| `minecraft:used`      | Item           | Items used                                      |
| `minecraft:broken`    | Item           | Items broken (durability exhausted)             |
| `minecraft:picked_up` | Item           | Items picked up                                 |
| `minecraft:dropped`   | Item           | Items dropped                                   |
| `minecraft:killed`    | EntityType     | Entities killed                                 |
| `minecraft:killed_by` | EntityType     | Deaths by entity                                |
| `minecraft:custom`    | CustomStat     | General stats (jump, deaths, walk_one_cm, etc.) |

For the `minecraft:custom` stat type, use the **simple form** (a plain
`ResourceLocation`) instead of the typed form.

### Weighted Sound Entry

A `Weighted Sound Entry` is a value type used to define a sound with a weight for use in sound-related actions and conditions. It accepts an object with `sound` and `weight` fields:

| Field   | Type       | Default  | Description                                      |
|---------|------------|----------|--------------------------------------------------|
| `sound` | [Identifier](./basic_concepts#identifier) or List | required | The sound ID.                                    |
| `weight`| [Float](./basic_concepts#float) | required | The weight of the sound (higher = more likely to play). |

```json
{
  "sound": "minecraft:entity.player.death",
  "weight": 1.0
}
```

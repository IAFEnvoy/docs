---
sidebar_position: 1
---

# Minecraft Data Types

These are data types defined by Minecraft that are used in Origins JSON files. Understanding them is useful for working with powers, actions, and conditions.

---

## Item Stack

An **Item Stack** is the JSON representation of one or more items. It contains the item ID, count, and optional data components (which replaced NBT in 1.20.5+).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | [Identifier](./basic_concepts#identifier) | **required** | Item ID (e.g. `minecraft:diamond_sword`) |
| `count` | [Integer](./basic_concepts#integer) | `1` | Number of items (1~64) |
| `components` | Object | optional | [Data component](https://minecraft.wiki/w/Data_component_format) map |

:::warning
If you upgrade your pack from 1.20.4 or earlier, you must convert all item stacks to the new format. The old `nbt` field is no longer supported and must be replaced with `components`.
:::

**Example:**
```json
{
    "id": "minecraft:diamond_sword",
    "count": 1,
    "components": {
        "minecraft:enchantments": {
            "levels": {
                "minecraft:sharpness": 5
            }
        }
    }
}
```

---

## Damage Type

A **Damage Type** is referenced by its Identifier from the `damage_type` registry (`data/<namespace>/damage_type/`). When a field's type is `DamageType`, you provide the Identifier that points to a damage type definition.

**Example:**
```json
"damage_type": "minecraft:in_wall"
```

Damage types are defined in data packs at `data/<namespace>/damage_type/` and specify properties like whether the damage bypasses armor, counts as fire, etc. For a list of common damage type IDs, see [Minecraft Wiki: Damage Type](https://minecraft.wiki/w/Damage_type).

A **Damage Type JSON** definition:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `message_id` | [String](./basic_concepts#string) | **required** | Translation key for the death message |
| `exhaustion` | [Float](./basic_concepts#float) | `0.0` | Hunger exhaustion caused |
| `scaling` | [String](./basic_concepts#string) | `when_caused_by_living_non_player` | `never`, `always`, or `when_caused_by_living_non_player` |
| `effects` | [String](./basic_concepts#string) | `hurt` | `hurt`, `thorns`, `drowning`, `burning`, `poking`, or `freezing` |
| `death_message_type` | [String](./basic_concepts#string) | `default` | `default`, `fall_variants`, or `intentional_game_design` |

---

## Equipment Slot Group

An **Equipment Slot Group** specifies which equipment slot(s) an item occupies. It can be a single slot or a group.

Valid values for `EquipmentSlotGroup`:

| Value | Description |
|-------|-------------|
| `any` | Any equipment slot |
| `hand` | Either hand (mainhand or offhand) |
| `armor` | Any armor slot |
| `head` | Head armor slot |
| `chest` | Chest armor slot |
| `legs` | Legs armor slot |
| `feet` | Feet armor slot |
| `mainhand` | Main hand only |
| `offhand` | Off-hand only |
| `body` | Body slot (horse armor, wolf armor, etc.) |

---

## Text Component

A **Text Component** is Minecraft's rich text format used for messages, tooltips, and titles. It can be a plain string or a complex JSON object.

**Simple string:**
```json
"message": "Hello World!"
```

**Styled text:**
```json
{
    "text": "Hello",
    "color": "gold",
    "bold": true
}
```

**Translatable text:**
```json
{
    "translate": "origins.gui.choose_origin.title",
    "fallback": "Choose your Origin"
}
```

For full documentation, see [Minecraft Wiki: Raw JSON text format](https://minecraft.wiki/w/Raw_JSON_text_format).

---

:::note 
In this mod, if you use a simple string where a Text Component is expected, it will be automatically converted to a Translatable Text Component with the string as the translation key. 

For example, `"message": "origins.gui.choose_origin.title"` is equivalent to:
```json
"message": {
    "translate": "origins.gui.choose_origin.title"
}
```
:::

## MobEffectInstance

A **MobEffectInstance** defines a status effect applied to an entity. Serialized using `MobEffectInstance.CODEC` (1.21+).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | [Identifier](./basic_concepts#identifier) | **required** | Effect ID (e.g. `minecraft:speed`) |
| `duration` | [Integer](./basic_concepts#integer) | **required** | Duration in ticks |
| `amplifier` | [Integer](./basic_concepts#integer) | `0` | Effect level (0 = level I, 1 = level II, etc.) |
| `ambient` | [Boolean](./basic_concepts#boolean) | `false` | Whether particles are more transparent |
| `show_particles` | [Boolean](./basic_concepts#boolean) | `true` | Whether particles are visible |
| `show_icon` | [Boolean](./basic_concepts#boolean) | `true` | Whether the icon is displayed in the HUD |
| `hidden_effect` | MobEffectInstance | optional | Nested effect instance (for effects like Bad Omen that chain another effect) |

---

## EffectEntry

An **EffectEntry** is a simplified status effect definition used in some power types (e.g., `origins:stacking_status_effect`). Unlike `MobEffectInstance`, it omits the `duration` and `hidden_effect` fields.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | [Identifier](./basic_concepts#identifier) | **required** | Effect ID |
| `amplifier` | [Integer](./basic_concepts#integer) | `0` | Effect amplifier |
| `ambient` | [Boolean](./basic_concepts#boolean) | `false` | Whether particles are transparent |
| `show_particles` | [Boolean](./basic_concepts#boolean) | `true` | Whether to show particles |
| `show_icon` | [Boolean](./basic_concepts#boolean) | `true` | Whether to show the effect icon |
| `id` | [Identifier](./basic_concepts#identifier) | **required** | Effect ID |
| `amplifier` | [Integer](./basic_concepts#integer) | `0` | Effect amplifier |
| `ambient` | [Boolean](./basic_concepts#boolean) | `false` | Whether the effect is ambient |
| `show_particles` | [Boolean](./basic_concepts#boolean) | `true` | Whether to show particles |
| `show_icon` | [Boolean](./basic_concepts#boolean) | `true` | Whether to show the icon |

---
title: "Shared Data Types"
description: "Complex data types reused by many MiXianTu definitions, including resource costs and gains, attribute entries, holder and tag selectors, and item matchers."
sidebar_position: 2
---

# Shared Data Types

These are complex values that are referenced by many definitions, actions and conditions across the mod. They have no `type` field of their own unless stated, and they are written inline wherever a field table names them.

---

## ResourceCost

Every field that **consumes** resources takes an array of resource costs. Each entry names a resource registry entry and the amount to take.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Holder<resource>` | The resource registry entry |
| `amount` | `NumberProvider` | The cost; it must evaluate to a finite positive number at runtime |

```json
"costs": [
  {"id": "example:qi", "amount": "5 + level"},
  {"id": "example:stamina", "amount": 2}
]
```

---

## ResourceGain

Every field that **adds** resources takes an array with the same per-entry structure. Gains are less strict than costs: `0` is allowed, but a negative result is rejected.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Holder<resource>` | The resource registry entry |
| `amount` | `NumberProvider` | The gain; it must evaluate to a finite, non-negative number |

```json
"gains": [
  {"id": "example:qi", "amount": 10},
  {"id": "example:insight", "amount": "level * 0.5"}
]
```

:::tip
A cost of `0` or less is invalid, so a cost entry can never be used to grant resources. Use a gain for that.
:::

---

## AttributeEntry

Vanilla attribute modifiers use the vanilla attribute holders such as `minecraft:generic.attack_damage`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `attribute` | `Holder<Attribute>` | **required** | Vanilla attribute ID |
| `id` | `Identifier` | **required** | Unique ID of the vanilla `AttributeModifier` |
| `amount` | `Double` | **required** | Base value used when there is no dynamic `value` |
| `operation` | Enum | **required** | `add_value`, `add_multiplied_base` or `add_multiplied_total` |
| `value` | `NumberProvider` | none | When present, the value is recomputed every tick on the server from the entity context and replaces `amount` |

```json
{
  "attribute": "minecraft:generic.max_health",
  "id": "example:body_tempering",
  "amount": 4,
  "operation": "add_value",
  "value": "2 + realm_rank * 0.5"
}
```

---

## Holders, Tags and Mixed Arrays

Fields that cross registries are resolved into holders during datapack load instead of being looked up at runtime.

### Single Value and Tag

A single entry is written as an ID, and a tag reference keeps its required `#` prefix:

```json
{
  "resource": "example:spirit_power",
  "ability_requirements": "#example:fire_abilities"
}
```

### Mixed Arrays

Fields that accept both IDs and tags can be written as an array:

```json
{
  "ability_requirements": [
    "example:fireball",
    "#example:basic_fire_abilities"
  ]
}
```

Every array entry stays a `Holder` or a `TagKey`; duplicate values do not change the meaning. `AutoIgnoreListCodec` allows invalid optional entries in a list to be ignored, and each field table states whether that codec is used.

---

## ItemMatcher

The `items` field of `item_binding`, `weapon_binding`, `pill_binding`, `technique_binding`, `spirit_herb`, `item_aura` and `currency` accepts three forms. The matcher type IDs behind them are listed in [Other Type Families](./other_types.md#item_matcher_entry_type).

A single item ID:

```json
"items": "minecraft:apple"
```

A single item tag:

```json
"items": "#minecraft:logs"
```

A mixed array:

```json
"items": ["minecraft:apple", "#minecraft:logs", "othermod:token"]
```

A matcher only references items that are already registered; it never creates items. When several definitions match, they are selected by `priority` from low to high, and for the current data classes that priority is fixed at `0`.

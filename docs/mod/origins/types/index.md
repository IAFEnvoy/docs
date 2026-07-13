---
sidebar_position: 3
---

# Types Reference

This section documents all available types in Origins that can be used in data pack JSON files.

## Basic Concepts

Before reading this section, familiarize yourself with the **[Basic Concepts](./basic_concepts)** page which defines fundamental data types like **Identifier**, **String**, **Integer**, **Boolean**, **Float**, and **List** used throughout all type definitions.

## Power Types

Power types are split by category:

| Category | Description | Page |
|----------|-------------|------|
| Action | Execute actions in response to events | [Action Powers](./power/action) |
| Modify | Modify game mechanics like attributes, damage, and speed | [Modify Powers](./power/modify) |
| Prevent | Prevent certain actions like using items or sleeping | [Prevent Powers](./power/prevent) |
| Regular | Standalone powers like flight, invisibility, phasing, etc. | [Regular Powers](./power/regular) |

See the [Power Types index](./power) for an overview and shared data types.

## Condition Types

Condition types are used to filter when powers activate or when actions execute:

| Condition Category | Reference |
|---------------------|-----------|
| Bi-entity Condition | [Bi-entity Condition Types](./condition/bientity_condition_types) |
| Biome Condition | [Biome Condition Types](./condition/biome_condition_types) |
| Block Condition | [Block Condition Types](./condition/block_condition_types) |
| Damage Condition | [Damage Condition Types](./condition/damage_condition_types) |
| Entity Condition | [Entity Condition Types](./condition/entity_condition_types) |
| Fluid Condition | [Fluid Condition Types](./condition/fluid_condition_types) |
| Item Condition | [Item Condition Types](./condition/item_condition_types) |
| Meta Condition | [Meta Condition Types](./condition/meta_condition_types) |

All condition categories support **meta conditions** (`and`, `or`, `not`, `chance`, `constant`) documented within each type page.

## Action Types

Action types execute effects on entities, blocks, or items:

| Action Category | Reference |
|-----------------|-----------|
| Bi-entity Action | [Bi-entity Action Types](./action/bientity_action_types) |
| Block Action | [Block Action Types](./action/block_action_types) |
| Entity Action | [Entity Action Types](./action/entity_action_types) |
| Item Action | [Item Action Types](./action/item_action_types) |
| Meta Action | [Meta Action Types](./action/meta_action_types) |

All action categories support **meta actions** (`and`, `chance`, `choice`, `delay`, `if_else`, `if_else_list`, `side`) documented within each type page.

## Shared Data Types

Complex data types used across multiple power, action, and condition types. See **[Shared Data Types](./shared_data_types)** for full details:

- **HudRender** — HUD bar display settings
- **Key** — Key binding settings
- **Modifier** — Mathematical value modifier
- **AttributeEntry** — Attribute modifier entry
- **PositionedItemStack** — Item with optional slot position
- **ColorSettings** — RGBA color settings
- **Space** — Coordinate space definition

## Minecraft Data Types

Minecraft's built-in data types used in Origins JSON. See **[Minecraft Data Types](./minecraft_data_types)** for full details:

- **Item Stack** — JSON representation of an item
- **Damage Type** — Registry-based damage type identifier
- **Equipment Slot Group** — Equipment slot categories
- **Text Component** — Rich text format for messages
- **MobEffectInstance** — Status effect configuration
- **EffectEntry** — Simplified status effect definition
- **NBT Compound** — Simplified status effect definition
- **Particle Option** — Particle parameters for spawning particles

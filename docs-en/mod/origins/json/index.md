---
sidebar_position: 2
---

# JSON Data Formats

This section describes the JSON formats for each data type in Origins.

## Data Types

Before diving in, here are the basic data types used by Origins:

| Type | Description | Example |
|------|-------------|---------|
| `String` | A text string | `"minecraft:zombie"` |
| `Boolean` | True or false | `true` / `false` |
| `Integer` | A whole number | `20` |
| `Float` | A decimal number | `1.5` |
| `Identifier` | A namespaced resource ID | `"origins:avian"` |
| `[List]` | A list of values | `["a", "b"]` |
| `{Object}` | A key-value map | `{"key": "value"}` |
| `Text Component` | A Minecraft text component | `"Hello"` or `{"text": "Hello"}` |
| `Item Stack` | A Minecraft item stack | `{"id": "minecraft:diamond"}` |

## Condition System

Origins uses **Conditions** to determine whether powers are active, actions should execute, etc. Conditions come in several types:

- **Entity Condition**: Checks the state of an entity
- **Bi-entity Condition**: Checks the relationship between two entities
- **Block Condition**: Checks the state of a block
- **Item Condition**: Checks the state of an item
- **Biome Condition**: Checks biome properties
- **Damage Condition**: Checks damage properties
- **Fluid Condition**: Checks fluid properties

All conditions support **Meta Conditions** such as `and`, `or`, `not`, `chance`, etc.

## Action System

Origins uses **Actions** to perform various effects:

- **Entity Action**: Performs an operation on an entity
- **Bi-entity Action**: Performs an operation involving two entities
- **Block Action**: Performs an operation on a block
- **Item Action**: Performs an operation on an item

All actions support **Meta Actions** such as `and`, `chance`, `delay`, `if_else`, etc.

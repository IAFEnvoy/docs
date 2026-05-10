---
sidebar_position: 0
---

# Basic Concepts

This page defines the fundamental data types used throughout all Origins JSON files. Understanding these types is essential for working with powers, actions, conditions, and other JSON formats.

---

## Identifier

An **Identifier** (also known as a "Resource Location") is a string in the format `namespace:path` that uniquely identifies a game object.

- **Format:** `namespace:path`
- **Example:** `minecraft:diamond`, `origins:fire_immunity`
- **Default namespace:** If no namespace is specified (e.g., `diamond`), Minecraft defaults to `minecraft:`.

Identifiers are used for:
- Items (`minecraft:diamond_sword`)
- Blocks (`minecraft:stone`)
- Entities (`minecraft:creeper`)
- Powers (`origins:arcane_skin`)
- Origins (`origins:avian`)
- Status effects (`minecraft:speed`)
- Enchantments (`minecraft:sharpness`)
- Biomes (`minecraft:desert`)
- Dimensions (`minecraft:the_nether`)
- And many more...

---

## String

A **String** is a sequence of text characters.

- **Example:** `"Hello World"`, `"key.origins.primary_active"`
- **Used for:** Names, messages, key binding IDs, operation names, command text.

In JSON, strings are always enclosed in double quotes `"..."`.

---

## Integer

An **Integer** is a whole number (positive, negative, or zero).

- **Example:** `0`, `42`, `-5`
- **Used for:** Slot indices, bar indices, priority values, whole-number counts.

Integers cannot have decimal places.

---

## Float

A **Float** is a decimal number.

- **Example:** `1.0`, `0.5`, `-2.75`
- **Used for:** Modifier values, coordinates, color channels, velocities, probabilities.

Floats can be written with or without a decimal point (e.g., `1` and `1.0` are both valid floats).

---

## Double

A **Double** is a double-precision floating-point number (similar to Float but with higher precision).

- **Example:** `1.0`, `0.5`
- **Used for:** Position coordinates, velocity vectors where high precision is needed.

In most Origins JSON contexts, Float and Double are interchangeable.

---

## Boolean

A **Boolean** is a true/false value.

- **Example:** `true`, `false`
- **Used for:** Toggles (`invert`, `hidden`, `negative`, `continuous`), conditions.

---

## List

A **List** is an ordered collection of values enclosed in square brackets `[...]`.

- **Example:**
  ```json
  ["minecraft:sharpness", "minecraft:protection"]
  ```
- **Used for:** Collections of identifiers, collections of modifiers, collections of actions.

Lists preserve order.

---

## ValueOrList

Many fields accept **either a single value or a list of values**. This is noted in the field's type as `Value or List`.

- **Single value example:**
  ```json
  "modifier": {
      "operation": "add_base_early",
      "value": 0.5
  }
  ```
- **List example:**
  ```json
  "modifier": [
      {
          "operation": "add_base_early",
          "value": 0.5
      },
      {
          "operation": "multiply_total_multiplicative",
          "value": 1.5
      }
  ]
  ```

When only one value is needed, you can use the shorthand single-object syntax. When multiple values are needed, use the list syntax.

---

## ReferenceOrTagList

A **ReferenceOrTagList** is always a **List** where each element can be either a plain **Identifier** or a **Tag** (prefixed with `#`). Unlike `ValueOrList`, this type **always** uses the list syntax — there is no shorthand for a single entry.

```json
"block": ["minecraft:stone", "#minecraft:logs", "minecraft:dirt"]
```

Tags are identifiers prefixed with `#` that reference a group of entries defined in a data pack tag file.

---

## JSON Object

A **JSON Object** (also called a "Map") is a collection of key-value pairs enclosed in curly braces `{...}`.

- **Example:**
  ```json
  {
      "modifier": {
          "operation": "add_base_early",
          "value": 1.0
      }
  }
  ```
- **Used for:** Almost every complex structure in Origins JSON files.

Each key is a string, and each value can be any valid JSON type (string, number, boolean, list, object, or null).

---
title: Block Conditions (block_condition_type)
description: Every built-in block condition type registered by the mod, and the JSON fields each type accepts.
---

# Block Conditions (block_condition_type)

<span id="block-conditions-block-condition-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/condition/block-condition.md).
:::

A **block condition** checks one block position in the world and returns `true` or `false`. Which level and which position get checked is decided by the definition that declares the condition, so a condition only ever describes what the block at that position has to look like.

Block conditions are a Java (built-in) registry, so `type` can only be one of the ids listed below, written with the `mxt` namespace. A data pack cannot add entries to this registry, and it cannot remove them either. Adding a custom type means writing Java, or going through the KubeJS bridge — see the [KubeJS API](../../../kubejs/api-reference.md).

## Common Structure {#common-structure}

A condition is a JSON object: `type` names the built-in type and every remaining key is a field of that type.

```json
{
  "type": "mxt:block_tag",
  "tag": "minecraft:logs"
}
```

Conditions usually appear nested as a value inside other definitions, for example under a field such as `block_condition`:

```json
"block_condition": {
  "type": "mxt:hardness",
  "comparison": ">=",
  "compare_to": 3.0
}
```

Anywhere a block condition is accepted, an array is accepted too. The array is shorthand for `mxt:and` and passes only when every entry passes:

```json
"block_condition": [
  { "type": "mxt:movement_blocking" },
  { "type": "mxt:height", "comparison": "<", "compare_to": 64 }
]
```

An entry the array cannot decode is dropped and leaves one `Ignoring invalid list element` line in the log; the other entries are still evaluated normally. An empty array is legal as well, and `mxt:and` with an empty array is always `true`.

:::info Comparison Fields
A group of types compares a value against a number. `comparison` (the operator) and `compare_to` (the number compared against) are always two separate keys written directly on the condition object, as in the examples above. The operators are `==`, `!=`, `<`, `<=`, `>` and `>=`, and `compare_to` is always a plain number.
:::

:::tip Datapack Visual Editor
The [Datapack Visual Editor](https://datapack.mcdev.tech/) lists a type's fields interactively, which is handy for checking field names without scrolling through the tables on this page.
:::

## Block Conditions {#block-conditions}

This group actually looks at the block or the environment at that position.

### mxt:aura_range {#mxt-aura-range}

Tests the aura concentration at the position against a per-aura requirement.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `aura` | Map from aura id to requirement object | **Required** | Keys are [aura](../../json/aura.md) ids, values are `{ "min"?, "max" }`. |

```json
{
  "type": "mxt:aura_range",
  "aura": {
    "example:azure_aura": { "min": 20, "max": 200 }
  }
}
```

In a requirement object `max` is required and `min` is optional (default `0`), and both accept a [number provider](../../../../../library/saturn/types/number.md). The condition passes only when every listed aura's concentration falls inside that aura's own range. The server resolves the concentration at the position being evaluated.

Entries in the map whose key or value cannot be decoded are dropped with a log line rather than treated as an error.

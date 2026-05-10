---
sidebar_position: 3
---

# Conditional Origins in Layers

:::danger Not yet implemented

Features described in this guide are **not yet implemented** in the Origins (NeoForge). They will be available in a future update. The documentation below is from the Fabric version and may change.

:::

Layers can show or hide origins based on the player's state. This is useful for multi-stage selection: pick an element first, then see only the origins matching that element.

## Basic Syntax

Instead of a plain ID string, use an object with `condition` and `origins`:

```json
{
  "origins": [
    "origins:avian",
    "origins:blazeborn",
    {
      "condition": {
        "type": "origins:exposed_to_sun"
      },
      "origins": [
        "origins:enderian"
      ]
    },
    {
      "condition": {
        "type": "origins:not",
        "condition": {
          "type": "origins:exposed_to_sun"
        }
      },
      "origins": [
        "origins:arachnid"
      ]
    }
  ]
}
```

During the day, only Enderian is available. At night, only Arachnid. Plain IDs like `origins:avian` and `origins:blazeborn` always show up.

:::tip
You can list multiple origin IDs under a single condition if they share the same requirement — no need to repeat the condition for each.
:::

## Restricting by Previous Selection

The most common use case is a multi-layer setup: the player picks an element in layer 1, then sees matching origins in layer 2.

Use [`origins:origin`](../types/condition/entity_condition_types#originsorigin) as the condition:

```json
// Layer 2: data/elements/origins/layer/elemental_origins.json
{
  "order": 1,
  "origins": [
    {
      "condition": {
        "type": "origins:origin",
        "origin": "elements:fire",
        "layer": "elements:element"
      },
      "origins": [
        "origins:blazeborn",
        "elements:flame_spirit"
      ]
    },
    {
      "condition": {
        "type": "origins:origin",
        "origin": "elements:air",
        "layer": "elements:element"
      },
      "origins": [
        "origins:avian",
        "aerum:aerum"
      ]
    }
  ]
}
```

When the player chose `elements:fire` in the `elements:element` layer, they see Blazeborn and Flame Spirit in this layer.

You can also check for a specific **power** with [`origins:power_active`](../types/condition/entity_condition_types#originspower_active).

:::caution
Entity conditions in layers are evaluated **client-side**. Conditions that require server access (like scoreboard checks) will not work here. Stick to conditions like `origins:origin`, `origins:dimension`, `origins:exposed_to_sun`, etc.
:::

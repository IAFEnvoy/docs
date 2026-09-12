---
title: "Element"
description: "Defines an independent aura kind together with its overcoming, adapted and aura kind relations."
sidebar_position: 5
---

# Element

An `element` defines an independent aura kind, the elements it overcomes and is adapted to, and the aura kind markers used by environment and cultivation conditions.

## File Location

Element files go in `data/<namespace>/mxt/element/` within your datapack.

The filename corresponds to its ID. For example, `data/example/mxt/element/fire.json` has the ID `example:fire`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `overcomes` | `HolderOrTag<element>[]` | `[]` | The elements that the current element overcomes. |
| `adapted_to` | `HolderOrTag<element>[]` | `[]` | The relations the current element is adapted to. |
| `aura_kinds` | `Identifier[]` | `[]` | Aura kind markers; used for environment and cultivation condition checks. |
| `color` | `RGBColor` | `#FFFFFF` | Colour used when the element is shown, such as in aura cost text. Accepts `#RRGGBB` or an integer. |

:::info Relations and Colours
An element defines an independent aura kind and its colour, and all aura values use maps grouped by resource. Element relations may contain cycles, so do not rely on tag value order. A spirit root binds exactly one element through its `element` field.
:::

## Example

```json
{
  "overcomes": ["example:metal", "#example:wood"],
  "adapted_to": ["example:water"],
  "aura_kinds": ["example:fire_aura"],
  "color": "#FF6600"
}
```

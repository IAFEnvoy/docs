---
title: "Element (element)"
description: "Defines an element together with its overcoming and adapted relations and the colour used for aura cost text."
---

# Element (element)

An `element` defines an element and the relations between elements: which elements it overcomes, which it is adapted to, and the colour used to show it. The `mxt:element` registry holds **elements only** — an aura names one through its own `aura_type`, and spirit roots bind to one through their `element` field.

## File Location

Element files go in `data/<namespace>/mxt/element/` within your datapack.

The filename corresponds to its ID. For example, `data/example/mxt/element/fire.json` has the ID `example:fire`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `overcomes` | `HolderOrTag<element>[]` | `[]` | The elements that the current element overcomes. |
| `adapted_to` | `HolderOrTag<element>[]` | `[]` | The relations the current element is adapted to. |
| `color` | `RGBColor` | `#FFFFFF` | Colour used when the element is shown, such as in aura cost text. Accepts `#RRGGBB` or an integer. |

:::info Relations and Colours
Element relations may contain cycles, so do not rely on tag value order. Element relations are data-driven and tags classify elements but do not encode precedence. A spirit root binds exactly one element through its `element` field, and an aura names one through `aura_type`.
:::

## Example

```json
{
  "overcomes": ["example:metal", "#example:wood"],
  "adapted_to": ["example:water"],
  "color": "#FF6600"
}
```

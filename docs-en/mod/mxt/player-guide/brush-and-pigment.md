---
title: Brush and Pigment
---

MiXianTu provides brushes and pigment storage independently of the workstation addons.

## Brush and Pigment {#brushes-and-pigment}

The `mxt:talisman_brush` is unstackable. Each brush stores its own pigment in the `mxt:brush_pigment` item component as a nonnegative integer. One unit corresponds to one pixel of stroke arc length. A missing component or a value of `0` indicates an empty brush.

A brush containing pigment displays a storage bar in its item slot and a “Pigment: stored / capacity” tooltip line. **Server Config → Talisman → Brush Capacity** sets the capacity, which defaults to `4000`, sufficient for approximately 3–5 talismans.

Refilling uses an interaction similar to the vanilla bundle (`minecraft:bundle`):

1. Pick up the brush with the cursor.
2. Left-click or right-click a pigment item. Each click consumes one item and adds one portion of pigment.
3. Repeat as needed. A full brush consumes no further pigment items.

This works in inventories, chests and talisman workstations without a dedicated pigment slot or crafting recipe. **Server Config → Talisman → Pigment Per Item** sets the amount per portion, which defaults to `1000`.

The talisman workstation deducts pigment according to stroke length. See [`mxt_talisman:talisman_drawing`](../addons/talisman/datapack/talisman_drawing.md) for the calculation rules.

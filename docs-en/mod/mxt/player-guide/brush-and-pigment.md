---
title: Brush and Pigment
---

MiXianTu provides the brush and its pigment storage without a workstation addon.

## Brushes and Pigment {#brushes-and-pigment}

The talisman brush `mxt:talisman_brush` **does not stack** — one brush is one store of pigment of its own, kept in the item component `mxt:brush_pigment`: a non-negative integer where **one unit is one pixel of stroke length**, and omitting the component is the same thing as writing `0` (an empty brush either way). The little strip in the inventory cell is how much is left (it only shows while there is pigment), and the tooltip carries a "Pigment: stored / ceiling" line whose ceiling is **Server Config → Talisman → Brush Capacity** (4000 by default, roughly enough to trace 3–5 talismans).

Refilling is the same click the vanilla bundle uses: with the brush on the cursor, **click a stack of pigment** (either mouse button) and the brush takes **one portion — one item — per click**, so four clicks are four portions; a full brush takes nothing. **It is not tied to one screen or one slot**: your inventory, a chest and the drawing workstation all work, and no screen has a pigment slot of its own. What one portion is worth is **Server Config → Talisman → Pigment Per Portion** (1000 by default), and a pack adds a kind of pigment by putting the item in the `#mxt:brush_pigment` tag (cinnabar `mxt:cinnabar` only in the base pack) — no recipe is involved.

The pigment is what drawing spends: at the talisman workstation it is taken by the length of each stroke, see [`mxt_talisman:talisman_drawing`](../addons/talisman/datapack/talisman_drawing.md).

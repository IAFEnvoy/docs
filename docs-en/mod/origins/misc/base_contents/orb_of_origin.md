---
sidebar_position: 2
---

# Orb of Origin

An item that can change the origin(s) of the player upon "use" (right-click).

By default, the Orb of Origins item doesn't have a crafting recipe and lets you pick an origin for every origin layer that's available. You can change either of these things by creating a recipe (JSON file) for the item, and giving the item custom NBT respectively.

**Item ID:** `origins:orb_of_origin`

### Creating a custom recipe

You can use [this website](https://misode.github.io/recipe/) to easily create a recipe.

### Origin (and origin layer) specific Orb

:::warning
Currently only support layer settings.
:::

You can add the `origins:orb_layers` component to the item so that you can only change a certain origin layer by using the Orb of Origin.

Example:
```mcfunction
give @s origins:orb_of_origin[origins:orb_layers=["origins:origin"]]
```

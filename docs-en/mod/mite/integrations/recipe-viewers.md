---
id: recipe-viewers
title: JEI and EMI
sidebar_position: 1
description: Recipe filtering, workstations, rune stone variants, and JEI/EMI combinations.
---

JEI and EMI are optional client dependencies. MITE crafting and smelting still use Minecraft's recipe manager, preserving each viewer's native layout, search, and transfer behavior. The compatibility plugins add MITE-specific semantics.

## Registered content

| Content | JEI | EMI |
|---|:---:|:---:|
| 9 tiered workbenches as crafting catalysts/workstations | Yes | Yes |
| 5 MITE furnaces as smelting and fuel workstations | Yes | Yes |
| 6 material anvils as anvil workstations | Yes | Yes |
| 32 rune stone material/pattern variants | Yes | Yes |
| Rune Stone and workbench information pages | Yes | Yes |
| Hide recipes disabled by server `recipe_rules` | Yes | Yes |

Rune Stones store patterns 0 through 15 in block-state components. Viewers use the component to distinguish subtypes instead of merging unlike patterns.

## Mod combinations

- JEI only: the JEI plugin loads.
- EMI only: the EMI plugin loads.
- Both installed: both plugins can load; EMI's JEI bridge may log duplicate third-party tagged-recipe warnings.
- Neither installed: MITE works normally without a recipe-viewer interface.

:::note Visible does not mean craftable

Workbench tiers, timed crafting, player state, and server configuration are still validated when crafting. Transferring ingredients from a viewer does not bypass these rules.

:::

## Modpack extension

- Add recipes with standard Minecraft recipe JSON.
- Add difficulty, workbench tier, and configuration gates through a `mite/recipe_rules` file with the same resource ID.
- New workbenches and custom recipe types do not automatically become MITE workstations; an additional compatibility plugin must register them.

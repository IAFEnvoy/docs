---
id: survival-and-nutrition
title: Survival, Growth, and Nutrition
sidebar_position: 1
description: Health, hunger, level growth, nutrient reserves, and insulin response.
---

## Starting limits and growth

New players start with 6 health and 6 food points by default, represented as 3 hearts and 3 hunger icons on the HUD. Reaching configured experience-level milestones raises the player's maximum health up to the configured level cap.

| Behavior | Configuration |
|---|---|
| Starting health and food | Initial maximum health; Initial food level |
| Levels required per growth milestone | Levels per health increase |
| Health gained per milestone | Health gained per milestone |
| Level cap | Level cap |
| Crafting and melee bonuses from levels | Crafting speed per level; Melee damage per level |

Maximum health is stored and synchronized by the server. The client HUD renders the actual limit instead of misleading players with vanilla's fixed 20-point scale.

## Food energy and eating

With **Use MITE sprint rules** enabled, sprinting requires available energy rather than vanilla's fixed food threshold. A player can sprint while either food or the separate food-energy reserve remains above zero, so the starting 6-point food limit does not prevent sprinting.

**Allow beneficial eating** lets a player at the current food limit eat only when the food still has a useful effect. A food is useful when it can restore food, depleted food energy, or a depleted protein, essential-fat, or phytonutrient reserve. Foods without MITE nutrition data retain vanilla eating rules.

The server adds the configured **Passive hunger exhaustion per tick** every tick. The fraction selected by **Passive food-energy consumption ratio** is also accumulated against food energy; every 4 accumulated points consume 1 food-energy point. Defaults `0.002` and `0.25` reproduce the MITE rates. Setting the first value to `0` disables both passive drains.

## Nutrition is not hunger

MITE tracks all of the following:

- **Overall nutrition:** determines the general physiological reserve.
- **Protein:** primarily obtained from meat, fish, eggs, and milk.
- **Essential fats:** obtained from selected meat, fish, and prepared food.
- **Phytonutrients:** primarily obtained from fruit, vegetables, and crops.
- **Sugar response and insulin resistance:** sugary food accumulates a response that slowly decays over time.

Exact food values come from [food nutrition data](../data-driven/datapack-rules.md#food-nutrition). Server-side balance uses **Nutrition per food point**, **Nutrient reserve per food point**, **Nutrient reserve decay per tick**, **Insulin resistance limit**, and **Insulin resistance decay per tick**.

:::warning One food cannot satisfy every need

Cooked meat provides substantial protein but may not provide phytonutrients. Fruit replenishes phytonutrients but may also produce a strong sugar response. Long-term survival requires rotating food sources.

:::

## Starvation and malnutrition

Malnutrition begins when protein or phytonutrients fall below 5% of the reserve limit. It raises hunger consumption to 1.5 times the normal rate and reduces natural regeneration to one quarter by default. These penalties use **Malnutrition hunger-rate multiplier** and **Malnutrition natural-healing multiplier**. Depleting food energy advances starvation according to **Starvation progress per tick** and **Starvation damage**.

Natural healing uses the MITE nutrition-progress formula by default. Enabling **Dynamic natural-regeneration threshold** switches to vanilla healing with its food thresholds scaled to the current capacity: full capacity for saturated fast healing and capacity minus 2 for normal healing.

Milk cannot remove malnutrition; the missing nutrient must be restored above its threshold. Insulin resistance is also immune to milk and decays according to **Insulin resistance decay per tick**.

## Client interface

- Press `N` to open the nutrition screen by default.
- **Show nutrition button in inventory** controls the apple button beside the survival inventory.
- **Show survival HUD** controls the HUD.
- **Show detailed tooltips** controls food tooltips.
- **Show witch curse HUD** controls curse notifications.

Client settings only affect presentation; they cannot change server-owned nutrition or damage rules. See [PLR-02](../content/player-and-survival.md#plr-02), [PLR-04](../content/player-and-survival.md#plr-04), and [UX-01](../content/interface-and-multiplayer.md#ux-01) for the corresponding rules.

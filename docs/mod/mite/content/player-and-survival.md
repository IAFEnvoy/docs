---
title: Player and Survival Rules
sidebar_position: 2
---

# Player and Survival Rules

## `PLR-01` - Starting Limits and Level Growth {#plr-01}
**Configuration:** `Enable survival overhaul`; `Initial maximum health`; `Initial food level`; `Levels per health increase`; `Health gained per milestone`; `Level cap`

New players begin with reduced health and food capacity. Experience milestones increase maximum health and unlock additional food slots until the configured cap is reached; the HUD renders the current limits rather than a misleading vanilla maximum.

## `PLR-02` - Nutrition and Nutrient Reserves {#plr-02}
**Configuration:** `Initial nutrition`; `Nutrition limit`; `Enable nutrient physiology`; `Enable MITE food values`; `Nutrition per food point`; `Nutrient reserve limit`; `Initial protein reserve`; `Initial essential-fat reserve`; `Initial phytonutrient reserve`; `Nutrient reserve per food point`; `Nutrient reserve decay per tick`; `Insulin resistance limit`; `Insulin resistance decay per tick`

Food maintains overall nutrition as well as protein, essential fats, and phytonutrients. Sugary food builds insulin resistance, while eating a varied diet replenishes the reserves used by long-term survival.

## `PLR-03` - Food Energy, Sprinting, and Passive Hunger {#plr-03}
**Configuration:** `Use MITE sprint rules`; `Allow beneficial eating`; `Passive hunger exhaustion per tick`; `Passive nutrition consumption ratio`

Sprinting uses remaining food energy instead of vanilla's fixed hunger threshold. Full players may still eat food that restores an exhausted nutrition reserve, while passive hunger steadily consumes food and a smaller share of overall nutrition.

## `PLR-04` - Healing, Malnutrition, and Starvation {#plr-04}
**Configuration:** `Malnutrition threshold`; `Malnutrition hunger-rate multiplier`; `Malnutrition natural-healing multiplier`; `Dynamic natural-regeneration threshold`; `Starvation progress per tick`; `Starvation damage`

Natural healing follows MITE nutrition rules by default. Missing nutrients slow recovery and increase hunger use; exhausted overall nutrition advances starvation damage. The optional dynamic threshold switches healing back to food-capacity-scaled vanilla behavior.

## `PLR-05` - Weak Strikes {#plr-05}
**Configuration:** `Enable MITE weak strikes`; `Weak-strike health threshold`; `Weak-strike knockback strength`

An attack made without enough health, food energy, or weapon support becomes a weak strike. It can push an unprotected target back, but it deals no damage and cannot be used to bypass early survival limits.

## `PLR-06` - Level-Based Player Bonuses {#plr-06}
**Configuration:** `Crafting speed per level`; `Melee damage per level`; `Enable MITE professions`

Levels are part of character growth rather than only an enchanting currency. Higher levels can improve timed crafting and melee output, while the profession system records specialized progress.

## `PLR-07` - Reach and Interaction Distance {#plr-07}
**Configuration:** `Enable MITE reach rules`; `Base block reach`; `Base entity interaction reach`; `Base melee reach`

MITE shortens default block, interaction, and melee reach. Height difference, stance, and the held tool or weapon then modify the server-validated distance.

## `PLR-08` - Control-State Penalties {#plr-08}
**Configuration:** `Enable control-state penalties`; `Foodless mining speed multiplier`; `Cobweb mining speed multiplier`; `Control effects prevent crafting`

Food exhaustion, upper-body cobwebs, and severe Crushing Slowness reduce mining speed or stop crafting. The server checks these states throughout a timed task, so moving items or opening another menu cannot bypass them.

## `PLR-09` - Synchronized Survival HUD {#plr-09}
**Configuration:** `Show survival HUD`; `Show detailed tooltips`; `Show nutrition button in inventory`; `Show witch curse HUD`

The HUD shows the player's real health and food limits together with nutrition, insulin resistance, equipment quality, food exhaustion, restraint, crafting progress, and curse state. Displayed values come from synchronized server state.

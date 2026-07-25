---
title: Progression and Crafting Rules
sidebar_position: 3
---

# Progression and Crafting Rules

## `PRG-01` - First-Day Resources {#prg-01}
**Configuration:** `Enable progression rules`; `Enable leaf stick drops`; `Leaf stick-drop chance`; `Enable leaf fruit drops`; `Leaf sapling-drop chance`; `Leaf fruit-drop chance`; `Leaf swamp no-drop chance`; `Use MITE gravel loot`; `Gravel special-drop chance (0-1)`; `Chance to advance to the next gravel-loot tier (0-1)`; `Grass worm base chance`; `Grass worm Fortune bonus per level`; `Grass worm rain bonus`; `Grass worm maximum chance`

The opening loop begins with loose resources from leaves, grass, and gravel. Sticks, flint, food, saplings, and bait provide the path to the first tools without relying on bare-handed log or stone harvesting.

## `PRG-02` - Harvesting Tool Gates {#prg-02}
**Configuration:** `Enable tool gates`; `Require clear access to production blocks`

Harvesting is decided by server-side rules rather than break speed alone. Protected terrain and production blocks only drop when the held tool satisfies the target rule.

## `PRG-03` - Tool Families and Material Tiers {#prg-03}
**Configuration:** `Require an axe for logs`; `Require a pickaxe for stone and ores`; `Enable metal tiers`

Logs require a hatchet, axe, or battle axe; stone and ores require a pickaxe or war hammer. The tool material must also meet the target's tier, and strongbox ownership can impose an additional restriction.

## `PRG-04` - Portable Production Blocks {#prg-04}
**Configuration:** `Enable portable production blocks`

Selected player-crafted production blocks can be recovered under more forgiving rules than natural terrain. This prevents progression equipment from becoming permanently trapped without weakening ordinary harvesting gates.

## `PRG-06` - Early Mining Sources {#prg-06}
**Configuration:** `Enable tool gates`; `Use MITE gravel loot`; `Enable MITE ore generation`

MITE does not track artificial tunnels as a separate system. Early mining is constrained by tool gates and depth-biased ore generation, while exposed stone, exposed ore, gravel, and surface resources provide the intended first materials.

## `PRG-07` - Unstable Soil Collapse {#prg-07}
**Configuration:** `Enable unstable soil collapse`; `Soil collapse delay (ticks)`; `Maximum soil collapses per tick`

Dirt and other tagged soils can collapse after support is removed or the area is disturbed. Delayed, chained processing creates unstable excavations while a per-tick limit protects the server from large updates.

## `CRF-01` - Timed Crafting {#crf-01}
**Configuration:** `Enable timed crafting`; `Use MITE recipe difficulties when available`; `Minimum crafting time (ticks)`; `Base crafting time (ticks)`; `Crafting time per occupied ingredient slot (ticks)`

Crafting takes time based on recipe difficulty, occupied ingredients, workstation, and player progression. Moving ingredients, closing the menu, or losing eligibility cancels or pauses work according to server state.

## `CRF-02` - Crafting Eligibility and Cancellation {#crf-02}
**Configuration:** `Crafting requires food energy`; `Control effects prevent crafting`; `Enable timed crafting`

Food exhaustion and restraining effects can pause or reject crafting. Ingredient changes, closing the menu, death, disconnection, or changing to another menu safely cancel the active server task.

## `CRF-03` - Workbench Tiers and Recipes {#crf-03}
**Configuration:** `Require material-tiered workbenches`; `Disable vanilla equipment recipes`

Recipes require workbenches made from suitable materials, from flint through advanced metals and obsidian. Equipment recipes that would bypass this ladder are removed from ordinary vanilla crafting.

## `CRF-04` - Equipment Quality {#crf-04}
**Configuration:** `Enable equipment quality`; `Automatically select the highest affordable quality`; `Charge experience for superior quality`

Crafted equipment can receive a quality tier that affects its performance. Players may spend experience to select quality, or allow the game to choose the highest available tier automatically.

## `CRF-05` - Workstation Obstruction {#crf-05}
**Configuration:** `Require clear space above workbenches`

Workbench use requires clear space above the block. Obstructed stations refuse to open or craft and report the reason to the player.

## `CRF-06` - Server-Timed Crafting State {#crf-06}
**Configuration:** `Enable timed crafting`; `Enforce server authority`

Crafting progress is counted by the server and synchronized to the client HUD. The client may display or cancel a task, but it cannot claim completion, duplicate a result, or retain progress after an invalid state transition.

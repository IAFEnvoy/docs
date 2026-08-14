---
title: Materials, Production, and Food Rules
sidebar_position: 4
---

# Materials, Production, and Food Rules

## `MAT-01` - Material Progression {#mat-01}
**Configuration:** `Enable production overhaul`; `Enable metal tiers`

Mining, crafting, smelting, repair, weapons, armor, and resistance use one material ladder. Tool and workstation tiers prevent a low-stage material from processing a later-stage resource.

## `MAT-02` - Metals and Material Blocks {#mat-02}
**Configuration:** `Enable metal tiers`; `Enable material chainmail`; `Enable metal doors`; `Enable metal bars`; `Enable ore-storage blocks`

Silver, ancient metal, mithril, and adamantium extend vanilla copper, gold, and iron. Their ingots, nuggets, armor, chains, doors, bars, storage blocks, and related equipment share the same material identity; copper continues to use vanilla ingots, ore, and blocks.

## `MAT-03` - Material Combat Properties {#mat-03}
**Configuration:** `Silver-arrow damage multiplier against undead`; `Enable exact MITE arrow and skeleton rules`; `Skeleton arrow friendly-fire damage multiplier`; `Skeleton arrow damage-taken multiplier`; `Skeleton projectile material-damage multiplier`; `Skeleton projectile base damage bonus`; `Longdead arrow damage bonus`; `Longdead Guardian arrow damage bonus`; `Burning-arrow gelatinous damage bonus`

Projectile material and target family affect damage. Silver excels against undead, burning arrows harm gelatinous creatures, and skeleton variants receive material-aware arrow behavior.

## `MAT-04` - Weapons and Equipment Families {#mat-04}
**Configuration:** `Enable additional MITE melee weapons`

MITE adds knives, daggers, cudgels, clubs, hatchets, battle axes, war hammers, mattocks, and scythes. Each implemented family has distinct reach, damage, harvesting roles, and material availability.

## `MAT-05` - Vanilla Equipment Restrictions {#mat-05}
**Configuration:** `Disable vanilla equipment recipes`; `Enable metal tiers`

Vanilla iron, gold, diamond, and netherite equipment remains under its original identity where appropriate, but its components and recipes follow MITE progression. Late-game armor cannot bypass workstation and recipe gates.

## `MAT-06` - Obsidian Tools {#mat-06}
**Configuration:** `Enable obsidian tools`

Obsidian tools form a non-metal tier above flint. They provide an early route to stronger cutting and digging without replacing the later metal workstation ladder.

## `MAT-07` - Hardness-Based Tool Wear {#mat-07}
**Configuration:** `Scale tool wear with block hardness`; `Tool durability cost multiplier`

Breaking a block consumes durability according to its hardness and the tool family. Hard stone is substantially more expensive than soft soil, and swords, shovels, and mining tools use different wear rates.

## `MAT-08` - Armor Durability and Minimum Damage {#mat-08}
**Configuration:** `Damaged armor loses protection`; `Enable minimum damage floor`; `Minimum nonzero damage`; `Fire bypasses ordinary armor`

Armor keeps full protection through the first half of its durability, then loses effectiveness as it approaches breaking. Successful attacks retain a configurable minimum amount of damage, and fire can bypass ordinary armor reduction.

## `MAT-09` - Lava and Acid Corrosion {#mat-09}
**Configuration:** `Lava damages equipped items`; `Lava equipment-damage multiplier`; `Lava metal-equipment damage multiplier`; `Acidic gelatinous creatures corrode inventory`; `Acid corrosion chance per creature size`; `Acid corrosion damage multiplier`

Lava damages worn and held equipment, while acidic gelatinous creatures can corrode damageable inventory items. Adamantium and items added to the acid-resistant tag are immune.

## `MAT-10` - Field Repair for Leather Armor {#mat-10}
**Configuration:** `Allow leather armor field repair`; `Leather armor field-repair multiplier`

Damaged leather armor can be repaired in the personal crafting grid with string or sinew. The recipe preserves the original armor stack and restores a controlled amount of durability.

## `MAT-11` - Anvils and Equipment Repair {#mat-11}
**Configuration:** `Enable material anvils`; `Enable MITE equipment repair`; `Equipment repair effectiveness multiplier`; `Repair experience cost per material`

Material anvils gate repairs by tier. Repair materials, effectiveness, and experience costs depend on the equipment being restored and the workstation used.

## `MAT-12` - Metal Buckets {#mat-12}
**Configuration:** `Enable metal buckets`; `Allow non-adamant bucket melting in lava`; `Copper bucket lava-melting chance`; `Silver bucket lava-melting chance`; `Gold bucket lava-melting chance`; `Iron bucket lava-melting chance`; `Ancient metal bucket lava-melting chance`; `Mithril bucket lava-melting chance`; `Adamantium bucket lava-melting chance`; `Experience cost for source placement`

Buckets exist across several metal tiers. Lava can damage weaker buckets, while placing valuable fluid sources costs experience under server-controlled rules.

## `SMELT-01` - Furnace Family {#smelt-01}
**Configuration:** `Enable furnace family`

Clay, sandstone, hardened clay, obsidian, and netherrack furnaces form a progression of production stations. Furnace material determines which heat levels and recipes the station can support.

## `SMELT-02` - Furnace Heat and Fuel {#smelt-02}
**Configuration:** `Enable furnace heat`; `Wood and charcoal heat level`; `Coal heat level`; `Lava heat level`; `Blaze-rod heat level`; `Log furnace burn time`; `Plank furnace burn time`; `Lava-bucket furnace burn time`; `Manure furnace burn time`

Fuel provides heat as well as burn time. Ordinary metals, mithril, and adamantium require increasingly hotter fuels and furnace materials, preventing high-tier smelting in starter equipment.

## `SMELT-03` - Ore and Furnace Tier Requirements {#smelt-03}
**Configuration:** `Metal-ore required heat level`; `Mithril-ore required heat level`; `Adamantium-ore required heat level`; `Coal heat level`; `Lava heat level`; `Blaze-rod heat level`

Ordinary metal ore requires coal heat and a cobblestone furnace or better. Mithril requires lava heat and an obsidian furnace, while adamantium requires blaze-rod heat and a netherrack furnace.

## `SMELT-04` - Furnace Smothering and Flooding {#smelt-04}
**Configuration:** `Enable furnace smothering and flooding`

Water or a solid face blocking the furnace front immediately extinguishes it. Burn time, cooking progress, heat, and the lit block state are reset, and the player receives a specific obstruction message.

## `SMELT-05` - Furnace Experience {#smelt-05}
**Configuration:** `Use MITE furnace experience`; `Furnace experience multiplier`

Supported metal and cooked-food outputs grant fixed MITE experience values. Manual removal grants the reward to the player, while hopper extraction creates experience orbs at the furnace front.

## `FOD-01` - Food Nutrition Values {#fod-01}
**Configuration:** `Enable MITE food values`; `Enable nutrient physiology`; `Nutrition per food point`; `Nutrient reserve per food point`

Every supported food supplies its own combination of food energy, protein, essential fats, phytonutrients, and sugar response. Food energy resists starvation and is tracked separately from the three long-term nutrient reserves. Data packs define item and tag relationships, allowing modpacks to extend the food table.

## `FOD-02` - Survival Food Chain {#fod-02}
**Configuration:** `Enable MITE food values`; `Enable nutrient physiology`; `Enable MITE fishing`; `Enable blueberry bushes`

Hunting, gathering, fishing, crops, dairy, soups, salads, and desserts form one food chain. Simple foods keep a player alive early, while processed and varied meals maintain the nutrient reserves needed for long-term recovery.

## `FOD-04` - Fishing and Bait {#fod-04}
**Configuration:** `Enable MITE fishing`; `Deep-ocean salmon chance`; `Grass worm base chance`; `Grass worm Fortune bonus per level`; `Grass worm rain bonus`; `Grass worm maximum chance`

Weather, time, water type, and insect bait affect fishing. Grass can provide worms, and deep oceans can produce salmon according to configurable probabilities.

## `FOD-05` - Fishing-Hook Combat {#fod-05}
**Configuration:** `Fishing-hook impact damage`; `Enable MITE fishing`

A cast fishing hook can deal a small amount of server-authoritative impact damage. Material rods keep their own durability and bait behavior without turning the hook into a full ranged weapon.

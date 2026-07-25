---
title: World and Ecology Rules
sidebar_position: 5
---

# World and Ecology Rules

## `AGR-01` - Crops and Wild Produce {#agr-01}
**Configuration:** `Enable blueberry bushes`; `Enable MITE sapling rules`; `Oak sapling minimum temperature`; `Birch sapling minimum temperature`

MITE adds onions and renewable blueberry bushes while changing how saplings and wild produce respond to biome temperature. These resources support the early food and farming loop.

## `AGR-02` - Climate-Aware Crop Growth {#agr-02}
**Configuration:** `Enable MITE crop growth rules`; `Minimum crop sky light`; `Global crop growth multiplier`; `Minimum optimal crop temperature`; `Maximum optimal crop temperature`; `Crop temperature tolerance`; `Fertilized crop growth multiplier`; `Isolated crop growth multiplier`; `Crop-row end growth multiplier`; `Cross-row crop growth multiplier`

Crops require configured sky light and grow at a slower global rate. Biome temperature, wet or fertilized farmland, isolation, row layout, and neighboring crops then modify each growth attempt.

## `AGR-03` - Crop Disease and Watering {#agr-03}
**Configuration:** `Enable crop disease`; `Crop drought-death chance`; `Natural crop blight chance`; `Enable bowl crop watering`; `Enable blood-moon crop disease`; `Enable blood-moon crop disease on dedicated servers`; `Blood-moon crop-disease chance`

Crops can become blighted or die from drought. Watering and treatment protect fields, while blood moons can spread disease under separate single-player and dedicated-server rules.

## `AGR-04` - Fertility and Harvesting {#agr-04}
**Configuration:** `Enable manure crop fertilization`; `Fertility chance per level`; `Mature crop bonus-drop chance`; `Harvesting extra-drop multiplier`

Fertilized farmland and the Fertility and Harvesting enchantments improve crop output. Mature crops receive controlled bonus drops instead of unrestricted vanilla multiplication.

## `AGR-05` - MITE Crop Harvests {#agr-05}
**Configuration:** `Mature crop bonus-drop chance`; `Harvesting extra-drop multiplier`

Wheat, carrots, potatoes, and onions use maturity-aware MITE drops. Wheat converts back into two seeds, immature or blighted potatoes may become poisonous, and cocoa keeps the vanilla jungle-log placement restriction.

## `AGR-06` - Fertilized Mycelium Conversion {#agr-06}
**Configuration:** `Enable manure crop fertilization`

A brown mushroom growing indoors at low light can convert wet fertilized farmland into mycelium. This creates a renewable mushroom route tied to irrigation and manure rather than an unconditional block recipe.

## `AGR-07` - Leaf Fruit and Sapling Produce {#agr-07}
**Configuration:** `Enable leaf fruit drops`; `Leaf fruit-drop chance`; `Leaf swamp no-drop chance`; `Enable MITE sapling rules`

Tree leaves provide biome-appropriate sticks, saplings, apples, bananas, and oranges. Temperature, precipitation, tree type, and swamp exclusions keep each resource tied to its intended environment.

## `AGR-08` - Livestock Wellness and Production {#agr-08}
**Configuration:** `Enable livestock wellness`; `Enable livestock manure`; `Livestock update interval (ticks)`; `Livestock production chance per update`; `Cow milk produced per update`; `Chicken feather production chance`; `Chicken egg production chance`; `Cow manure period (ticks)`; `Chicken manure period (ticks)`; `Livestock safe trampling count`; `Trampling chance increase per step`; `Trampling maximum chance`

Livestock track food, water, freedom, crowding, and panic. Healthy animals produce milk, eggs, feathers, and manure; poor conditions reduce production and can spread panic through a herd.

## `WLD-01` - Ore Generation {#wld-01}
**Configuration:** `Enable MITE ore generation`; `Generate copper ore`; `Generate silver ore`; `Generate mithril ore`; `Generate adamantium ore in the Underworld`; `Ore Fortune extra-drop chance per level`

Copper, silver, mithril, and adamantium deposits have independent generation switches, attempt counts, vein sizes, and height ranges. Fortune uses a separately controlled extra-drop chance.

## `WLD-02` - The Underworld {#wld-02}
**Configuration:** `Enable the Underworld`; `Enable Underworld dungeon attempts`; `Enable Underworld fog cycle`; `Enable MITE Underworld bedrock strata`; `Enable exact MITE Underworld terrain noise`; `Enable MITE Underworld cave cobwebs`

The Underworld is a deep deepslate dimension between the Overworld and Nether. Its caves, bedrock and mantle terrain, dungeons, cobwebs, and fog cycle form the central mid-game exploration layer.

## `WLD-03` - Portals and Rune Gates {#wld-03}
**Configuration:** `Enable Underworld portal routing`; `Enable Rune Gates`; `Rune Gate teleport delay (ticks)`; `Mithril Rune Gate domain radius`; `Adamantium Rune Gate domain radius`; `Show Rune Gate transition effects`

Ordinary portals route through the Underworld before reaching the Nether. Rune stones can convert a portal into a same-dimension rune gate whose pattern, material, and orientation determine its destination and range.

## `WLD-04` - Village Progression {#wld-04}
**Configuration:** `Gate new villages behind progression`; `Earliest village generation day`

Village generation is delayed until the world reaches the configured age and progression conditions. Village farms use dead crops and weaponsmith loot can appear in protected iron strongboxes.

## `WLD-05` - Village Farms and Strongboxes {#wld-05}
**Configuration:** `Gate new villages behind progression`; `Enable strongboxes`

Village farms begin with matching dead crop blocks. Weaponsmith chests are migrated to iron strongboxes while retaining their loot table, and their higher harvest tier prevents early theft.

## `WLD-06` - Dimension Registration and Safe Travel {#wld-06}
**Configuration:** `Enable the Underworld`; `Enable Underworld portal routing`; `Enable Rune Gates`

The Underworld is registered as a persistent server dimension. Portal travel handles destination lookup, chunk loading, safe landing, return routes, and server restarts without trusting a client teleport request.

## `SKY-01` - Weather and Hunger {#sky-01}
**Configuration:** `Passive hunger exhaustion per tick`; `Enable livestock wellness`; `Enable MITE fishing`

Rain, thunderstorms, immersion, and cold biomes increase passive food consumption. The same weather state affects fishing, livestock shelter and water, while hot biomes prevent an inappropriate wetness bonus.

## `SKY-02` - Blood Moons {#sky-02}
**Configuration:** `Enable moon events`; `Blood-moon period (days)`; `Harvest-moon and moon-dog offset (days)`; `Prevent sleeping during blood moons`; `Enable blood-moon crop disease`; `Blood-moon crop-disease chance`; `Empower hostile mobs during blood moons`; `Blood-moon hostile-mob effect duration`; `Blood-moon hostile-mob speed amplifier`; `Blood-moon hostile-mob strength amplifier`

Blood moons prevent sleep, threaten crops, empower monsters, and raise surface pressure. Period, offset, effect duration, and mob amplifiers are all server controlled.

## `SKY-03` - Other Moon Phases and Spawning {#sky-03}
**Configuration:** `Blue-moon period (days)`; `Enable MITE moon-based surface spawning`; `Blue-moon surface spawn chance`; `Blood-moon surface spawn chance`; `Full-moon surface spawn chance`; `New-moon surface spawn chance`; `Ordinary-moon surface spawn chance`; `Daytime undead surface spawn chance`; `Render special moon colors and halos`

Blue, full, new, and ordinary moons alter surface spawning probabilities, while special moon rendering gives players immediate visual feedback. Daytime undead spawning has its own probability.

## `SKY-04` - Harvest Moon {#sky-04}
**Configuration:** `Enable moon events`; `Harvest-moon and moon-dog offset (days)`; `Render special moon colors and halos`

The harvest moon is a scheduled moon state with its own sky and moon appearance and a role in weather-event scheduling. MITE does not grant it a separate crop, loot, or combat bonus.

## `SKY-05` - Day-Based Hostile Equipment {#sky-05}
**Configuration:** `Enable day-based hostile equipment progression`; `Advanced hostile weapon unlock day`; `Elite hostile weapon unlock day`; `Zombie equipment chance`; `Zombie villager equipment chance`

World age unlocks stronger hostile weapon pools. Zombies and zombie villagers can carry day-appropriate equipment, while revenants and Bone Lords progress into their advanced and elite weapon sets.

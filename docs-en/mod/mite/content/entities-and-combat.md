---
title: Entity, Combat, and Magic Rules
sidebar_position: 6
---

# Entity, Combat, and Magic Rules

## `MOB-01` - Advanced Hostile Behavior {#mob-01}
**Configuration:** `Enable mob overhaul`; `Enable advanced AI`; `Enable combat rebalance`

Hostile creatures use longer awareness, coordinated targeting, better positioning, and rebalanced combat behavior. These changes make encounters dangerous through decisions rather than health inflation alone.

## `MOB-02` - Visibility and Local Population {#mob-02}
**Configuration:** `Prevent visible mobs from despawning`; `Visible mob persistence range`; `Enable local monster population protection`; `Local monster base limit`; `Local monster depth interval`; `Local monster horizontal radius`; `Local monster vertical radius`; `Blood-moon local monster limit multiplier`; `Full-moon local monster limit multiplier`

Living mobs in sight of an active nearby player refresh their despawn timer. Natural hostile spawning also respects a local player-centered limit that increases with depth and rises during full and blood moons.

## `MOB-03` - Livestock Panic Propagation {#mob-03}
**Configuration:** `Enable livestock wellness`; `Livestock panic horizontal radius`; `Livestock panic vertical radius`; `Livestock minimum panic duration (ticks)`; `Livestock random panic duration (ticks)`

Threatened livestock path away more effectively and spread panic to nearby animals across species. Panic duration and propagation range are server controlled and feed back into the livestock wellness system.

## `MOB-04` - Skeleton Firing Positions {#mob-04}
**Configuration:** `Enable advanced AI`; `Enable skeleton firing-position AI`; `Firing-position attempt interval`; `Firing-position player range`; `Firing-position search radius`; `Firing-position search attempts`; `Firing-position movement speed`

An untargeted skeleton holding a projectile weapon can search for a reachable position with a clear shot toward a concealed player. MITE does not define a separate universal ambush or grouping system beyond this goal and ordinary ally-alert behavior.

## `MOB-05` - Zombie Digging and Parity Behavior {#mob-05}
**Configuration:** `Enable exact MITE mob behaviors`; `Enable advanced AI`; `Enforce server authority`

Selected entities reproduce MITE interactions such as tool-aware zombie digging and contact effects. Destructive actions obey server rules, block hardness, tool requirements, and `mobGriefing`.

## `MOB-06` - Skeleton and Longdead Variants {#mob-06}
**Configuration:** `Enable exact MITE mob behaviors`; `Enable exact MITE arrow and skeleton rules`; `Longdead arrow damage bonus`; `Longdead Guardian arrow damage bonus`; `Skeleton projectile base damage bonus`

Skeleton-family enemies include ranged and fast melee variants. Longdead use ancient-metal arrows, ordinary skeletons use rusted-iron arrows, and skeleton-friendly-fire and material damage rules are applied consistently.

## `MOB-07` - Hostile Squid {#mob-07}
**Configuration:** `Enable exact MITE mob behaviors`; `Enable combat rebalance`

Squid can pursue nearby players and apply strong movement slowing on contact, making open-water travel dangerous instead of treating every squid as passive scenery.

## `MOB-08` - New Mobs and Replacements {#mob-08}
**Configuration:** `Enable MITE mobs`; `Giant Vampire Bat replacement chance`; `Longdead Guardian replacement chance`; `Infernal Creeper replacement chance`; `Infernal Creeper sky-gate bypass chance`; `Infernal Creeper height-roll maximum`; `Wight rare-drop chance`; `Wight rare-drop Looting bonus per level`

MITE adds undead, spiders, bats, gelatinous creatures, elementals, infernal creatures, and other hostile families. Replacement probabilities control when stronger variants take the place of ordinary spawns.

## `MOB-09` - Gelatinous and Arachnid Abilities {#mob-09}
**Configuration:** `Enable gelatinous sphere projectiles`; `Enable arachnid web projectiles`

Gelatinous mobs and hostile spiders use family-specific projectiles and control effects. Their size, collision, damage immunity, and landing feedback match the creature variant instead of vanilla slime behavior.

## `MOB-10` - Witch Curses {#mob-10}
**Configuration:** `Enable witch curses`; `Witch curse delay (ticks)`; `Show witch curse HUD`

Witches can apply delayed curses in addition to ordinary potion combat. The server owns curse timing and state, while the client HUD reveals known curse information.

## `MOB-11` - Spawn Conditions and Infested Blocks {#mob-11}
**Configuration:** `Enable MITE moon-based surface spawning`; `Blue-moon surface spawn chance`; `Blood-moon surface spawn chance`; `Full-moon surface spawn chance`; `New-moon surface spawn chance`; `Ordinary-moon surface spawn chance`; `Daytime undead surface spawn chance`; `Enable MITE infested-block silverfish variants`; `Generate MITE infested silverfish blocks`

Entity spawning can depend on dimension, height, biome, moon state, and source blocks. Infested stone and netherrack use explicit source rules so modpacks can extend silverfish behavior safely.

## `MOB-12` - Earth Elementals {#mob-12}
**Configuration:** `Earth Elemental maximum heat`; `Earth Elemental magma heat threshold`; `Earth Elemental passive cooling`; `Earth Elemental rain cooling bonus`; `Earth Elemental cold-biome cooling bonus`; `Earth Elemental water cooling bonus`; `Earth Elemental healing interval (ticks)`; `Earth Elemental healing amount`; `Earth Elemental natural defense`; `Earth Elemental ignition chance`; `Earth Elemental minimum ignition duration (seconds)`; `Earth Elemental maximum ignition duration (seconds)`; `Earth Elemental maximum health`; `Earth Elemental follow range`; `Earth Elemental movement speed`; `Earth Elemental attack damage`; `Enable Fire Elemental lava spawning`

Earth elementals track heat, cool in rain, water, and cold biomes, heal over time, resist damage, and can ignite targets. Fire elemental spawning in lava is controlled separately.

## `MAG-01` - Enchantments {#mag-01}
**Configuration:** `Enable MITE enchantment effects`; `Enable MITE arrow recovery`; `Arrow Recovery chance per level`; `Speed movement bonus per level`; `Free Action compensation per level`; `Butchering extra-drop scale`; `Butchering spider-eye chance`; `Stun chance per level`; `Stun duration per level (ticks)`; `Stun Slowness amplifier per level`; `Vampiric trigger chance per level`; `Vampiric maximum healing ratio`; `Disarming chance per level`; `Poison chance per level`; `Poison base duration (ticks)`; `Poison duration per level (ticks)`

Fifteen MITE enchantments cover arrow recovery, harvesting, butchering, mobility, control, poison, vampirism, and other survival roles. Effect chances, durations, healing limits, and recovery rates are configurable by enchantment level.

## `MAG-02` - Stronger Status Effects {#mag-02}
**Configuration:** `Enable survival overhaul`; `Enable nutrient physiology`; `Enable witch curses`; `Show survival HUD`; `Show witch curse HUD`

MITE provides stronger named variants of resistance, slowness, and poison together with malnutrition, insulin resistance, paralysis, and witch curses. Their tiers, persistence, clearing rules, server synchronization, and HUD state are handled as one status system.

## `MAG-03` - Projectile and Material Damage {#mag-03}
**Configuration:** `Enable exact MITE arrow and skeleton rules`; `Silver-arrow damage multiplier against undead`; `Skeleton arrow friendly-fire damage multiplier`; `Skeleton arrow damage-taken multiplier`; `Skeleton projectile material-damage multiplier`; `Skeleton projectile base damage bonus`; `Longdead arrow damage bonus`; `Longdead Guardian arrow damage bonus`; `Burning-arrow gelatinous damage bonus`

Arrow material, shooter type, target family, burning state, and enchantments participate in a server-authoritative damage calculation. This preserves meaningful ammunition choices against undead and gelatinous enemies.

---
title: Mod Configuration
---

# Mod Configuration

IaF:CE has 2 configuration files, located in instance/config/iceandfire. One is for client settings(visual settings, not affecting functions, file iaf-client.json) and the other is for server settings(changing the functions, file iaf-common.json).

## iaf-client.json

There are 3 settings:
```
"customMainMenu": true, - enables/disables the custom Ice and Fire main menu.
"dragonAuto3rdPerson": false, - enables/disables auto-switching to 3rd person when mounting a dragon.
"siren.shader": true - enables/disables the screen effect, which sirens give you.
```

## iaf-common.json

Has tons of settings to customize mobs, weapons, armor and generation in detail.
It is divided into sections:

1. Dragon:
```
"iceandfire.dragon.maxHealth": 500.0, - change dragon's max health
"iceandfire.dragon.eggBornTime": 7200, - change time of the dragon egg hatching
"iceandfire.dragon.maxPathingNodes": 5000,
"iceandfire.dragon.villagersFear": true, - change if villagers will be afraid of dragons
"iceandfire.dragon.animalsFear": true, - change if animals will be afraid of dragons
"": {},
"iceandfire.dragon.generate.skeletons": true, - enable/disable generation of dragon skeletons
"iceandfire.dragon.generate.skeletonChance": 0.0033333333333333335, - change how common are dragon skeletons
"iceandfire.dragon.generate.denGoldAmount": 0.25, - edit the amount of gold in dragon dens
"iceandfire.dragon.generate.oreRatio": 0.022222222222222223,
"iceandfire.dragon.griefing": true, - enable/disable all dragons breaking blocks
"iceandfire.dragon.tamedGriefing": true, - enable/disable tamed dragons breaking blocks
"iceandfire.dragon.flapNoiseDistance": 4,
"iceandfire.dragon.fluteDistance": 8,
"iceandfire.dragon.attackDamage": 17, - edit dragon melee damage
"iceandfire.dragon.attackDamageFire": 2.0, - edit dragon fire breath damage
"iceandfire.dragon.attackDamageIce": 2.5, - edit dragon ice breath damage
"iceandfire.dragon.attackDamageLightning": 3.5, - edit dragon lightning breath damage
"iceandfire.dragon.maxFlight": 256,
"iceandfire.dragon.goldSearchLength": 30,
"iceandfire.dragon.canHealFromBiting": false,
"iceandfire.dragon.canDespawn": true, - enable/disable wild dragons despawning
"iceandfire.dragon.sleep": true, - enable/disable dragons sleeping
"iceandfire.dragon.digWhenStuck": true, - enable/disable dragons breaking block to escape when stuck
"iceandfire.dragon.breakBlockCooldown": 5, - edit cooldown between breaking blocks for dragons
"iceandfire.dragon.targetSearchLength": 128, - edit the distance, from which a dragon can notice a target
"iceandfire.dragon.wanderFromHomeDistance": 40, - edit how far from home will tamed dragons wander
"iceandfire.dragon.hungerTickRate": 3000, - edit how fast will a tamed dragon become hungry
"iceandfire.dragon.blockBreakingDropChance": 0.1, - edit chance to break blocks when a dragon breaks them
"iceandfire.dragon.explosiveBreath": false, - enable/disable explosions for dragon breath
"iceandfire.dragon.chunkLoadSummonCrystal": true,
"iceandfire.dragon.dragonFlightSpeedMod": 1.0,
"iceandfire.dragon.maxTamedDragonAge": 128, - edit max age for tamed dragons
"iceandfire.dragon.maxBreathTimeMul": 2.0,
"iceandfire.dragon.neutralToPlayer": false, - enable/disable dragons being neutral to players(don't attack first, only after being attacked)
"iceandfire.dragon.enableBrushDragonScales": true, - enable/disable using a brush to harvest dragon scales(like armadillos)
"iceandfire.dragon.maxBrushScalesDropPerTime": 2, - edit how many scales are dropped max when brushing a dragon
"iceandfire.dragon.brushTimesMul": 1.0,
"iceandfire.dragon.loot.skull": true, - enable/disable dragons dropping skulls
"iceandfire.dragon.loot.heart": true, - enable/disable dragons dropping dragon hearts
"iceandfire.dragon.loot.blood": true - enable/disable harvesting blood from dead dragons
```

2. Hippogryphs:
```
"iceandfire.hippogryphs.spawn": true, - enable/disable hippogryphs spawning
"iceandfire.hippogryphs.spawnWeight": 2, - edit spawn chance for Hippogryphs. Higher = more hippogryphs
"iceandfire.hippogryphs.flightSpeedMod": 1.0 - edit flight speed for hippogryphs
```

3. Pixie:
```
"iceandfire.pixie.size": 5,
"iceandfire.pixie.stealItems": true enable/disable pixies stealing items from player's inventory
```

4. Cyclops
```
"iceandfire.cyclops.spawnWanderingChance": 0.0011111111111111111, - edit the chance to spawn wandering cyclops
"iceandfire.cyclops.sheepSearchLength": 17, - edit range in which cyclops will see sheep
"iceandfire.cyclops.maxHealth": 150.0, - edit cyclops' max health
"iceandfire.cyclops.attackDamage": 15.0, - edit cyclops' normal attack damage
"iceandfire.cyclops.biteDamage": 40.0, - edit cyclops' bite attack damage
"iceandfire.cyclops.griefing": true - enable/disable cyclops breaking blocks
```

5. Siren
```
"iceandfire.siren.maxHealth": 50.0, - edit sirens' max health
"iceandfire.siren.maxSingTime": 12000, - edit max time when sirens attract you
"iceandfire.siren.timeBetweenSongs": 2000 - edit time between songs
```

6. Gorgon
```
"iceandfire.gorgon.maxHealth": 100.0 - edit gorgon's max health
```

7. Deathworm
## to be added
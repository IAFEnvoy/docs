# World Query

## Block Queries

```js
mc.getBlock(x, y, z)                 // → 'minecraft:air' or full block ID
mc.isBlock(x, y, z, 'minecraft:dirt') // → boolean
mc.isBlockByTag(x, y, z, 'minecraft:logs') // tag-based check
mc.getBlockState(x, y, z)            // → {id, properties: {facing:'north', ...}}
```

## Searching

```js
mc.findBlocks('diamond_ore', 16)       // sphere search, returns [{x,y,z}]
mc.findBlocksByTag('minecraft:ores', 8) // tag-based sphere search
mc.findBlocksInBox(x1,y1,z1, x2,y2,z2)  // box search, returns all non-air
mc.findBlocksInBox(x1,y1,z1, x2,y2,z2, 'stone') // box search, filtered
```

## Crosshair

```js
mc.facingBlock('minecraft:oak_log')     // looking at oak log?
mc.facingEntity('minecraft:zombie')     // looking at zombie?
mc.getFacingBlock()                     // → block ID or ''
mc.getLookingEntity()                   // → {type, name, x, y, z, distance, ...}
```

## Entities

```js
mc.getNearbyPlayers(radius)             // → [{name, x, y, z, distance}]
mc.getNearbyEntities(radius)            // all non-player entities
mc.getNearbyEntities(radius, 'minecraft:cow') // filtered
```

## Ray Trace

```js
mc.rayTrace(5.0)                       // → {type:'block'|'entity'|'miss', x, y, z, ...}
```

Returns the first hit within `maxDist` blocks, preferring entities over blocks.

## World State

```js
mc.getBiomeAt(x, y, z)                 // → 'minecraft:plains'
mc.getLightLevel(x, y, z)              // → 0-15
mc.getDifficulty()                     // → 'peaceful/easy/normal/hard'
mc.getDimension()                      // → 'minecraft:overworld/nether/end'
```

## Player State

```js
mc.getPlayerHealth()                   // → current HP
mc.getPlayerHunger()                   // → 0-20
mc.getPlayerArmor()                    // → armor value
mc.getAttackCooldown()                 // → 0.0-1.0
mc.getReachDistance()                  // → reach distance in blocks
mc.canReach(x, y, z)                   // → boolean (distance check)
mc.canSeeBlock(x, y, z)                // → boolean (line-of-sight check)
```

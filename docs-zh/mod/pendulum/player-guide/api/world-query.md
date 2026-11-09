---
sidebar_position: 4
---

# 世界查询

## 方块查询

```js
mc.world.getBlock(x, y, z)                 // → 'minecraft:air' or full block ID
mc.world.isBlock(x, y, z, 'minecraft:dirt') // → boolean
mc.world.isBlockByTag(x, y, z, 'minecraft:logs') // tag-based check
mc.world.getBlockState(x, y, z)            // → {id, properties: {facing:'north', ...}}
```

## 搜索

```js
mc.world.findBlocks('diamond_ore', 16)       // sphere search, returns [{x,y,z}]
mc.world.findBlocksByTag('minecraft:ores', 8) // tag-based sphere search
mc.world.findBlocksInBox(x1,y1,z1, x2,y2,z2)  // box search, returns all non-air
mc.world.findBlocksInBox(x1,y1,z1, x2,y2,z2, 'stone') // box search, filtered
```

## 准星

```js
mc.world.facingBlock('minecraft:oak_log')     // looking at oak log?
mc.world.facingEntity('minecraft:zombie')     // looking at zombie?
mc.world.getFacingBlock()                     // → block ID or ''
mc.world.getLookingEntity()                   // → {type, name, x, y, z, distance, ...}
```

## 实体

```js
mc.world.getNearbyPlayers(radius)             // → [{name, x, y, z, distance}]
mc.world.getNearbyEntities(radius)            // all non-player entities
mc.world.getNearbyEntities(radius, 'minecraft:cow') // filtered by type
```

## 射线追踪

```js
mc.world.rayTrace(5.0)                       // → {type:'block'|'entity'|'miss', x, y, z, ...}
```

返回 `maxDist` 格范围内的第一个命中结果，实体优先于方块。

## 世界状态

```js
mc.world.getBiomeAt(x, y, z)                 // → 'minecraft:plains'
mc.world.getLightLevel(x, y, z)              // → 0-15
mc.world.getDifficulty()                     // → 'peaceful/easy/normal/hard'
mc.world.getDimension()                      // → 'minecraft:overworld/nether/end'
```

## 玩家状态

```js
mc.player.getPlayerHealth()                   // → current HP
mc.player.getPlayerHunger()                   // → 0-20
mc.player.getPlayerArmor()                    // → armor value
mc.player.getAttackCooldown()                 // → 0.0-1.0
mc.player.getReachDistance()                  // → reach distance in blocks
mc.player.canReach(x, y, z)                   // → boolean (distance check)
mc.player.canSeeBlock(x, y, z)                // → boolean (line-of-sight check)
```

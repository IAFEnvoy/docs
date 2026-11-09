---
sidebar_position: 3
---

# 交互

## 破坏方块

```js
mc.player.breakBlock()               // break what you're looking at (waits until done)
mc.player.breakBlockAt(x, y, z)      // break specific coordinate (recommended)
```

推荐使用 `breakBlockAt` —— 它会找出最合适的击打面，并且不依赖准星位置。

## 放置方块

```js
mc.player.placeBlock()               // place where crosshair points (may drift)
mc.player.placeBlockAt(x, y, z)      // precise placement at target coordinate
mc.player.jumpAndPlaceBelow()        // jump up and place block under feet
```

`placeBlockAt` 会自动计算正确的面；完全无需考虑准星位置。

## 使用物品

```js
mc.player.use()                      // single right-click
mc.player.useItem(32)                // hold right-click for 32 ticks (eat/bow/shield)
mc.player.startUse()                 // start holding right-click
mc.player.stopUse()                  // release right-click
```

| 使用场景 | 代码 |
|----------|------|
| 进食 | `mc.player.useItem(32)` —— 约 1.6 秒 |
| 拉弓 | `mc.player.useItem(20)` —— 拉满 |
| 举盾 | `mc.player.startUse()` ... `mc.player.stopUse()` |

## 其他

```js
mc.player.attack()                   // left-click attack (void)
mc.player.swapHands()                // swap main/offhand (void)
mc.player.drop()                     // drop 1 from held stack (void)
mc.player.dropAll()                  // drop entire held stack (void)
mc.player.pickBlock()                // pick block — middle-click (void)
```

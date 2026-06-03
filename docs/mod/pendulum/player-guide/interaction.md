# Interaction

## Breaking Blocks

```js
mc.player.breakBlock()               // break what you're looking at (waits until done)
mc.player.breakBlockAt(x, y, z)      // break specific coordinate (recommended)
```

`breakBlockAt` is recommended — it finds the best face to hit and doesn't rely on crosshair position.

## Placing Blocks

```js
mc.player.placeBlock()               // place where crosshair points (may drift)
mc.player.placeBlockAt(x, y, z)      // precise placement at target coordinate
mc.player.jumpAndPlaceBelow()        // jump up and place block under feet
```

`placeBlockAt` computes the correct face automatically; ignore crosshair position entirely.

## Using Items

```js
mc.player.use()                      // single right-click
mc.player.useItem(32)                // hold right-click for 32 ticks (eat/bow/shield)
mc.player.startUse()                 // start holding right-click
mc.player.stopUse()                  // release right-click
```

| Use case | Code |
|----------|------|
| Eat food | `mc.player.useItem(32)` — ~1.6 seconds |
| Pull bow | `mc.player.useItem(20)` — full draw |
| Hold shield | `mc.player.startUse()` ... `mc.player.stopUse()` |

## Other

```js
mc.player.attack()                   // left-click attack (void)
mc.player.swapHands()                // swap main/offhand (void)
mc.player.drop()                     // drop 1 from held stack (void)
mc.player.dropAll()                  // drop entire held stack (void)
mc.player.pickBlock()                // pick block — middle-click (void)
```

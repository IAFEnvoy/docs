# Interaction

## Breaking Blocks

```js
mc.breakBlock()               // break what you're looking at (waits until done)
mc.breakBlockAt(x, y, z)      // break specific coordinate (recommended)
```

`breakBlockAt` is recommended — it finds the best face to hit and doesn't rely on crosshair position.

## Placing Blocks

```js
mc.placeBlock()               // place where crosshair points (may drift)
mc.placeBlockAt(x, y, z)      // precise placement at target coordinate
mc.jumpAndPlaceBelow()        // jump up and place block under feet
```

`placeBlockAt` computes the correct face automatically; ignore crosshair position entirely.

## Using Items

```js
mc.use()                      // single right-click
mc.useItem(32)                // hold right-click for 32 ticks (eat/bow/shield)
mc.startUse()                 // start holding right-click
mc.stopUse()                  // release right-click
```

| Use case | Code |
|----------|------|
| Eat food | `mc.useItem(32)` — ~1.6 seconds |
| Pull bow | `mc.useItem(20)` — full draw |
| Hold shield | `mc.startUse()` ... `mc.stopUse()` |

## Other

```js
mc.attack()                   // left-click attack
mc.swapHands()                // swap main/offhand
mc.drop()                     // drop 1 from held stack
mc.dropAll()                  // drop entire held stack
mc.pickBlock()                // pick block (middle-click)
```

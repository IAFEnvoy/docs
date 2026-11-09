---
sidebar_position: 2
---

# Movement & Rotation

## Basic Movement

Call without arguments to hold the key; call with ticks for timed auto-stop.

```js
mc.player.forward(20)    // walk forward 20 ticks (~1s), auto-stop
mc.player.forward()      // hold forward until stop()
mc.player.stop()         // release all movement keys
```

| Function | Effect |
|----------|--------|
| `mc.player.forward(ticks?)` | Walk forward |
| `mc.player.back(ticks?)` | Walk backward |
| `mc.player.left(ticks?)` | Strafe left |
| `mc.player.right(ticks?)` | Strafe right |
| `mc.player.stop()` | Release ALL keys |

```js
// Walk in a square
mc.player.forward(40)
mc.player.right(40)
mc.player.back(40)
mc.player.left(40)
```

## Vertical

```js
mc.player.jump()         // single jump
mc.player.jump(true)     // hold jump (continuous bouncing)
mc.player.stop()         // release
mc.player.sneak()        // start sneaking
mc.player.sneak(false)   // stop sneaking
mc.player.sprint()       // start sprinting
mc.player.stopSprint()   // stop sprinting specifically
```

## Rotation

```js
mc.player.lookAt(x, y, z)           // face a coordinate immediately
mc.player.setYaw(90)                // face east
mc.player.setPitch(-45)             // look down 45°
let yaw = mc.player.getYaw()        // current yaw in degrees
let pitch = mc.player.getPitch()    // current pitch in degrees
```

## Position

```js
let x = mc.player.getX()            // player X coordinate
let y = mc.player.getY()            // player Y (feet)
let z = mc.player.getZ()            // player Z coordinate
```

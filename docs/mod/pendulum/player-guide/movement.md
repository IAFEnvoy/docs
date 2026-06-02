# Movement & Rotation

## Basic Movement

Call without arguments to hold the key; call with ticks for timed auto-stop.

```js
mc.forward(20)    // walk forward 20 ticks (~1s), auto-stop
mc.forward()      // hold forward until stop()
mc.stop()         // release all movement keys
```

| Function | Effect |
|----------|--------|
| `mc.forward(ticks?)` | Walk forward |
| `mc.back(ticks?)` | Walk backward |
| `mc.left(ticks?)` | Strafe left |
| `mc.right(ticks?)` | Strafe right |
| `mc.stop()` | Release ALL keys (forward/back/left/right/jump/sneak) |

```js
// Walk in a square
mc.forward(40)
mc.right(40)
mc.back(40)
mc.left(40)
```

## Vertical

```js
mc.jump()         // single jump
mc.jump(true)     // hold jump (continuous bouncing)
mc.stop()         // release
mc.sneak()        // start sneaking
mc.sneak(false)   // stop sneaking
mc.sprint()       // start sprinting
mc.stopSprint()   // stop sprinting specifically
```

## Rotation

```js
mc.lookAt(x, y, z)           // face a coordinate immediately
mc.setYaw(90)                // face east
mc.setPitch(-45)             // look down 45°
let yaw = mc.getYaw()        // current yaw in degrees
let pitch = mc.getPitch()    // current pitch in degrees
```

## Position

```js
let x = mc.getX()            // player X coordinate
let y = mc.getY()            // player Y (feet)
let z = mc.getZ()            // player Z coordinate
```

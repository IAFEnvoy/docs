---
sidebar_position: 2
---

# 移动与转向
## 基础移动

不带参数调用会一直按住按键；带游戏刻调用则会在到时间后自动停止。

```js
mc.player.forward(20)    // walk forward 20 ticks (~1s), auto-stop
mc.player.forward()      // hold forward until stop()
mc.player.stop()         // release all movement keys
```

| 函数 | 效果 |
|----------|--------|
| `mc.player.forward(ticks?)` | 向前行走 |
| `mc.player.back(ticks?)` | 向后行走 |
| `mc.player.left(ticks?)` | 向左平移 |
| `mc.player.right(ticks?)` | 向右平移 |
| `mc.player.stop()` | 松开所有按键 |

```js
// Walk in a square
mc.player.forward(40)
mc.player.right(40)
mc.player.back(40)
mc.player.left(40)
```

## 垂直移动

```js
mc.player.jump()         // single jump
mc.player.jump(true)     // hold jump (continuous bouncing)
mc.player.stop()         // release
mc.player.sneak()        // start sneaking
mc.player.sneak(false)   // stop sneaking
mc.player.sprint()       // start sprinting
mc.player.stopSprint()   // stop sprinting specifically
```

## 旋转

```js
mc.player.lookAt(x, y, z)           // face a coordinate immediately
mc.player.setYaw(90)                // face east
mc.player.setPitch(-45)             // look down 45°
let yaw = mc.player.getYaw()        // current yaw in degrees
let pitch = mc.player.getPitch()    // current pitch in degrees
```

## 位置

```js
let x = mc.player.getX()            // player X coordinate
let y = mc.player.getY()            // player Y (feet)
let z = mc.player.getZ()            // player Z coordinate
```

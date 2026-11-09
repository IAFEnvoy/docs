---
sidebar_position: 7
---

# Baritone API

:::info
Requires Baritone mod installed. `baritone` / `br` global object.
:::

## Pathfinding

```js
br.goto(x, y, z)                       // walk to coordinates
br.goal(x, y, z)                       // set goal (use path() to start)
br.path()                              // start pathing to current goal
br.come()                              // come to your camera position
br.surface()                           // return to surface
br.axis()                              // go to nearest axis (X=0 or Z=0)
br.thisWay()                           // go in facing direction
```

## Mining & Digging

```js
br.mine('diamond_ore', 64)             // automated mining with count
br.mine('coal_ore')                    // unlimited mining
br.tunnel()                            // dig a 1×2 tunnel
```

## Farming & Exploring

```js
br.farm(100)                           // auto-harvest crops, range=100
br.explore()                           // explore new chunks
br.getToBlock('minecraft:chest')       // walk to nearest chest
```

## Following & Items

```js
br.follow('minecraft:pig')             // follow entity type
br.follow()                            // follow any player
br.pickup()                            // collect nearby drops
```

## Building

```js
br.build('house.schematic')            // build from schematics file
br.build('house.schematic', 0, 64, 0)  // with origin
br.litematica()                        // build current Litematica schematic
```

## Control

```js
br.stop()                              // cancel everything
br.cancel()                            // same as stop()
br.forceCancel()                       // force cancel
br.pause()                             // pause current task
br.resume()                            // resume paused task
br.isActive()                          // → boolean (is pathing?)
br.isPaused()                          // → boolean
br.paused()                            // → boolean (alias)
```

## Selections

```js
br.selPos1()                           // set pos1 to current position
br.selPos1(x, y, z)                    // set pos1 to coordinates
br.selPos2()                           // set pos2 to current position
br.selPos2(x, y, z)                    // set pos2 to coordinates
br.select(x1,y1,z1, x2,y2,z2)         // set 3D selection
br.clearSelection()                    // clear all selections
```

## Settings & Commands

```js
br.setting('allowBreak', true)         // toggle baritone setting
br.command('mine diamond_ore 64')      // run raw baritone command
```

## Waypoints & Home

```js
br.waypointSave('farm')                // save current position
br.waypointList()                      // list all waypoints
br.waypointDelete('farm')              // delete waypoint
br.sethome()                           // set home position
br.home()                              // pathfind to home
```

## Info & Tools

```js
br.find('diamond_ore')                 // search world cache
br.blacklist()                         // blacklist crosshair block
br.proc()                              // show current process info
br.eta()                               // estimated time to arrival
br.version()                           // baritone version
br.repack()                            // re-cache chunks
br.gc()                                // release memory
br.invert()                            // invert goal (go away from target)
br.render()                            // fix chunk rendering
br.reloadAll()                         // reload world cache
br.saveAll()                           // save world cache
br.elytra()                            // elytra flight mode
```

> **Tip:** When in doubt, prefer `br.*` over manual movement. Baritone handles pathfinding, obstacle avoidance, and mining far more efficiently than scripted `mc.forward()` calls.

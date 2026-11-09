---
sidebar_position: 1
---

# API Reference

Pendulum exposes JavaScript API through grouped objects. All functions are synchronous — they block until the in-game action completes.

## API Objects

| Object | Alias | Purpose |
|--------|-------|---------|
| [mc.player](movement) | — | Movement, rotation, interaction, player state |
| [mc.world](world-query) | — | Block/entity/environment queries |
| [mc.inv](inventory-gui) | — | Inventory & container operations |
| [mc.gui](gui-interaction) | — | Screen-level GUI interaction |
| [baritone](baritone) | `br` | Pathfinding, mining, farming, building (optional) |
| `mc` | `minecraft`, `game` | Chat, commands, script control |

## mc (Root Utilities)

```js
mc.say('Hello!')                  // send public chat message (void)
mc.log('Done.')                   // log to action bar (void)
mc.executeCommand('/gamemode 1')  // run client command (void)
mc.waitTick(20)                   // pause 20 ticks (~1s)
mc.execFile('farm.js')            // run script file
mc.getScriptDir()                 // → full path to .minecraft/pendulum/
mc.help()                         // display API help in chat
```

## console

```js
console.log('Debug:', mc.player.getX());
```

Output appears in the Minecraft log AND the MCP eval return string.

## Quick Reference

```js
// Movement
mc.player.forward(20)          // walk forward 20 ticks
mc.player.lookAt(100, 64, 0)  // face a coordinate
mc.player.jump()               // single jump
mc.player.sneak()              // start sneaking

// Interaction
mc.player.breakBlockAt(x,y,z)  // break specific block
mc.player.placeBlockAt(x,y,z)  // place at exact coord
mc.player.useItem(32)          // eat / draw bow / shield
mc.player.attack()             // left-click attack

// World
mc.world.findBlocks('diamond_ore', 16)   // sphere search
mc.world.rayTrace(5)                     // ray trace
mc.world.getNearbyEntities(10)           // nearby mobs
mc.world.getBiomeAt(x,y,z)              // biome name

// Inventory
mc.inv.selectHotbar(3)                  // select hotbar slot
mc.inv.hasItem('diamond', 5)            // has 5 diamonds?
mc.inv.getAllItems()                     // full inventory

// GUI
mc.gui.click(100, 200)                  // screen click
mc.gui.clickButton('Done')              // click by text
mc.gui.typeText('hello', true)          // type + Enter
mc.gui.getElements()                    // widget tree
```

## All Functions

- [mc.player — Movement & Interaction](movement)
- [mc.world — World Query](world-query)
- [mc.inv — Inventory & Container](inventory-gui)
- [mc.gui — Screen Interaction](gui-interaction)
- [Baritone API](baritone)

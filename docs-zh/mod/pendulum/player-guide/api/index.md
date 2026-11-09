---
sidebar_position: 1
---

# API 参考

Pendulum 通过分组对象暴露 JavaScript API。所有函数都是同步的 —— 它们会阻塞，直到游戏内动作完成。

## API 对象

| 对象 | 别名 | 用途 |
|--------|-------|---------|
| [mc.player](movement) | — | 移动、旋转、交互、玩家状态 |
| [mc.world](world-query) | — | 方块/实体/环境查询 |
| [mc.inv](inventory-gui) | — | 物品栏与容器操作 |
| [mc.gui](gui-interaction) | — | 屏幕级 GUI 交互 |
| [baritone](baritone) | `br` | 寻路、挖掘、耕作、建造（可选） |
| `mc` | `minecraft`, `game` | 聊天、命令、脚本控制 |

## mc（根工具）

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

输出会出现在 Minecraft 日志以及 MCP eval 返回字符串中。

## 快速参考

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

## 全部函数

- [mc.player — 移动与交互](movement)
- [mc.world — 世界查询](world-query)
- [mc.inv — 物品栏与容器](inventory-gui)
- [mc.gui — 屏幕交互](gui-interaction)
- [Baritone API](baritone)

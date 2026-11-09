---
sidebar_position: 2
---

# Pendulum 智能体 API 参考

> **面向通过 Pendulum 的 MCP 服务器控制 Minecraft 的 AI 智能体（Copilot、Claude 等）。**
>
> 使用 `pendulum_eval` 执行 JavaScript 代码。从 JS 的角度看，所有函数都是同步的 —— 它们会阻塞，直到动作在游戏内完成。

import Download from '@site/src/components/Download';

<Download filePath="pendulum/AGENT.md">下载此文件</Download>

---

## MCP 工具

| 工具 | 参数 | 返回 | 说明 |
|------|-----------|---------|-------|
| `pendulum_eval` | `code: string` | 执行结果 | **返回最后一个表达式的值。** `console.log()` 的输出会进入 MCP 返回值。 |
| `pendulum_screenshot` | none | 带**坐标网格**的 base64 PNG | 100px 网格 + 边缘标尺 |
| `pendulum_screenshot_to_file` | `path?: string` | `{file, size}` | 保存到磁盘 |
| `pendulum_enumerate_widgets` | none | `[{type,text?,x,y,w,h,active?,focused?,children?}]` | **递归**控件树 |
| `pendulum_gui_elements` | none | `[{type,x,y,w,h,text?}]` | 扁平列表（旧版） |
| `pendulum_click` | `x,y,button?` | 确认 | 按屏幕坐标点击 |
| `pendulum_click_button` | `target` | `{clicked,widget,x,y}` | 按文本查找按钮并点击 |
| `pendulum_press_key` | `key,hold_seconds?` | 确认 | 键盘注入 |
| `pendulum_type_text` | `text,press_enter?` | 确认 | 向获得焦点的输入框输入文本 |
| `pendulum_paste_text` | `text,press_enter?` | 确认 | 快速文本输入 |
| `pendulum_scroll` | `clicks` | 确认 | 鼠标滚轮 |
| `pendulum_hotkey` | `keys`（例如 `"ctrl,s"`） | 确认 | 按键组合 |
| `pendulum_mouse_drag` | `x_start,y_start,x_end,y_end,button?` | 确认 | 拖拽鼠标 |
| `pendulum_wait` | `seconds?: number` | 确认 | 等待 N 秒 |
| `pendulum_call_screen_method` | `method` | `{called,method,screen,result}` | ⚠️ 高风险 —— 在屏幕上进行反射调用 |
| `pendulum_select_list_item` | `text` | `{selected,text,x,y}` | 按文本选择下拉项 |
| `pendulum_video_start` | none | 确认 | ⚡ 实验性 —— 开始约 10fps 的捕获 |
| `pendulum_video_stop` | none | 确认 | 停止视频捕获 |
| `pendulum_video_frame` | none | 最新帧 PNG 或错误 | ⚡ 获取缓存帧（距今 < 5 秒） |
| `pendulum_status` | none | `"idle"` / `"running"` | 运行前先检查 |
| `pendulum_abort` | none | — | 终止正在运行的脚本 |

**重要**：同一时间只能运行一个脚本。先检查 `pendulum_status`；如果正在运行，使用 `pendulum_abort`。

---

## GUI 工作流程（推荐）

```
1. pendulum_screenshot        → see screen with coordinate grid
2. pendulum_enumerate_widgets → get widget tree with positions
3. pendulum_click_button("Done") → click by text (preferred)
   OR pendulum_click(x, y)   → click by coordinate from grid
4. pendulum_type_text         → type + Enter
5. pendulum_screenshot        → verify result
```

### 高级 GUI 工具

```
pendulum_wait(1.0)              → wait between actions
pendulum_select_list_item("English") → choose from dropdown
pendulum_call_screen_method("onClose") → ⚠️ direct screen method call
```

---

## MCP 调用日志

所有 MCP 工具调用都会**自动记录**到 `pendulum/logs/mcp_calls.jsonl`。
每一行是一个 JSON 对象：`{timestamp, tool, duration_ms, error, params?, result_preview?}`。
这取代了实时 SSE 流和 Web 调试面板 ——
你可以在会话结束后查看日志文件，了解 AI 智能体做了什么。

---

## 视频帧捕获 ⚡

:::warning
**实验性 —— 谨慎使用。** 每 6 帧读取一次 GPU 帧缓冲的开销很高。
除非需要观察连续运动，否则优先使用 `pendulum_screenshot` 获取单张截图。
:::

| 工具 | 说明 |
|------|-------------|
| `pendulum_video_start` | 开始约 10fps 的捕获（每 6 刻一帧） |
| `pendulum_video_frame` | 以 base64 PNG 获取最新的缓存帧 |
| `pendulum_video_stop` | 停止捕获并释放资源 |

**使用场景**：观察实体移动、掉落物、方块破坏动画，或任何短暂的连续动作。

---

## 全局对象

| 对象 | 别名 | 用途 |
|--------|---------|---------|
| `minecraft` | `mc`, `game` | 聊天、命令、脚本控制（`say`、`executeCommand`、`waitTick` 等） |
| `mc.player` | — | 移动、旋转、交互、玩家状态 |
| `mc.world` | — | 方块/实体/环境查询 |
| `mc.inv` | — | 物品栏与容器操作 |
| `mc.gui` | — | 屏幕级 GUI：点击、输入、按键、枚举控件 |
| `baritone` | `br` | Baritone 寻路、挖掘、建造（可选） |
| `console` | — | `console.log(...)` → 游戏日志以及 MCP 返回值 |

---

## 返回值与 `console.log()`

**大多数 `mc.*` 函数都会返回一个值。** 移动/按住类函数（`forward`、`back`、`jump`、`sneak`、`sprint`、`startUse`、`stopUse`）以及部分动作（`use`、`attack`、`say`、`log`）为 `void`。其余函数返回 `boolean` 或查询数据。

使用返回值检查是否成功：

```js
mc.player.forward(20)                           // void — always starts walking
if (mc.player.placeBlockAt(x, y, z)) { /* block placed */ }
if (!mc.inv.hasItem('diamond', 5)) { /* check before acting */ }
```

**通用规律：**
- **移动（按住）** → `void`（发出后即返回，无返回值）
- **移动（限时）、交互** → `boolean`（`true` = 已开始，`false` = 玩家为 null / 权限被拒绝）
- **查询** → `String`、`number`、`boolean` 或 `[{...}]` 数组
- **GUI 点击** → `boolean`（`false` = 没有打开 GUI / 无玩家）
- **聊天** → `void`（`say`/`log` 发出后即返回）

**`console.log()` 会被捕获：** 任何 `console.log(...)` 输出都会出现在 MCP 的 `pendulum_eval` 返回值中。可用于调试：

```js
console.log("Found", mc.world.findBlocks("diamond_ore", 8).length, "diamond ores");
```

MCP 返回值会显示：`"Found 3 diamond ores"`

---

## 移动与旋转

### 方向性移动

```js
mc.player.forward(20)    // walk forward 20 ticks, then auto-stop (void)
mc.player.forward()      // hold forward indefinitely (void — use mc.player.stop() to release)
mc.player.back(ticks?)   // backward
mc.player.left(ticks?)   // strafe left
mc.player.right(ticks?)  // strafe right
mc.player.stop()         // release ALL movement keys (void)
```

**建议**：当使用 Baritone 走向目标时，优先使用 `br.goto()`。仅在需要微调时使用手动移动。

### 垂直移动

```js
mc.player.jump()         // single jump
mc.player.jump(true)     // hold jump key (continuous bouncing)
mc.player.sneak()        // start sneaking
mc.player.sneak(false)   // stop
mc.player.sprint()       // start sprinting
mc.player.stopSprint()   // stop sprinting
```

### 旋转

```js
mc.player.lookAt(x, y, z)           // instantly face a coordinate
mc.player.setYaw(degrees)           // set horizontal rotation (0=south, 90=west, 180=north, -90=east)
mc.player.setPitch(degrees)         // set vertical rotation (-90=up, 90=down)
mc.player.getYaw() → number        // current yaw
mc.player.getPitch() → number      // current pitch
```

**重要**：`mc.player.lookAt()` 会立即同时设置玩家旋转和 PlayerSimulator 的旋转。其他旋转函数不会有动画 —— 它们会瞬间跳转到目标角度。

### 位置

```js
mc.player.getX() → number        // X coordinate (double)
mc.player.getY() → number        // Y coordinate (feet level)
mc.player.getZ() → number        // Z coordinate (double)
```

---

## 交互

### 破坏方块

```js
mc.player.breakBlock() → boolean              // break block under crosshair; waits until done
mc.player.breakBlockAt(x, y, z) → boolean     // break specific coordinate (RECOMMENDED)
```

**优先使用 `breakBlockAt`**，而不是 `breakBlock`。它会根据玩家位置计算最合适的击打面，而且不依赖准星瞄准。它是同步的 —— JS 线程会阻塞，直到方块被破坏或超时。

### 放置方块

```js
mc.player.placeBlock() → boolean              // place on crosshair target (unreliable)
mc.player.placeBlockAt(x, y, z) → boolean     // place at exact coordinate (RECOMMENDED)
mc.player.jumpAndPlaceBelow() → boolean       // jump up, look down, place block under feet
```

**警告**：由于准星漂移，`mc.player.placeBlock()` 并不可靠。**始终使用 `mc.player.placeBlockAt(x, y, z)`** 进行精确放置。它会自动找到最合适的相邻面进行点击。

`mc.player.jumpAndPlaceBelow()` 专为搭建平台设计：
1. 跳起
2. 垂直向下看（pitch=90）
3. 在脚下位置放置方块
4. 返回 true/false

### 物品使用（进食 / 弓 / 盾）

```js
mc.player.use()                               // single right-click (one-shot)
mc.player.useItem(ticks) → boolean            // hold right-click for N ticks, then release
mc.player.startUse()                          // start holding right-click
mc.player.stopUse()                           // release right-click
```

**推荐用法**：简单场景使用 `mc.useItem(N)`：

```js
mc.player.useItem(32)  // eat food (~1.6s)
mc.player.useItem(20)  // full draw bow (~1s)
mc.player.useItem(100) // hold shield for 5s
```

### 战斗

```js
mc.player.attack()                            // left-click attack (void)
```

需要 `allowAttack` 权限（配置项）。启用 `syncUseAttack` 时内置冷却（等待 2 刻）。

### 其他

```js
mc.player.swapHands()                         // swap main ↔ offhand
mc.player.drop()                              // drop 1 item from held stack
mc.player.dropAll()                           // drop entire held stack
mc.player.pickBlock()                         // pick block — middle-click (void)
```

---

## 物品栏

### 快捷栏

```js
mc.inv.selectHotbar(slot)                  // select slot 1-9
mc.inv.getSelectedSlot() → number         // current hotbar slot (1-9)
```

### 物品查询

```js
mc.inv.hasItem('minecraft:diamond', 64) → boolean   // has at least N items?
mc.inv.getItemInHand() → {id, count, maxCount, durability, maxDurability, name}
mc.inv.getItemOffhand() → same
mc.inv.getItemInSlot(slot) → same                   // slot 0-35
mc.inv.getAllItems() → [{slot, id, count, maxCount, durability, maxDurability, name}]
```

**重要**：`mc.getAllItems()` 会跳过空槽位。`slot` 字段是物品栏的原始索引（0-8 快捷栏，9-35 物品栏，36-39 盔甲，40 副手）。

**检查/选择材料的范例**：
```js
// Check if we have enough material
if (!mc.inv.hasItem('minecraft:white_concrete', 82)) {
    mc.log('Not enough concrete!');
} else {
    // Find which hotbar slot has it
    let items = mc.inv.getAllItems();
    for (let item of items) {
        if (item.id === 'minecraft:white_concrete' && item.slot < 9) {
            mc.inv.selectHotbar(item.slot + 1);
            break;
        }
    }
}
```

---

## GUI 操作

```js
mc.isGuiOpen() → boolean               // is any screen open?
mc.getGuiTitle() → string              // current screen title
mc.closeGui()                          // close current screen

mc.getContainerSize() → number         // total slots in container
mc.getContainerType() → string         // 'chest'|'crafting_table'|'furnace'|'enchanting'|'anvil'|'container'|'unknown'|'none'
mc.getContainerItem(slot) → {id, ...}  // item at container slot
mc.getContainerAllItems() → [{slot, id, count, ...}]  // all non-empty container slots
```

### 点击槽位

```js
mc.clickSlot(slotId)                   // left-click slot (raw container index)
mc.clickSlot(slotId, 0)                // explicit left-click
mc.clickSlotRight(slotId)              // right-click = click with button=1
mc.moveItem(fromSlot, toSlot)          // pick up from fromSlot, place at toSlot
mc.quickMoveItem(slotId)              // shift-click (move between container ↔ inventory)
```

### 合成

```js
mc.craft()                             // click result slot (craft 1)
mc.craftAll()                          // shift-click result (craft max possible)
```

### GUI 元素

```js
mc.getGuiElements() → [{type, x, y, width, height, text?, id?}]
```

返回所有可见的非槽位控件（按钮、标签、文本框）。适用于：
- 在不了解界面布局的情况下操作菜单
- 按文本或位置查找特定按钮
- 了解当前 UI 状态

---

## GUI 与屏幕输入（`mc.gui.*`）—— 新增！

对于需要与 GUI 界面（暂停菜单、设置、聊天、服务器列表等）交互的脚本，请使用 `mc.gui` 子对象。

### 屏幕信息

```js
mc.gui.isOpen() → boolean              // is a GUI screen open?
mc.gui.getTitle() → string             // screen title ('' if none)
mc.gui.close()                         // close screen (void)
mc.gui.openChat()                      // open chat input (void)
```

### 枚举控件

```js
mc.gui.getElements() → [{type, text?, x, y, width, height, active?, focused?, children?}]
```

递归枚举当前屏幕上的所有控件，包括嵌套的子控件。每个控件都有类型、边界、文本、启用/聚焦状态。

### 屏幕级鼠标

```js
mc.gui.click(x, y)                     // left-click at screen pixel
mc.gui.click(x, y, 'right')            // right-click
mc.gui.click(x, y, 'middle')           // middle-click
mc.gui.clickButton('Done')             // find button by text & click center → JSON
mc.gui.mouseDrag(x1,y1, x2,y2)         // drag with left button
mc.gui.mouseDrag(x1,y1, x2,y2, 'right') // right-button drag
mc.gui.scroll(3)                       // scroll up 3 clicks
mc.gui.scroll(-5)                      // scroll down 5 clicks
```

### 屏幕级键盘

```js
mc.gui.pressKey('ESC')                 // press & release
mc.gui.pressKey('W', 1.0)              // hold for 1 second
mc.gui.typeText('Hello', true)         // type + Enter
mc.gui.pasteText('long text', true)    // fast input + Enter
mc.gui.hotkey('ctrl,s')                // Ctrl+S
mc.gui.hotkey('shift,f3')              // Shift+F3
```

**AI 智能体的工作流程**：`pendulum_screenshot` → 从网格中确定目标 → `pendulum_click_button("text")` → `pendulum_screenshot` 验证。已知按钮文本时，优先使用 `clickButton` 而不是 `click(x,y)`。

### 容器操作（通过 mc.gui）

```js
mc.gui.getType() → string              // 'chest'|'crafting_table'|...
mc.gui.getSlotCount() → number
mc.gui.getSlotItem(slot) → {id,count,...}
mc.gui.getAllItems() → [{slot,id,count,...}]
mc.gui.clickSlot(slotId)               // left-click
mc.gui.clickSlotRight(slotId)          // right-click
mc.gui.craft() / mc.gui.craftAll()     // crafting
mc.gui.moveItem(from, to)              // pick up & place
mc.gui.quickMoveItem(slot)             // shift-click
```

---

## 世界查询

### 方块查询

```js
mc.world.getBlock(x, y, z) → string               // full block ID, e.g. 'minecraft:dirt'
mc.world.isBlock(x, y, z, 'blockId') → boolean    // exact match
mc.world.isBlockByTag(x, y, z, 'tag') → boolean   // tag match
mc.world.getBlockState(x, y, z) → {id, properties: {key: value, ...}}
```

### 方块搜索

```js
mc.world.findBlocks('blockId', radius?) → [{x, y, z}]     // sphere search (default radius=16)
mc.world.findBlocksByTag('tag', radius?) → [{x, y, z}]     // tag-based sphere search
mc.world.findBlocksInBox(x1,y1,z1, x2,y2,z2, 'blockId'?) → [{x, y, z, block?}]
```

**性能提示**：`findBlocks` 会扫描一个三维球体。`radius=16` 即 32^3 ≈ 32K 个方块。半径较大时，可能需要几刻才能完成。如果在 `findBlocksInBox` 中省略 `blockId`，它会返回盒内所有非空气方块。

### 准星与射线追踪

```js
mc.world.facingBlock('blockId') → boolean     // is crosshair on this block?
mc.world.facingEntity('entityType') → boolean // is crosshair on this entity type?
mc.world.getFacingBlock() → string           // block ID or ''
mc.world.getLookingEntity() → {type, name, x, y, z, distance, health?, maxHealth?, isAlive?}
mc.world.rayTrace(maxDist?) → {type:'block'|'entity'|'miss', x, y, z, face?, entityName?, ...}
```

`rayTrace` 返回**第一个**命中结果 —— 实体先于方块被检查。

### 实体检测

```js
mc.world.getNearbyPlayers(radius) → [{name, x, y, z, distance}]
mc.world.getNearbyEntities(radius) → [{name, type, x, y, z, distance}]
mc.world.getNearbyEntities(radius, 'entityType')  // filtered
```

### 世界状态

```js
mc.getBiomeAt(x, y, z) → string        // 'minecraft:plains'
mc.getLightLevel(x, y, z) → number     // 0-15
mc.getDifficulty() → string            // 'peaceful'|'easy'|'normal'|'hard'
mc.getDimension() → string             // 'minecraft:overworld'|'nether'|'end'
```

### 玩家状态

```js
mc.getPlayerHealth() → number               // current HP (0-20)
mc.getPlayerHunger() → number               // food level (0-20)
mc.getPlayerArmor() → number                // armor value
mc.getAttackCooldown() → number             // 0.0-1.0
mc.getReachDistance() → number              // reach in blocks
mc.canReach(x, y, z) → boolean              // distance check only
mc.canSeeBlock(x, y, z) → boolean           // ray trace check (no obstruction)
```

---

## 聊天与控制

```js
mc.say(message)                        // send public chat message (disabled if allowSay=false)
mc.log(message)                        // display in action bar with [Pendulum] prefix
console.log(message)                   // log to game console
mc.executeCommand('/command')          // run client command (disabled if allowExecuteCommand=false)
```

**重要**：`say` 和 `executeCommand` 都受配置权限控制。如果被禁用，它们会显示警告，但不会崩溃。

```js
mc.waitTick()                          // pause 1 game tick (~50ms)
mc.waitTick(N)                         // pause N ticks
mc.execFile('path.js')                 // execute another script file
mc.getScriptDir() → string            // absolute path to .minecraft/pendulum/
mc.help()                              // display full API help in chat
```

---

## Baritone API（`br.*`）

> 需要安装 Baritone 模组。如果未安装 Baritone，所有函数都会抛出异常。

### 移动与寻路

```js
br.goto(x, y, z)                       // pathfind to coordinates (starts immediately)
br.goal(x, y, z)                       // set goal (then use path() to start)
br.goal()                              // set goal to current position
br.goal(clear)                         // actually: br.command('goal clear')
br.path()                              // start pathing to current goal
br.come()                              // come to player camera
br.surface()                           // return to surface (highest air space)
br.axis()                              // go to nearest axis X=0 or Z=0 at y=120
br.thisWay()                           // go in facing direction
br.elytra()                            // elytra flight mode
```

**安全导航的用法**：
```js
br.goto(x, y, z);                      // start pathfinding
while (br.isActive()) { mc.waitTick(10); }  // wait until arrival
```

### 挖掘

```js
br.mine('blockId')                     // mine unlimited
br.mine('blockId', count)             // mine specified count
br.tunnel()                           // dig 1×2 tunnel in facing direction
```

### 耕作与探索

```js
br.farm(range?)                        // auto-harvest crops (default range=100)
br.explore()                           // explore new chunks
br.getToBlock('blockId')              // walk to nearest instance of a block
br.invert()                           // invert goal (go away from target)
```

### 跟随与物品

```js
br.follow('entityType')                // follow entity type
br.follow()                           // follow any player
br.pickup()                           // collect nearby dropped items
br.click()                            // click destination (must face target first)
```

### 建造

```js
br.build('schematicName')              // build from schematics/file.schematic
br.build('name', x, y, z)             // build with origin offset
br.litematica()                       // build current Litematica schematic
```

建造用的蓝图文件放在 `.minecraft/schematics/`。

### 控制

```js
br.stop()                             // cancel everything
br.cancel()                           // same as stop()
br.forceCancel()                      // force cancel
br.pause()                            // pause current task
br.resume()                           // resume paused task
br.isActive() → boolean               // is pathing or working?
br.isPaused() → boolean              // is paused?
br.paused() → boolean                // alias for isPaused()
```

### 选区

```js
br.select(x1,y1,z1, x2,y2,z2)        // box selection
br.selPos1()                          // pos1 = current position
br.selPos1(x, y, z)                  // pos1 = coordinates
br.selPos2()                          // pos2 = current position
br.selPos2(x, y, z)                  // pos2 = coordinates
br.clearSelection()                   // clear all selections
```

### 设置与命令

```js
br.setting('key', value)              // change baritone setting
br.command('full baritone command')   // execute any baritone command string
```

### 路径点与家

```js
br.waypointSave('name')               // save current pos
br.waypointList()                     // list all waypoints
br.waypointDelete('name')            // delete waypoint
br.sethome()                          // set home position
br.home()                             // pathfind to home
```

### 信息与工具

```js
br.find('blockId')                    // search world cache for block
br.blacklist()                        // blacklist crosshair block from pathfinding
br.proc()                             // show process info
br.eta()                              // estimated time to arrival
br.version()                          // baritone version
br.repack()                           // re-cache surrounding chunks
br.gc()                               // garbage collect
br.render()                           // fix glitched chunk rendering
br.reloadAll()                        // reload world cache
br.saveAll()                          // save world cache to disk
```

---

## AI 智能体的关键模式

### 模式 1：始终先检查状态

```js
// Don't run if a script is already executing
// Use pendulum_status tool first, then:
mc.getX() + ', ' + mc.getZ()  // quick non-blocking check
```

### 模式 2：移动优先使用 Baritone

```js
// GOOD: let Baritone handle pathfinding
br.goto(targetX, targetY, targetZ);
while (br.isActive()) { mc.waitTick(10); }

// BAD: manual movement (no obstacle avoidance)
mc.lookAt(targetX, targetY, targetZ);
mc.forward(100);
```

### 模式 3：建造前先扫描

```js
// Always check what blocks exist at target positions
let existing = mc.findBlocksInBox(x1, y1, z1, x2, y2, z2);
if (existing.length > 0) {
    // Decide: break them or adjust plan
    for (let b of existing) mc.breakBlockAt(b.x, b.y, b.z);
}
```

### 模式 4：自动补充快捷栏

```js
// When placing many blocks, auto-switch slots when running out
let concreteSlots = [1, 2, 3, 4, 5, 6, 7]; // hotbar slots with concrete
let slotIdx = 0;
mc.selectHotbar(concreteSlots[slotIdx]);
for (let pos of positions) {
    let hand = mc.getItemInHand();
    if (hand.count < 2) {
        slotIdx++;
        mc.selectHotbar(concreteSlots[slotIdx]);
    }
    mc.placeBlockAt(pos[0], pos[1], pos[2]);
    mc.waitTick(2);
}
```

### 模式 5：有结构的建造顺序

按以下顺序建造，可最大限度减少被阻挡的放置：
1. **先铺地面** —— 你可以在上面行走
2. **由外向内建墙** —— 沿外围走动
3. **最后建天花板** —— 从内部或安全位置放置

### 模式 6：等待 Baritone 完成

```js
// Always poll isActive() after starting a Baritone task
br.goto(x, y, z);
while (br.isActive()) { mc.waitTick(10); }
// Now at the destination — safe to do the next action
```

---

## 受权限控制的函数

以下函数需要启用对应的配置权限：

| 函数 | 配置键 |
|----------|------------|
| `mc.breakBlock`, `mc.breakBlockAt` | `allowBreak` |
| `mc.placeBlock`, `mc.placeBlockAt`, `mc.jumpAndPlaceBelow` | `allowPlace` |
| `mc.attack` | `allowAttack` |
| `mc.say` | `allowSay` |
| `mc.executeCommand` | `allowExecuteCommand` |

如果被禁用，这些函数会静默失败或显示警告。

---

## 错误处理

- **JS 语法错误** → 以错误字符串形式返回在 MCP 结果中
- **未安装 Baritone** → `RuntimeException`，附带已翻译的错误消息
- **线程中断** → 脚本中止，所有任务被清空，PlayerSimulator 重置
- **破坏方块超时** → `breakBlock()` 在 `breakTimeout` 刻后返回 `false`（可配置）

---

## 线程模型

- JS 在**单个守护线程**（`Pendulum-Script`）中执行
- MC API 调用通过并发队列提交到**游戏线程**
- `submitToGameThread` 会阻塞 JS 线程，直到游戏线程完成
- `runOnGameThread` 发出后即返回（用于移动标志、`startUse` 等）
- `waitTicks(N)` 让 JS 线程休眠；游戏线程通过 PlayerSimulator 驱动移动/破坏

**单脚本保证**：同一时间只运行一个脚本。这避免了竞态条件，但也意味着你必须小心地管理顺序任务。

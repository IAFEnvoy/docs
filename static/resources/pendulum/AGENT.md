# Pendulum Agent API Reference

> **For AI agents (Copilot, Claude, etc.) controlling Minecraft via Pendulum's MCP server.**
>
> Use `pendulum_eval` to execute JavaScript code. All functions are synchronous from the JS perspective — they block until the action completes in-game.

---

## MCP Tools

| Tool | Parameters | Returns | Notes |
|------|-----------|---------|-------|
| `pendulum_eval` | `code: string` | Execution result | **Last expression value returned.** `console.log()` goes to MCP return. |
| `pendulum_screenshot` | none | Base64 PNG with **coordinate grid** | 100px grid + edge rulers |
| `pendulum_screenshot_to_file` | `path?: string` | `{file, size}` | Save to disk |
| `pendulum_enumerate_widgets` | none | `[{type,text?,x,y,w,h,active?,focused?,children?}]` | **Recursive** widget tree |
| `pendulum_gui_elements` | none | `[{type,x,y,w,h,text?}]` | Flat list (legacy) |
| `pendulum_click` | `x,y,button?` | Confirmation | Screen coordinate click |
| `pendulum_click_button` | `target` | `{clicked,widget,x,y}` | Find button by text & click |
| `pendulum_press_key` | `key,hold_seconds?` | Confirmation | Keyboard injection |
| `pendulum_type_text` | `text,press_enter?` | Confirmation | Type into focused field |
| `pendulum_paste_text` | `text,press_enter?` | Confirmation | Fast text input |
| `pendulum_scroll` | `clicks` | Confirmation | Mouse wheel |
| `pendulum_hotkey` | `keys` (e.g. `"ctrl,s"`) | Confirmation | Key combination |
| `pendulum_mouse_drag` | `x_start,y_start,x_end,y_end,button?` | Confirmation | Drag mouse |
| `pendulum_wait` | `seconds?: number` | Confirmation | Wait N seconds |
| `pendulum_call_screen_method` | `method` | `{called,method,screen,result}` | ⚠️ HIGH RISK — reflection call on screen |
| `pendulum_select_list_item` | `text` | `{selected,text,x,y}` | Select dropdown item by text |
| `pendulum_video_start` | none | Confirmation | ⚡ EXPERIMENTAL — start ~10fps capture |
| `pendulum_video_stop` | none | Confirmation | Stop video capture |
| `pendulum_video_frame` | none | Latest frame PNG or error | ⚡ Get cached frame (< 5s old) |
| `pendulum_status` | none | `"idle"` / `"running"` | Check before running |
| `pendulum_abort` | none | — | Kill running script |

**IMPORTANT**: Only ONE script runs at a time. Check `pendulum_status` first; `pendulum_abort` if running.

---

## GUI Workflow (Recommended)

```
1. pendulum_screenshot        → see screen with coordinate grid
2. pendulum_enumerate_widgets → get widget tree with positions
3. pendulum_click_button("Done") → click by text (preferred)
   OR pendulum_click(x, y)   → click by coordinate from grid
4. pendulum_type_text         → type + Enter
5. pendulum_screenshot        → verify result
```

### Advanced GUI Tools

```
pendulum_wait(1.0)              → wait between actions
pendulum_select_list_item("English") → choose from dropdown
pendulum_call_screen_method("onClose") → ⚠️ direct screen method call
```

---

## MCP Call Logging

All MCP tool calls are **automatically logged** to `pendulum/logs/mcp_calls.jsonl`.
Each line is a JSON object: `{timestamp, tool, duration_ms, error, params?, result_preview?}`.
This replaces real-time SSE streaming and the web debug panel —
you can review the log file after a session to understand what the AI agent did.

---

## Video Frame Capture ⚡

:::warning
**EXPERIMENTAL — use sparingly.** Reading the GPU framebuffer every 6 frames is expensive.
Prefer `pendulum_screenshot` for single screenshots unless you need to observe continuous motion.
:::

| Tool | Description |
|------|-------------|
| `pendulum_video_start` | Start ~10fps capture (1 frame every 6 ticks) |
| `pendulum_video_frame` | Get the latest cached frame as base64 PNG |
| `pendulum_video_stop` | Stop capture and free resources |

**Use case**: observing entity movement, falling items, block breaking animations, or any short continuous action.

---

## Global Objects

| Object | Aliases | Purpose |
|--------|---------|---------|
| `minecraft` | `mc`, `game` | Chat, commands, script control (`say`, `executeCommand`, `waitTick`, etc.) |
| `mc.player` | — | Movement, rotation, interaction, player state |
| `mc.world` | — | Block/entity/environment queries |
| `mc.inv` | — | Inventory & container operations |
| `mc.gui` | — | Screen-level GUI: click, type, press keys, enumerate widgets |
| `baritone` | `br` | Baritone pathfinding, mining, building (optional) |
| `console` | — | `console.log(...)` → game log AND MCP return |

---

## Return Values & `console.log()`

**Most `mc.*` functions return a value.** Movement/hold functions (`forward`, `back`, `jump`, `sneak`, `sprint`, `startUse`, `stopUse`) and some actions (`use`, `attack`, `say`, `log`) are `void`. Everything else returns `boolean` or query data.

Use return values to check success:

```js
mc.player.forward(20)                           // void — always starts walking
if (mc.player.placeBlockAt(x, y, z)) { /* block placed */ }
if (!mc.inv.hasItem('diamond', 5)) { /* check before acting */ }
```

**General pattern:**
- **Movement (hold)** → `void` (fire-and-forget, no return)
- **Movement (timed), interaction** → `boolean` (`true` = started, `false` = player null / permission denied)
- **Queries** → `String`, `number`, `boolean`, or `[{...}]` array
- **GUI clicks** → `boolean` (`false` = no GUI open / no player)
- **Chat** → `void` (`say`/`log` are fire-and-forget)

**`console.log()` is captured:** Any `console.log(...)` output appears in the MCP `pendulum_eval` return. Use it for debugging:

```js
console.log("Found", mc.world.findBlocks("diamond_ore", 8).length, "diamond ores");
```

The MCP return will show: `"Found 3 diamond ores"`

---

## Movement & Rotation

### Directional Movement

```js
mc.player.forward(20)    // walk forward 20 ticks, then auto-stop (void)
mc.player.forward()      // hold forward indefinitely (void — use mc.player.stop() to release)
mc.player.back(ticks?)   // backward
mc.player.left(ticks?)   // strafe left
mc.player.right(ticks?)  // strafe right
mc.player.stop()         // release ALL movement keys (void)
```

**Pattern**: When walking towards a target with Baritone, prefer `br.goto()`. Use manual movement only for fine adjustments.

### Vertical

```js
mc.player.jump()         // single jump
mc.player.jump(true)     // hold jump key (continuous bouncing)
mc.player.sneak()        // start sneaking
mc.player.sneak(false)   // stop
mc.player.sprint()       // start sprinting
mc.player.stopSprint()   // stop sprinting
```

### Rotation

```js
mc.player.lookAt(x, y, z)           // instantly face a coordinate
mc.player.setYaw(degrees)           // set horizontal rotation (0=south, 90=west, 180=north, -90=east)
mc.player.setPitch(degrees)         // set vertical rotation (-90=up, 90=down)
mc.player.getYaw() → number        // current yaw
mc.player.getPitch() → number      // current pitch
```

**IMPORTANT**: `mc.player.lookAt()` sets both the player rotation AND the PlayerSimulator rotation immediately. Other rotation functions do not animate — they snap instantly.

### Position

```js
mc.player.getX() → number        // X coordinate (double)
mc.player.getY() → number        // Y coordinate (feet level)
mc.player.getZ() → number        // Z coordinate (double)
```

---

## Interaction

### Breaking Blocks

```js
mc.player.breakBlock() → boolean              // break block under crosshair; waits until done
mc.player.breakBlockAt(x, y, z) → boolean     // break specific coordinate (RECOMMENDED)
```

**PREFER `breakBlockAt`** over `breakBlock`. It computes the best face to hit from the player's position and does NOT rely on crosshair targeting. It's synchronous — the JS thread blocks until the block is destroyed or timeout.

### Placing Blocks

```js
mc.player.placeBlock() → boolean              // place on crosshair target (unreliable)
mc.player.placeBlockAt(x, y, z) → boolean     // place at exact coordinate (RECOMMENDED)
mc.player.jumpAndPlaceBelow() → boolean       // jump up, look down, place block under feet
```

**WARNING**: `mc.player.placeBlock()` is unreliable due to crosshair drift. **ALWAYS use `mc.player.placeBlockAt(x, y, z)`** for precise placement. It automatically finds the best adjacent face to click.

`mc.player.jumpAndPlaceBelow()` is specifically designed for building platforms:
1. Jumps
2. Looks straight down (pitch=90)
3. Places block at feet position
4. Returns true/false

### Item Use (Eating / Bow / Shield)

```js
mc.player.use()                               // single right-click (one-shot)
mc.player.useItem(ticks) → boolean            // hold right-click for N ticks, then release
mc.player.startUse()                          // start holding right-click
mc.player.stopUse()                           // release right-click
```

**Recommended pattern**: Use `mc.useItem(N)` for simple cases:

```js
mc.player.useItem(32)  // eat food (~1.6s)
mc.player.useItem(20)  // full draw bow (~1s)
mc.player.useItem(100) // hold shield for 5s
```

### Combat

```js
mc.player.attack()                            // left-click attack (void)
```

Requires `allowAttack` permission (config). Has a built-in cooldown when `syncUseAttack` is enabled (waits 2 ticks).

### Other

```js
mc.player.swapHands()                         // swap main ↔ offhand
mc.player.drop()                              // drop 1 item from held stack
mc.player.dropAll()                           // drop entire held stack
mc.player.pickBlock()                         // pick block — middle-click (void)
```

---

## Inventory

### Hotbar

```js
mc.inv.selectHotbar(slot)                  // select slot 1-9
mc.inv.getSelectedSlot() → number         // current hotbar slot (1-9)
```

### Item Query

```js
mc.inv.hasItem('minecraft:diamond', 64) → boolean   // has at least N items?
mc.inv.getItemInHand() → {id, count, maxCount, durability, maxDurability, name}
mc.inv.getItemOffhand() → same
mc.inv.getItemInSlot(slot) → same                   // slot 0-35
mc.inv.getAllItems() → [{slot, id, count, maxCount, durability, maxDurability, name}]
```

**IMPORTANT**: `mc.getAllItems()` skips empty slots. The `slot` field is the raw inventory index (0-8 hotbar, 9-35 inventory, 36-39 armor, 40 offhand).

**Recipe for checking/selecting materials**:
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

## GUI Operations

```js
mc.isGuiOpen() → boolean               // is any screen open?
mc.getGuiTitle() → string              // current screen title
mc.closeGui()                          // close current screen

mc.getContainerSize() → number         // total slots in container
mc.getContainerType() → string         // 'chest'|'crafting_table'|'furnace'|'enchanting'|'anvil'|'container'|'unknown'|'none'
mc.getContainerItem(slot) → {id, ...}  // item at container slot
mc.getContainerAllItems() → [{slot, id, count, ...}]  // all non-empty container slots
```

### Slot Clicking

```js
mc.clickSlot(slotId)                   // left-click slot (raw container index)
mc.clickSlot(slotId, 0)                // explicit left-click
mc.clickSlotRight(slotId)              // right-click = click with button=1
mc.moveItem(fromSlot, toSlot)          // pick up from fromSlot, place at toSlot
mc.quickMoveItem(slotId)              // shift-click (move between container ↔ inventory)
```

### Crafting

```js
mc.craft()                             // click result slot (craft 1)
mc.craftAll()                          // shift-click result (craft max possible)
```

### GUI Elements

```js
mc.getGuiElements() → [{type, x, y, width, height, text?, id?}]
```

Returns all visible non-slot widgets (buttons, labels, text fields). Useful for:
- Navigating menus when you don't know the screen layout
- Finding specific buttons by text or position
- Understanding the current UI state

---

## GUI & Screen Input (`mc.gui.*`) — NEW!

For scripts that need to interact with GUI screens (pause menu, settings, chat, server list, etc.), use the `mc.gui` sub-object.

### Screen Info

```js
mc.gui.isOpen() → boolean              // is a GUI screen open?
mc.gui.getTitle() → string             // screen title ('' if none)
mc.gui.close()                         // close screen (void)
mc.gui.openChat()                      // open chat input (void)
```

### Widget Enumeration

```js
mc.gui.getElements() → [{type, text?, x, y, width, height, active?, focused?, children?}]
```

Recursively enumerates ALL widgets on the current screen including nested children. Each widget has type, bounds, text, active/focused state.

### Screen-Level Mouse

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

### Screen-Level Keyboard

```js
mc.gui.pressKey('ESC')                 // press & release
mc.gui.pressKey('W', 1.0)              // hold for 1 second
mc.gui.typeText('Hello', true)         // type + Enter
mc.gui.pasteText('long text', true)    // fast input + Enter
mc.gui.hotkey('ctrl,s')                // Ctrl+S
mc.gui.hotkey('shift,f3')              // Shift+F3
```

**Workflow for AI agents**: `pendulum_screenshot` → identify target from grid → `pendulum_click_button("text")` → `pendulum_screenshot` to verify. Prefer `clickButton` over `click(x,y)` when button text is known.

### Container Ops (via mc.gui)

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

## World Query

### Block Queries

```js
mc.world.getBlock(x, y, z) → string               // full block ID, e.g. 'minecraft:dirt'
mc.world.isBlock(x, y, z, 'blockId') → boolean    // exact match
mc.world.isBlockByTag(x, y, z, 'tag') → boolean   // tag match
mc.world.getBlockState(x, y, z) → {id, properties: {key: value, ...}}
```

### Block Search

```js
mc.world.findBlocks('blockId', radius?) → [{x, y, z}]     // sphere search (default radius=16)
mc.world.findBlocksByTag('tag', radius?) → [{x, y, z}]     // tag-based sphere search
mc.world.findBlocksInBox(x1,y1,z1, x2,y2,z2, 'blockId'?) → [{x, y, z, block?}]
```

**Performance note**: `findBlocks` scans a 3D sphere. `radius=16` = 32^3 = ~32K blocks. On large radii, it may take a few ticks. If you omit `blockId` in `findBlocksInBox`, it returns ALL non-air blocks in the box.

### Crosshair & Ray Tracing

```js
mc.world.facingBlock('blockId') → boolean     // is crosshair on this block?
mc.world.facingEntity('entityType') → boolean // is crosshair on this entity type?
mc.world.getFacingBlock() → string           // block ID or ''
mc.world.getLookingEntity() → {type, name, x, y, z, distance, health?, maxHealth?, isAlive?}
mc.world.rayTrace(maxDist?) → {type:'block'|'entity'|'miss', x, y, z, face?, entityName?, ...}
```

`rayTrace` returns the **first** hit — entities are checked before blocks.

### Entity Detection

```js
mc.world.getNearbyPlayers(radius) → [{name, x, y, z, distance}]
mc.world.getNearbyEntities(radius) → [{name, type, x, y, z, distance}]
mc.world.getNearbyEntities(radius, 'entityType')  // filtered
```

### World State

```js
mc.getBiomeAt(x, y, z) → string        // 'minecraft:plains'
mc.getLightLevel(x, y, z) → number     // 0-15
mc.getDifficulty() → string            // 'peaceful'|'easy'|'normal'|'hard'
mc.getDimension() → string             // 'minecraft:overworld'|'nether'|'end'
```

### Player State

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

## Chat & Control

```js
mc.say(message)                        // send public chat message (disabled if allowSay=false)
mc.log(message)                        // display in action bar with [Pendulum] prefix
console.log(message)                   // log to game console
mc.executeCommand('/command')          // run client command (disabled if allowExecuteCommand=false)
```

**IMPORTANT**: Both `say` and `executeCommand` are controlled by config permissions. If disabled, they show a warning but don't crash.

```js
mc.waitTick()                          // pause 1 game tick (~50ms)
mc.waitTick(N)                         // pause N ticks
mc.execFile('path.js')                 // execute another script file
mc.getScriptDir() → string            // absolute path to .minecraft/pendulum/
mc.help()                              // display full API help in chat
```

---

## Baritone API (`br.*`)

> Requires Baritone mod installed. All functions throw if Baritone is absent.

### Movement & Pathfinding

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

**Pattern for safe navigation**:
```js
br.goto(x, y, z);                      // start pathfinding
while (br.isActive()) { mc.waitTick(10); }  // wait until arrival
```

### Mining

```js
br.mine('blockId')                     // mine unlimited
br.mine('blockId', count)             // mine specified count
br.tunnel()                           // dig 1×2 tunnel in facing direction
```

### Farming & Exploration

```js
br.farm(range?)                        // auto-harvest crops (default range=100)
br.explore()                           // explore new chunks
br.getToBlock('blockId')              // walk to nearest instance of a block
br.invert()                           // invert goal (go away from target)
```

### Following & Items

```js
br.follow('entityType')                // follow entity type
br.follow()                           // follow any player
br.pickup()                           // collect nearby dropped items
br.click()                            // click destination (must face target first)
```

### Building

```js
br.build('schematicName')              // build from schematics/file.schematic
br.build('name', x, y, z)             // build with origin offset
br.litematica()                       // build current Litematica schematic
```

Built schematics go in `.minecraft/schematics/`.

### Control

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

### Selections

```js
br.select(x1,y1,z1, x2,y2,z2)        // box selection
br.selPos1()                          // pos1 = current position
br.selPos1(x, y, z)                  // pos1 = coordinates
br.selPos2()                          // pos2 = current position
br.selPos2(x, y, z)                  // pos2 = coordinates
br.clearSelection()                   // clear all selections
```

### Settings & Commands

```js
br.setting('key', value)              // change baritone setting
br.command('full baritone command')   // execute any baritone command string
```

### Waypoints & Home

```js
br.waypointSave('name')               // save current pos
br.waypointList()                     // list all waypoints
br.waypointDelete('name')            // delete waypoint
br.sethome()                          // set home position
br.home()                             // pathfind to home
```

### Information & Tools

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

## Key Patterns for AI Agents

### Pattern 1: Always Check Status First

```js
// Don't run if a script is already executing
// Use pendulum_status tool first, then:
mc.getX() + ', ' + mc.getZ()  // quick non-blocking check
```

### Pattern 2: Prefer Baritone for Movement

```js
// GOOD: let Baritone handle pathfinding
br.goto(targetX, targetY, targetZ);
while (br.isActive()) { mc.waitTick(10); }

// BAD: manual movement (no obstacle avoidance)
mc.lookAt(targetX, targetY, targetZ);
mc.forward(100);
```

### Pattern 3: Scan Before Building

```js
// Always check what blocks exist at target positions
let existing = mc.findBlocksInBox(x1, y1, z1, x2, y2, z2);
if (existing.length > 0) {
    // Decide: break them or adjust plan
    for (let b of existing) mc.breakBlockAt(b.x, b.y, b.z);
}
```

### Pattern 4: Auto-Replenish Hotbar

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

### Pattern 5: Structured Building Order

Build in this order to minimize blocked placements:
1. **Floor first** — you can walk on it
2. **Walls from outside** — walk around the perimeter
3. **Ceiling last** — place from inside or from a safe position

### Pattern 6: Wait for Baritone Completion

```js
// Always poll isActive() after starting a Baritone task
br.goto(x, y, z);
while (br.isActive()) { mc.waitTick(10); }
// Now at the destination — safe to do the next action
```

---

## Permission-Controlled Functions

The following require config permissions to be enabled:

| Function | Config Key |
|----------|------------|
| `mc.breakBlock`, `mc.breakBlockAt` | `allowBreak` |
| `mc.placeBlock`, `mc.placeBlockAt`, `mc.jumpAndPlaceBelow` | `allowPlace` |
| `mc.attack` | `allowAttack` |
| `mc.say` | `allowSay` |
| `mc.executeCommand` | `allowExecuteCommand` |

If disabled, these functions silently fail or show a warning.

---

## Error Handling

- **JS syntax errors** → returned as error string in MCP result
- **Baritone not installed** → `RuntimeException` with translated error message
- **Thread interruption** → script aborted, all tasks flushed, PlayerSimulator reset
- **Block break timeout** → `breakBlock()` returns `false` after `breakTimeout` ticks (configurable)

---

## Thread Model

- JS executes in a **single daemon thread** (`Pendulum-Script`)
- MC API calls are submitted to the **game thread** via a concurrent queue
- `submitToGameThread` blocks the JS thread until the game thread completes
- `runOnGameThread` is fire-and-forget (used for movement flags, `startUse`, etc.)
- `waitTicks(N)` sleeps the JS thread; the game thread drives movement/breaking via PlayerSimulator

**Single script guarantee**: Only one script runs at a time. This avoids race conditions but means you must manage sequential tasks carefully.

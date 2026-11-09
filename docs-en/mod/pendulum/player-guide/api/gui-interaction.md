---
sidebar_position: 6
---

# GUI Interaction

## Screen Info

```js
mc.gui.isOpen()                          // → boolean: is any GUI screen open?
mc.gui.getTitle()                        // → string: screen title, '' if no GUI
mc.gui.close()                           // close current screen (void)
mc.gui.openChat()                        // open chat input (void)
```

## Widget Enumeration

```js
mc.gui.getElements()                     // → [{type, text?, x, y, width, height, active?, focused?, children?}, ...]
```

Recursively enumerates ALL widgets on the current screen, including nested children. Each widget object contains:

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Class name (e.g. `"Button"`, `"EditBox"`, `"ImageButton"`) |
| `text` | string? | Display text if the widget has a `message` field |
| `x`, `y` | number | Top-left position in screen pixels |
| `width`, `height` | number | Size in pixels |
| `active` | boolean? | Whether the widget is enabled/clickable |
| `focused` | boolean? | Whether the widget has keyboard focus |
| `children` | array? | Nested child widgets (recursive) |

```js
// Find all buttons on screen
let widgets = mc.gui.getElements();
for (let w of widgets) {
    if (w.type === 'Button') {
        console.log(`Button "${w.text}" at (${w.x},${w.y}) size ${w.width}×${w.height}`);
    }
}
```

## Mouse Input

### Click by Coordinate

```js
mc.gui.click(x, y)                       // left-click at screen pixel (x, y)
mc.gui.click(x, y, 'right')              // right-click
mc.gui.click(x, y, 'middle')             // middle-click
```

**Typical workflow with screenshot:**
1. Take screenshot → see coordinate grid overlay
2. Identify target pixel (e.g. button center at `(450, 320)`)
3. Click: `mc.gui.click(450, 320)`

### Click by Text / Type

```js
mc.gui.clickButton('Done')               // find button with "Done" text, click its center
mc.gui.clickButton('save')               // case-insensitive substring match
mc.gui.clickButton('Button')             // matches by type name if no text match
```

Searches recursively through all widgets. Returns JSON `{clicked:true, widget:"Button", x:450, y:320}` or error if not found.

### Drag

```js
mc.gui.mouseDrag(x1, y1, x2, y2)         // drag from (x1,y1) to (x2,y2) with left button
mc.gui.mouseDrag(x1, y1, x2, y2, 'right') // right-button drag
```

### Scroll

```js
mc.gui.scroll(3)                         // scroll up 3 clicks
mc.gui.scroll(-5)                        // scroll down 5 clicks
```

## Keyboard Input

### Press Key

```js
mc.gui.pressKey('W')                     // press and release W
mc.gui.pressKey('ENTER')                 // press Enter
mc.gui.pressKey('ESC')                   // press Escape
mc.gui.pressKey('F3', 2.0)               // hold F3 for 2 seconds
```

Supported key names: `A`–`Z`, `0`–`9`, `ENTER`, `ESC`/`ESCAPE`, `SPACE`, `TAB`, `BACKSPACE`, `DELETE`, `LEFT`/`RIGHT`/`UP`/`DOWN`, `F1`–`F12`, `LEFT_SHIFT`/`RIGHT_SHIFT`, `LEFT_CTRL`/`RIGHT_CTRL`, `LEFT_ALT`/`RIGHT_ALT`, and GLFW-style `key.keyboard.w`.

### Type Text

```js
mc.gui.typeText('Hello World')           // type character by character
mc.gui.typeText('/gamemode creative', true)  // type + press Enter
```

### Paste Text

```js
mc.gui.pasteText('long message here...')  // type quickly (same implementation)
mc.gui.pasteText('/home', true)           // paste + Enter
```

### Hotkey (Key Combination)

```js
mc.gui.hotkey('ctrl,s')                  // Ctrl+S
mc.gui.hotkey('shift,f3')                // Shift+F3
mc.gui.hotkey('ctrl,shift,t')            // Ctrl+Shift+T
```

Keys are comma-separated. All keys are pressed together, held 50ms, then released in reverse order.

---

## Container Operations

All container functions work with the currently open container screen (chest, crafting table, furnace, etc.).

```js
mc.gui.getSlotCount()                    // → number: total slots in container
mc.gui.getType()                         // → 'chest'|'crafting_table'|'furnace'|'enchanting'|'anvil'|'container'|'none'|'unknown'
mc.gui.getSlotItem(slotNumber)           // → {id, count, maxCount, durability, maxDurability, name}
mc.gui.getAllItems()                     // → [{slot, id, count, maxCount, durability, maxDurability, name}, ...]
```

### Clicking Slots

```js
mc.gui.clickSlot(slotId)                 // left-click slot (void)
mc.gui.clickSlot(slotId, 0)              // left-click (explicit button 0)
mc.gui.clickSlot(slotId, 1)              // right-click
mc.gui.clickSlotRight(slotId)            // right-click shortcut
mc.gui.moveItem(fromSlot, toSlot)        // move item (left-click from, then to)
mc.gui.quickMoveItem(slotId)             // shift-click (quick transfer)
```

### Crafting

```js
mc.gui.craft()                           // click result slot (craft 1)
mc.gui.craftAll()                        // shift-click result slot (craft max)
```

---

## Advanced Operations

### Wait Between Actions

```js
mc.gui.wait(0.5)                         // wait 0.5 seconds
mc.gui.wait(2.0)                         // wait 2 seconds
```

Useful for sequencing: click → wait for animation → screenshot → next action.

### Call Arbitrary Screen Method

:::danger
This uses reflection to call any no-arg method on the current screen.
All exceptions are caught and returned as error JSON. Use only when standard tools are insufficient.
:::

```js
mc.gui.callMethod('onClose')             // force close a screen
mc.gui.callMethod('removed')             // trigger removal callback
```

### Select Dropdown List Item

```js
mc.gui.selectListItem('English')         // select "English" from language list
mc.gui.selectListItem('Creative')        // select game mode from dropdown
```

Searches the widget tree for list-like widgets (ObjectSelectionList, etc.) and clicks the entry whose text contains the given substring (case-insensitive).

---

## Complete Workflow Examples

### Open Chat and Send a Message

```js
mc.gui.pressKey('T');                    // open chat (or mc.gui.openChat())
mc.gui.typeText('Hello everyone!', true);// type then Enter
```

### Navigate a Pause Menu

```js
mc.gui.pressKey('ESC');                  // open pause menu
mc.gui.clickButton('Options');           // click "Options..." button
mc.gui.clickButton('Done');              // click "Done"
```

### Inspect a Chest

```js
// Right-click a chest (assumes player is looking at it)
mc.player.use();
mc.waitTick(10);

// Check what's inside
console.log('Container type:', mc.gui.getType());
console.log('Total slots:', mc.gui.getSlotCount());

let items = mc.gui.getAllItems();
for (let item of items) {
    if (item.id === 'minecraft:diamond') {
        mc.gui.quickMoveItem(item.slot);  // shift-click to inventory
        mc.waitTick(1);
    }
}
mc.gui.close();
```

### Automate Crafting Table

```js
// Open crafting table (player must be looking at it)
mc.player.use();
mc.waitTick(10);

// Check if we can craft
let allItems = mc.gui.getAllItems();
console.log('Items in crafting grid:', allItems.length);

// Take the result
mc.gui.craftAll();                       // craft maximum
mc.waitTick(2);
mc.gui.close();
```

### AI Agent Workflow (MCP)

```
# Step 1: See the screen
pendulum_screenshot

# Step 2: Enumerate widgets for precise targeting
pendulum_enumerate_widgets

# Step 3: Click a specific button
pendulum_click_button  →  target="Done"

# Step 4: Type into a text field
pendulum_type_text  →  text="search query"  press_enter=true

# Step 5: Verify result
pendulum_screenshot
```

## Video Frame Capture ⚡

:::warning
**Experimental — avoid unless you need continuous motion observation.**
Reading the GPU framebuffer every 6 frames is expensive. Prefer single screenshots.
:::

```js
// MCP tools only (no JS API):
pendulum_video_start    // begin ~10fps capture
pendulum_video_frame    // get latest cached frame (repeat as needed)
pendulum_video_stop     // stop & free resources
```

This is useful when the AI needs to watch a short continuous action, e.g.:
- Entity falling/item drop trajectory
- Block breaking animation progress
- Short movement sequences

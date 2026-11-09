---
sidebar_position: 6
---

# 界面交互
## 屏幕信息

```js
mc.gui.isOpen()                          // → boolean: is any GUI screen open?
mc.gui.getTitle()                        // → string: screen title, '' if no GUI
mc.gui.close()                           // close current screen (void)
mc.gui.openChat()                        // open chat input (void)
```

## 枚举控件

```js
mc.gui.getElements()                     // → [{type, text?, x, y, width, height, active?, focused?, children?}, ...]
```

递归枚举当前屏幕上的所有控件，包括嵌套的子控件。每个控件对象包含：

| 字段 | 类型 | 说明 |
|-------|------|-------------|
| `type` | string | 类名（例如 `"Button"`、`"EditBox"`、`"ImageButton"`） |
| `text` | string? | 若控件有 `message` 字段，则为显示的文本 |
| `x`、`y` | number | 以屏幕像素计的左上角位置 |
| `width`、`height` | number | 以像素计的尺寸 |
| `active` | boolean? | 控件是否启用/可点击 |
| `focused` | boolean? | 控件是否拥有键盘焦点 |
| `children` | array? | 嵌套的子控件（递归） |

```js
// Find all buttons on screen
let widgets = mc.gui.getElements();
for (let w of widgets) {
    if (w.type === 'Button') {
        console.log(`Button "${w.text}" at (${w.x},${w.y}) size ${w.width}×${w.height}`);
    }
}
```

## 鼠标输入

### 按坐标点击

```js
mc.gui.click(x, y)                       // left-click at screen pixel (x, y)
mc.gui.click(x, y, 'right')              // right-click
mc.gui.click(x, y, 'middle')             // middle-click
```

**配合截图的典型流程：**
1. 截图 → 查看坐标网格叠加层
2. 确定目标像素（例如按钮中心在 `(450, 320)`）
3. 点击：`mc.gui.click(450, 320)`

### 按文本 / 类型点击

```js
mc.gui.clickButton('Done')               // find button with "Done" text, click its center
mc.gui.clickButton('save')               // case-insensitive substring match
mc.gui.clickButton('Button')             // matches by type name if no text match
```

递归搜索所有控件。返回 JSON `{clicked:true, widget:"Button", x:450, y:320}`，未找到时返回错误。

### 拖拽

```js
mc.gui.mouseDrag(x1, y1, x2, y2)         // drag from (x1,y1) to (x2,y2) with left button
mc.gui.mouseDrag(x1, y1, x2, y2, 'right') // right-button drag
```

### 滚动

```js
mc.gui.scroll(3)                         // scroll up 3 clicks
mc.gui.scroll(-5)                        // scroll down 5 clicks
```

## 键盘输入

### 按键

```js
mc.gui.pressKey('W')                     // press and release W
mc.gui.pressKey('ENTER')                 // press Enter
mc.gui.pressKey('ESC')                   // press Escape
mc.gui.pressKey('F3', 2.0)               // hold F3 for 2 seconds
```

支持的按键名：`A`–`Z`、`0`–`9`、`ENTER`、`ESC`/`ESCAPE`、`SPACE`、`TAB`、`BACKSPACE`、`DELETE`、`LEFT`/`RIGHT`/`UP`/`DOWN`、`F1`–`F12`、`LEFT_SHIFT`/`RIGHT_SHIFT`、`LEFT_CTRL`/`RIGHT_CTRL`、`LEFT_ALT`/`RIGHT_ALT`，以及 GLFW 风格的 `key.keyboard.w`。

### 输入文本

```js
mc.gui.typeText('Hello World')           // type character by character
mc.gui.typeText('/gamemode creative', true)  // type + press Enter
```

### 粘贴文本

```js
mc.gui.pasteText('long message here...')  // type quickly (same implementation)
mc.gui.pasteText('/home', true)           // paste + Enter
```

### 热键（按键组合）

```js
mc.gui.hotkey('ctrl,s')                  // Ctrl+S
mc.gui.hotkey('shift,f3')                // Shift+F3
mc.gui.hotkey('ctrl,shift,t')            // Ctrl+Shift+T
```

按键之间用逗号分隔。所有按键会同时按下，保持 50ms，然后按相反顺序松开。

---

## 容器操作

所有容器函数都作用于当前打开的容器界面（箱子、工作台、熔炉等）。

```js
mc.gui.getSlotCount()                    // → number: total slots in container
mc.gui.getType()                         // → 'chest'|'crafting_table'|'furnace'|'enchanting'|'anvil'|'container'|'none'|'unknown'
mc.gui.getSlotItem(slotNumber)           // → {id, count, maxCount, durability, maxDurability, name}
mc.gui.getAllItems()                     // → [{slot, id, count, maxCount, durability, maxDurability, name}, ...]
```

### 点击槽位

```js
mc.gui.clickSlot(slotId)                 // left-click slot (void)
mc.gui.clickSlot(slotId, 0)              // left-click (explicit button 0)
mc.gui.clickSlot(slotId, 1)              // right-click
mc.gui.clickSlotRight(slotId)            // right-click shortcut
mc.gui.moveItem(fromSlot, toSlot)        // move item (left-click from, then to)
mc.gui.quickMoveItem(slotId)             // shift-click (quick transfer)
```

### 合成

```js
mc.gui.craft()                           // click result slot (craft 1)
mc.gui.craftAll()                        // shift-click result slot (craft max)
```

---

## 高级操作

### 在动作之间等待

```js
mc.gui.wait(0.5)                         // wait 0.5 seconds
mc.gui.wait(2.0)                         // wait 2 seconds
```

适用于串联操作：点击 → 等待动画 → 截图 → 下一个动作。

### 调用任意屏幕方法

:::danger
这会通过反射调用当前屏幕上的任意无参方法。
所有异常都会被捕获并以错误 JSON 返回。仅在标准工具不足时使用。
:::

```js
mc.gui.callMethod('onClose')             // force close a screen
mc.gui.callMethod('removed')             // trigger removal callback
```

### 选择下拉列表项

```js
mc.gui.selectListItem('English')         // select "English" from language list
mc.gui.selectListItem('Creative')        // select game mode from dropdown
```

在控件树中搜索类列表控件（ObjectSelectionList 等），并点击文本包含给定子串的条目（不区分大小写）。

---

## 完整流程示例

### 打开聊天并发送消息

```js
mc.gui.pressKey('T');                    // open chat (or mc.gui.openChat())
mc.gui.typeText('Hello everyone!', true);// type then Enter
```

### 操作暂停菜单

```js
mc.gui.pressKey('ESC');                  // open pause menu
mc.gui.clickButton('Options');           // click "Options..." button
mc.gui.clickButton('Done');              // click "Done"
```

### 查看箱子

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

### 自动化工作台

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

### AI 智能体流程（MCP）

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

## 视频帧捕获 ⚡

:::warning
**实验性功能 —— 除非需要连续观察运动，否则不要使用。**
每 6 帧读取一次 GPU 帧缓冲的开销很高。请优先使用单张截图。
:::

```js
// MCP tools only (no JS API):
pendulum_video_start    // begin ~10fps capture
pendulum_video_frame    // get latest cached frame (repeat as needed)
pendulum_video_stop     // stop & free resources
```

当 AI 需要观察短暂的连续动作时，这很有用，例如：
- 实体下落/掉落物轨迹
- 方块破坏动画进度
- 短距离移动序列

---
sidebar_position: 5
---

# 物品栏与界面
## 快捷栏

```js
mc.inv.selectHotbar(1)            // select slot 1 (1-9)
let slot = mc.inv.getSelectedSlot()  // current slot number (1-9)
```

## 物品栏查询

```js
mc.inv.hasItem('minecraft:diamond', 64)    // has at least 64 diamonds?
mc.inv.getItemInHand()                     // → {id, count, name, durability, ...}
mc.inv.getItemOffhand()                    // offhand item
mc.inv.getItemInSlot(slot)                 // slot 0-35
mc.inv.getAllItems()                       // → [{slot, id, count, name, ...}]
```

## GUI 操作

```js
mc.gui.isOpen()                         // → boolean
mc.gui.getTitle()                       // → string
mc.gui.close()                          // close current screen

mc.gui.getSlotCount()                   // total slots in container
mc.gui.getType()                        // 'chest' | 'crafting_table' | 'furnace' | ...
mc.gui.getSlotItem(slotNumber)          // item at container slot
mc.gui.getAllItems()                    // all non-empty container slots
```

## 点击槽位

所有槽位操作都使用容器内的原始槽位索引。

```js
mc.gui.clickSlot(slotId)                   // left-click slot
mc.gui.clickSlotRight(slotId)              // right-click slot
mc.gui.clickSlot(slotId, button)           // 0=left, 1=right, etc.
mc.gui.moveItem(fromSlot, toSlot)          // move item within container
mc.gui.quickMoveItem(slotId)               // shift-click (to/from inventory)
```

## 合成

```js
mc.gui.craft()                             // click result slot (craft 1)
mc.gui.craftAll()                          // shift-click result slot (craft max)
```

## GUI 元素（按钮 / 文本）

```js
mc.gui.getElements()                   // → recursive widget tree (recommended)
```

返回当前屏幕上的所有可见控件。完整的 `mc.gui.*` API 参见 [GUI 交互](gui-interaction)。

## GUI 输入

```js
mc.gui.click(x, y)                     // click at screen coordinate
mc.gui.click(x, y, 'right')            // right-click
mc.gui.clickButton('Done')             // find & click button by text
mc.gui.pressKey('ESC')                 // press a key
mc.gui.pressKey('W', 1.0)              // hold key for 1 second
mc.gui.typeText('Hello', true)         // type text + Enter
mc.gui.hotkey('ctrl,s')                // key combination
mc.gui.scroll(3)                       // scroll wheel
mc.gui.mouseDrag(x1,y1, x2,y2)         // drag mouse
```

参见完整的 [GUI 交互](gui-interaction) 参考。

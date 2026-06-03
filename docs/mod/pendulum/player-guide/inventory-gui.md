# Inventory & GUI

## Hotbar

```js
mc.inv.selectHotbar(1)            // select slot 1 (1-9)
let slot = mc.inv.getSelectedSlot()  // current slot number (1-9)
```

## Inventory Query

```js
mc.inv.hasItem('minecraft:diamond', 64)    // has at least 64 diamonds?
mc.inv.getItemInHand()                     // → {id, count, name, durability, ...}
mc.inv.getItemOffhand()                    // offhand item
mc.inv.getItemInSlot(slot)                 // slot 0-35
mc.inv.getAllItems()                       // → [{slot, id, count, name, ...}]
```

## GUI Operations

```js
mc.gui.isOpen()                         // → boolean
mc.gui.getTitle()                       // → string
mc.gui.close()                          // close current screen

mc.gui.getSlotCount()                   // total slots in container
mc.gui.getType()                        // 'chest' | 'crafting_table' | 'furnace' | ...
mc.gui.getSlotItem(slotNumber)          // item at container slot
mc.gui.getAllItems()                    // all non-empty container slots
```

## Clicking Slots

All slot operations use the raw slot index within the container.

```js
mc.gui.clickSlot(slotId)                   // left-click slot
mc.gui.clickSlotRight(slotId)              // right-click slot
mc.gui.clickSlot(slotId, button)           // 0=left, 1=right, etc.
mc.gui.moveItem(fromSlot, toSlot)          // move item within container
mc.gui.quickMoveItem(slotId)               // shift-click (to/from inventory)
```

## Crafting

```js
mc.gui.craft()                             // click result slot (craft 1)
mc.gui.craftAll()                          // shift-click result slot (craft max)
```

## GUI Elements (Buttons / Text)

```js
mc.gui.getElements()                   // → recursive widget tree (recommended)
```

Returns all visible widgets on the current screen. See [GUI Interaction](gui-interaction) for full `mc.gui.*` API.

## GUI Input (New!)

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

See the full [GUI Interaction](gui-interaction) reference.

# Inventory & GUI

## Hotbar

```js
mc.selectHotbar(1)            // select slot 1 (1-9)
let slot = mc.getSelectedSlot()  // current slot number (1-9)
```

## Inventory Query

```js
mc.hasItem('minecraft:diamond', 64)    // has at least 64 diamonds?
mc.getItemInHand()                     // → {id, count, name, durability, ...}
mc.getItemOffhand()                    // offhand item
mc.getItemInSlot(slot)                 // slot 0-35
mc.getAllItems()                       // → [{slot, id, count, name, ...}]
```

## GUI Operations

```js
mc.isGuiOpen()                         // → boolean
mc.getGuiTitle()                       // → string
mc.closeGui()                          // close current screen

mc.getContainerSize()                  // total slots in container
mc.getContainerType()                  // 'chest' | 'crafting_table' | 'furnace' | ...
mc.getContainerItem(slotNumber)        // item at container slot
mc.getContainerAllItems()              // all non-empty container slots
```

## Clicking Slots

All slot operations use the raw slot index within the container.

```js
mc.clickSlot(slotId)                   // left-click slot
mc.clickSlotRight(slotId)              // right-click slot
mc.clickSlot(slotId, button)           // 0=left, 1=right, etc.
mc.moveItem(fromSlot, toSlot)          // move item within container
mc.quickMoveItem(slotId)               // shift-click (to/from inventory)
```

## Crafting

```js
mc.craft()                             // click result slot (craft 1)
mc.craftAll()                          // shift-click result slot (craft max)
```

## GUI Elements (Buttons / Text)

```js
mc.getGuiElements()                    // → [{type, x, y, width, height, text?, id?}]
```

Returns all visible non-slot widgets on the current screen. Useful for AI agents to understand UI state.

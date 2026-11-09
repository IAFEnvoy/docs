# Examples

## Harvest & Replant Crops

```js
// Walk around farmland and harvest ready crops
let crops = mc.world.findBlocksByTag('minecraft:crops', 32);
for (let c of crops) {
    let block = mc.world.getBlockState(c.x, c.y, c.z);
    if (block.properties.age === '7') {  // fully grown
        mc.player.breakBlockAt(c.x, c.y, c.z);
        mc.waitTick(5);
    }
}
```

## Mine a 2×1 Tunnel with Baritone

```js
// Let Baritone do the hard work
br.tunnel();
// Wait until done
while (br.isActive()) { mc.waitTick(20); }
mc.log('Tunnel complete!');
```

## Find & Attack Nearby Monsters

```js
let zombies = mc.world.getNearbyEntities(10, 'minecraft:zombie');
for (let z of zombies) {
    mc.player.lookAt(z.x, z.y, z.z);
    mc.waitTick(2);
    mc.player.attack();
    mc.waitTick(10);  // attack cooldown
}
```

## Build a Platform

```js
// Place a 5×5 platform at player's feet
let cx = Math.floor(mc.player.getX());
let cz = Math.floor(mc.player.getZ());
let y = Math.floor(mc.player.getY()) - 1;

for (let x = cx - 2; x <= cx + 2; x++) {
    for (let z = cz - 2; z <= cz + 2; z++) {
        mc.player.placeBlockAt(x, y, z);
        mc.waitTick(1);
    }
}
```

## Eat When Hungry

```js
if (mc.player.getPlayerHunger() < 15) {
    mc.player.useItem(32);                      // eat for ~1.6s
    mc.waitTick(10);
}
```

## Auto-Organize Chest

```js
// Open chest, sort items into inventory
let chestItems = mc.gui.getAllItems();
for (let item of chestItems) {
    mc.gui.quickMoveItem(item.slot);         // shift-click to inventory
    mc.waitTick(1);
}
mc.gui.close();
```

## GUI Automation — Navigate Pause Menu

```js
// Open pause screen
mc.gui.pressKey('ESC');
mc.waitTick(10);

// List all buttons
let widgets = mc.gui.getElements();
for (let w of widgets) {
    console.log(`[${w.type}] "${w.text}" @ (${w.x},${w.y})`);
}

// Click "Options..." then "Done"
mc.gui.clickButton('Options');
mc.waitTick(10);
mc.gui.clickButton('Done');
```

## GUI Automation — Configure Settings

```js
// Open settings via hotkey
mc.gui.hotkey('shift,f3');
mc.waitTick(10);

// Type a username into a field
mc.gui.clickButton('Username');        // focus the field
mc.gui.typeText('Player1');            // type value
mc.gui.pressKey('TAB');                // move to next field
mc.gui.typeText('password123');
mc.gui.pressKey('ENTER');              // submit
```

## Send Chat Message via GUI

```js
// Open chat, type, send
mc.gui.openChat();
mc.waitTick(5);
mc.gui.typeText('/spawn', true);
```

## Full Auto-Craft Workflow

```js
// 1. Open crafting table
mc.player.use();
mc.waitTick(10);

if (!mc.gui.isOpen()) {
    mc.log('Failed to open crafting table!');
} else {
    // 2. Check what's available
    let items = mc.gui.getAllItems();
    console.log('Items in grid:', items.length);

    // 3. Craft and take result
    mc.gui.craftAll();
    mc.waitTick(2);

    // 4. Close
    mc.gui.close();
    mc.log('Crafting complete!');
}
```

## Full Baritone Automation

```js
// Mine diamonds, return home
br.mine('diamond_ore', 64);              // start mining
while (br.isActive()) { mc.waitTick(20); } // wait
br.home();                               // go home
while (br.isActive()) { mc.waitTick(20); }
mc.log('Mining complete — at home!');
mc.say('Mining done, I am home!');
```

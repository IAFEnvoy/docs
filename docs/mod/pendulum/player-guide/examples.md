# Examples

## Harvest & Replant Crops

```js
// Walk around farmland and harvest ready crops
let crops = mc.findBlocksByTag('minecraft:crops', 32);
for (let c of crops) {
    let block = mc.getBlockState(c.x, c.y, c.z);
    if (block.properties.age === '7') {  // fully grown
        mc.breakBlockAt(c.x, c.y, c.z);
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
let zombies = mc.getNearbyEntities(10, 'minecraft:zombie');
for (let z of zombies) {
    mc.lookAt(z.x, z.y, z.z);
    mc.waitTick(2);
    mc.attack();
    mc.waitTick(10);  // attack cooldown
}
```

## Build a Platform

```js
// Place a 5×5 platform at player's feet
let cx = Math.floor(mc.getX());
let cz = Math.floor(mc.getZ());
let y = Math.floor(mc.getY()) - 1;

for (let x = cx - 2; x <= cx + 2; x++) {
    for (let z = cz - 2; z <= cz + 2; z++) {
        mc.placeBlockAt(x, y, z);
        mc.waitTick(1);
    }
}
```

## Eat When Hungry

```js
if (mc.getPlayerHunger() < 15) {
    mc.useItem(32);                      // eat for ~1.6s
    mc.waitTick(10);
}
```

## Auto-Organize Chest

```js
// Open chest, sort items into inventory
let chestItems = mc.getContainerAllItems();
for (let item of chestItems) {
    mc.quickMoveItem(item.slot);         // shift-click to inventory
    mc.waitTick(1);
}
mc.closeGui();
```

## Full Baritone Automation

```js
// Mine diamonds, return home
br.mine('diamond_ore', 64);              // start mining
while (br.isActive()) { mc.waitTick(20); } // wait
br.home();                               // go home
while (br.isActive()) { mc.waitTick(20); }
mc.say('Mining done, I am home!');
```

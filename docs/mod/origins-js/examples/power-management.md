---
sidebar_position: 7
title: "Power Management"
description: "grantPower, revokePower, temporary powers"
---

# Power Management

## Grant temporary power on low health

```js
// kubejs/server_scripts/powers.js
EntityEvents.hurt(event => {
    let entity = event.entity;

    if (entity.isLiving() && entity.getHealth() / entity.getMaxHealth() < 0.3) {
        if (!OriginsJS.hasPower(entity, "origins:fire_immunity")) {
            OriginsJS.grantPower(entity, "origins_js:emergency", "origins:fire_immunity");
        }
    }
});
```

## Revoke when health recovers

```js
let tickCount = 0;
EntityEvents.tick(event => {
    tickCount++;
    if (tickCount % 100 !== 0) return; // every 5 seconds

    let entity = event.entity;
    if (!entity.isLiving()) return;

    if (entity.getHealth() / entity.getMaxHealth() > 0.5) {
        OriginsJS.revokePower(entity, "origins_js:emergency", "origins:fire_immunity");
    }
});
```

## Check and grant via HolderWrapper

```js
let holder = OriginsJS.getHolder(player);
if (holder && !holder.hasPower("origins:climbing")) {
    holder.grantPower("origins_js:quest", "origins:climbing");
}
```

## Tips

- `source` identifies where the power came from. Use a unique prefix like `"origins_js:..."`.
- `revokeAllPowers(source)` clears all powers from that source at once.
- Check `hasPower()` before granting to avoid duplicates.

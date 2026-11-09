---
sidebar_position: 7
title: "能力管理"
description: "grantPower、revokePower 与临时能力"
---

# 能力管理

## 低生命值时授予临时能力

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

## 生命值恢复后撤销

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

## 通过 HolderWrapper 检查并授予

```js
let holder = OriginsJS.getHolder(player);
if (holder && !holder.hasPower("origins:climbing")) {
    holder.grantPower("origins_js:quest", "origins:climbing");
}
```

## 提示

- `source` 用于标识能力的来源。请使用唯一前缀，例如 `"origins_js:..."`。
- `revokeAllPowers(source)` 会一次性清除该来源授予的所有能力。
- 授予前先检查 `hasPower()`，以避免重复授予。

---
sidebar_position: 6
title: "起源管理"
description: "setOrigin、hasOrigin 与运行时起源分配"
---

# 起源管理

## 首次加入时随机分配起源

```js
// kubejs/server_scripts/origins.js
PlayerEvents.loggedIn(event => {
    let player = event.player;
    let holder = OriginsJS.getHolder(player);

    if (holder && !holder.hasAllOrigins()) {
        let origins = [
            "origins:human",
            "origins:enderian",
            "origins:phantom",
            "origins:avian"
        ];
        let randomOrigin = origins[Math.floor(Math.random() * origins.length)];
        holder.setOrigin("origins:origin", randomOrigin);
        player.tell("Your origin is: " + randomOrigin);
    }
});
```

## 聊天时查询起源

```js
PlayerEvents.chat(event => {
    let holder = OriginsJS.getHolder(event.player);
    if (holder) {
        let originId = holder.getOriginId("origins:origin");
        event.player.tell("Current origin: " + (originId || "none"));
    }
});
```

## 清除并重新分配

```js
let holder = OriginsJS.getHolder(player);
if (holder) {
    holder.clearOrigin("origins:origin");
    holder.setOrigin("origins:origin", "origins:human");
}
```

## 提示

- 始终对 `OriginsJS.getHolder()` 做空值检查 —— 对非生物实体它会返回 `null`。
- 起源更改会立即生效。
- 用 `hasAllOrigins()` 判断玩家是否已经选择过起源。

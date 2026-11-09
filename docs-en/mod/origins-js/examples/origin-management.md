---
sidebar_position: 6
title: "Origin Management"
description: "setOrigin, hasOrigin, runtime origin assignment"
---

# Origin Management

## Random origin on first join

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

## Check origin on chat

```js
PlayerEvents.chat(event => {
    let holder = OriginsJS.getHolder(event.player);
    if (holder) {
        let originId = holder.getOriginId("origins:origin");
        event.player.tell("Current origin: " + (originId || "none"));
    }
});
```

## Clear and reassign

```js
let holder = OriginsJS.getHolder(player);
if (holder) {
    holder.clearOrigin("origins:origin");
    holder.setOrigin("origins:origin", "origins:human");
}
```

## Tips

- Always null-check `OriginsJS.getHolder()` — it returns `null` for non-living entities.
- Origin changes take effect immediately.
- Use `hasAllOrigins()` to check if a player has already chosen.

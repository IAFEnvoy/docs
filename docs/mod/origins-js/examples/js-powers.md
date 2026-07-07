---
sidebar_position: 5
title: "JS Powers"
description: "PowerBuilder examples — tick, toggle, conditional"
---

# JS Powers

## Regeneration (tick-based)

```js
// kubejs/startup_scripts/powers.js
OriginsJS.powerBuilder("regeneration_power")
    .tick((entity, params) => {
        let amount = params.has("amount") ? params.get("amount").getAsFloat() : 0.5;
        if (entity.getHealth() < entity.getMaxHealth()) {
            entity.heal(amount);
        }
    })
    .register();
```

```json
{
    "type": "origins_js:js_power",
    "id": "regeneration_power",
    "params": { "amount": 1.0 }
}
```

---

## Toggle Night Vision (active/inactive)

```js
let nightVisionActive = new java.util.HashMap();

OriginsJS.powerBuilder("night_vision_toggle")
    .active((entity, params) => {
        entity.addEffect(new net.minecraft.world.effect.MobEffectInstance(
            net.minecraft.world.effect.MobEffects.NIGHT_VISION,
            999999, 0, false, false
        ));
        nightVisionActive.put(entity.getUUID(), true);
    })
    .inactive((entity, params) => {
        entity.removeEffect(net.minecraft.world.effect.MobEffects.NIGHT_VISION);
        nightVisionActive.put(entity.getUUID(), false);
    })
    .isActive((entity, params) =>
        nightVisionActive.getOrDefault(entity.getUUID(), false))
    .register();
```

---

## Underwater Speed (conditional tick + grant/revoke)

```js
OriginsJS.powerBuilder("underwater_speed")
    .tick((entity, params) => {
        if (entity.isUnderWater()) {
            entity.addEffect(new net.minecraft.world.effect.MobEffectInstance(
                net.minecraft.world.effect.MobEffects.MOVEMENT_SPEED,
                20, 1, false, false
            ));
        }
    })
    .grant((entity, params) => {
        if (entity.isPlayer()) entity.tell("You feel the power of the water!");
    })
    .revoke((entity, params) => {
        entity.removeEffect(net.minecraft.world.effect.MobEffects.MOVEMENT_SPEED);
    })
    .register();
```

---

## Tips

- Always call `.register()` last.
- Use `new java.util.HashMap()` for persistent state across callbacks.
- `params` is a Gson `JsonObject` — use `.get("key").getAsFloat()` etc.
- `tick()` runs every tick — keep it lightweight.

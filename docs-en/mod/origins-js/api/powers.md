---
sidebar_position: 5
title: "Powers"
description: "PowerBuilder API — JS-defined custom powers"
---

# Powers

JS-defined powers let you write ability logic entirely in JavaScript. Register via `OriginsJS.powerBuilder()` in `startup_scripts/`.

---

## PowerBuilder

Obtain a builder with `OriginsJS.powerBuilder(id)`, chain callback methods, then call `.register()`.

### Methods

| Method | Callback Signature | Trigger |
|--------|-------------------|---------|
| `.grant(cb)` | `(LivingEntity, JsonObject) => void` | Power gained |
| `.revoke(cb)` | `(LivingEntity, JsonObject) => void` | Power lost |
| `.tick(cb)` | `(LivingEntity, JsonObject) => void` | Every tick |
| `.active(cb)` | `(LivingEntity, JsonObject) => void` | Active key pressed |
| `.inactive(cb)` | `(LivingEntity, JsonObject) => void` | Active key released |
| `.isActive(pred)` | `(LivingEntity, JsonObject) => boolean` | Whether the power is active |
| `.register()` | — | Finalize (must be called last) |

:::caution

`active` and `inactive` callbacks have limited support on 1.20.1 — they are not true overrides of Apoli's lifecycle. Their behavior depends on external key-binding integration.

:::

---

## Regeneration Power

```js
OriginsJS.powerBuilder("regeneration_power")
    .tick((entity, params) => {
        let amount = params.has("amount") ? params.get("amount").getAsFloat() : 0.5;
        if (entity.getHealth() < entity.getMaxHealth()) {
            entity.heal(amount);
        }
    })
    .register();
```

---

## Toggle Night Vision

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

## Underwater Speed

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

## JSON Format

```json
{
    "type": "origins_js:js_power",
    "id": "regeneration_power",
    "params": { "amount": 1.0 }
}
```

- **`type`** — always `origins_js:js_power`
- **`id`** — matches the builder's ID
- **`params`** — optional `JsonObject` passed to every callback

---
sidebar_position: 5
title: "JS 能力"
description: "PowerBuilder 示例 —— tick、切换、条件触发"
---

# JS 能力

## 生命恢复（基于 tick）

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

## 切换夜视（active/inactive）

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

## 水下速度（条件 tick + grant/revoke）

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

## 提示

- 始终将 `.register()` 放在最后调用。
- 使用 `new java.util.HashMap()` 在多个回调之间保存持久状态。
- `params` 是 Gson 的 `JsonObject` —— 使用 `.get("key").getAsFloat()` 等方法读取。
- `tick()` 每个 tick 都会执行 —— 请保持其轻量。
- `active`/`inactive` 回调在 1.20.1 上支持有限。

---
sidebar_position: 5
title: "能力"
description: "PowerBuilder API —— 由 JS 定义的自定义能力"
---

# 能力

由 JS 定义的能力让你可以完全用 JavaScript 编写能力逻辑。在 `startup_scripts/` 中通过 `OriginsJS.powerBuilder()` 注册。

---

## PowerBuilder

用 `OriginsJS.powerBuilder(id)` 获取构建器，链式调用回调方法，然后调用 `.register()`。

### 方法

| 方法 | 回调签名 | 触发时机 |
|--------|-------------------|---------|
| `.grant(cb)` | `(LivingEntity, JsonObject) => void` | 获得能力时 |
| `.revoke(cb)` | `(LivingEntity, JsonObject) => void` | 失去能力时 |
| `.tick(cb)` | `(LivingEntity, JsonObject) => void` | 每个 tick |
| `.active(cb)` | `(LivingEntity, JsonObject) => void` | 按下主动键时 |
| `.inactive(cb)` | `(LivingEntity, JsonObject) => void` | 松开主动键时 |
| `.isActive(pred)` | `(LivingEntity, JsonObject) => boolean` | 能力是否处于激活状态 |
| `.register()` | — | 完成注册（必须最后调用） |

:::caution

`active` 和 `inactive` 回调在 1.20.1 上支持有限 —— 它们并非对 Apoli 生命周期的真正覆写。其行为取决于外部的按键绑定集成。

:::

---

## 生命恢复能力

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

## 切换夜视

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

## 水下速度

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

## JSON 格式

```json
{
    "type": "origins_js:js_power",
    "id": "regeneration_power",
    "params": { "amount": 1.0 }
}
```

- **`type`** —— 始终为 `origins_js:js_power`
- **`id`** —— 与构建器的 ID 一致
- **`params`** —— 可选的 `JsonObject`，会传给每个回调

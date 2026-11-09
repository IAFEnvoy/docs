---
sidebar_position: 8
title: "事件处理"
description: "KubeJS 事件与起源JS 的结合使用"
---

# 事件处理

## 切换起源时的粒子效果

```js
// kubejs/startup_scripts/effects.js
OriginsJS.registerEntityAction("origin_change_particles", (entity, params) => {
    let world = entity.level;
    let pos = entity.position();

    for (let i = 0; i < 20; i++) {
        let angle = (i / 20) * Math.PI * 2;
        let x = pos.x + Math.cos(angle) * 1.5;
        let y = pos.y + 0.5;
        let z = pos.z + Math.sin(angle) * 1.5;
        world.addParticle("minecraft:flame", x, y, z, 0, 0.05, 0);
    }
});
```

```json
{
    "type": "origins:action_on_callback",
    "entity_action_gained": {
        "type": "origins_js:js_entity_action",
        "id": "origin_change_particles"
    }
}
```

---

## 伤害条件：无视护盾

```js
// 1.20.1: DamageSource uses .is(DamageTypeTags.IS_*) instead of .isMagic()
OriginsJS.registerDamageCondition("bypass_shield", (source, amount, params) => {
    if (source.is(net.minecraft.tags.DamageTypeTags.IS_MAGIC)) return true;
    if (source.is(net.minecraft.tags.DamageTypeTags.IS_EXPLOSION)) return true;
    return amount > 5.0;
});
```

```json
{
    "type": "origins:modify_damage_taken",
    "modifier": { "operation": "multiply_total", "value": -0.5 },
    "damage_condition": {
        "type": "origins_js:js_damage_condition",
        "id": "bypass_shield"
    },
    "inverted": true
}
```

---

## 生物群系条件

```js
OriginsJS.registerBiomeCondition("is_forest", (biome, pos, params) => {
    return true; // check biome tags here
});
```

---

## 提示

- 在 `startup_scripts/` 中注册动作/条件。
- 在 `server_scripts/` 中使用 KubeJS 事件（`PlayerEvents`、`EntityEvents` 等）。
- 将自定义条件与 Origins JSON 结合，可以实现强大的声明式配置。
- 1.20.1 中的 `DamageSource` 使用 `source.is(TagKey)` 模式，**而非** `source.isMagic()`。

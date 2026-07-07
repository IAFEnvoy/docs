---
sidebar_position: 8
title: "Event Handling"
description: "KubeJS events combined with Origins JS"
---

# Event Handling

## Particles on origin switch

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

## Damage condition: bypass shield

```js
OriginsJS.registerDamageCondition("bypass_shield", (source, amount, params) => {
    if (source.isMagic()) return true;
    if (source.isExplosion()) return true;
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

## Biome condition

```js
OriginsJS.registerBiomeCondition("is_forest", (biome, pos, params) => {
    return true; // check biome tags here
});
```

---

## Tips

- Register actions/conditions in `startup_scripts/`.
- Use KubeJS events (`PlayerEvents`, `EntityEvents`, etc.) in `server_scripts/`.
- Combining custom conditions with Origins JSON enables powerful declarative setups.

---
sidebar_position: 4
title: "Conditions"
description: "Custom condition registration — entity, block, item, bi-entity, biome, damage, fluid"
---

# Conditions

Custom conditions are registered in `startup_scripts/` and invoked from Origins JSON data files.

---

## Registration Methods

| Method | Callback Signature | JSON Type |
|--------|-------------------|-----------|
| `registerEntityCondition(id, pred)` | `(Entity, JsonObject) => boolean` | `origins_js:js_entity_condition` |
| `registerBlockCondition(id, pred)` | `(Level, BlockPos, JsonObject) => boolean` | `origins_js:js_block_condition` |
| `registerItemCondition(id, pred)` | `(Level, ItemStack, JsonObject) => boolean` | `origins_js:js_item_condition` |
| `registerBiEntityCondition(id, pred)` | `(Entity, Entity, JsonObject) => boolean` | `origins_js:js_bientity_condition` |
| `registerBiomeCondition(id, pred)` | `(Holder<Biome>, BlockPos, JsonObject) => boolean` | `origins_js:js_biome_condition` |
| `registerDamageCondition(id, pred)` | `(DamageSource, float, JsonObject) => boolean` | `origins_js:js_damage_condition` |
| `registerFluidCondition(id, pred)` | `(FluidState, JsonObject) => boolean` | `origins_js:js_fluid_condition` |

The callback **must return** `true` or `false`. The `id` must match between JS and JSON.

---

## JSON Format

```json
{
    "type": "origins_js:js_entity_condition",
    "id": "my_condition_id",
    "params": { "threshold": 10 }
}
```

---

## Entity Condition

```js
OriginsJS.registerEntityCondition("is_in_nether", (entity, params) => {
    return entity.level.dimension() === "minecraft:the_nether";
});
```

```json
{
    "type": "origins:conditioned_attribute",
    "modifier": {
        "attribute": "minecraft:generic.max_health",
        "operation": "addition",
        "value": 10
    },
    "condition": {
        "type": "origins_js:js_entity_condition",
        "id": "is_in_nether"
    }
}
```

---

## Block Condition

```js
OriginsJS.registerBlockCondition("is_air", (world, pos, params) => {
    return world.getBlockState(pos).isAir();
});
```

---

## Item Condition

```js
OriginsJS.registerItemCondition("is_damaged", (world, stack, params) => {
    return stack.isDamaged();
});
```

---

## Bi-entity Condition

```js
OriginsJS.registerBiEntityCondition("is_looking_at", (actor, target, params) => {
    let look = actor.getLookAngle();
    let toTarget = target.position().subtract(actor.position()).normalize();
    return look.x * toTarget.x + look.y * toTarget.y + look.z * toTarget.z > 0.9;
});
```

---

## Damage Condition

```js
OriginsJS.registerDamageCondition("bypass_shield", (source, amount, params) => {
    if (source.isMagic()) return true;
    return amount > 5.0;
});
```

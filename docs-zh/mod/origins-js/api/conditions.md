---
sidebar_position: 4
title: "条件"
description: "自定义条件注册 —— 实体、方块、物品、双实体、生物群系、伤害、流体"
---

# 条件

自定义条件在 `startup_scripts/` 中注册，并由 Origins 的 JSON 数据文件调用。

---

## 注册方法

| 方法 | 回调签名 | JSON 类型 |
|--------|-------------------|-----------|
| `registerEntityCondition(id, pred)` | `(Entity, JsonObject) => boolean` | `origins_js:js_entity_condition` |
| `registerBlockCondition(id, pred)` | `(Level, BlockPos, JsonObject) => boolean` | `origins_js:js_block_condition` |
| `registerItemCondition(id, pred)` | `(Level, ItemStack, JsonObject) => boolean` | `origins_js:js_item_condition` |
| `registerBiEntityCondition(id, pred)` | `(Entity, Entity, JsonObject) => boolean` | `origins_js:js_bientity_condition` |
| `registerBiomeCondition(id, pred)` | `(Holder<Biome>, BlockPos, JsonObject) => boolean` | `origins_js:js_biome_condition` |
| `registerDamageCondition(id, pred)` | `(DamageSource, float, JsonObject) => boolean` | `origins_js:js_damage_condition` |
| `registerFluidCondition(id, pred)` | `(FluidState, JsonObject) => boolean` | `origins_js:js_fluid_condition` |

回调 **必须返回** `true` 或 `false`。`id` 在 JS 与 JSON 中必须保持一致。

---

## JSON 格式

```json
{
    "type": "origins_js:js_entity_condition",
    "id": "my_condition_id",
    "params": { "threshold": 10 }
}
```

---

## 实体条件

```js
OriginsJS.registerEntityCondition("is_in_nether", (entity, params) => {
    return entity.level.dimension().location().toString() === "minecraft:the_nether";
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

## 方块条件

```js
OriginsJS.registerBlockCondition("is_air", (world, pos, params) => {
    return world.getBlockState(pos).isAir();
});
```

---

## 物品条件

```js
OriginsJS.registerItemCondition("is_damaged", (world, stack, params) => {
    return stack.isDamaged();
});
```

---

## 双实体条件

```js
OriginsJS.registerBiEntityCondition("is_looking_at", (actor, target, params) => {
    let look = actor.getLookAngle();
    let toTarget = target.position().subtract(actor.position()).normalize();
    return look.x * toTarget.x + look.y * toTarget.y + look.z * toTarget.z > 0.9;
});
```

---

## 伤害条件

```js
OriginsJS.registerDamageCondition("bypass_shield", (source, amount, params) => {
    // 1.20.1: use source.is(tag) instead of source.isMagic()
    if (source.is(net.minecraft.tags.DamageTypeTags.IS_MAGIC)) return true;
    return amount > 5.0;
});
```

---
sidebar_position: 3
title: "动作"
description: "自定义实体 / 方块 / 物品 / 双实体动作的注册"
---

# 动作

自定义动作在 `startup_scripts/` 中注册，并由 Origins 的 JSON 数据文件调用。

---

## 注册方法

| 方法 | 回调签名 | JSON 类型 |
|--------|-------------------|-----------|
| `registerEntityAction(id, cb)` | `(Entity, JsonObject) => void` | `origins_js:js_entity_action` |
| `registerBlockAction(id, cb)` | `(Level, BlockPos, Direction?, JsonObject) => void` | `origins_js:js_block_action` |
| `registerItemAction(id, cb)` | `(Level, Entity?, SlotAccess?, JsonObject) => void` | `origins_js:js_item_action` |
| `registerBiEntityAction(id, cb)` | `(Entity, Entity, JsonObject) => void` | `origins_js:js_bientity_action` |

`id` 在 JavaScript 注册与 JSON 数据中必须保持一致。

---

## JSON 格式

所有动作类型都使用相同的 JSON 结构：

```json
{
    "type": "origins_js:js_entity_action",
    "id": "my_action_id",
    "params": { "key": "value" }
}
```

- **`type`** —— 必须是上表中的一个值
- **`id`** —— 与 `register*` 的第一个参数一致
- **`params`** —— 可选的 `JsonObject`，会传给回调

---

## 实体动作

```js
OriginsJS.registerEntityAction("heal_half", (entity, params) => {
    if (entity.isLiving()) entity.heal(entity.getMaxHealth() / 2);
});
```

```json
{
    "type": "origins:action_on_callback",
    "entity_action_gained": {
        "type": "origins_js:js_entity_action",
        "id": "heal_half"
    }
}
```

---

## 方块动作

```js
OriginsJS.registerBlockAction("set_air", (world, pos, direction, params) => {
    world.setBlock(pos, Blocks.AIR.defaultBlockState(), 3);
});
```

---

## 物品动作

```js
OriginsJS.registerItemAction("damage_item", (world, entity, slotAccess, params) => {
    if (slotAccess != null) {
        slotAccess.get().hurt(1, world.random, null);
    }
});
```

---

## 双实体动作

```js
OriginsJS.registerBiEntityAction("copy_effects", (actor, target, params) => {
    if (actor.isLiving() && target.isLiving()) {
        actor.getActiveEffects().forEach(effect => {
            target.addEffect(
                new net.minecraft.world.effect.MobEffectInstance(effect)
            );
        });
    }
});
```

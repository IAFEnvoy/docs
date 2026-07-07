---
sidebar_position: 3
title: "Actions"
description: "Custom entity / block / item / bi-entity action registration"
---

# Actions

Custom actions are registered in `startup_scripts/` and invoked from Origins JSON data files.

---

## Registration Methods

| Method | Callback Signature | JSON Type |
|--------|-------------------|-----------|
| `registerEntityAction(id, cb)` | `(Entity, JsonObject) => void` | `origins_js:js_entity_action` |
| `registerBlockAction(id, cb)` | `(Level, BlockPos, Direction?, JsonObject) => void` | `origins_js:js_block_action` |
| `registerItemAction(id, cb)` | `(Level, Entity?, SlotAccess?, JsonObject) => void` | `origins_js:js_item_action` |
| `registerBiEntityAction(id, cb)` | `(Entity, Entity, JsonObject) => void` | `origins_js:js_bientity_action` |

The `id` must match between the JavaScript registration and the JSON data.

---

## JSON Format

Every action type uses the same JSON structure:

```json
{
    "type": "origins_js:js_entity_action",
    "id": "my_action_id",
    "params": { "key": "value" }
}
```

- **`type`** — must be one of the values in the table above
- **`id`** — matches the first argument of `register*`
- **`params`** — optional `JsonObject` passed to the callback

---

## Entity Action

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

## Block Action

```js
OriginsJS.registerBlockAction("set_air", (world, pos, direction, params) => {
    world.setBlock(pos, Blocks.AIR.defaultBlockState(), 3);
});
```

---

## Item Action

```js
OriginsJS.registerItemAction("damage_item", (world, entity, slotAccess, params) => {
    if (slotAccess != null) {
        slotAccess.get().hurt(1, world.random, null);
    }
});
```

---

## Bi-entity Action

```js
OriginsJS.registerBiEntityAction("copy_effects", (actor, target, params) => {
    if (actor.isLiving() && target.isLiving()) {
        actor.getActiveEffects().forEach(effect => {
            target.addEffect(new net.minecraft.world.effect.MobEffectInstance(effect));
        });
    }
});
```

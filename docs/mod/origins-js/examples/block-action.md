---
sidebar_position: 2
title: "Block Action"
description: "registerBlockAction example"
---

# Block Action

## Registration

```js
// kubejs/startup_scripts/actions.js
OriginsJS.registerBlockAction("set_air", (world, pos, direction, params) => {
    world.setBlock(pos, Blocks.AIR.defaultBlockState(), 3);
});
```

## JSON

```json
{
    "type": "origins:action_on_block_use",
    "block_action": {
        "type": "origins_js:js_block_action",
        "id": "set_air"
    },
    "block_condition": {
        "type": "origins:block",
        "block": "minecraft:dirt"
    }
}
```

## Callback Parameters

| Param | Type | Description |
|-------|------|-------------|
| `world` | `Level` | The dimension / world |
| `pos` | `BlockPos` | Position of the block |
| `direction` | `Direction?` | Facing direction, or `null` |
| `params` | `JsonObject` | JSON params from the data file |

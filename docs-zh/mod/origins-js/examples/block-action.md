---
sidebar_position: 2
title: "方块动作"
description: "registerBlockAction 示例"
---

# 方块动作

## 注册

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

## 回调参数

| 参数 | 类型 | 说明 |
|-------|------|-------------|
| `world` | `Level` | 维度 / 世界 |
| `pos` | `BlockPos` | 方块的位置 |
| `direction` | `Direction` 或 `null` | 朝向 |
| `params` | `JsonObject` | 数据文件中的 JSON 参数 |

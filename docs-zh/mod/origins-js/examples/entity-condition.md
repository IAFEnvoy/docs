---
sidebar_position: 3
title: "实体条件"
description: "带参数的 registerEntityCondition 示例"
---

# 实体条件

## 注册

```js
// kubejs/startup_scripts/conditions.js
OriginsJS.registerEntityCondition("is_in_nether", (entity, params) => {
    // 1.20.1: dimension() returns ResourceKey, use .location().toString()
    return entity.level.dimension().location().toString() === "minecraft:the_nether";
});

OriginsJS.registerEntityCondition("health_below", (entity, params) => {
    let threshold = params.get("threshold").getAsFloat();
    if (entity.isLiving()) {
        return entity.getHealth() < threshold;
    }
    return false;
});
```

## JSON

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

## 带参数的 JSON

```json
{
    "type": "origins:conditioned_attribute",
    "modifier": {
        "attribute": "minecraft:generic.max_health",
        "operation": "addition",
        "value": 4
    },
    "condition": {
        "type": "origins_js:js_entity_condition",
        "id": "health_below",
        "params": { "threshold": 10 }
    }
}
```

## 读取参数

`params` 是 Gson 的 `JsonObject`。常用方法：

| 类型 | 方法 |
|------|--------|
| 字符串 | `params.get("key").getAsString()` |
| 数字 | `params.get("key").getAsFloat()` / `.getAsInt()` |
| 布尔值 | `params.get("key").getAsBoolean()` |
| 判断是否存在 | `params.has("key")` |

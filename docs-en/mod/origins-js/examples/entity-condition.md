---
sidebar_position: 3
title: "Entity Condition"
description: "registerEntityCondition with parameters"
---

# Entity Condition

## Registration

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

## JSON with Params

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

## Reading Params

`params` is a Gson `JsonObject`. Common methods:

| Type | Method |
|------|--------|
| String | `params.get("key").getAsString()` |
| Number | `params.get("key").getAsFloat()` / `.getAsInt()` |
| Boolean | `params.get("key").getAsBoolean()` |
| Check exists | `params.has("key")` |

---
sidebar_position: 4
title: "Bi-entity Condition"
description: "registerBiEntityCondition example"
---

# Bi-entity Condition

## Registration

```js
// kubejs/startup_scripts/conditions.js
OriginsJS.registerBiEntityCondition("is_looking_at", (actor, target, params) => {
    let lookVec = actor.getLookAngle();
    let toTarget = target.position().subtract(actor.position()).normalize();
    let dot = lookVec.x * toTarget.x + lookVec.y * toTarget.y + lookVec.z * toTarget.z;
    return dot > 0.9; // within ~25 degrees
});
```

## JSON

```json
{
    "type": "origins:action_on_hit",
    "bientity_action": {
        "type": "origins:attacker_action_when_hit",
        "entity_action": {
            "type": "origins:damage",
            "amount": 4,
            "damage_type": "minecraft:magic"
        }
    },
    "bientity_condition": {
        "type": "origins_js:js_bientity_condition",
        "id": "is_looking_at"
    }
}
```

## Parameters

| Param | Type | Role |
|-------|------|------|
| `actor` | `Entity` | The doer (e.g. attacker) |
| `target` | `Entity` | The receiver |
| `params` | `JsonObject` | JSON params |

The callback **must return** `true` or `false`.

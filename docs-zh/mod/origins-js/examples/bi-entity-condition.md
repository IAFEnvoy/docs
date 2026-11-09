---
sidebar_position: 4
title: "双实体条件"
description: "registerBiEntityCondition 示例"
---

# 双实体条件

## 注册

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

## 参数

| 参数 | 类型 | 作用 |
|-------|------|------|
| `actor` | `Entity` | 动作执行者（例如攻击者） |
| `target` | `Entity` | 动作承受者 |
| `params` | `JsonObject` | JSON 参数 |

回调 **必须返回** `true` 或 `false`。

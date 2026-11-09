---
sidebar_position: 1
title: "实体动作"
description: "registerEntityAction 示例及 JSON 用法"
---

# 实体动作

## 注册

```js
// kubejs/startup_scripts/actions.js
OriginsJS.registerEntityAction("heal_half", (entity, params) => {
    if (entity.isLiving()) {
        entity.heal(entity.getMaxHealth() / 2);
    }
});

OriginsJS.registerEntityAction("send_message", (entity, params) => {
    let msg = params.get("message").getAsString();
    if (entity.isPlayer()) {
        entity.tell(msg);
    }
});
```

## JSON

```json
{
    "type": "origins:action_on_callback",
    "entity_action_gained": {
        "type": "origins_js:js_entity_action",
        "id": "heal_half"
    },
    "entity_action_lost": {
        "type": "origins_js:js_entity_action",
        "id": "send_message",
        "params": { "message": "You lost your origin!" }
    }
}
```

## 工作原理

1. 脚本以 ID `"heal_half"` 和 `"send_message"` 注册回调。
2. JSON 通过 `"type": "origins_js:js_entity_action"` 引用这些 ID。
3. 当 Origins 触发该动作时，JSON 中的 `params` 会传给回调。

---
sidebar_position: 1
title: "Entity Action"
description: "registerEntityAction example with JSON usage"
---

# Entity Action

## Registration

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

## How It Works

1. The script registers callbacks under IDs `"heal_half"` and `"send_message"`.
2. The JSON references those IDs via `"type": "origins_js:js_entity_action"`.
3. When Origins fires the action, `params` from the JSON are passed to the callback.

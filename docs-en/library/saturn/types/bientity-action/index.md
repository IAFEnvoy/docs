---
title: "Bi-entity action"
sidebar_position: 0
---

The context contains an actor (the initiator) and a target. The same ID may have different fields in the entity action and bi-entity action registries; the two kinds are not interchangeable.

| Type | Purpose |
| --- | --- |
| [`saturn:no_op`](./no_op.md) | Does nothing; usable as a placeholder action value. |
| [`saturn:sequence`](./sequence.md) | Runs several actions of the same kind in array order. |
| [`saturn:chance`](./chance.md) | Decides whether the action fires based on a given chance. |
| [`saturn:if_else`](./if_else.md) | Runs if_action when the condition holds, otherwise runs else_action. |
| [`saturn:choice`](./choice.md) | Picks one action at random by weight and runs it. |
| [`saturn:actor_action`](./actor_action.md) | Hands the actor of the bi-entity context to an entity action. |
| [`saturn:target_action`](./target_action.md) | Hands the target of the bi-entity context to an entity action. |
| [`saturn:send_message`](./send_message.md) | Sends a text component to players that match the recipient condition, optionally to the chat bar or the action bar. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |
| [`saturn:mount`](./mount.md) | Makes the actor ride the target. |
| [`saturn:heal_target`](./heal_target.md) | Restores health to the target entity of the bi-entity context. |
| [`saturn:transfer_resource`](./transfer_resource.md) | Transfers the given Saturn resource between the actor and the target. |
| [`saturn:add_velocity`](./add_velocity.md) | Adds velocity, or replaces it with the given vector. |
| [`saturn:teleport`](./teleport.md) | Changes the position of the entity. |

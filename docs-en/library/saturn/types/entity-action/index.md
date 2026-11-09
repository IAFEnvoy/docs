---
title: "Entity action"
sidebar_position: 0
---

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

| Type | Purpose |
| --- | --- |
| [`saturn:no_op`](./no_op.md) | Does nothing; usable as a placeholder action value. |
| [`saturn:sequence`](./sequence.md) | Runs several actions of the same kind in array order. |
| [`saturn:chance`](./chance.md) | Decides whether the action fires based on a given chance. |
| [`saturn:if_else`](./if_else.md) | Runs if_action when the condition holds, otherwise runs else_action. |
| [`saturn:choice`](./choice.md) | Picks one action at random by weight and runs it. |
| [`saturn:send_message`](./send_message.md) | Sends a text component to players that match the recipient condition, optionally to the chat bar or the action bar. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |
| [`saturn:dismount`](./dismount.md) | Makes the entity leave its current mount. |
| [`saturn:extinguish`](./extinguish.md) | Clears the entity's current burning state. |
| [`saturn:heal`](./heal.md) | Restores the entity's health. |
| [`saturn:add_resource`](./add_resource.md) | Adds to the current value of the given Saturn resource. |
| [`saturn:grant_ability`](./grant_ability.md) | Grants an ability to the entity under the given source ID. |
| [`saturn:remove_ability`](./remove_ability.md) | Removes an ability granted by the given source without affecting other sources. |
| [`saturn:apply_effect`](./apply_effect.md) | Applies a mob effect with the given duration and amplifier to the entity. |
| [`saturn:teleport`](./teleport.md) | Changes the position of the entity. |
| [`saturn:knockback`](./knockback.md) | Applies velocity to the entity along the given vector. |
| [`saturn:modify_ability_storage`](./modify_ability_storage.md) | Writes a state of the given kind into the storage of the target ability. |
| [`saturn:spawn_entity`](./spawn_entity.md) | Spawns an entity at the position provided by the context or at the given coordinates. |
| [`saturn:spawn_projectile`](./spawn_projectile.md) | Spawns an entity and gives it the given initial velocity. |
| [`saturn:add_experience`](./add_experience.md) | Adds experience points, levels, or both to the player. |
| [`saturn:add_velocity`](./add_velocity.md) | Adds velocity, or replaces it with the given vector. |
| [`saturn:exhaust`](./exhaust.md) | Adds to the player's food exhaustion. |
| [`saturn:feed`](./feed.md) | Adds food and saturation to the player. |
| [`saturn:gain_air`](./gain_air.md) | Modifies the entity's remaining air. |
| [`saturn:give_item`](./give_item.md) | Creates an item stack and hands it to the entity, optionally with a preferred equipment slot. |
| [`saturn:play_sound`](./play_sound.md) | Plays the given sound at the entity. |
| [`saturn:remove_effect`](./remove_effect.md) | Removes the given mob effect from the entity. |
| [`saturn:set_fall_distance`](./set_fall_distance.md) | Changes the entity's accumulated fall distance. |
| [`saturn:set_no_gravity`](./set_no_gravity.md) | Controls whether the entity ignores gravity. |
| [`saturn:set_on_fire`](./set_on_fire.md) | Sets the entity on fire for the given number of ticks. |
| [`saturn:swing_hand`](./swing_hand.md) | Triggers the swing animation of the given hand. |
| [`saturn:emit_game_event`](./emit_game_event.md) | Emits a vanilla game event that sculk sensors and similar blocks can receive. |
| [`saturn:passenger_action`](./passenger_action.md) | Runs an action on the entity's passengers, optionally recursing through multiple levels. |
| [`saturn:block_action`](./block_action.md) | Runs a block action on the block at the entity's position. |
| [`saturn:self_bientity_action`](./self_bientity_action.md) | Runs a bi-entity action with the same entity as both actor and target. |
| [`saturn:equipped_item_action`](./equipped_item_action.md) | Runs an item action on the item stack in the given equipment slot. |
| [`saturn:riding_action`](./riding_action.md) | Runs an action on what the entity is riding, optionally recursing through the mount chain. |
| [`saturn:spawn_particles`](./spawn_particles.md) | Spawns particles near the entity with the given offset and spread parameters. |
| [`saturn:spawn_effect_cloud`](./spawn_effect_cloud.md) | Spawns an area effect cloud with mob effects near the entity. |

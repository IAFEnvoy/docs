---
title: "Block action"
sidebar_position: 0
---

Acts on the world and block position given by the context. It is not a standalone data pack file; embed it in a field that requires a BlockAction.

| Type | Purpose |
| --- | --- |
| [`saturn:no_op`](./no_op.md) | Does nothing; usable as a placeholder action value. |
| [`saturn:sequence`](./sequence.md) | Runs several actions of the same kind in array order. |
| [`saturn:chance`](./chance.md) | Decides whether the action fires based on a given chance. |
| [`saturn:if_else`](./if_else.md) | Runs if_action when the condition holds, otherwise runs else_action. |
| [`saturn:choice`](./choice.md) | Picks one action at random by weight and runs it. |
| [`saturn:offset`](./offset.md) | Moves the block context by the given offset before checking or running the child. |
| [`saturn:send_message`](./send_message.md) | Sends a text component to players that match the recipient condition, optionally to the chat bar or the action bar. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |
| [`saturn:set_block`](./set_block.md) | Sets the current position to the given block. |
| [`saturn:break_block`](./break_block.md) | Breaks the block at the context position, optionally controlling whether items drop. |
| [`saturn:schedule_tick`](./schedule_tick.md) | Schedules a delayed tick for the block at the context position. |
| [`saturn:bonemeal`](./bonemeal.md) | Tries to apply bonemeal to the context block. |
| [`saturn:light_up`](./light_up.md) | Tries to set the context position on fire. |
| [`saturn:explode`](./explode.md) | Creates an explosion at the context position, with configurable destruction behavior and protection conditions. |
| [`saturn:spawn_entity`](./spawn_entity.md) | Spawns an entity at the position given by the context or at the specified coordinates. |

---
title: "Item action"
sidebar_position: 0
---

Operates on the item stack and its holder from the context. It is not an item definition file; embed it in a field that requires an ItemAction.

| Type | Purpose |
| --- | --- |
| [`saturn:no_op`](./no_op.md) | Does nothing; usable as a placeholder action value. |
| [`saturn:sequence`](./sequence.md) | Runs several actions of the same kind in array order. |
| [`saturn:chance`](./chance.md) | Decides whether the action fires based on a given chance. |
| [`saturn:if_else`](./if_else.md) | Runs if_action when the condition holds, otherwise runs else_action. |
| [`saturn:choice`](./choice.md) | Picks one action at random by weight and runs it. |
| [`saturn:send_message`](./send_message.md) | Sends a text component to players that match the recipient condition, optionally to the chat bar or the action bar. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |
| [`saturn:damage_item`](./damage_item.md) | Applies the given durability loss to the item stack. |
| [`saturn:consume_item`](./consume_item.md) | Reduces the count of the item stack in the context. |
| [`saturn:consume_health`](./consume_health.md) | Consumes health from the item holder. |
| [`saturn:cooldown`](./cooldown.md) | Reads or sets the cooldown state. |
| [`saturn:remove_enchantment`](./remove_enchantment.md) | Removes selected enchantments from the item, optionally resetting the repair cost. |
| [`saturn:add_enchantment`](./add_enchantment.md) | Adds or overrides enchantment levels on the item according to the map. |
| [`saturn:merge_components`](./merge_components.md) | Merges a data component patch into the item stack. |

---
title: "Trigger"
sidebar_position: 0
---

A trigger matches published server signals. It can be used in trigger rules or triggered abilities; registration itself does not perform any action. See the [trigger lifecycle](../../guides/triggers.md).

| Type | Purpose |
| --- | --- |
| [`saturn:tick`](./tick.md) | Publishes a signal on each server-side entity tick. |
| [`saturn:attack`](./attack.md) | Publishes a signal when an entity attacks a target. |
| [`saturn:hurt`](./hurt.md) | Publishes a signal when an entity takes damage. |
| [`saturn:kill`](./kill.md) | Publishes a signal when an entity kills another entity. |
| [`saturn:block_break`](./block_break.md) | Publishes a signal when a player breaks a block. |
| [`saturn:block_use`](./block_use.md) | Publishes a signal when a player interacts with a block. |
| [`saturn:item_use`](./item_use.md) | Publishes a signal when an entity finishes using an item. |
| [`saturn:equip`](./equip.md) | Publishes a signal when an entity's equipment changes. |
| [`saturn:death`](./death.md) | Publishes a signal when an entity dies. |
| [`saturn:consume_item`](./consume_item.md) | Decreases the count of the item stack in the context. |
| [`saturn:brewed_potion`](./brewed_potion.md) | Matches the parameters of the vanilla brewed potion criterion when a player brews a potion. |
| [`saturn:tame_animal`](./tame_animal.md) | Publishes a signal when a player successfully tames an animal. |
| [`saturn:bred_animals`](./bred_animals.md) | Publishes a signal to the relevant players when animals breed successfully. |
| [`saturn:villager_trade`](./villager_trade.md) | Publishes a signal when a player completes a trade with a villager. |
| [`saturn:used_totem`](./used_totem.md) | Publishes a signal when a player consumes a totem to avoid death. |
| [`saturn:started_riding`](./started_riding.md) | Publishes a signal when a player starts riding. |
| [`saturn:changed_dimension`](./changed_dimension.md) | Publishes a signal when a player switches dimension. |
| [`saturn:effects_changed`](./effects_changed.md) | Publishes a signal when a player's status effects change. |
| [`saturn:lightning_strike`](./lightning_strike.md) | Matches the involved player, the lightning and nearby entities when a lightning strike occurs. |
| [`saturn:player_hurt_entity`](./player_hurt_entity.md) | Publishes a signal when a player deals damage to an entity. |
| [`saturn:entity_hurt_player`](./entity_hurt_player.md) | Publishes a signal when a player is hurt by an entity. |
| [`saturn:player_killed_entity`](./player_killed_entity.md) | Publishes a signal when a player kills an entity. |
| [`saturn:entity_killed_player`](./entity_killed_player.md) | Publishes a signal when a player is killed by an entity. |
| [`saturn:shot_crossbow`](./shot_crossbow.md) | Publishes a signal when a player shoots a crossbow. |
| [`saturn:player_interacted_with_entity`](./player_interacted_with_entity.md) | Publishes a signal when a player interacts with an entity. |
| [`saturn:fishing_rod_hooked`](./fishing_rod_hooked.md) | Matches the rod, entity and caught item parameters when fishing completes. |
| [`saturn:thrown_item_picked_up_by_player`](./thrown_item_picked_up_by_player.md) | Publishes a signal when a player picks up an item that carries thrower information. |
| [`saturn:enter_block`](./enter_block.md) | Polls the block a player enters and matches the block state. |
| [`saturn:location`](./location.md) | Reads the entity's position and dimension. |
| [`saturn:slept_in_bed`](./slept_in_bed.md) | Publishes a signal when a player sleeps in a bed. |
| [`saturn:levitation`](./levitation.md) | Polls the distance and duration of a player's levitation. |
| [`saturn:fall_from_height`](./fall_from_height.md) | Matches signals by the recorded fall start position and distance. |
| [`saturn:fall_after_explosion`](./fall_after_explosion.md) | Matches the movement caused by an explosion and the fall that follows. |
| [`saturn:ride_entity_in_lava`](./ride_entity_in_lava.md) | Matches the distance a player travels while riding in lava. |
| [`saturn:nether_travel`](./nether_travel.md) | Matches the start position and distance of Nether travel. |
| [`saturn:inventory_changed`](./inventory_changed.md) | Matches vanilla item and slot predicates against changes in the inventory snapshot. |
| [`saturn:using_item`](./using_item.md) | Publishes a signal while an entity is using an item. |
| [`saturn:filled_bucket`](./filled_bucket.md) | Matches the resulting item when a player fills a bucket. |
| [`saturn:item_durability_changed`](./item_durability_changed.md) | Matches item durability and the durability delta. |
| [`saturn:advancement_completed`](./advancement_completed.md) | Publishes a signal when a whole Minecraft advancement is completed, optionally filtered by advancement ID. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |

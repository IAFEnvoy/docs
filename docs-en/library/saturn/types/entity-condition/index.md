---
title: "Entity condition"
sidebar_position: 0
---

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

| Type | Purpose |
| --- | --- |
| [`saturn:always`](./always.md) | The condition is always true. |
| [`saturn:never`](./never.md) | The condition is always false. |
| [`saturn:and`](./and.md) | Matches only when every sub-condition holds. |
| [`saturn:or`](./or.md) | Matches when any sub-condition holds. |
| [`saturn:not`](./not.md) | Inverts the match result of the sub-condition. |
| [`saturn:chance`](./chance.md) | Decides whether the check succeeds based on a given chance. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |
| [`saturn:sneaking`](./sneaking.md) | Checks whether an entity is sneaking. |
| [`saturn:has_ability`](./has_ability.md) | Checks whether an entity has the given ability. |
| [`saturn:partner`](./partner.md) | Checks nearby entities within a range using a bi-entity condition. |
| [`saturn:resource_compare`](./resource_compare.md) | Checks whether the current value of the given resource reaches at least min. |
| [`saturn:entity_tag`](./entity_tag.md) | Checks whether the entity type belongs to the given tag. |
| [`saturn:air`](./air.md) | Reads or compares the remaining air of an entity. |
| [`saturn:dimension`](./dimension.md) | Checks the dimension an entity is in. |
| [`saturn:entity_type`](./entity_type.md) | Checks whether an entity is of the given type. |
| [`saturn:fall_distance`](./fall_distance.md) | Compares the accumulated fall distance of an entity. |
| [`saturn:glowing`](./glowing.md) | Checks whether an entity is glowing. |
| [`saturn:health`](./health.md) | Reads or compares the current health of an entity. |
| [`saturn:exposed_to_sky`](./exposed_to_sky.md) | Checks whether the position of an entity can see the sky. |
| [`saturn:food_level`](./food_level.md) | Compares the food level of a player. |
| [`saturn:mob_effect`](./mob_effect.md) | Checks whether an entity has the given status effect. |
| [`saturn:on_block`](./on_block.md) | Checks whether the block below the feet of an entity satisfies a block condition. |
| [`saturn:time_of_day`](./time_of_day.md) | Compares the day/night time of the context world. |
| [`saturn:using_item`](./using_item.md) | Checks whether an entity is using an item. |
| [`saturn:brightness`](./brightness.md) | Compares the brightness at the position of an entity. |
| [`saturn:exposed_to_sun`](./exposed_to_sun.md) | Checks whether an entity is exposed to sunlight. |
| [`saturn:experience_level`](./experience_level.md) | Compares the experience level of a player. |
| [`saturn:experience_points`](./experience_points.md) | Compares the total experience points of a player. |
| [`saturn:relative_health`](./relative_health.md) | Compares the ratio of the current health of an entity to its maximum health. |
| [`saturn:saturation_level`](./saturation_level.md) | Compares the food saturation of a player. |
| [`saturn:team`](./team.md) | Reads or checks the scoreboard team of an entity. |
| [`saturn:attribute`](./attribute.md) | Reads or compares the value of a specified attribute of an entity. |
| [`saturn:block_collision`](./block_collision.md) | Checks whether the offset entity bounding box collides with blocks. |
| [`saturn:can_have_effect`](./can_have_effect.md) | Checks whether an entity can receive the given status effect. |
| [`saturn:gamemode`](./gamemode.md) | Checks the game mode of a player. |
| [`saturn:passenger`](./passenger.md) | Counts the direct passengers that satisfy a bi-entity condition and compares the count. |
| [`saturn:attack_cooldown`](./attack_cooldown.md) | Compares the attack charge progress of a player. |
| [`saturn:equipped_item`](./equipped_item.md) | Checks whether the item in the given equipment slot satisfies an item condition. |
| [`saturn:main_hand_item`](./main_hand_item.md) | Checks whether the main hand item of an entity satisfies an item condition. |
| [`saturn:in_block`](./in_block.md) | Checks whether the block an entity is inside satisfies a condition. |
| [`saturn:in_block_anywhere`](./in_block_anywhere.md) | Counts the blocks within the entity bounding box that satisfy a condition. |
| [`saturn:scoreboard`](./scoreboard.md) | Compares scores under the given scoreboard objective. |
| [`saturn:riding`](./riding.md) | Checks whether the mount of an entity satisfies a bi-entity condition. |
| [`saturn:riding_recursive`](./riding_recursive.md) | Checks multi-level riding relationships. |
| [`saturn:passenger_recursive`](./passenger_recursive.md) | Recursively counts the passengers that satisfy a condition. |
| [`saturn:riding_root`](./riding_root.md) | Checks the root entity of the riding chain. |
| [`saturn:ability_storage_toggle`](./ability_storage_toggle.md) | Checks the toggle value of the given ability storage. |
| [`saturn:ability_storage_timer`](./ability_storage_timer.md) | Checks the remaining duration of the ability timer. |
| [`saturn:ability_storage_resource`](./ability_storage_resource.md) | Checks the resource value in the ability storage. |
| [`saturn:ability_storage_target`](./ability_storage_target.md) | Checks whether the ability has a locked target that satisfies the distance condition. |
| [`saturn:ability_storage_charges`](./ability_storage_charges.md) | Checks the remaining charges of the ability. |
| [`saturn:ability_storage_cooldown`](./ability_storage_cooldown.md) | Checks the current remaining cooldown duration of the ability. |

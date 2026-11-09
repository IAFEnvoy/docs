---
title: "Entity getter"
sidebar_position: 0
---

The full set of EntityValueGetter parameters determines the query identity. It reads only the passed view or an already captured snapshot; a missing value is not the same as a known 0, false, or empty collection.

| Type | Purpose |
| --- | --- |
| [`saturn:attribute`](./attribute.md) | Reads the base or effective value of the given attribute from the captured attributes. |
| [`saturn:resource`](./resource.md) | Reads the current value or bounds of the given resource from the captured resources. |
| [`saturn:effect`](./effect.md) | Reads the amplifier or duration of the given mob effect. |
| [`saturn:score`](./score.md) | Reads the score of the given objective. |
| [`saturn:abilities`](./abilities.md) | Reads the ability information the entity holds. |
| [`saturn:absorption`](./absorption.md) | Reads the entity's absorption health. |
| [`saturn:advancements`](./advancements.md) | Reads the captured player advancement information. |
| [`saturn:air`](./air.md) | Reads the entity's remaining air. |
| [`saturn:attributes`](./attributes.md) | Reads the captured attribute list. |
| [`saturn:carried_item`](./carried_item.md) | Reads the item the player currently carries on the cursor. |
| [`saturn:effects`](./effects.md) | Reads the entity's current list of mob effects. |
| [`saturn:ender_chest`](./ender_chest.md) | Reads the captured contents of the player's ender chest. |
| [`saturn:equipment`](./equipment.md) | Reads the entity's equipment slot information. |
| [`saturn:experience`](./experience.md) | Reads the player's experience points, level and progress. |
| [`saturn:food`](./food.md) | Reads the player's food level, saturation and exhaustion. |
| [`saturn:game_mode`](./game_mode.md) | Reads the player's game mode. |
| [`saturn:health`](./health.md) | Reads the entity's current health. |
| [`saturn:inventory`](./inventory.md) | Reads the captured contents of the player's inventory. |
| [`saturn:location`](./location.md) | Reads the entity's position and dimension. |
| [`saturn:max_health`](./max_health.md) | Reads the entity's max health. |
| [`saturn:profile`](./profile.md) | Reads the player's UUID and name. |
| [`saturn:resources`](./resources.md) | Reads the captured Saturn resource list. |
| [`saturn:scores`](./scores.md) | Reads the captured scoreboard scores. |
| [`saturn:selected_slot`](./selected_slot.md) | Reads the hotbar slot the player currently has selected. |
| [`saturn:statistics`](./statistics.md) | Reads the captured player statistics. |
| [`saturn:team`](./team.md) | Reads the captured scoreboard team information. |

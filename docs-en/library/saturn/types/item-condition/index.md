---
title: "Item condition"
sidebar_position: 0
---

Checks a single ItemStack. An item ID string cannot be treated directly as an arbitrary ItemCondition.

| Type | Purpose |
| --- | --- |
| [`saturn:always`](./always.md) | The condition is always true. |
| [`saturn:never`](./never.md) | The condition is always false. |
| [`saturn:and`](./and.md) | Matches only when every sub-condition holds. |
| [`saturn:or`](./or.md) | Matches when any sub-condition holds. |
| [`saturn:not`](./not.md) | Inverts the match result of the sub-condition. |
| [`saturn:chance`](./chance.md) | Decides whether the check succeeds based on a given chance. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |
| [`saturn:item_id`](./item_id.md) | Checks whether the item stack is the given item. |
| [`saturn:item_tag`](./item_tag.md) | Checks whether the item belongs to the given tag. |
| [`saturn:item_matcher`](./item_matcher.md) | Checks the item stack against several item matcher entries. |
| [`saturn:amount`](./amount.md) | Compares the count of the item stack. |
| [`saturn:fuel`](./fuel.md) | Compares the burn time of the item as fuel. |
| [`saturn:is_equipable`](./is_equipable.md) | Checks whether the item can be equipped into the given slot. |
| [`saturn:relative_durability`](./relative_durability.md) | Compares the ratio of remaining durability to maximum durability. |
| [`saturn:armor_value`](./armor_value.md) | Compares the armor value provided by the equipment. |
| [`saturn:durability`](./durability.md) | Compares the remaining durability of the item. |
| [`saturn:on_cooldown`](./on_cooldown.md) | Checks whether the item in the context is on cooldown. |
| [`saturn:ingredient`](./ingredient.md) | Matches the item using a Minecraft Ingredient. |
| [`saturn:tool_ability`](./tool_ability.md) | Checks whether the item supports the given NeoForge ItemAbility. |
| [`saturn:base_enchantment`](./base_enchantment.md) | Compares the level of the given base enchantment on the item. |
| [`saturn:has_component`](./has_component.md) | Checks whether the item stack has the given data component. |
| [`saturn:component`](./component.md) | Checks the data of the given component on the item stack. |

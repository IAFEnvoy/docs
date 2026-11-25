---
title: Player Guide
description: Awaken, name, and command companions, and set up automatic furnace smelting.
sidebar_position: 1
---

## Awaken a companion

| Object | Default requirement |
| --- | --- |
| Sword | Defeat a hostile mob with the sword. |
| Pickaxe | Mine a block in `#psychic:attunement_ores` with a suitable pickaxe. |
| Axe | Hold an eligible axe. It is ready to awaken. |
| Furnace | Place the furnace yourself and let it finish one smelt. |

Hold a tool in your main hand and sneak-right-click the air, or use `/psychic awaken`. For a furnace, look at it and sneak-right-click with an empty main hand, or use `/psychic awaken block`.

The player who awakens a companion becomes its owner. Only the owner can name it or give it orders through chat or commands. A companion without an owner accepts no orders.

## Name and address companions

Run `/psychic list` to see your companions and `/psychic select <number or name>` to select one. Set its primary name with `/psychic name <name>`. Manage aliases with `/psychic alias add <alias>` and `/psychic alias remove <alias>`. While looking at a furnace, you can also use `/psychic block name`, `/psychic block alias add`, or `/psychic block alias remove` followed by a name.

Type `!<name> <instruction>` in chat. The full-width prefix `！` also works. You can address companions by an item or block's display name. Each available companion that matches the same name receives the order. Use a unique name to query one companion. To query a block companion, you can also look at it and send `!this status`. When you have a selected companion, you can omit the name and send `!status`.

## Carried companions

| Instruction | Effect |
| --- | --- |
| `!Blade hover` | Summon a companion named Blade to hover near you. |
| `!Blade fly` | Let it fly freely nearby. |
| `!Blade back` | Recall it. |
| `!team back` | Recall your carried companions. |
| `!Blade fetch 8 minecraft:raw_iron` | Send it to nearby containers to find supplies and deliver them to your inventory. |
| `!Miner mine` | Send a pickaxe named Miner to dig the block you are looking at within reach. |

A flying companion holds the original item. You can have up to four flying companions at once. An awakened sword can keep attacking after it joins a fight. In PvP, assistance starts after the same player damages the same opponent twice within five seconds. Use `/psychic assist off` or `/psychic assist on` to control automatic assistance for the selected companion.

## Supply and run a furnace

Put ingredients and fuel in nearby containers. The built-in furnace searches within eight blocks. Address the furnace within interaction range to give it an order. For example, `!Iron Furnace smelt 8 minecraft:raw_iron` gathers supplies and any fuel it still needs, then leaves the ingots in its output slot.

| Instruction | Effect |
| --- | --- |
| `!Iron Furnace smelt all minecraft:raw_iron` | Smelt nearby raw iron in batches and return each batch to its source container. |
| `!Iron Furnace watch smelt minecraft:barrel minecraft:raw_iron` | Keep checking nearby barrels for raw iron. Smelt it and return the output when new input appears. |
| `!Iron Furnace unwatch smelt` | Remove the ongoing rule. A batch that has already started can finish. |
| `!Iron Furnace cancel` | Cancel an incoming load, stop tracking a finite order, or stop the next bulk batch. |

An ongoing rule runs while the furnace's chunk is loaded and the owner who set the rule is online in the same dimension. If the source container is full or inaccessible, the output stays in the furnace. Awakened containers control what they give out through their own behavior. When a furnace drops as an item, it retains its identity, owner, names, and automatic smelting rule. Placing it restores them.

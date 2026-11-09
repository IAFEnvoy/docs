---
title: "Villager trade"
sidebar_position: 10
---

`saturn:villager_trade`

Publishes a signal when a player completes a trade with a villager.

A trigger matches published server signals. It can be used in trigger rules or triggered abilities; registration itself does not perform any action. See the [trigger lifecycle](../../guides/triggers.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:villager_trade` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in the player model node it is the player UUID argument. |
| `villager` | Vanilla predicate | no | omitted | Villager entity predicate. |
| `item` | Vanilla predicate | no | omitted | Vanilla ItemPredicate, filters the item in this event. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates are a different format from Saturn EntityCondition / ItemCondition.

Omitting an optional range in a vanilla criterion, or writing an empty range object, means no restriction is added for that range; player predicates still follow the vanilla format of that criterion.

## JSON example

```json
{
  "type": "saturn:villager_trade"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`net.minecraft.advancements.criterion.TradeTrigger.TriggerInstance`. This page is based on the Codec in the current 26.1.2 source.

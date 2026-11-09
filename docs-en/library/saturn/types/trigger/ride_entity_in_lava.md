---
title: "Riding in lava"
sidebar_position: 10
---

`saturn:ride_entity_in_lava`

Matches the distance a player travels while riding in lava.

A trigger matches published server signals. It can be used in trigger rules or triggered abilities; registration itself does not perform any action. See the [trigger lifecycle](../../guides/triggers.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ride_entity_in_lava` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `start_position` | Vanilla predicate | no | omitted | Predicate for the start position. |
| `distance` | Vanilla predicate | no | omitted | Distance or vanilla distance predicate. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

## JSON example

```json
{
  "type": "saturn:ride_entity_in_lava"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`net.minecraft.advancements.criterion.DistanceTrigger.TriggerInstance`. This page is based on the Codec in the current 26.1.2 source.

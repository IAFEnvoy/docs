---
title: "Levitation"
sidebar_position: 10
---

`saturn:levitation`

Polls the distance and duration of a player's levitation.

A trigger matches published server signals. It can be used in trigger rules or triggered abilities; registration itself does not perform any action. See the [trigger lifecycle](../../guides/triggers.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:levitation` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `distance` | Vanilla predicate | no | omitted | Distance or vanilla distance predicate. |
| `duration` | Number or range object | no | `{}` | Duration, usually measured in game ticks. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

## JSON example

```json
{
  "type": "saturn:levitation"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`net.minecraft.advancements.criterion.LevitationTrigger.TriggerInstance`. This page is based on the Codec in the current 26.1.2 source.

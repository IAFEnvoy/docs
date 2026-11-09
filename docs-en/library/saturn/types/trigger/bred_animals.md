---
title: "Breed animals"
sidebar_position: 10
---

`saturn:bred_animals`

Publishes a signal to the relevant players when animals breed successfully.

A trigger matches published server signals. It can be used in trigger rules or triggered abilities; registration itself does not perform any action. See the [trigger lifecycle](../../guides/triggers.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:bred_animals` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `parent` | Vanilla predicate | no | omitted | Predicate for the parent entity. |
| `partner` | Vanilla predicate | no | omitted | Predicate for the partner entity. |
| `child` | Vanilla predicate | no | omitted | Predicate for the child entity. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

## JSON example

```json
{
  "type": "saturn:bred_animals"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`net.minecraft.advancements.criterion.BredAnimalsTrigger.TriggerInstance`. This page is based on the Codec in the current 26.1.2 source.

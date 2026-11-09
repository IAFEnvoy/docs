---
title: "Advancement completed"
sidebar_position: 10
---

`saturn:advancement_completed`

Publishes a signal when a whole Minecraft advancement is completed, optionally filtered by advancement ID.

A trigger matches published server signals. It can be used in trigger rules or triggered abilities; registration itself does not perform any action. See the [trigger lifecycle](../../guides/triggers.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:advancement_completed` |
| `advancement` | Resource ID | no | omitted | Minecraft advancement ID; when omitted, any advancement completion is accepted. |

New in the current source: the signal is `TriggerSignals.ADVANCEMENT_COMPLETED`, and `TriggerPayload.ADVANCEMENT` holds the `Identifier` of the completed advancement. Hidden advancements and recipe unlocks are included; logging in does not replay existing advancements, and completing an advancement again after it was revoked triggers again. Deduplicating persisted state is the subscriber's responsibility. System has not switched over yet, and the existing `system-advancements.json` keeps its original behavior.

## JSON example

```json
{
  "type": "saturn:advancement_completed",
  "advancement": "minecraft:story/mine_diamond"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.trigger.builtin.AdvancementCompletedTrigger`. This page is based on the Codec in the current 26.1.2 source.

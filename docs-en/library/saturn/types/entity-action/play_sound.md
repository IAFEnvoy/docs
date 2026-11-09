---
title: "Play sound"
sidebar_position: 10
---

`saturn:play_sound`

Plays the given sound event at the entity.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:play_sound` |
| `sound` | Resource ID | yes | — | SoundEvent ID. |
| `category` | Enum string | no | omitted | Sound category. Available values: `master`, `music`, `records`, `weather`, `blocks`, `hostile`, `neutral`, `players`, `ambient`, `voice`, `ui`. |
| `volume` | Number | no | `1.0` | Volume multiplier. |
| `pitch` | Number | no | `1.0` | Pitch angle in degrees when not following the mouse. |

## JSON example

```json
{
  "type": "saturn:play_sound",
  "sound": "minecraft:entity.experience_orb.pickup",
  "category": "players"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.PlaySoundAction`. This page is based on the Codec in the current 26.1.2 source.

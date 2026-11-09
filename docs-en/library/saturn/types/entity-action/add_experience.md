---
title: "Add experience"
sidebar_position: 10
---

`saturn:add_experience`

Adds experience points, levels, or both to the player.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:add_experience` |
| `points` | Integer | no | omitted | Vanilla experience points; when omitted, the points are not changed. |
| `levels` | Integer | no | omitted | Vanilla experience levels; when omitted, the levels are not changed. |

## JSON example

```json
{
  "type": "saturn:add_experience",
  "points": 100
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.AddExperienceAction`. This page is based on the Codec in the current 26.1.2 source.

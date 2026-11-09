---
title: "Restore hunger"
sidebar_position: 10
---

`saturn:feed`

Adds food and saturation to the player.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:feed` |
| `food` | Integer | yes | — | Food restored. |
| `saturation` | Number | yes | — | Saturation parameter restored. |

## JSON example

```json
{
  "type": "saturn:feed",
  "food": 1,
  "saturation": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.entity.FeedAction`. This page is based on the Codec in the current 26.1.2 source.

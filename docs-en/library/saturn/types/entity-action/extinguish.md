---
title: "Extinguish"
sidebar_position: 10
---

`saturn:extinguish`

Clears the entity's current burning state.

Runs an operation on a single entity. Used in entity action fields such as `entity_action` and a trigger rule's `action`; action arrays run in order.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:extinguish` |

## JSON example

```json
{
  "type": "saturn:extinguish"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`SaturnEntityActions`. This page is based on the Codec in the current 26.1.2 source.

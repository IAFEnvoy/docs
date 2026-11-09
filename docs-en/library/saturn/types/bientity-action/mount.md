---
title: "Mount target"
sidebar_position: 10
---

`saturn:mount`

Makes the actor ride the target.

The context contains an actor (the initiator) and a target. The same ID may have different fields in the entity action and bi-entity action registries; the two kinds are not interchangeable.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:mount` |

## JSON example

```json
{
  "type": "saturn:mount"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`SaturnBiEntityActions`. This page is based on the Codec in the current 26.1.2 source.

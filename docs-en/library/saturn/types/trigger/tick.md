---
title: "Every tick"
sidebar_position: 10
---

`saturn:tick`

Publishes a signal on each server-side entity tick.

A trigger matches published server signals. It can be used in trigger rules or triggered abilities; registration itself does not perform any action. See the [trigger lifecycle](../../guides/triggers.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:tick` |

## JSON example

```json
{
  "type": "saturn:tick"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.registry.content.SaturnTriggers`. This page is based on the Codec in the current 26.1.2 source.

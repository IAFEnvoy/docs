---
title: "Break block"
sidebar_position: 10
---

`saturn:block_break`

Publishes a signal when a player breaks a block.

A trigger matches published server signals. It can be used in trigger rules or triggered abilities; registration itself does not perform any action. See the [trigger lifecycle](../../guides/triggers.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_break` |

## JSON example

```json
{
  "type": "saturn:block_break"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.registry.content.SaturnTriggers`. This page is based on the Codec in the current 26.1.2 source.

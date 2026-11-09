---
title: "Cooldown"
sidebar_position: 10
---

`saturn:cooldown`

Reads or sets the cooldown state.

Operates on the item stack and its holder from the context. It is not an item definition file; embed it in a field that requires an ItemAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:cooldown` |
| `ticks` | Integer | yes | — | Game ticks; 20 ticks is usually one second. |

## JSON example

```json
{
  "type": "saturn:cooldown",
  "ticks": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.item.CooldownAction`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Consume item"
sidebar_position: 10
---

`saturn:consume_item`

Reduces the count of the item stack in the context.

Operates on the item stack and its holder from the context. It is not an item definition file; embed it in a field that requires an ItemAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:consume_item` |
| `count` | [Number provider](../number/index.md) | yes | — | A count, or a count match pattern. |

## JSON example

```json
{
  "type": "saturn:consume_item",
  "count": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.item.ConsumeItemAction`. This page is based on the Codec in the current 26.1.2 source.

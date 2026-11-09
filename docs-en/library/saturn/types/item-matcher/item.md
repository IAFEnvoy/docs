---
title: "Specific item"
sidebar_position: 10
---

`saturn:item`

Matches a single item registry ID.

Used for ItemMatcher entry fields such as `items`. Multiple entries are combined as a union; items, tags, wildcards, regex and vanilla ingredients are supported.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item` |
| `item` | Resource ID | yes | — | Item ID, predicate, or an item parameter key in the context. |

## JSON example

```json
{
  "type": "saturn:item",
  "item": "minecraft:diamond"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.util.matcher.builtin.ItemEntry`. This page is based on the Codec in the current 26.1.2 source.

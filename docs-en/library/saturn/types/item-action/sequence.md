---
title: "Sequence"
sidebar_position: 10
---

`saturn:sequence`

Runs several actions of the same kind in array order.

Operates on the item stack and its holder from the context. It is not an item definition file; embed it in a field that requires an ItemAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:sequence` |
| `actions` | Array of actions of the same kind | yes | — | Array of sub-actions; sequential kinds run in order, weighted kinds pick by value and weight. |

## JSON example

```json
{
  "type": "saturn:sequence",
  "actions": []
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.item.meta.SequenceItemAction`. This page is based on the Codec in the current 26.1.2 source.

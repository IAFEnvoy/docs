---
title: "Merge components"
sidebar_position: 10
---

`saturn:merge_components`

Merges a data component patch into the item stack.

Operates on the item stack and its holder from the context. It is not an item definition file; embed it in a field that requires an ItemAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:merge_components` |
| `components` | Object | yes | — | Vanilla data component patch. |

## JSON example

```json
{
  "type": "saturn:merge_components",
  "components": {}
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.item.MergeComponentsAction`. This page is based on the Codec in the current 26.1.2 source.

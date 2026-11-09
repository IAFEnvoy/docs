---
title: "All true"
sidebar_position: 10
---

`saturn:and`

Matches only when every sub-condition holds.

Used for ResourceBar.visibility; decides whether the bar is shown in the resource bar context.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:and` |
| `values` | Array of [Resource bar visibility](index.md) | yes | — | List of sub-values or sub-expressions. |

## JSON example

```json
{
  "type": "saturn:and",
  "values": {
    "type": "saturn:always"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resourcebar.builtin.visibility.AndVisibility`. This page is based on the Codec in the current 26.1.2 source.

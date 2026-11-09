---
title: "Always"
sidebar_position: 10
---

`saturn:always`

The condition is always true.

Used for ResourceBar.visibility; it decides whether the bar is shown in the resource bar context.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:always` |

## JSON example

```json
{
  "type": "saturn:always"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resourcebar.builtin.visibility.AlwaysVisibility`. This page is based on the Codec in the current 26.1.2 source.

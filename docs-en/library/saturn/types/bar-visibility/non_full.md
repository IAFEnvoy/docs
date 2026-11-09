---
title: "Shown when not full"
sidebar_position: 10
---

`saturn:non_full`

Shown while the current resource is below its maximum.

Used for ResourceBar.visibility; decides whether the bar is shown in the resource bar context.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:non_full` |

## JSON example

```json
{
  "type": "saturn:non_full"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resourcebar.builtin.visibility.NonFullVisibility`. This page is based on the Codec in the current 26.1.2 source.

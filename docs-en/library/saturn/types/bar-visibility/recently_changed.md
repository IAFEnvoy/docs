---
title: "Shown after change"
sidebar_position: 10
---

`saturn:recently_changed`

Keeps the bar shown for the given number of ticks after the resource changes.

Used for ResourceBar.visibility; decides whether the bar is shown in the resource bar context.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:recently_changed` |
| `hold_ticks` | Integer | no | `60` | Number of ticks the bar stays shown after a change. |

## JSON example

```json
{
  "type": "saturn:recently_changed"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resourcebar.builtin.visibility.RecentlyChangedVisibility`. This page is based on the Codec in the current 26.1.2 source.

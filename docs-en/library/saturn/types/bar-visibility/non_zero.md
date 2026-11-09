---
title: "Shown when non-zero"
sidebar_position: 10
---

`saturn:non_zero`

Shown while the current resource is not zero.

Used for ResourceBar.visibility; decides whether the bar is shown in the resource bar context.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:non_zero` |

## JSON example

```json
{
  "type": "saturn:non_zero"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resourcebar.builtin.visibility.NonZeroVisibility`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Negate"
sidebar_position: 10
---

`saturn:not`

Inverts the match result of the sub-condition.

Used for ResourceBar.visibility; decides whether the bar is shown in the resource bar context.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:not` |
| `value` | [Resource bar visibility](index.md) | yes | — | The value or expression used by this type. |

## JSON example

```json
{
  "type": "saturn:not",
  "value": {
    "type": "saturn:always"
  }
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resourcebar.builtin.visibility.NotVisibility`. This page is based on the Codec in the current 26.1.2 source.

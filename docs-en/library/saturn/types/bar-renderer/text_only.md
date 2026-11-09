---
title: "Text-only bar"
sidebar_position: 10
---

`saturn:text_only`

Shows the resource value as formatted text.

Used for ResourceBar.renderer; it displays the resource snapshot and does not modify the resource. Colours are written as #RRGGBB.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:text_only` |
| `format` | String | no | `"%current%"` | Supports %current% and %maximum% substitution; it does not use printf formatting. |
| `color` | #RRGGBB string | no | `"#FFFFFF"` | RGB colour string. |
| `show_maximum` | Boolean | no | `false` | Whether to show the maximum. |

## JSON example

```json
{
  "type": "saturn:text_only"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resourcebar.builtin.renderdata.TextOnlyRenderData`. This page is based on the Codec in the current 26.1.2 source.

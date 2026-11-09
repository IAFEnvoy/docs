---
title: "Segmented bar"
sidebar_position: 10
---

`saturn:segmented_bar`

Represents the resource amount with multiple colour blocks.

Used for ResourceBar.renderer; it displays the resource snapshot and does not modify the resource. Colours are written as #RRGGBB.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:segmented_bar` |
| `segments` | Integer | yes | — | Number of segments. Codec range: `1, 256`. |
| `gap` | Integer | no | `1` | Gap between segments, in pixels. Codec range: `0, 32`. |
| `full_color` | #RRGGBB string | no | `"#FFFFFF"` | Colour of a filled segment. |
| `empty_color` | #RRGGBB string | no | `"#555555"` | Colour of an empty segment. |

## JSON example

```json
{
  "type": "saturn:segmented_bar",
  "segments": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resourcebar.builtin.renderdata.SegmentedRenderData`. This page is based on the Codec in the current 26.1.2 source.

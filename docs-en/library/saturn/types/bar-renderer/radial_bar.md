---
title: "Radial bar"
sidebar_position: 10
---

`saturn:radial_bar`

Draws ring progress within the given angle range.

Used for ResourceBar.renderer; it displays the resource snapshot and does not modify the resource. Colours are written as #RRGGBB.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:radial_bar` |
| `radius` | Integer | yes | — | Radius in blocks; in a resource bar it is in pixels. Codec range: `1, 512`. |
| `thickness` | Integer | yes | — | Ring thickness, in pixels. Codec range: `1, 128`. |
| `start_angle` | Number | no | `0.0` | Start angle, in degrees. |
| `end_angle` | Number | no | `360.0` | End angle, in degrees. |
| `fill_color` | #RRGGBB string | no | `"#FFFFFF"` | Fill RGB colour string. |

## JSON example

```json
{
  "type": "saturn:radial_bar",
  "radius": 1,
  "thickness": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resourcebar.builtin.renderdata.RadialRenderData`. This page is based on the Codec in the current 26.1.2 source.

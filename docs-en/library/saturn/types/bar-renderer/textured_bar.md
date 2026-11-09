---
title: "Textured bar"
sidebar_position: 10
---

`saturn:textured_bar`

Draws the resource bar with a background and a fill texture.

Used for ResourceBar.renderer; it displays the resource snapshot and does not modify the resource. Colours are written as #RRGGBB.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:textured_bar` |
| `background_sprite` | Resource ID | yes | — | GUI sprite ID of the background. |
| `fill_sprite` | Resource ID | yes | — | GUI sprite ID of the fill. |
| `width` | Integer | yes | — | Width, in pixels. Codec range: `1, 1024`. |
| `height` | Integer | yes | — | Height, in pixels. Codec range: `1, 1024`. |
| `fill_color` | #RRGGBB string | no | `"#FFFFFF"` | Fill RGB colour string. |
| `show_value` | Boolean | no | `false` | Whether to show the value. |

## JSON example

```json
{
  "type": "saturn:textured_bar",
  "background_sprite": "minecraft:boss_bar/pink_background",
  "fill_sprite": "minecraft:boss_bar/pink_background",
  "width": 1,
  "height": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.resourcebar.builtin.renderdata.TexturedRenderData`. This page is based on the Codec in the current 26.1.2 source.

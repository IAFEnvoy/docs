---
title: "Resource bar renderers"
sidebar_position: 17
---

# Resource bar renderers

Used for ResourceBar.renderer; a renderer displays the resource snapshot and does not modify the resource. Colours are written as #RRGGBB.

### `saturn:boss_bar` {#saturnboss_bar}

Uses the boss bar style of the given texture.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:boss_bar` |
| `sprite_location` | Resource ID | no | `"saturn:textures/gui/resource_bar.png"` | Resource bar texture. |
| `bar_index` | Integer | no | `0` | Index of the resource bar inside the texture. Codec range: `0, 24`. |
| `inverted` | Boolean | no | `false` | Whether to invert the check or the display direction. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:boss_bar"
}
```

</details>

### `saturn:radial_bar` {#saturnradial_bar}

Draws ring progress within the given angle range.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:radial_bar` |
| `radius` | Integer | yes | — | Radius in blocks; in a resource bar it is in pixels. Codec range: `1, 512`. |
| `thickness` | Integer | yes | — | Ring thickness, in pixels. Codec range: `1, 128`. |
| `start_angle` | Number | no | `0.0` | Start angle, in degrees. |
| `end_angle` | Number | no | `360.0` | End angle, in degrees. |
| `fill_color` | #RRGGBB string | no | `"#FFFFFF"` | Fill RGB colour string. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:radial_bar",
  "radius": 1,
  "thickness": 1
}
```

</details>

### `saturn:segmented_bar` {#saturnsegmented_bar}

Represents the resource amount with multiple colour blocks.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:segmented_bar` |
| `segments` | Integer | yes | — | Number of segments. Codec range: `1, 256`. |
| `gap` | Integer | no | `1` | Gap between segments, in pixels. Codec range: `0, 32`. |
| `full_color` | #RRGGBB string | no | `"#FFFFFF"` | Colour of a filled segment. |
| `empty_color` | #RRGGBB string | no | `"#555555"` | Colour of an empty segment. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:segmented_bar",
  "segments": 1
}
```

</details>

### `saturn:text_only` {#saturntext_only}

Shows the resource value as formatted text.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:text_only` |
| `format` | String | no | `"%current%"` | Supports %current% and %maximum% substitution; it does not use printf formatting. |
| `color` | #RRGGBB string | no | `"#FFFFFF"` | RGB colour string. |
| `show_maximum` | Boolean | no | `false` | Whether to show the maximum. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:text_only"
}
```

</details>

### `saturn:textured_bar` {#saturntextured_bar}

Draws the resource bar with a background and a fill texture.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:textured_bar` |
| `background_sprite` | Resource ID | yes | — | GUI sprite ID of the background. |
| `fill_sprite` | Resource ID | yes | — | GUI sprite ID of the fill. |
| `width` | Integer | yes | — | Width, in pixels. Codec range: `1, 1024`. |
| `height` | Integer | yes | — | Height, in pixels. Codec range: `1, 1024`. |
| `fill_color` | #RRGGBB string | no | `"#FFFFFF"` | Fill RGB colour string. |
| `show_value` | Boolean | no | `false` | Whether to show the value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:textured_bar",
  "background_sprite": "minecraft:boss_bar/pink_background",
  "fill_sprite": "minecraft:boss_bar/pink_background",
  "width": 1,
  "height": 1
}
```

</details>

## Meta types

These types do not test a concrete value themselves; they combine or delegate other types of the same kind and are embedded in the same fields.

### `saturn:missing` {#saturnmissing}

Represents a missing implementation or value.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:missing` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:missing"
}
```

</details>

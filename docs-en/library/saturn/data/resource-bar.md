---
title: "Resource Bars"
sidebar_position: 3
---

Resource bars are embedded in the `bars` field of a [resource definition](./resource.md). A single resource can render differently in multiple contexts, so you do not need a separate file for each bar.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `context` | [Context ID](../types/bar-context.md) | no | `"saturn:self_hud"` | A string ID, not a type object. |
| `anchor` | String | yes | — | `left` or `right`. |
| `order` | Integer | no | `0` | Layout order within the same context. |
| `visibility` | [Visibility](../types/bar-visibility.md) | no | `{"type":"saturn:always"}` | Whether to draw the bar. |
| `renderer` | [Renderer type](../types/bar-renderer.md) | yes | — | Appearance of the resource bar. |
| `value_display` | String | no | `"none"` | `none`, `current`, `current_and_maximum`, `percentage`. |
| `maximum` | Number | no | omitted | A positive number overrides the displayed maximum; a non-positive number is treated as unspecified. |

## Example

```json
{
  "context": "saturn:self_hud",
  "anchor": "left",
  "order": 0,
  "visibility": {
    "type": "saturn:always"
  },
  "renderer": {
    "type": "saturn:segmented_bar",
    "segments": 10
  },
  "value_display": "current_and_maximum"
}
```

## Texture format

The SpriteIcon fields of renderers accept either an ID or an object. A bare ID in `textured_bar` means a GUI atlas sprite, while a bare ID in the `sprite_location` of `boss_bar` means a full texture. The object format is as follows:

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `sprite` | Resource ID | one of two | omitted | GUI atlas sprite; cannot be specified together with texture. |
| `texture` | Resource ID | one of two | omitted | Path to a full texture. |
| `region` | Region object | no | omitted | Only available with texture. |
| `width` / `height` | Integer | no | `0` | When both are 0, the caller's size is used; if specified, both must be given, in the range 0–8192. |
| `region.u` / `region.v` | Integer | no | `0` | Origin of the texture region, in the range 0–8192. |
| `region.texture_width` / `region.texture_height` | Integer | no | `256` | Size of the source texture, in the range 1–8192. |

```json
{
  "texture": "example:textures/gui/bar.png",
  "region": {
    "u": 0,
    "v": 0,
    "texture_width": 256,
    "texture_height": 256
  },
  "width": 81,
  "height": 9
}
```

---
sidebar_position: 2
---

# Layer JSON Format

An Origin Layer is a collection of origins. Players choose one origin per enabled layer.

## File Location

Layer JSON files go in `data/<namespace>/origins/layer/` within your data pack.

For example, `data/origins/origins/layer/origin.json` has the ID `origins:origin` (this is the default layer).

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | [Text Component](./../types/minecraft_data_types#text-component) | optional | The display name of the layer. Use translation key `layer.<namespace>.<path>.name` is more recommended |
| `order` | Integer | `Integer.MAX_VALUE` | Sort order in the selection screen; lower numbers appear first |
| `origins` | List of `Identifier` / `#tag` / [Conditioned Origin](#conditioned-origins) objects | **required** | Origins included in this layer. Supports direct IDs, tags, and conditioned origins |
| `enabled` | Boolean | `true` | Whether this layer is enabled |
| `gui_title` | [GUI Title](#gui-title) | optional | Custom titles for the selection/view screens |
| `allow_random` | Boolean | `false` | Whether to show a "random pick" option |
| `allow_random_unchoosable` | Boolean | `false` | Whether the random pick includes unchoosable origins |
| `exclude_random` | List of Identifier | `[]` | Origin IDs excluded from the random pick |
| `default_origin` | Identifier | optional | :x: Not yet implemented |
| `auto_choose` | Boolean | `false` | If only one origin is available, whether to auto-choose it |
| `hidden` | Boolean | `false` | Whether to hide this layer from the "View Origin" screen |

:::warning
Unlike Fabric version, which use `missing_name` and `missing_description` to display when no origin is assign for current layer, Origins (NeoForge) will simply hide the layer in view origin screen if it has no origin.
:::


### GUI Title

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `choose_origin` | Text Component | optional | Overrides the title text shown when choosing an origin |
| `view_origin` | Text Component | optional | Overrides the title text shown when viewing an origin |

## Conditioned Origins

Within the `origins` List, you can mix string IDs with conditioned origin objects:

```json
{
  "condition": {
    "type": "origins:and",
    "conditions": [...]
  },
  "origins": [
    "origins:special_origin"
  ]
}
```

Conditioned origin fields:

| Field | Type | Description |
|-------|------|-------------|
| `condition` | Entity Condition | The condition the player must fulfill |
| `origins` | List of Identifier or #Tag | Origins shown when the condition is met |

## Examples

```json
{
  "order": 0,
  "enabled": true,
  "origins": [
    "#origins:origin"
  ],
  "allow_random": true,
  "exclude_random": [
    "origins:human"
  ]
}
```

A layer with a conditioned origin:

```json
{
  "order": 1,
  "origins": [
    "origins:human",
    {
      "condition": {
        "type": "origins:origin",
        "origin": "origins:human"
      },
      "origins": [
        "origins:special_human_upgrade"
      ]
    }
  ]
}
```
:::caution
Command can bypass the conditions and grant any origin in the layer, so conditioned origins are not a secure way to gate content. They are mainly for guiding players towards certain choices or creating a more dynamic selection experience.
:::

:::note
Key differences from the old version:
- `replace` field removed (the new registry system handles data overriding automatically)
- `missing_name` and `missing_description` removed
- `loading_priority` removed
- `gui_title` sub-fields renamed to `choose_origin` / `view_origin`
:::

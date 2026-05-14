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

### GUI Title

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `choose_origin` | Text Component | optional | Overrides the title text shown when choosing an origin |
| `view_origin` | Text Component | optional | Overrides the title text shown when viewing an origin |

## Translation Key

Layer names use the language key: `layer.<namespace>.<path>.name`

## Conditioned Origins

:::danger Not yet implemented

Conditioned Origins are **not yet implemented** in the Origins (NeoForge). They will be available in a future update. The documentation below is from the Fabric version and may change.

:::

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
| `origins` | List of Identifier | Origins shown when the condition is met |

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

:::note
Key differences from the old version:
- `name` field removed; use translation keys
- `replace` field removed (the new registry system handles data overriding automatically)
- `missing_name` and `missing_description` removed
- `loading_priority` removed
- `gui_title` sub-fields renamed to `choose_origin` / `view_origin`
:::

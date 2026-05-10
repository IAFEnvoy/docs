---
sidebar_position: 1
---

# Origin JSON Format

An Origin defines a selectable origin that grants players special abilities.

## File Location

Origin JSON files go in `data/<namespace>/origins/origin/` within your data pack.

The filename corresponds to its ID. For example, `data/origins/origins/origin/avian.json` has the ID `origins:avian`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `powers` | List of `Identifier` / `#tag` | `[]` | Power IDs or tags granted by this origin. Use `"origins:xxx"` or `"#origins:tag_name"` |
| `icon` | [Item Stack] | optional | The item displayed as the origin's icon in the selection screen |
| `unchoosable` | Boolean | `false` | If `true`, this origin won't appear in selection screens, but can still be assigned via commands or upgrades |
| `order` | Integer | `Integer.MAX_VALUE` | Sort order in the selection screen; lower numbers appear first |
| `impact` | Integer | `0` | Impact level: `0` = NONE, `1` = LOW, `2` = MEDIUM, `3` = HIGH |
| `upgrades` | List of [Upgrade](./upgrade) objects | `[]` | Origin upgrade configuration list |

## Translation Keys

Origin names and descriptions are defined via language files:

- Name: `origin.<namespace>.<path>.name`
- Description: `origin.<namespace>.<path>.description`

For example, `origins:avian` uses `origin.origins.avian.name` and `origin.origins.avian.description`.

## Examples

```json
{
  "powers": [
    "#origins:avian"
  ],
  "icon": {
    "id": "minecraft:feather"
  },
  "order": 0,
  "impact": 1
}
```

An Avian origin using a power tag:

```json
{
  "powers": [
    "example:my_power",
    "#origins:common_powers"
  ],
  "icon": {
    "id": "minecraft:player_head"
  },
  "order": 5,
  "impact": 2,
  "unchoosable": false
}
```

:::note
Key differences from the old (Fabric) version:
- `name` and `description` fields removed; use translation keys instead
- `loading_priority` field removed
- `impact` uses an integer instead of a string enum
- `powers` supports tag references (`#namespace:tag`)
:::

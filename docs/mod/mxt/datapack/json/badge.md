---
title: "Badge (badge)"
description: "Reserved badge metadata used by abilities, titles and other definitions that display a badge."
---

# Badge (badge)

A `badge` is reserved metadata that describes how a badge is displayed. Badges are a writable datapack registry, but they are not shown automatically in selection screens or the compendium.

## File Location

Badge files go in `data/<namespace>/mxt/badge/` within your datapack.

The filename corresponds to its ID. For example, `data/example/mxt/badge/info.json` has the ID `example:info`.

## Fields

Badge definitions use built-in `type` dispatch:

| `type` | Fields | Default | Description |
|--------|--------|---------|-------------|
| `mxt:empty` | none | - | Empty placeholder badge. |
| `mxt:sprite` | `icon` | **required** | Shows an icon only. |
| `mxt:tooltip` | `icon`, `text` | `text` is an empty text | An icon with a hover tooltip. |
| `mxt:keybind` | `icon`, `text`, `key` | `text=""`, `key="key.mxt.primary_active"` | Records a client key mapping. |
| `mxt:crafting_recipe` | `icon`, `recipe`, `from_power`, `prefix`, `suffix` | `from_power=false` | Reserved recipe hint metadata. |

`icon` is an [Icon Reference](../types/shared_data_types.md#icon-reference), so a badge can show a texture or an item.

:::warning Work In Progress
Badge is currently a reserved writable datapack registry. It is not displayed automatically in the selection screen or the compendium.
:::

## Example

```json
{
  "type": "mxt:tooltip",
  "icon": {"texture": "mxt:textures/gui/badge/info.png"},
  "text": "badge.example.info"
}
```

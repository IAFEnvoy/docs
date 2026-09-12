---
title: "Spirit Herb (spirit_herb)"
description: "A spirit herb attaches quality and herb metadata to existing items without creating a new item."
---

# Spirit Herb (spirit_herb)

A spirit herb marks existing items as spirit herbs for alchemy and gathering gameplay, giving them a default quality and classification metadata.

## File Location

Spirit herb JSON files go in `data/<namespace>/mxt/spirit_herb/` within your data pack.

The filename corresponds to its ID. For example, `data/example/mxt/spirit_herb/fire_ginseng.json` has the ID `example:fire_ginseng`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `items` | `ItemMatcher` | **required** | Binds existing items. It does not create a new spirit herb item. |
| `quality` | `Holder<item_quality>` | **required** | The default quality of that item. |
| `age` | `NumberProvider` | `0` | Age metadata. |
| `element_tags` | Identifier[] | `[]` | Element classification tags. |
| `material_tags` | Identifier[] | `[]` | Material classification tags. |
| `growth_rate` | `NumberProvider` | `0` | Growth rate metadata. |
| `drop_chance` | `NumberProvider` | `1` | Drop chance metadata. |

## Example

```json
{
  "items": ["minecraft:red_mushroom", "#mxt_test:spirit_herbs"],
  "quality": "mxt_test:spirit_iron",
  "age": 100,
  "element_tags": ["mxt_test:fire"],
  "material_tags": ["mxt_test:herb"],
  "growth_rate": 0.05,
  "drop_chance": 1
}
```

:::info Work in progress

The spirit herb age, growth and drop lifecycle are still being built. Binding, quality lookup and the tooltip are already wired up.

:::

The `items` matcher is the shared item matcher used by several formats; it accepts a single item ID, a single `#namespace:tag` or a list of both. The quality it points at is defined by [Item Quality](./item_quality.md), and herbs are intended as materials for [Alchemy Recipe](./alchemy_recipe.md).

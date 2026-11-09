---
title: "Vanilla ingredient"
sidebar_position: 10
---

`saturn:ingredient`

Matches items using a Minecraft Ingredient.

Used for ItemMatcher entry fields such as `items`. Multiple entries are combined as a union; items, tags, wildcards, regex and vanilla ingredients are supported.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ingredient` |
| `ingredient` | Vanilla Ingredient (item ID, #tag or item ID array) | yes | — | Vanilla Ingredient. |

## JSON example

```json
{
  "type": "saturn:ingredient",
  "ingredient": "#minecraft:logs"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.util.matcher.builtin.IngredientEntry`. This page is based on the Codec in the current 26.1.2 source.

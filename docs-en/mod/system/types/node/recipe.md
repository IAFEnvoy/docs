---
title: "Recipe"
sidebar_position: 10
---

`system:recipe`

Shows a single ordered recipe and its ingredients from the context.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:recipe` |
| `recipe` | String | yes | — | A single recipe parameter in the context. |

## JSON example

```json
{
  "type": "system:recipe",
  "recipe": "{{recipe}}"
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.integration.RecipeNode`. This page is based on the Codec in the current 26.1.2 source.

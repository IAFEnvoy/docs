---
title: Information Rows (information_row)
description: Define character information values, tooltips, visibility and importance with expressions.
---

# Information Rows (information_row)

<span id="information-rows-information-row" />

Files belong at `data/<namespace>/saturn/information_row/<name>.json`, for example `data/example/saturn/information_row/realm.json`.

Rows read an already captured snapshot. The `mxt:information` getter exposes `realm`, `lifespan`, `cultivation_progress`, `spirit_roots`, `physiques`, `techniques` and `curses`. Each member contains a `values` component array, an optional `tooltip` and a `tone`.

```json
{
  "order": 0,
  "importance": 60,
  "label": { "translate": "info.mxt.realm" },
  "value": {
    "type": "saturn:list",
    "source": {
      "type": "saturn:getter",
      "getter": { "type": "mxt:information" },
      "path": ["realm", "values"]
    },
    "element": {
      "type": "saturn:text",
      "component": true,
      "value": { "type": "saturn:local" }
    }
  },
  "missing": "hide"
}
```

| Field | Default | Meaning |
| --- | --- | --- |
| `label` | Required | Row label as a text component |
| `value` | Required | Content expression |
| `order` | `0` | Order within a group; lower comes first |
| `importance` | `0` | Higher means more important; independent of order |
| `enabled` | `true` | Whether this definition is enabled |
| `label_expression` | None | Expression that can replace the label |
| `tooltip` | None | Fixed tooltip component |
| `tooltip_expression` | None | Expression that can replace the tooltip |
| `tone` | `normal` | `normal`, `positive` or `warning` |
| `visible` | None | Boolean condition; false, missing or an incompatible type hides the row |
| `missing` | `show` | `show` displays the missing reason; `hide` hides rows whose entire value is missing |

`component: true` preserves translation keys and component styles. Green cultivation progress comes from the captured components; the curses row uses `warning`. A tooltip expression can read `path: ["realm", "tooltip"]`, or the corresponding path for another member. An unavailable tooltip expression keeps the fixed tooltip.

The 7 built-in cultivation row IDs match these members under the `mxt` namespace. Their order runs from `0` through `60`; importance defaults to `0`. Rows without relevant data stay hidden: lifespan depends on its configuration, while roots, physiques, techniques and curses depend on captured content. Saved data does not infer current breakthrough conditions or minor stages.

Rows do not declare their groups. Add a row ID to a tag selected by an [information group](./information_group.md) to include it in the panel and `/saturn information @s mxt:cultivation`. A file with the same ID replaces the entire definition. Reopen the world or restart the server after changing definitions.

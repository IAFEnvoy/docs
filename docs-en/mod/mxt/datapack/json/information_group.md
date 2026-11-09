---
title: Information Groups (information_group)
description: Organize character information with row IDs and row tags.
---

# Information Groups (information_group)

<span id="information-groups-information-group" />

Files belong at `data/<namespace>/saturn/information_group/<name>.json`. The built-in `mxt:cultivation` group selects the cultivation row tag:

```json
{
  "title": "info.mxt.cultivation",
  "order": 100,
  "rows": ["#mxt:cultivation"]
}
```

| Field | Default | Meaning |
| --- | --- | --- |
| `title` | Required | Group title as a translation-key string or text component |
| `order` | `0` | Group order; lower comes first |
| `rows` | Required | Array of [row](./information_row.md) IDs or `#tags`; may be empty |

To add `example:realm` to the cultivation panel, write `data/mxt/tags/saturn/information_row/cultivation.json`:

```json
{
  "replace": false,
  "values": ["example:realm"]
}
```

Put the row definition at `data/example/saturn/information_row/realm.json`. `replace: false` appends; `replace: true` replaces the tag's existing selection. A row may belong to several groups. Overlapping direct references, tags and selected groups are deduplicated by ID.

Rows within a group are sorted by row `order` and ID, independently of tag array order. Collecting all rows also includes ungrouped rows. A reference to a missing row ID prevents definitions from loading; a missing tag selects nothing.

Reopen the world or restart the server after changing definitions. Operators can inspect the group with `/saturn information @s mxt:cultivation`; the command replies only to its source.

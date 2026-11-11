---
title: "Incomplete Item Markers"
sidebar_position: 6
---

File: `data/<namespace>/saturn/incomplete/<path>.json`. Matching items show an incomplete badge; this does not prevent use or crafting, nor change item data.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `items` | An [item matcher entry](../types/item-matcher.md) or an array | yes | — | At least one entry; any matching entry is enough. |

## Example

```json title="data/example/saturn/incomplete/unfinished.json"
{
  "items": [
    "minecraft:stick",
    "#minecraft:planks",
    {
      "type": "saturn:wildcard",
      "pattern": "example:unfinished_*"
    }
  ]
}
```

When several markers match, the same badge is shown; there is no `priority` field. This is not a new way to register items.

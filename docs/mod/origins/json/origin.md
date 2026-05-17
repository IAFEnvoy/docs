---
sidebar_position: 1
---

# Origin JSON Format

An Origin defines a selectable origin that grants players special abilities.

## File Location

Origin JSON files go in `data/<namespace>/origins/origin/` within your data pack.

The filename corresponds to its ID. For example, `data/origins/origins/origin/avian.json` has the ID `origins:avian`.

## Fields

import OriginFields from './field_table/_origin.mdx';

<OriginFields/>

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
- `loading_priority` field removed
- `impact` uses an integer instead of a string enum
- `powers` supports tag references (`#namespace:tag`)
:::

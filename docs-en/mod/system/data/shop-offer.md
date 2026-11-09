---
title: "Shop offer"
sidebar_position: 4
---

Registry: `system:shop_offers`. Prices are handled on the server as Saturn costs, and the client only displays the quote; a purchase requires confirmation, and the AI cannot generate prices or charge on its own.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | Text component | no | Empty component | An enabled entry must have a non-empty name; a bare string is literal text. |
| `items` | ItemStackTemplate array | no | `[]` | At least 1 and at most 36 entries when enabled. |
| `costs` | [Saturn cost](../../../library/saturn/types/cost/index.md) array | no | `[]` | An enabled shop offer must have at least one cost. |
| `enabled` | Boolean | no | `true` | false can be used to disable an older entry that is overridden. |

## Example

```json title="data/example/system/shop_offers/torches.json"
{
  "label": {
    "text": "Torch supplies"
  },
  "items": [
    {
      "id": "minecraft:torch",
      "count": 16
    }
  ],
  "costs": [
    {
      "type": "saturn:item",
      "items": [
        "minecraft:emerald"
      ],
      "amount": 1
    }
  ]
}
```

Add it to the values of `data/system/tags/system/shop_offers/default.json`, or reference a custom ID / tag from the offers of the [shop module](../types/module/shop.md). Unlike a lottery pool, an enabled shop offer cannot omit costs to become a free offer; a disabling override may contain only `{"enabled": false}`. When a quote expires, module permissions change or materials are insufficient, the server rejects the final purchase.

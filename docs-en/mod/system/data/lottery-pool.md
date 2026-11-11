---
title: "Lottery pool"
sidebar_position: 5
---

Registry: `system:lottery_pools`. Each confirmation draws one complete prize package; the server samples by integer weight, and the model does not choose the prize.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | Text component | no | Empty component | Must be non-empty when enabled. |
| `costs` | [Saturn cost](../../../library/saturn/types/cost.md) array | no | `[]` | An empty list means a free draw. |
| `entries` | Prize entry array | no | `[]` | At least one entry when enabled. |
| `enabled` | Boolean | no | `true` | Can be disabled by an override. |

## Prize entries

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `reward` | Reward snapshot object | yes | — | Contains id, label and items; it is not a string reference to another reward table. |
| `weight` | Positive integer | no | `1` | Probability is this entry's weight / the sum of all weights. |
| `reward.id` | Resource ID | yes | — | Identifier of the prize snapshot. |
| `reward.label` | Text component | yes | — | Prize name. |
| `reward.items` | Item stack template array | yes | — | 1–36 items. |

## Example

```json title="data/example/system/lottery_pools/supplies.json"
{
  "label": {
    "text": "Daily supplies"
  },
  "costs": [
    {
      "type": "saturn:item",
      "items": [
        "minecraft:emerald"
      ],
      "amount": 2
    }
  ],
  "entries": [
    {
      "weight": 3,
      "reward": {
        "id": "example:food",
        "label": {
          "text": "Rations"
        },
        "items": [
          {
            "id": "minecraft:bread",
            "count": 8
          }
        ]
      }
    },
    {
      "weight": 1,
      "reward": {
        "id": "example:diamond",
        "label": {
          "text": "Diamond"
        },
        "items": [
          {
            "id": "minecraft:diamond"
          }
        ]
      }
    }
  ]
}
```

The two prizes have probabilities of 75% and 25% respectively. Add them to the values of `data/system/tags/system/lottery_pools/default.json`, or select them through the pools of the [lottery module](../types/module/lottery.md). Empty costs allow repeated free draws, so design the cost according to your gameplay; the entries and the contents of prize packages are not decided by the client.

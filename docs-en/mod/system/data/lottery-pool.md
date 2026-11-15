---
title: "Lottery pool"
sidebar_position: 5
---

Registry: `system:lottery_pool`. Each confirmation draws one complete prize package; the server samples by integer weight, and the model does not choose the prize.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | Translation-key string or text component | no | Empty component | Must be non-empty when enabled. |
| `costs` | [Saturn cost](../../../library/saturn/types/cost.md) array | no | `[]` | An empty list means a free draw. |
| `entries` | Prize entry array | no | `[]` | At least one entry when enabled. |
| `enabled` | Boolean | no | `true` | Can be disabled by an override. |

## Prize entries

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `reward` | Reward snapshot object | yes | — | Contains id, label and items; it is not a string reference to another reward table. |
| `weight` | Positive integer | no | `1` | Probability is this entry's weight / the sum of all weights. |
| `reward.id` | Resource ID | yes | — | Identifier of the prize snapshot. |
| `reward.label` | Translation-key string or text component | yes | — | Prize name. |
| `reward.items` | Item stack template array | yes | — | 1–36 items. |

## Example

```json title="data/example/system/lottery_pool/supplies.json"
{
  "label": "example.pool.supplies",
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
        "label": "example.reward.food",
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
        "label": "example.reward.diamond",
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

The two prizes have probabilities of 75% and 25% respectively. Add them to the values of `data/system/tags/system/lottery_pool/default.json`, or select them through the pools of the [lottery module](../types/module/lottery.md). Empty costs allow repeated free draws, so design the cost according to your gameplay; the entries and the contents of prize packages are not decided by the client.

Name strings reference translation keys supplied by a client resource pack; use `{"text":"Torch supplies"}` for literal text. See [Text and translations](./index.md#translated-text).

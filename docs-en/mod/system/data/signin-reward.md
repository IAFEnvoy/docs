---
title: "Sign-in reward"
sidebar_position: 3
---

Registry: `system:signin_reward`. An entry defines a complete item bundle that the sign-in model can choose from; the model can only pick IDs and cannot change amounts.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | Translation-key string or text component | no | Empty component | An enabled entry must have a non-empty name; a string is used directly as a translation key. |
| `items` | ItemStackTemplate array | no | `[]` | At least 1 and at most 36 entries when enabled. |
| `enabled` | Boolean | no | `true` | false can be used to disable an older entry that is overridden. |

## Example

```json title="data/example/system/signin_reward/mining.json"
{
  "label": "example.reward.mining",
  "items": [
    {
      "id": "minecraft:torch",
      "count": 16
    },
    {
      "id": "minecraft:bread",
      "count": 4
    }
  ]
}
```

## Adding to the default directory

```json title="data/system/tags/system/signin_reward/default.json"
{
  "replace": false,
  "values": [
    "example:mining"
  ]
}
```

You can also create your own tag and reference it from the rewards of the [sign-in module](../types/module/signin.md). Adding only a reward file does not automatically put it into the candidate set of the default system. When enabled, the tag and the item list must be valid; to disable, use `{"enabled": false}`. A normal sign-in requires the model to complete the reward selection; a reward that has been granted keeps the complete snapshot from that time.

Name strings reference translation keys supplied by a client resource pack; use `{"text":"Torch supplies"}` for literal text. See [Text and translations](./index.md#translated-text).

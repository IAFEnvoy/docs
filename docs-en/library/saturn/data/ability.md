---
title: "Ability Definitions"
sidebar_position: 4
---

File: `data/<namespace>/saturn/ability/<path>.json`. Write `type` and the type-specific fields directly at the top level, with the common fields in the same object. See [Ability types](../types/ability/index.md) for the type catalogue.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Ability type ID | yes | — | Selects a registered ability implementation. |
| `costs` | Array of [costs](../types/cost/index.md) | no | `[]` | Costs when the ability is activated. |
| `cast_time` | [Number provider](../types/number/index.md) | no | `0` | Casting time in ticks. |
| `icon` | [Icon](./common.md#items-and-icons) | no | omitted | Texture or item template. |
| `charges` | Charge settings | no | omitted | See the table below. |
| `condition` | [Entity condition](../types/entity-condition/index.md) | no | always true | Condition for using the ability. |
| `hidden` | Boolean | no | `false` | Hides the ability from the host item's tooltip; this does not mean the ability cannot be used. |

## Charge settings

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `maximum` | Number provider | yes | — | Maximum number of charges. |
| `recharge_ticks` | Number provider | yes | — | Ticks needed to restore one charge. |

## Example: spend mana to heal

First create `example:mana` from the [resource definition](./resource.md), then define:

```json title="data/example/saturn/ability/heal.json"
{
  "type": "saturn:active",
  "costs": [
    {
      "type": "saturn:resource",
      "resource": "example:mana",
      "amount": 10
    }
  ],
  "cast_time": 10,
  "cooldown": 40,
  "icon": {
    "id": "minecraft:golden_apple"
  },
  "entity_action": {
    "type": "saturn:heal",
    "amount": 4
  }
}
```

Creating a definition does not grant the ability automatically. Grant it through the host mod or the [grant_ability action](../types/entity-action/grant_ability.md); the source ID determines which source's ability is removed. The type declares the required state storage such as cooldown and charges automatically, so data packs usually do not need to write runtime storage snapshots by hand.

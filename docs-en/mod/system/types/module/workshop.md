---
title: "Equipment workshop"
sidebar_position: 10
---

`system:workshop` repairs the item in the player's main hand. Enter `/repair` or `/维修` in the System input box to preview durability and costs. Only confirmation pays and restores full durability. Neither step requires AI.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:workshop`. |
| `costs` | [Saturn cost](../../../../library/saturn/types/cost.md) array | yes | — | Repair fee per item; an explicit `[]` means free repairs. |

The cost field is required; a decoding error does not make repairs free. Costs can use items, Saturn resources or [System currency](../cost/currency.md).

## Complete module example

```json title="data/example/system/system_module/repair.json"
{
  "order": 45,
  "server": {
    "type": "system:workshop",
    "costs": [
      { "type": "saturn:item", "items": ["minecraft:emerald"], "amount": 1 }
    ]
  },
  "client": "system:workshop"
}
```

See [Module definition](../../data/module.md) for common fields. The built-in configuration is in the default module tag and costs one emerald per item, regardless of damage.

Only the latest quote remains valid, and it expires after two minutes. Changing slots, replacing the item, changing durability or components, or reconnecting invalidates the old quote. Item costs exclude the target slot. An uncertain payment or repair result is not retried automatically. Bulk repairs, reforging and enhancement are not included.

## Java entry point

`com.iafenvoy.system.module.builtin.WorkshopSystemModule`, with business service `assistant.workshop.Workshop`.

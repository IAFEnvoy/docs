---
title: "Economy module"
sidebar_position: 10
---

`system:economy` provides bound players with multiple currency balances, wallet queries and administrator economy commands. It is an optional gameplay module included in the default module tag.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:economy`. |

There is no currency filter parameter; currencies come from the [currency registry](../../data/currency.md). Module variants share one wallet rather than creating separate balances for each configuration ID.

## Complete module example

```json title="data/example/system/system_module/wallet.json"
{
  "order": 55,
  "server": { "type": "system:economy" },
  "client": "system:economy"
}
```

Reference `example:wallet` in the system's `modules` or a module tag. See [Module definition](../../data/module.md) for common fields.

Players can use `/balance` or `/wallet`, or `/system balance` in game chat. Queries do not call AI; the AI tool `economy.balance` also only reads the requesting player's balances. See [System coins and wallets](../../guides/economy.md) for administrator commands and data-driven grants and payments.

## Java entry point

`com.iafenvoy.system.module.builtin.EconomySystemModule`; storage uses `WalletDataStorage` in the adjacent storage package.

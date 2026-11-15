---
title: "System coins and wallets"
sidebar_position: 14
---

The economy module gives bound players individual wallets with multiple currencies, without AI or an external payment API. Its ID is `system:economy` and it is included in the default module tag. The built-in `system:coin` is the system coin, with an initial balance of zero.

## Checking balances

Enter `/balance`, `/wallet`, `/余额` or `/钱包` in the System input box, or choose Wallet in the sidebar. In game chat, use `/system balance`. Ordinary queries return only your own balances. The AI tool `economy.balance` is also read-only; it cannot mint currency or administer other players' wallets.

Balances use nonnegative `long` integers. Fractions, overdrafts, transfers, top-ups and automatic exchange are not supported. Add a [currency definition](../data/currency.md) to introduce another currency without adding a Java type.

## Administrator commands

These game commands require administrator permission. The target must be online, bound to a system and have the economy module enabled. Player and currency arguments support completion.

| Command | Purpose |
| --- | --- |
| `/system economy currencies` | Lists currently defined currency IDs. |
| `/system economy get <player> <currency>` | Queries a balance. |
| `/system economy add <player> <currency> <amount>` | Adds currency. |
| `/system economy remove <player> <currency> <amount>` | Deducts currency; insufficient funds reject the whole operation. |
| `/system economy set <player> <currency> <amount>` | Sets a balance. |

Amounts are nonnegative integers, for example `/system economy add Steve system:coin 100`. The new balance is reported after saving. Overflow and insufficient funds reject the operation rather than clamping the amount.

## Data-driven integration

| Goal | Type | Usage |
| --- | --- | --- |
| Enable a wallet | [Economy module](../types/module/economy.md) | Include its module configuration in the system's module list or tag. |
| Define a currency | [Currency definition](../data/currency.md) | Sets the name, description, icon and order. |
| Grant or remove currency | [Entity action `system:add_currency`](../types/entity-action/add_currency.md) | Positive amounts add currency; negative amounts deduct it. |
| Check a balance | [Entity condition `system:currency`](../types/entity-condition/currency.md) | Uses `comparison` and `compare_to`, without charging. |
| Price an offer | [Cost `system:currency`](../types/cost/currency.md) | Usable in shop, lottery and repair `costs`. |

These types use the economy module's wallet. Costs, actions and conditions register in their respective Saturn type registries. Although the cost, condition and currency data registry share the name `system:currency`, they have different roles.

Built-in prices keep their original item costs. Replace `costs` when you want system-coin payments, for example:

```json
[
  { "type": "system:currency", "currency": "system:coin", "amount": 10 }
]
```

Reopen the world or restart the server after editing dynamic registry definitions; `/reload` does not hot-swap definition objects.

## Persistence

Wallets are isolated by save and player and stored as compressed NBT module data in `system/players/<UUID>.dat`. Economy module variants share one wallet. Disabling the module retains balances; `revoke` / `reset` clear business data under their existing rules. Removing a currency definition only hides its balance, which becomes available again when the same ID is restored.

Balance storage and arithmetic use exact long values. Saturn costs and numeric comparisons pass through double values: a single cost is limited to `9007199254740991`, and comparisons may not distinguish adjacent balances above `2^53`. There is no combined rollback across separate costs, inventories and effects from other mods; merge demands for the same currency into one cost.

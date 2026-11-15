---
title: "Currency definition"
sidebar_position: 7
---

Registry: `system:currency`. Each entry defines a currency's name, description, icon and display order. Player balances belong to individual wallets, not to this registry. The built-in `system:coin` is the system coin and starts at zero.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | Translation-key string or text component | yes | — | Currency name; a string is used directly as a translation key. |
| `description` | Translation-key string or text component | no | Empty text | Currency description. |
| `icon` | ItemStackTemplate | yes | — | Display icon only; this item is not consumed as physical currency. |
| `order` | Integer | no | `0` | Higher values appear first; ties are sorted by ID. |

## Example

```json title="data/example/system/currency/contribution.json"
{
  "name": "example.currency.contribution",
  "description": "example.currency.contribution.description",
  "icon": "minecraft:emerald",
  "order": 50
}
```

This file defines `example:contribution`. Supply translations in a client resource pack:

```json title="assets/example/lang/en_us.json"
{
  "example.currency.contribution": "Contribution points",
  "example.currency.contribution.description": "Contribution earned by completing commissions."
}
```

Use the same keys in other languages; see [Text and translations](./index.md#translated-text).

## Loading and storage

Currency metadata synchronizes when a client connects; player balances are not broadcast with the registry. Reopen the world or restart the server after changing definitions. Removing a definition hides the currency without deleting its saved balance. Restoring the same ID restores access to that balance.

Currencies use nonnegative `long` integer units, up to `9223372036854775807`, with no fractions, overdrafts or automatic exchange. See [System coins and wallets](../guides/economy.md) for queries, administration and persistence, and [Currency cost](../types/cost/currency.md) for payments.

## Java entry point

`com.iafenvoy.system.data.catalog.CurrencyDefinition`, registered under `SystemResourceKeys.CURRENCY`.

---
title: "Data definitions"
sidebar_position: 0
---

System's gameplay data is defined by the server data pack, and client card layouts are defined by the resource pack. The client cannot decide prices, prizes, weights or operable state.

| Definition | File path | When it takes effect |
| --- | --- | --- |
| [System](./system.md) | `data/<namespace>/system/system/<path>.json` | Reopen the world or restart the server |
| [Module](./module.md) | `data/<namespace>/system/system_module/<path>.json` | Reopen the world or restart the server |
| [Sign-in reward](./signin-reward.md) | `data/<namespace>/system/signin_reward/<path>.json` | Reopen the world or restart the server |
| [Shop offer](./shop-offer.md) | `data/<namespace>/system/shop_offer/<path>.json` | Reopen the world or restart the server |
| [Lottery pool](./lottery-pool.md) | `data/<namespace>/system/lottery_pool/<path>.json` | Reopen the world or restart the server |
| [Currency](./currency.md) | `data/<namespace>/system/currency/<path>.json` | Reopen the world or restart the server |
| [Online job](./online-job.md) | `data/<namespace>/system/online_job/<path>.json` | Reopen the world or restart the server |
| [Prompt](./prompt.md) | `data/<namespace>/system/prompt/<path>.txt` | New requests use the version after `/reload` |
| [Card template](../cards/template.md) | `assets/<namespace>/cards/<path>.json` | Client resource reload |

For example, `data/example/system/system/daily.json` defines the system `example:daily`. The first `system` in the path is the registry namespace and the second `system` is the registry path; do not omit either level.

Systems, modules and currency metadata use synchronized data pack registries. Sign-in rewards, offers, lottery pools and online jobs load only on the server. Wallet balances are not broadcast with the currency registry. Vanilla tags can be updated through a resource reload, but definition objects themselves are not hot-swapped. Optional FTB modules do not automatically write default definitions that every server must parse.

## Text and translations {#translated-text}

Currency `name` / `description`, online job `label` / `description`, and the `label` fields of sign-in rewards, offers, pools and prize snapshots accept translation-key strings directly. A `translate` wrapper is unnecessary. Missing translations display the original string. System definition `name` / `description` also use translation-key strings.

```json
{
  "label": "example.reward.mining"
}
```

Supply the corresponding language files in a client resource pack, for example:

```json title="assets/example/lang/en_us.json"
{
  "example.reward.mining": "Mining supplies",
  "example.offer.torches": "Torch supplies",
  "example.pool.supplies": "Daily supplies",
  "example.reward.food": "Rations",
  "example.reward.diamond": "Diamond",
  "example.job.wood": "Woodland gathering",
  "example.job.wood.description": "Wait online to receive wood."
}
```

Use the same keys for other languages. Server data packs send translation keys, not language files. For literal or styled text, a vanilla text component object such as `{"text":"Torch supplies"}` is still supported. This string convention does not change card nodes' `text` / `translate` fields.

## Naming convention

Registry names, definition directories and their tag directories are singular: `currency`, `online_job`, `signin_reward`, `shop_offer` and `lottery_pool`. The former plural directories are no longer loading paths. The prompt directory is also singular, `system/prompt`, but is a TXT reload source rather than a data pack registry. The module type `system:online_jobs` and collection fields such as `rewards`, `offers`, `pools` and `jobs` keep their names.

---
title: "Data definitions"
sidebar_position: 0
---

System's gameplay data is defined by the server data pack, and client card layouts are defined by the resource pack. The client cannot decide prices, prizes, weights or operable state.

| Definition | File path | When it takes effect |
| --- | --- | --- |
| [System](./system.md) | `data/<namespace>/system/system/<path>.json` | Reopen the world or restart the server |
| [Module](./module.md) | `data/<namespace>/system/system_module/<path>.json` | Reopen the world or restart the server |
| [Sign-in reward](./signin-reward.md) | `data/<namespace>/system/signin_rewards/<path>.json` | Reopen the world or restart the server |
| [Shop offer](./shop-offer.md) | `data/<namespace>/system/shop_offers/<path>.json` | Reopen the world or restart the server |
| [Lottery pool](./lottery-pool.md) | `data/<namespace>/system/lottery_pools/<path>.json` | Reopen the world or restart the server |
| [Prompt](./prompt.md) | `data/<namespace>/system/prompts/<path>.txt` | New requests use the version after `/reload` |
| [Card template](../cards/template.md) | `assets/<namespace>/cards/<path>.json` | Client resource reload |

For example, `data/example/system/system/daily.json` defines the system `example:daily`. The first `system` in the path is the registry namespace and the second `system` is the registry path; do not omit either level.

Systems and modules use synchronized data pack registries, and the three reward catalogs are loaded only on the server. Vanilla tags can be updated through a resource reload, but definition objects themselves are not hot-swapped. Optional FTB modules do not automatically write default definitions that every server must parse.

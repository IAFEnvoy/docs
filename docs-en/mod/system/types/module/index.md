---
title: "Module type"
sidebar_position: 0
---

The `server` object that is written into a module definition, with `type` selecting the implementation. A system's `modules` reference module configuration IDs and cannot hold implementation type objects directly. For the common structure see [Module definition](../../data/module.md).

| Type | Purpose |
| --- | --- |
| [`system:core`](./core.md) | Provides the execution ledger, permissions and core state management. |
| [`system:binding`](./binding.md) | Provides system binding and the basic management entry point. |
| [`system:usage`](./usage.md) | Provides entry points for viewing AI and network request usage. |
| [`system:player`](./player.md) | Provides player profile queries and a host information card. |
| [`system:items`](./items.md) | Queries items and recipe sources and builds item and source cards. |
| [`system:signin`](./signin.md) | Provides sign-in, reward selection and reward crediting. |
| [`system:inbox`](./inbox.md) | Shows pending entitlements and performs item delivery. |
| [`system:shop`](./shop.md) | Browses offers, previews the cost and purchases after confirmation. |
| [`system:lottery`](./lottery.md) | Browses lottery pools, previews the probabilities and draws after confirmation. |
| [`system:advancement`](./advancement.md) | Listens to the rules in system-advancements.json and runs unlock marker and fixed reward workflows. |
| [`system:ftb_quests`](./ftb_quests.md) | Provides quest search, details, submission, claiming, gift packs and guide book lookup. |
| [`system:web_search`](./web_search.md) | Provides DeepSeek Search and Fetch capabilities after explicit authorization. |

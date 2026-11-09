---
title: /lifespan
---

# `/lifespan`

<span id="lifespan" />

The optional Reincarnation mod provides `/lifespan`. Every node requires gamemaster permission (operator level 2), including self queries.

| Command | Behaviour |
| --- | --- |
| `/lifespan` or `/lifespan get` | Query yourself |
| `/lifespan get <targets>` | Query selected entities |
| `/lifespan set <targets> <ticks>` | Rewrite remaining and total life; non-negative ticks |
| `/lifespan add <targets> <ticks>` | Positive values extend both numbers; negative values spend remaining life only |
| `/lifespan unlimited <targets>` | Close the ledger until explicitly granted finite life |
| `/lifespan reincarnate <targets>` | Queue rebirth using Reincarnation's configured mode |

Writes affect living targets. Values use game ticks and still write while natural ageing is disabled. Rebirth feedback means the request was accepted; `lifespanRebirth` Post or Failed reports its outcome. A full rebirth replaces the player; an in-place reset keeps the same entity and life number.

The command is available when Reincarnation is installed and is controlled by that mod.

Queries display **age / total lifespan**, with age increasing over time. set/add still take lifespan grants in ticks.

See [Lifespan](../lifespan.md) and [ReincarnationEvents](../../kubejs/api/reincarnation_events.md).

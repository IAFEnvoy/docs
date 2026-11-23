---
title: Commands
description: Query current and past lives, start a new life, and manage lifespan.
sidebar_position: 1
---

## Reincarnation {#reincarnation}

Any player can query their own records. Looking up another account or triggering rebirth requires operator level 2. Query commands accept a player name or UUID. A name can match a recorded offline player. Use the UUID if multiple records share the name. Life numbers and page numbers start at `1`.

| Command | Effect |
| --- | --- |
| `/reincarnation` or `/reincarnation status [player]` | Show the current life number and any pending rebirth. |
| `/reincarnation history [player] [page]` | List archived lives in chat. The default page is `1`. Supply the player argument before specifying a page. |
| `/reincarnation info <player> <life>` | Show a life summary in chat. |
| `/reincarnation view [player] [life] [page]` | Open the life archive. Defaults to the current life and the page containing it. This command needs an in-game viewer. |
| `/reincarnation rebirth [target] [reason]` | Immediately start a full new life for one online player. With no target it affects the player running the command. A custom reason requires a target and can be at most 256 characters. |

For example, `/reincarnation view Alex 1` opens Alex's first life. `/reincarnation rebirth @s A new beginning` starts your next life and records the given reason.

## Lifespan {#lifespan}

Every `/lifespan` command requires operator level 2, including queries about yourself. Write commands act on living targets and use game ticks regardless of the display unit.

| Command | Effect |
| --- | --- |
| `/lifespan` or `/lifespan get [targets]` | Show age and total lifespan. Defaults to the executing player. |
| `/lifespan set <targets> <ticks>` | Set both remaining and total lifespan to a non-negative value. |
| `/lifespan add <targets> <ticks>` | A positive value raises both numbers. A negative value reduces the remainder down to zero. |
| `/lifespan unlimited <targets>` | Close the lifespan ledger. |
| `/lifespan reincarnate <targets>` | Queue rebirth using the configured player mode. Other living entities reset in place. |

Explicit writes work while natural ageing is off. The last command reports queue acceptance. Use [rebirth events](./kubejs.md#events) to observe execution.

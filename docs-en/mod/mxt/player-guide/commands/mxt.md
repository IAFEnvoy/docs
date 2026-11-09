---
title: /mxt
---

# `/mxt`

<span id="mxt" />

The mod's root command: registries, attachments, profiling, values, cultivation, realms, lifespan, contracts, secret realms, souls, triggers and rifts. Every player-facing group has a page of its own; this one only shows the shape.

<div className="cmd-tree">

- `/mxt ...`

  - `... registries list`

    Lists the dynamic registries and their entry counts.

  - `... registries validate`

    Validates the datapack definitions and lists **every** problem the last build found at once, each with the file it comes from; with no problems it reports the registry and entry counts.

  - `... attachment status`

    Shows your own attachment counts and cultivation data: resources, abilities, cooldowns, curses, spirit roots and physiques.

  - `... debug ...`

    Module profiling, described below.

    - `... on` / `... off`

      Enables or disables module profiling. Off by default in normal mode; enabled at server startup in developer mode. Requires operator level 3.

    - `... status [sources...]`

      Queries module timings over the last 240 ticks. Requires operator level 3.

    - `... gui`

      Opens the timing list and charts for the executing player. Requires operator level 3.

  - `... resource ...`

    Resource accounts: list every [resource bar](./resource.md) or read one value, inspect its bars, rewrite it. See [`/resource`](./resource.md).

  - `... cultivate ...`

    The cultivation state and a manual pick of one method. See [`/cultivate`](./cultivate.md).

  - `... breakthrough <aura>`

    Attempts a breakthrough into the realm that the given aura leads to. See [`/breakthrough`](./breakthrough.md).

  - `... realm ...`

    Sets your own linear realm. See [`/realm`](./realm.md).

  - `... lifespan ...`

    Reads and rewrites the lifespan ledger and makes a target be reborn on the spot. See [`/lifespan`](./lifespan.md).

  - `... contract ...`

    Spirit-beast contracts: the list, one record and the operations. See [`/contract`](./contract.md).

  - `... secret_realm ...`

    Secret realm definitions, instances, entry and exit, and maintenance. See [`/secret_realm`](./secret_realm.md).

  - `... soul create [<targets>]`

    Creates a soul with the target living entity's complete serialized snapshot. Requires permission level 2; the default target is yourself.

  - `... soul reclaim [<targets>]`

    Reclaims the loaded soul associated with the original target entity. Requires permission level 2, does not load chunks and does not restore a body. See [Souls](../soul.md).

  - `... trigger ...`

    Runtime trigger subscriptions and the datapack rules behind them.

    - `... list [<entity>]`

      Lists an entity's runtime trigger subscriptions: module, identity, signal and state. Subscriptions are never saved, so this is the only way to see what a running server has armed; without an entity it uses you.

    - `... rules <signal>`

      Lists the datapack rules that react to one signal, in the order they run, with each rule's action type.

    - `... publish <signal> [<entity>]`

      Publishes a signal by hand (needs the `gamemaster` permission), so a reaction can be checked without waiting for the real event; it says so when nothing subscribes to the signal and no rule reacts to it.

  - `... rift ...`

    Operator level 2 portal creation, editing, destinations, transforms and export; see [Rifts](../rift.md).

</div>

## debug {#debug}

The whole command tree and GUI data reception require operator level 3 (`admin`). These commands have no top-level alias.

For a walkthrough of recording and using the charts, see the [Development Mode tutorial](../../tutorial/dev-mode.md).

Profiling is off by default in normal mode; run `/mxt debug on` to start recording. In developer mode, recording starts automatically when the server starts. Developer launches and the server setting “Debug → Debug Mode” both activate developer mode. After `/mxt debug off`, recording stays off until you enable it again or restart the server, when developer mode determines the initial state again.

Run `/mxt debug gui` to open the list. Each row shows a localized module name and min / avg / max in milliseconds, with a bar chart of the last 240 ticks on the right. Sort by module name, minimum, average or maximum duration, in either direction. Charts stay 240 px wide, with the upper Y-axis value labeled at the top left of each chart. The panel is compact and centered; narrow windows place names and statistics above their charts.

`/mxt debug status` calculates min, avg, max, 50%, 95%, 99%, call count and valid tick count over the last 240 ticks on demand. Specify multiple Sources separated by spaces, with completion support, for example `/mxt debug status server/cost server/economy/change`; omit them to query all Sources. Incomplete ticks are excluded; complete idle ticks count as zero.

## secret_realm {#secret-realm}

The entire subtree requires operator level 2. `definitions` lists definitions; `list` and `info` inspect instances; `enter` selects by definition and `join` targets one instance; `check` verifies landings and `anchor` adjusts an instance entrance; `exit` returns and `destroy` ends an instance. See [`/secret_realm`](./secret_realm.md) for arguments and troubleshooting.

## rift {#rift}

Rifts are planar polygon portals managed by UUID. The entire subtree requires operator level 2: `spawn`, `edit`, `info`, `target`, `enabled`, `duration`, `copy`, `transform`, `remove` and `export` share portal validation and travel rules.

The mechanic itself is on the [Rifts](../rift.md) page, and every subcommand is on [`/rift`](./rift.md).

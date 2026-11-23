---
title: Runtime and Reloads
description: Advanced tooltips, server snapshots, client query caching, resource reloads, and troubleshooting unknown values.
sidebar_position: 3
---

## View a value

Install Evaluate and Saturn on the client and server. Press **F3+H** to enable vanilla advanced tooltips, then hover over an item.

The tooltip shows the value of **one item**, not the whole stack. It currently formats the number to two decimal places; the API retains the underlying `double`. A very small positive value can therefore display as `0.00`.

Unknown and free items have no value line. The first hover sends a query and may briefly show no line while waiting for the server. Closing advanced tooltips hides the value line.

## Caches

| Location | Cached data | Lifetime |
| --- | --- | --- |
| Server | Immutable snapshot of the calculated graph, fixed rules, and final overrides | Replaced after a resource reload or external invalidation. |
| Client | Results keyed by item and component patch, including unknown results | Cleared on reload notification, login, and logout. |

Ordinary queries reuse the server snapshot. Explicit component-sensitive rules still match the actual queried stack; they are not cached as one result for an entire item ID.

The client keeps at most **1024** results with LRU eviction and at most **64** pending queries. Repeated hovers deduplicate pending requests. Replies from requests made before invalidation are ignored.

## What to reload

| Change | Action | Result |
| --- | --- | --- |
| Evaluate datapack definitions or recipes | `/reload` | Rereads definitions, rebuilds the graph, and invalidates client value caches. |
| KubeJS server scripts or generated definitions | `/reload` | Reloads script contributions and callbacks together with the resource set. |
| FTB quest files on disk | `/ftbquests reload quests` | Loads the task book; Evaluate recalculates on the next server tick. |
| FTB editor changes | Apply the edit | FTB's cache-clear event schedules recalculation on the next server tick. |

On successful datapack reload, Evaluate waits until recipes, tags, and default components are ready, recalculates, and replaces the old snapshot. Removed definitions and relationships do not persist. Client tooltip results are then fetched again as needed.

`/reload` recalculates FTB relationships from the **currently loaded** quest book; it does not reread FTB's disk files. See [FTB Quests](./ftb-quests.md) for eligible exchanges.

Java callers retaining an old `ItemValues.all()` map must obtain a new one after reload. Previously returned immutable maps do not update in place. The same applies to evaluator and override registry snapshots.

## Why is an item unknown?

Check these causes in order:

1. Confirm the file is inside `evaluate/evaluator/` or `evaluate/value_override/`, with singular directory names and valid fields.
2. Check matching priorities and whether a final override or base value sets the item to `0`.
3. Confirm that every required input has a known value and that the recipe implementation is supported.
4. Check whether the query uses a component variant not collected for inference.
5. For FTB tasks, check consumption, repeatability, objective types, and reward restrictions.
6. Read the server log for invalid definitions, missing JS callbacks, skipped quests, and cyclic groups exceeding calculation limits.

Use a [fixed base value](./datapack.md) to supply a missing starting value, or add a [script](./kubejs.md) or [Java evaluator](./java.md) for an unsupported source.

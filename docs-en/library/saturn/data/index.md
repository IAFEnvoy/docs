---
title: "Data Definitions"
sidebar_position: 0
---

These objects are data pack entries that load independently. The file namespace and relative path form the ID, so the JSON usually does not contain an `id` again.

| Definition | Registry | File directory |
| --- | --- | --- |
| [Resource](./resource.md) | `saturn:resource` | `data/<namespace>/saturn/resource/` |
| [Ability](./ability.md) | `saturn:ability` | `data/<namespace>/saturn/ability/` |
| [Trigger rule](./trigger.md) | `saturn:trigger` | `data/<namespace>/saturn/trigger/` |
| [Incomplete item marker](./incomplete.md) | `saturn:incomplete` | `data/<namespace>/saturn/incomplete/` |
| [Information row](./information-row.md) | `saturn:information_row` | `data/<namespace>/saturn/information_row/` |
| [Information group](./information-group.md) | `saturn:information_group` | `data/<namespace>/saturn/information_group/` |

Definitions are read when the world loads, following the vanilla dynamic registry lifecycle; after changing them, reopen the world or restart the server. Actions, conditions, formulas, getters and similar objects inside fields are [type objects](../types/index.md), not standalone type files in these directories.

The shared [JSON data types](./common.md) include text components, item stack templates, icons, comparison objects and tags.

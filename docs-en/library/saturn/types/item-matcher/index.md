---
title: "Item matcher"
sidebar_position: 0
---

Used for ItemMatcher entry fields such as `items`. Multiple entries are combined as a union; items, tags, wildcards, regex and vanilla ingredients are supported.

| Type | Purpose |
| --- | --- |
| [`saturn:item`](./item.md) | Matches a single item registry ID. |
| [`saturn:tag`](./tag.md) | Matches items in the given tag. |
| [`saturn:wildcard`](./wildcard.md) | Matches by a wildcard pattern on the item ID. |
| [`saturn:regex`](./regex.md) | Matches by a regular expression on the item ID. |
| [`saturn:ingredient`](./ingredient.md) | Matches items using a Minecraft Ingredient. |

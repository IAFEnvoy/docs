---
title: "Resource bar visibility"
sidebar_position: 0
---

Used for ResourceBar.visibility; decides whether the bar is shown in the resource bar context.

| Type | Purpose |
| --- | --- |
| [`saturn:always`](./always.md) | The condition is always true. |
| [`saturn:non_full`](./non_full.md) | Shown while the current resource is below its maximum. |
| [`saturn:non_zero`](./non_zero.md) | Shown while the current resource is not zero. |
| [`saturn:recently_changed`](./recently_changed.md) | Keeps the bar shown for the given number of ticks after the resource changes. |
| [`saturn:resource_range`](./resource_range.md) | Shown while the current resource is within the given range. |
| [`saturn:and`](./and.md) | Matches only when every sub-condition holds. |
| [`saturn:or`](./or.md) | Matches when any sub-condition holds. |
| [`saturn:not`](./not.md) | Inverts the match result of the sub-condition. |

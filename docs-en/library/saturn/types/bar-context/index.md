---
title: "Resource bar contexts"
sidebar_position: 0
---

ResourceBar.context uses a string ID rather than an object with a type. Whether the context is actually drawn still depends on the host interface.

| Type | Purpose |
| --- | --- |
| [`saturn:self_hud`](./self_hud.md) | Shows the current player's own resources. |
| [`saturn:target_overlay`](./target_overlay.md) | Provides a resource display context for the current target. |
| [`saturn:boss_overlay`](./boss_overlay.md) | Provides a display context for the boss resource bar. |

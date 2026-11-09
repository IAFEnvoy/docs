---
title: "State storage"
sidebar_position: 0
---

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

| Type | Purpose |
| --- | --- |
| [`saturn:empty`](./empty.md) | Provides an implementation that performs no additional behaviour. |
| [`saturn:cooldown`](./cooldown.md) | Stores the cooldown start time and duration. |
| [`saturn:charges`](./charges.md) | Stores the maximum charges, the recharge interval and the charges currently remaining. |
| [`saturn:toggle`](./toggle.md) | Stores a mutable on/off state. |
| [`saturn:timer`](./timer.md) | Stores the duration and the tick at which the timer ends. |
| [`saturn:resource`](./resource.md) | Stores a resource reference and the corresponding amount; an object without values only declares the storage type. |
| [`saturn:target_lock`](./target_lock.md) | Stores the locked target and the usable distance. |
| [`saturn:container`](./container.md) | Stores the contents of runtime item slots. |
| [`saturn:cast_deadline`](./cast_deadline.md) | Stores the time at which casting ends. |
| [`saturn:channel_pulse`](./channel_pulse.md) | Stores the time of the next channelled execution. |
| [`saturn:active_state`](./active_state.md) | Stores a runtime activation flag. |
| [`saturn:entry_began`](./entry_began.md) | Stores whether a timeline node has already begun. |
| [`saturn:idle_countdown`](./idle_countdown.md) | Stores the remaining ticks of a wait node. |
| [`saturn:wait_countdown`](./wait_countdown.md) | Stores the remaining ticks of a condition wait node. |

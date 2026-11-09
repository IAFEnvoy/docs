---
title: "Timeline node"
sidebar_position: 0
---

A timeline node only describes the behavior of this step. Node IDs, successors and the whole timeline are assembled by the consumer; it is not a standalone dynamic registry.

| Type | Purpose |
| --- | --- |
| [`saturn:action`](./action.md) | Runs an entity action inside a timeline. |
| [`saturn:branch`](./branch.md) | Chooses the next path inside a timeline based on a condition. |
| [`saturn:idle`](./idle.md) | Waits for the given number of ticks inside a timeline. |
| [`saturn:wait_for`](./wait_for.md) | Waits until an entity condition holds, with an optional timeout and timeout result. |

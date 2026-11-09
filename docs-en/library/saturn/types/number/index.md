---
title: "Number provider"
sidebar_position: 0
---

A NumberProvider can be written as a number, a formula string, or an object with a `type` from this section. Game-time fields default to ticks; 20 ticks is usually one second.

| Type | Purpose |
| --- | --- |
| [`saturn:constant`](./constant.md) | Returns the fixed value in the definition. |
| [`saturn:expression`](./expression.md) | Evaluates an exp4j expression; params can override expression parameters. |
| [`saturn:context_variable`](./context_variable.md) | Reads a context or registered formula variable; unknown variables can use a fallback value. |
| [`saturn:sum`](./sum.md) | Sums multiple number providers. |
| [`saturn:uniform`](./uniform.md) | Samples uniformly between the given minimum and maximum. |
| [`saturn:binomial`](./binomial.md) | Generates a binomial random value from n trials and a per-trial probability p. |
| [`saturn:weighted_list`](./weighted_list.md) | Selects a value from distribution entries by weight. |
| [`saturn:conditional`](./conditional.md) | Checks entity conditions in order and uses the value of the first matching branch. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |

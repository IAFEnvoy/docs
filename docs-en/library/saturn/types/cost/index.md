---
title: "Cost"
sidebar_position: 0
---

A cost definition can be used by abilities, the System shop and the lottery. Preparing and trialing do not charge; the actual payment is submitted by the caller; see [Costs and Payment](../../guides/costs.md).

| Type | Purpose |
| --- | --- |
| [`saturn:resource`](./resource.md) | Deducts the given amount of a Saturn resource. |
| [`saturn:item`](./item.md) | Selects payable inventory items by item matcher entry and consumes the amount. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |

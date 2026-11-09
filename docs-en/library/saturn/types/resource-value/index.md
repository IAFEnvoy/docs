---
title: "Resource value"
sidebar_position: 0
---

Reads a value in the resource context; it does not add or deduct resources.

| Type | Purpose |
| --- | --- |
| [`saturn:current`](./current.md) | Reads the current value of the resource. |
| [`saturn:max`](./max.md) | Reads the maximum value of the resource. |
| [`saturn:missing`](./missing.md) | Returns `max(0, resource maximum − current value)`; it is not a missing or error marker. |
| [`saturn:constant`](./constant.md) | Ignores the current resource and returns the defined fixed value. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |

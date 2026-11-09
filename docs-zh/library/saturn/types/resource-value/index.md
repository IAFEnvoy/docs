---
title: "资源取值"
sidebar_position: 0
---

在资源上下文中读取数值，不负责增加或扣除资源。

| 类型 | 用途 |
| --- | --- |
| [`saturn:current`](./current.md) | 读取资源当前值。 |
| [`saturn:max`](./max.md) | 读取资源最大值。 |
| [`saturn:missing`](./missing.md) | 返回 max(0, 资源最大值 − 当前值)，不是缺失或错误标记。 |
| [`saturn:constant`](./constant.md) | 忽略当前资源，返回定义的固定数值。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |

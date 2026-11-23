---
title: KubeJS
description: 读写寿元，并监听耗尽与转生事件。
sidebar_position: 4
---

将脚本放在 `kubejs/server_scripts/`。此扩展需要安装 KubeJS。

## ReincarnationLifespan {#methods}

| 方法 | 返回值 | 作用 |
| --- | --- | --- |
| `remaining(entity)` | `long` | 剩余寿元刻数。未记账或关闭账本时返回 `-1`。 |
| `total(entity)` | `long` | 总寿元刻数。未记账时返回 `-1`，关闭账本时返回 `0`。 |
| `set(entity, ticks)` | `Result` | 将剩余与总寿元一起设为指定的非负值。 |
| `add(entity, ticks)` | `Result` | 正值增加两者，负值只扣剩余寿元。 |
| `unlimited(entity)` | `Result` | 关闭账本。 |
| `reincarnate(entity)` | `Result` | 按配置的模式排队转生。 |

写入要求目标是存活实体，且在逻辑服务端线程执行。客户端读取返回 `-1`，写入返回 `SERVER_ONLY`。通过 Saturn `Result` 的 `getFailure()` 与 `getData()` 读取结果。失败字段为空表示成功。对于排队转生，这表示请求已被接受。

## ReincarnationEvents {#events}

脚本事件提供 `getType()`、`getPhase()`、`isCancellable()` 和 `getEvent()`。在 `Pre` 阶段可调用 `cancel()` 取消对应操作。

| 事件 | 阶段 | 原生事件 |
| --- | --- | --- |
| `lifespanEnd` | `Pre`、`Post` | 通过 `getEntity()` 和 `getSpirit()` 读取实体与寿元账本。`Pre` 中补充正寿元后继续老化，取消且未续命则关闭账本。`Post` 另有 `getOutcome()`。 |
| `lifespanRebirth` | `Pre`、`Post`、`Failed` | 提供 `getEntity()`、`getSpirit()` 和 `getMode()`。`Post` 提供处理后的实体及其账本。排队请求执行失败时可通过 `Failed` 的 `getFailure()` 读取原因。 |

显式发起寿元转生会触发 `lifespanRebirth`。死亡自动转生和 `/reincarnation rebirth` 走[完整换世事件](./java.md#events)。

```js title="kubejs/server_scripts/lifespan.js"
ReincarnationEvents.lifespanEnd(event => {
  if (event.getPhase() !== 'Pre') return
  const entity = event.getEvent().getEntity()
  if (!entity.getTags().contains('example:immortal')) return
  ReincarnationLifespan.unlimited(entity)
  event.cancel()
})
```

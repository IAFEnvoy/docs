---
title: ReincarnationEvents：寿元事件
---

# `ReincarnationEvents`：寿元事件

<span id="reincarnationevents-寿元事件" />

`ReincarnationEvents` 提供两个服务端事件，均可读 `getType()`、`getPhase()`、`isCancellable()`、`getEvent()`。`getEvent()` 为原生事件；`event.cancel()` 停止当前脚本监听链，仅 Pre 能取消底层操作。

| 事件 | 阶段 | 原生事件方法与语义 |
| --- | --- | --- |
| `lifespanEnd` | `Pre`、`Post` | `getEntity()`、`getSpirit()` 属于旧世；Pre 可取消，续命为正则继续老化，未续命的取消关闭账本。Post 另有 `getOutcome()`。显式转世不发布此事件。 |
| `lifespanRebirth` | `Pre`、`Post`、`Failed` | 寿尽直接转世和显式寿元转世经过此事件。`getEntity()`、`getSpirit()`、`getMode()`；Pre 可取消。Post 给新实体与账本；排队失败或取消发 Failed，可读 `getFailure()`。 |

```js
ReincarnationEvents.lifespanEnd(event => {
  if (event.getPhase() !== 'Pre') return
  const entity = event.getEvent().getEntity()
  if (!entity.getTags().contains('example:immortal')) return
  ReincarnationLifespan.unlimited(entity)
  event.cancel()
})
```

死亡自动转生与 `/reincarnation rebirth` 使用完整转生流程，不发布这组寿元事件。


## 相关 {#相关}

- [ReincarnationLifespan](./lifespan.md)：读写寿元和排队转世。
- [寿元](../../player-guide/lifespan.md)：老化与耗尽配置。

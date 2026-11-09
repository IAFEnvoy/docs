---
title: ReincarnationLifespan：寿元
description: 读写共享寿元账本并提交转世请求。
---

# `ReincarnationLifespan`：寿元

<span id="reincarnationlifespan-寿元" />

由 Reincarnation 提供，脚本放在 `kubejs/server_scripts/`。自然老化关闭时仍可显式写入。客户端读取为 -1，写入返回 SERVER_ONLY。

## 方法 {#方法}

| 方法 | 返回值 | 行为 |
| --- | --- | --- |
| `remaining(entity)` | long | 剩余刻数，未记账或关闭账本时为 -1；不创建数据 |
| `total(entity)` | long | 本世累计获授刻数，未记账为 -1，关闭账本为 0 |
| `set(entity, ticks)` | Result | 改写两项，负数失败 |
| `add(entity, ticks)` | Result | 正数同增两项，负数只扣剩余 |
| `unlimited(entity)` | Result | 关闭账本，直到显式写入有限寿元 |
| `reincarnate(entity)` | Result | 按配置排队转世，成功仅表示已接受 |

Result 使用 `getFailure()` 与 `getData()` 读取，均为 Optional；failure 为空表示成功。数值单位是游戏刻，写入要求活体目标和服务端主线程。转世可能在执行时被取消或失败，应监听 `ReincarnationEvents.lifespanRebirth` 的 Post/Failed。Post 给出新实体，完整换世后不要继续操作旧玩家。显式转世不发布 `lifespanEnd`。

```js
// kubejs/server_scripts/lifespan.js
PlayerEvents.loggedIn(event => {
  if (ReincarnationLifespan.total(event.player) < 0) {
    ReincarnationLifespan.set(event.player, 60 * 24000)
  }
})
```

耗尽与转世回调见 [ReincarnationEvents](./reincarnation_events.md)。

## 相关 {#相关}

- [寿元](../../player-guide/lifespan.md)：老化、耗尽与保留配置。
- [KubeJS API 参考](../api-reference.md)。

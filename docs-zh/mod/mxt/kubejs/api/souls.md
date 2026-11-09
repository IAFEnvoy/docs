---
title: MxtSouls：魂魄
description: 走权威流程回收实体可转移的魂魄。
---

# `MxtSouls`：魂魄

<span id="mxtsouls-魂魄" />

`MxtSouls` 是脚本侧的魂魄入口：它走权威的回收流程，只对**可转移魂魄**有效，并触发 `soul` 的回收 pre/post 事件（脚本可以在 `Pre` 拦下）。魂魄的**转移**没有脚本入口：它由物品与内容自己触发，脚本只能通过事件围观或取消。

## 方法 {#方法}

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `reclaim(entity)` | `Entity` | `boolean` | 使用权威魂魄回收流程。仅适用于可转移魂魄；会触发 `soul` 的回收 pre/post 事件。 |

目标是生成灵魂体的原实体。关联灵魂体必须已加载且来源匹配，否则返回 `false`；有效的卸载中关联会保留，已超时的关联会清理。本方法不会强制加载区块，也不会恢复身体或物品。管理员可用[灵魂体命令](../../player-guide/soul.md)显式生成虚影。自动超时不触发回收 pre/post 事件。

```js
// kubejs/server_scripts/mxt_soul.js
if (!MxtSouls.reclaim(player)) {
  console.info('nothing reclaimable here')
}
```

## 相关 {#相关}

- 回收与转移时的回调：[MxtEvents](./events.md) 的 `soul`。
- [KubeJS API 参考](../api-reference.md)。

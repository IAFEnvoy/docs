---
title: KubeJS 事件
---

安装本附属与 KubeJS 后，在服务器脚本中订阅 `ForgingWorkstationsEvents.process`。包装提供 `getPhase()`、`getEvent()`、`isCancellable()`，取消使用 `event.cancel()`。

| 事件 | 阶段 | 原生事件语义 |
| --- | --- | --- |
| `ForgingWorkstationsEvents.process` | `Start`、`Started`、`StrikePre`、`StrikePost`、`CompletePre`、`CompletePost`、`Cancel` | 每个阶段都可读 `getPlayer()`（`ServerPlayer`）与 `getPos()`（`BlockPos`，台子位置）。分阶段：`Start.getBlueprint()`；`Started/StrikePost/Cancel.getSession()`；`StrikePre.getMethod()`（`Holder<ForgingMethod>`）、`getResources()`、`getContext()`、`getCosts()`、`setCosts(costs)`；`CompletePre.getBlueprint()`、`getSession()`；`CompletePost.getBlueprint()`、`getSession()`、`getResult()`、`getQuality()`（`Holder<ItemQuality>`，这一炉定下的档——`getResult()` 只给锻造记录，监听者在成品堆写入组件**之前**跑，所以要档位就读它）。`Start`、`StrikePre`、`CompletePre`、`Cancel` 可取消。 |

```js
ForgingWorkstationsEvents.process(event => {
  if (event.getPhase() !== 'StrikePre') return
  const native = event.getEvent()
})
```

## `forging` 的两条额外约定 {#forging-的两条额外约定}

**会话为只读视图。** `getSession()` 返回 `ForgingSessionView`，提供 `value()`、`steps()`、`optimalSteps()`、`history()`（不可变列表）与 `canComplete()`，不允许修改会话。监听器不直接接收可变的 `ForgingSession` 或工作站对象；通过 `getPos()` 获取位置，需要读取槽位时可调用 `player.level().getBlockEntity(pos)`。

**异常按事件阶段处理。** 决定型事件（`Start`、`StrikePre`、`CompletePre`、`Cancel`）在事务中派发；监听器异常会使操作被拒绝，材料与会话保持不变，并记录 `LISTENER_ERROR`，以区别于主动调用 `cancel()` 产生的 `CANCELLED`。通知型事件（`Started`、`StrikePost`、`CompletePost`）在操作生效后派发；监听器异常仅记录日志，不影响已完成的操作。

## 物品与绑定

使用 KubeJS 启动脚本注册物品，再通过 `data/<namespace>/mxt_forging/tool_binding/<entry>.json` 与 `data/<namespace>/mxt_forging/blueprint_binding/<entry>.json` 认领工具与图纸。两张表都用非空 `items` 匹配物品；条目 ID 仍由 `<namespace>:<entry>` 决定。字段见[工具绑定](./datapack/tool_binding.md)和[图纸绑定](./datapack/blueprint_binding.md)。

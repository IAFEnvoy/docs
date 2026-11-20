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

**会话是只读的。** `getSession()` 返回 `ForgingSessionView`，可读 `value()`、`steps()`、`optimalSteps()`、
`history()`（不可变列表）、`canComplete()`，**不能**改写会话——原生的 `ForgingSession` 是可变对象，
已不再交给监听器，所以 `event.getEvent().getSession().strike(...)` 这类写法不存在。台子本身也不交给监听器，
只给位置 `getPos()`；要读槽位就用 `player.level().getBlockEntity(pos)`。

**监听器不要抛异常，抛了也不会搞坏操作。** 四个决定型事件（`Start`、`StrikePre`、`CompletePre`、
`Cancel`）在事务中间派发，所以监听器抛出时会被服务端就地转成一次拒绝：日志记为 `LISTENER_ERROR`
（与脚本主动 `cancel()` 的 `CANCELLED` 区分），操作不发生、材料不消耗、会话保持原样。
三个通知型事件（`Started`、`StrikePost`、`CompletePost`）派发时操作已经生效，抛出只记录并忽略。

## 物品与绑定

使用 KubeJS 启动脚本注册物品，再通过 `data/<namespace>/mxt_forging/tool_binding/<entry>.json` 与 `data/<namespace>/mxt_forging/blueprint_binding/<entry>.json` 认领工具与图纸。两张表都用非空 `items` 匹配物品；条目 ID 仍由 `<namespace>:<entry>` 决定。字段见[工具绑定](./datapack/tool_binding.md)和[图纸绑定](./datapack/blueprint_binding.md)。

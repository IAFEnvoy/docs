---
title: Java API
description: 接入转生事务、管理按世代保存的数据以及读取玩家快照。
sidebar_position: 5
---

入口位于 `com.iafenvoy.reincarnation.api`。将转生作为可选依赖时，应将调用隔离在仅当 `ModList.get().isLoaded("reincarnation")` 为真才加载的兼容类中。

## 调用入口 {#api}

| API | 方法 | 作用 |
| --- | --- | --- |
| `ReincarnationApi` | `reincarnate(ServerPlayer, ReincarnationRequest)` | 完整换世并返回新玩家。`ReincarnationRequest.atSpawn(player, reason)` 使用默认出生位置并记录服务端重置策略。请求也可显式提供维度、坐标、朝向和策略。 |
| `ReincarnationApi` | `view(UUID, long)` | 读取可选的 Saturn `PlayerViewSnapshot`。调用方负责检查查看权限。 |
| `LifespanApi` | `get(Entity)`、`set`、`add`、`unlimited` | 读写寿元账本。单位和特殊值与 [KubeJS 方法](./kubejs.md#methods)相同。读取不创建附件。 |
| `LifespanApi` | `rebirth(LivingEntity, RebirthMode, Component)` | 立即执行寿元转生，通过 Saturn `Result` 返回处理后的实体。 |
| `LifespanApi` | `requestRebirth(LivingEntity, RebirthMode, Component)` | 排队，在实体 tick 结束后执行寿元转生。 |

写入与完整换世接口应在逻辑服务端线程调用。完整换世后使用返回的新玩家。排队时可从 Post 事件拿到处理后的实体。模式包括 `CONFIGURED`、`NEW_LIFE` 和 `RESET`。档案查询使用从零开始的世代编号。`LifeNumbers.display` 和 `LifeNumbers.generation` 可在内部编号与指令使用的世数之间转换。

## 事件 {#events}

| 事件 | 阶段 | 作用范围 |
| --- | --- | --- |
| `ReincarnationEvent` | `Pre`、`Reset`、`Post` | 完整换世。`Pre` 可取消，提供旧玩家。`Reset` 与 `Post` 提供新玩家。 |
| `LifeSpanEndEvent` | `Pre`、`Post` | 寿元耗尽。`Pre` 可取消。 |
| `LifeSpanRebirthEvent` | `Pre`、`Reset`、`Post`、`Failed` | 寿元转生。`Pre` 可取消。`Reset` 只用于原地重置。`Failed` 报告排队请求的执行失败。 |

寿元转生走 `NEW_LIFE` 时也会进入完整换世流程。

## 换世处理器 {#handlers}

在模组事件总线上监听 `RegisterReincarnationHandlersEvent`。每个 `ReincarnationHandler` 使用唯一 ID、正整数快照版本（默认 `1`）和优先级（默认 `100`）。数值较小的先执行，同优先级按 ID 排序。`archive` 在换世前将模组数据保存为 `CompoundTag`。`reset` 将快照应用到新玩家。事务恢复时可调用 `recover`，默认委托给 `reset`。处理器应根据快照和事务上下文进行幂等写入。仍有未完成事务引用快照时，应保留同一处理器 ID 和兼容版本。

## 与世代绑定的玩家引用 {#references}

用 `LifeReferences.bind(level, uuid)` 将新关系绑定到玩家当前世代，支持离线玩家。解码已保存的世代时用 `restore(uuid, generation)`。`sameLife` 同时比较账号和世代。`isCurrent` 可检查引用是否仍指向目标的当前世。

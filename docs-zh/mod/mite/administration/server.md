---
id: server
title: 服务器管理
slug: /mod/mite/administration/server
sidebar_position: 1
description: MITE 的专用服务器配置、重载、备份、更新与故障排查。
---

## 服务器权威状态

服务器必须裁决并同步：

- 生命值、食物、营养、技能、诅咒与限时合成进度。
- 配方可用性、工作台等级、熔炉热量与修理结果。
- 作物病害、牲畜状态、村庄解锁与月相事件。
- 传送门路线、符文之门目的地、实体 AI、生成与掉落。

请保持 **Enforce server authority** 处于启用状态。只有在诊断兼容性问题时才适合关闭它，正常运营的公共服务器不应如此。

## 需要备份的内容

在更新或大幅修改规则之前，至少备份：

```text
world/                         # World, dimensions, players, and SavedData
config/mite/mite-common.json   # Server balance configuration
config/mite/                   # Rule directories except mite-client.json
world/datapacks/               # World-level data packs
```

`mite-client.json` 保存每个玩家的呈现偏好，无需在服务器范围内分发。

## 重载对照表

| 内容 | `/reload` | 重启服务器 | 新区块/新世界 |
|---|:---:|:---:|:---:|
| 数据包中的营养、配方、采集、生成、溶解 | 是 | 否 | 否 |
| `config/mite` 下的规则目录 | 是 | 否 | 否 |
| 普通的 `mite-common.json` 平衡数值 | 取决于 Jupiter 的保存/重载 | 否 | 否 |
| 标记为 `restartRequired` 的配置 | 否 | 是 | 否 |
| 矿石与冥界地形 | 否 | 推荐 | 已有区块不会改变 |
| 动态注册表维度、附魔、世界生成 JSON | 部分 | 推荐 | 通常需要新区块或新世界 |

执行 `/reload` 之后，请在日志中检查：

```text
Loaded ... recipe rules
Loaded ... food nutrition definitions
Loaded ... harvest rule targets
Loaded ... mob spawn rules
Loaded ... gelatinous dissolving rule targets
Loaded ... misc definitions from .../config/mite
```

某个计数意外变成 `0` 通常意味着目录写错、JSON 无效，或数据包未启用。

## MITE 命令

所有模组命令都位于 `/mite` 下。运行 `/mite` 或 `/mite commands` 可查看完整的游戏内列表。

| 命令 | 用途 |
|---|---|
| `/mite day` | 显示当前世界天数 |
| `/mite ground` | 修正地板/天花板弹跳位置的问题 |
| `/mite rendering` | 显示服务器视角与模拟距离 |
| `/mite skills` | 列出可用的职业 |
| `/mite skill <profession>` | 显示某个职业及其是否已学习 |
| `/mite learn <profession>` | 学习某个职业 |
| `/mite abandon <profession>` | 放弃某个职业 |
| `/mite stats` | 把角色统计写入客户端侧的 `MITE/stats/<player>.txt` |
| `/mite syncpos` | 重新同步客户端位置与服务器 |
| `/mite tournament` | 显示锦标赛目标，或报告当前没有进行中的锦标赛 |
| `/mite villages` | 显示村庄生成的先决条件 |
| `/mite xp` | 显示精确的经验点数与等级 |

MITE 的服务器负载、JVM 内存与已加载区块诊断是被有意不移植的。

## 权限与配置界面

服务器配置通过 Jupiter 注册，默认仅限管理员使用。玩家客户端只读取同步后的生效值，无法覆盖它们。推荐做法：

- 只把配置访问权限授予可信的生产服务器管理员。
- 修改概率或持续时间时，记录改动前的值与日期。
- 先在测试服务器上运行 `/reload`，并至少观察一个完整的昼夜循环。

## 性能考量

- 牲畜 AI 会搜索附近的食物、水、围栏与实体。避免把数百只动物集中在一个区块中。
- 僵尸挖掘与凝胶状溶解遵守 `mobGriefing`；禁用它可减少方块扫描与破坏。
- 冥界地形、地牢与矿脉只在区块生成时运行，但首次探索仍有正常的生成开销。
- 大幅提高生成概率、附近方块半径或牲畜更新频率会成倍增加服务器负载。

## 更新

1. 停止并备份服务器。
2. 更新服务器与每个客户端上的 MITE JAR。
3. 启动一次以安装新的默认 `misc` 文件。
4. 对照[内容索引](../content/index.md)中的相应条目，比较行为变化。
5. 运行 `/reload` 并检查加载计数与错误。
6. 在已备份的世界中测试传送门、冥界、工作台、熔炉与玩家重连。

## 开发与自动化测试

在源代码仓库中运行：

```powershell
.\gradlew.bat build runGameTestServer
```

构建过程会校验所有资源 JSON。NeoForge 的 Server GameTest 覆盖注册、配置/数据规则、维度、传送门、网络以及关键的玩法回归。GameTest 不能替代使用真实客户端进行的渲染与输入测试。

## 故障排查

### 配方查看器仍显示被禁用的配方

确认服务器规则已同步，然后在重新加载后再次打开配方界面。JEI 与 EMI 会通过 `RecipeRules` 过滤，但第三方缓存可能需要重新进入世界。

### 新矿石没有出现在旧地形中

矿石只在区块首次生成时放置。请前往尚未探索的地形，或创建新世界。

### 客户端看不到完整的 Jade 状态

仅客户端安装的 Jade 只能显示客户端已拥有的信息。由服务器裁决的熔炉计时、病害、牲畜与特殊怪物状态还需要在服务器上也安装 Jade。
